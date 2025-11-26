import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import useContent from '../hooks/useContent';
import { db } from '../services/firebase';
import { doc, updateDoc, addDoc, collection, serverTimestamp, deleteDoc, writeBatch } from 'firebase/firestore';
import { FaPlus, FaSearch, FaTrash, FaEdit, FaGripVertical } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 20px 80px;
  background: ${({ theme }) => theme.bg};
`;

const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Heading = styled.h2`
  margin: 0;
`;

const Tabs = styled.div`
  display: inline-flex;
  gap: 6px;
  padding: 6px;
  border-radius: 12px;
  background: ${({ theme }) => theme.card_light};
  border: 1px solid rgba(148,163,184,0.15);
`;

const Tab = styled.button`
  padding: 8px 14px;
  border-radius: 10px;
  border: none;
  background: ${({ active, theme }) => (active ? theme.primary : 'transparent')};
  color: ${({ active, theme }) => (active ? theme.white : theme.text_secondary)};
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover { color: ${({ theme }) => theme.text_primary}; }
`;

const Card = styled.div`
  border: 1px solid rgba(148,163,184,0.15);
  border-radius: 12px;
  padding: 14px;
  margin: 10px 0;
  background: ${({ theme }) => theme.card_light};
  box-shadow: 0 8px 18px rgba(0,0,0,0.08);
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 28px 70px 1fr 110px 120px 120px 110px;
  gap: 10px;
  align-items: center;
  margin: 6px 0;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const HeaderRow = styled(Row)`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid rgba(148,163,184,0.3);
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
`;

const SearchInput = styled(Input)`
  max-width: 280px;
  padding-left: 34px;
`;

const SearchWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 10px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Toggle = styled.input.attrs({ type: 'checkbox' })``;

const SaveBtn = styled.button`
  padding: 8px 12px;
  border-radius: 10px;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  cursor: pointer;
`;

const DeleteBtn = styled.button`
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #ef4444;
  background: transparent;
  color: #ef4444;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #ef4444;
    color: white;
  }
`;

const Thumb = styled.img`
  width: 56px;
  height: 42px;
  object-fit: cover;
  border-radius: 8px;
  background: ${({ theme }) => theme.card};
  border: 1px solid rgba(148,163,184,0.15);
`;

const Handle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text_secondary};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'grab')};
  user-select: none;
`;

const AddBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0 18px;
`;

const Hint = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 12px;
`;

const AddBtn = styled.button`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.primary};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

// Lightweight modal for creating/editing items
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const Modal = styled.div`
  width: min(840px, 94vw);
  max-height: 90vh;
  overflow: auto;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid rgba(148,163,184,0.15);
  border-radius: 14px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.45);
`;

const ModalHeader = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: ${({ theme }) => theme.card_light};
  border-bottom: 1px solid rgba(148,163,184,0.15);
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const CloseX = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
`;

const ModalBody = styled.div`
  padding: 14px 16px 6px;
`;

const Fields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 10px;
  align-items: start;
  @media (max-width: 720px) { grid-template-columns: 1fr; }
`;

const FieldLabel = styled.label`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  padding-top: 8px;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(148,163,184,0.3);
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  resize: vertical;
`;

const Helper = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Preview = styled.div`
  grid-column: 1 / -1;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const PreviewImg = styled.img`
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid rgba(148,163,184,0.2);
  background: ${({ theme }) => theme.card_light};
`;

const ModalActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 12px 16px 16px;
  border-top: 1px solid rgba(148,163,184,0.15);
`;

const collections = ['projects', 'experience', 'education', 'certificates'];

const FIELD_CONFIG = {
  projects: [
    { key: 'title', label: 'Title' },
    { key: 'summary', label: 'Summary', multiline: true },
    { key: 'description', label: 'Description', multiline: true },
    { key: 'category', label: 'Categories (comma separated)', array: true },
    { key: 'tags', label: 'Tags (comma separated)', array: true },
    { key: 'status', label: 'Status' },
    { key: 'date', label: 'Date' },
    { key: 'imageUrl', label: 'Image URL' },
    { key: 'github', label: 'GitHub URL' },
    { key: 'webapp', label: 'Web App URL' },
    { key: 'order', label: 'Order', type: 'number' },
    { key: 'published', label: 'Published', type: 'boolean' },
  ],
  experience: [
    { key: 'company', label: 'Company' },
    { key: 'role', label: 'Role' },
    { key: 'date', label: 'Date' },
    { key: 'location', label: 'Location' },
    { key: 'desc', label: 'Description (HTML/Markdown allowed)', multiline: true },
    { key: 'img', label: 'Logo URL' },
    { key: 'companyUrl', label: 'Company URL' },
    { key: 'skills', label: 'Skills (comma separated)', array: true },
    { key: 'order', label: 'Order', type: 'number' },
    { key: 'published', label: 'Published', type: 'boolean' },
  ],
  education: [
    { key: 'school', label: 'School (can include city)' },
    { key: 'degree', label: 'Degree' },
    { key: 'date', label: 'Date' },
    { key: 'grade', label: 'Achievement/Grade' },
    { key: 'desc', label: 'Description', multiline: true },
    { key: 'img', label: 'Logo URL' },
    { key: 'website', label: 'Website' },
    { key: 'order', label: 'Order', type: 'number' },
    { key: 'published', label: 'Published', type: 'boolean' },
  ],
  certificates: [
    { key: 'title', label: 'Title' },
    { key: 'issuer', label: 'Issuer' },
    { key: 'date', label: 'Date' },
    { key: 'category', label: 'Category' },
    { key: 'score', label: 'Score' },
    { key: 'url', label: 'Certificate URL' },
    { key: 'image', label: 'Image URL' },
    { key: 'order', label: 'Order', type: 'number' },
    { key: 'published', label: 'Published', type: 'boolean' },
  ],
};

export default function AdminPanel({ active: externalActive, onActiveChange, hideTabs = false }) {
  const [activeState, setActiveState] = useState('projects');
  const active = externalActive ?? activeState;
  const setActive = onActiveChange ?? setActiveState;
  const { data, loading, refresh } = useContent(active, { includeUnpublished: true });
  const [list, setList] = useState([]);
  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [draft, setDraft] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [query, setQuery] = useState('');

  const sorted = useMemo(() => {
    let list = [...(data || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const q = query.trim().toLowerCase();
    if (q) list = list.filter((i) => (i.title || i.company || i.school || '').toLowerCase().includes(q));
    return list;
  }, [data, query]);

  // Sync local list when underlying data changes (except during drag)
  React.useEffect(() => {
    setList(sorted);
  }, [sorted]);

  // Reset dialog/draft when switching collections
  React.useEffect(() => {
    setShowCreate(false);
    setShowEdit(false);
    setEditItem(null);
    setDraft({});
  }, [active]);

  function moveItem(arr, from, to) {
    const copy = arr.slice();
    const [moved] = copy.splice(from, 1);
    copy.splice(to, 0, moved);
    return copy;
  }

  const onDragStart = (index, e) => {
    if (query.trim()) return; // disable drag when search active
    setDragIndex(index);
    setOverIndex(index);
    try { e.dataTransfer.setData('text/plain', String(index)); } catch {}
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (index, e) => {
    e.preventDefault();
    if (dragIndex === null || index === overIndex) return;
    setList((prev) => moveItem(prev, dragIndex, index));
    setDragIndex(index);
    setOverIndex(index);
  };

  const onDrop = async () => {
    setDragIndex(null);
    setOverIndex(null);
    if (query.trim()) return; // don't persist if search filtered
    // Persist order to Firestore
    try {
      const batch = writeBatch(db);
      list.forEach((item, idx) => {
        if ((item.order ?? idx) !== idx) {
          batch.update(doc(db, active, item.id), { order: idx });
        }
      });
      await batch.commit();
      await refresh();
    } catch (e) {
      // Non-blocking; UI already updated, but refresh to reflect server state
      await refresh();
    }
  };

  async function save(item, changes) {
    await updateDoc(doc(db, active, item.id), changes);
    await refresh();
  }

  async function create() {
    const fields = FIELD_CONFIG[active] || [];
    const payload = {};
    fields.forEach(f => {
      let v = draft[f.key];
      if (f.array) v = (v || '').split(',').map(s => s.trim()).filter(Boolean);
      if (f.type === 'number') v = Number(v || 0);
      if (f.type === 'boolean') v = Boolean(v);
      if (v !== undefined) payload[f.key] = v;
    });
    if (payload.title === undefined) payload.title = 'Untitled';
    payload.updatedAt = serverTimestamp();
    payload.createdAt = serverTimestamp();
    await addDoc(collection(db, active), payload);
    setShowCreate(false);
    setDraft({});
    await refresh();
  }

  function openEdit(item) {
    setEditItem(item);
    const fields = FIELD_CONFIG[active] || [];
    const d = {};
    fields.forEach(f => {
      let v = item[f.key];
      if (f.array && Array.isArray(v)) v = v.join(', ');
      d[f.key] = v ?? (f.type === 'boolean' ? false : f.type === 'number' ? 0 : '');
    });
    setDraft(d);
    setShowEdit(true);
  }

  async function saveEdit() {
    if (!editItem) return;
    const fields = FIELD_CONFIG[active] || [];
    const changes = {};
    fields.forEach(f => {
      let v = draft[f.key];
      if (f.array) v = (v || '').split(',').map(s => s.trim()).filter(Boolean);
      if (f.type === 'number') v = Number(v || 0);
      if (f.type === 'boolean') v = Boolean(v);
      changes[f.key] = v;
    });
    changes.updatedAt = serverTimestamp();
    await updateDoc(doc(db, active, editItem.id), changes);
    setShowEdit(false);
    setEditItem(null);
    setDraft({});
    await refresh();
  }

  return (
    <Container>
      <HeaderBar>
        <Heading>Admin Panel</Heading>
        <SearchWrap>
          <SearchIcon><FaSearch size={14} /></SearchIcon>
          <SearchInput placeholder="Search title..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </SearchWrap>
      </HeaderBar>

      {!hideTabs && (
        <Tabs>
          {collections.map((c) => (
            <Tab key={c} active={active === c} onClick={() => setActive(c)}>
              {c}
            </Tab>
          ))}
        </Tabs>
      )}

      <AddBar>
        <Hint>Drag the handle to reorder. Clear search to enable drag.</Hint>
        <AddBtn onClick={() => { setDraft({}); setShowCreate(true); }}><FaPlus size={12} /> Add New</AddBtn>
      </AddBar>

      {loading ? (
        <div>Loading…</div>
      ) : (
        list.map((item, index) => (
          <Card key={item.id}
                onDragOver={(e) => onDragOver(index, e)}
                onDrop={onDrop}
                style={index === overIndex ? { outline: '2px dashed rgba(148,163,184,0.35)' } : undefined}
          >
            <HeaderRow>
              <div>Sort</div>
              <div>Image</div>
              <div>Title</div>
              <div>Order</div>
              <div>Published</div>
              <div>Actions</div>
              <div></div>
            </HeaderRow>
            <Row>
              <Handle draggable={!query.trim()} disabled={!!query.trim()} onDragStart={(e) => onDragStart(index, e)} title={query.trim() ? "Clear search to reorder" : "Drag to reorder"}>
                <FaGripVertical />
              </Handle>
              <div>
                {(() => {
                  const src = item.imageUrl || item.image || item.img || '';
                  return src ? <Thumb src={src} alt={item.title || 'thumb'} /> : null;
                })()}
              </div>
              <Input defaultValue={item.title} onBlur={(e) => e.target.value !== item.title && save(item, { title: e.target.value })} />
              <Input type="number" defaultValue={item.order ?? 0} onBlur={(e) => save(item, { order: Number(e.target.value || 0) })} />
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Toggle defaultChecked={item.published !== false} onChange={(e) => save(item, { published: e.target.checked })} />
                <span>Published</span>
              </label>
              <SaveBtn onClick={() => openEdit(item)}><FaEdit style={{ marginRight: 6 }} /> Edit</SaveBtn>
              <DeleteBtn onClick={async () => {
                if (!window.confirm('Delete this item? This cannot be undone.')) return;
                await deleteDoc(doc(db, active, item.id));
                await refresh();
              }}><FaTrash style={{ marginRight: 6 }} /> Delete</DeleteBtn>
            </Row>
            <Row>
              <Input placeholder="Summary" defaultValue={item.summary || ''} onBlur={(e) => save(item, { summary: e.target.value })} />
            </Row>
          </Card>
        ))
      )}

      {showCreate && (
        <Overlay onClick={() => { setShowCreate(false); setDraft({}); }}>
          <Modal
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-dialog-title"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => { if (e.key === 'Escape') setShowCreate(false); }}
          >
            <ModalHeader>
              <ModalTitle id="create-dialog-title">New {active.slice(0,1).toUpperCase()+active.slice(1)}</ModalTitle>
              <CloseX aria-label="Close" onClick={() => { setShowCreate(false); setDraft({}); }}>×</CloseX>
            </ModalHeader>
            <ModalBody>
              <Fields>
                {(FIELD_CONFIG[active] || []).map((f, i) => {
                  const id = `create-${f.key}`;
                  const isImageField = ['imageurl','image','img'].includes((f.key||'').toLowerCase());
                  return (
                    <FieldRow key={f.key + i}>
                      {f.type === 'boolean' ? (
                        <FieldLabel htmlFor={id}>{f.label || f.key}</FieldLabel>
                      ) : (
                        <FieldLabel htmlFor={id}>{f.label || f.key}</FieldLabel>
                      )}
                      {f.type === 'boolean' ? (
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <input id={id} type="checkbox" checked={!!draft[f.key]} onChange={(e) => setDraft({ ...draft, [f.key]: e.target.checked })} />
                          <Helper>{draft[f.key] ? 'Enabled' : 'Disabled'}</Helper>
                        </div>
                      ) : f.multiline ? (
                        <div>
                          <Textarea
                            id={id}
                            placeholder={f.label || f.key}
                            value={draft[f.key] || ''}
                            onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                          />
                          {f.key === 'summary' && (<Helper>Short summary displayed in list cards.</Helper>)}
                        </div>
                      ) : (
                        <div>
                          <Input
                            id={id}
                            autoFocus={i === 0}
                            type={f.type === 'number' ? 'number' : 'text'}
                            placeholder={f.label || f.key}
                            value={draft[f.key] ?? ''}
                            onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                            aria-describedby={isImageField ? `${id}-help` : undefined}
                          />
                          {isImageField && (
                            <Helper id={`${id}-help`}>Paste a public image URL. Preview below.</Helper>
                          )}
                        </div>
                      )}
                      {isImageField && (draft[f.key] ? (
                        <Preview>
                          <PreviewImg src={draft[f.key]} alt="Preview" />
                          <Helper>Live preview</Helper>
                        </Preview>
                      ) : null)}
                    </FieldRow>
                  );
                })}
              </Fields>
            </ModalBody>
            <ModalActions>
              <SaveBtn onClick={() => { setShowCreate(false); setDraft({}); }} style={{ background: 'transparent', color:'inherit', border: '1px solid rgba(148,163,184,0.3)' }}>Cancel</SaveBtn>
              <SaveBtn onClick={create}>Create</SaveBtn>
            </ModalActions>
          </Modal>
        </Overlay>
      )}

      {showEdit && (
        <Overlay onClick={() => { setShowEdit(false); setEditItem(null); setDraft({}); }}>
          <Modal
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-dialog-title"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => { if (e.key === 'Escape') setShowEdit(false); }}
          >
            <ModalHeader>
              <ModalTitle id="edit-dialog-title">Edit {active.slice(0,1).toUpperCase()+active.slice(1)}</ModalTitle>
              <CloseX aria-label="Close" onClick={() => { setShowEdit(false); setEditItem(null); setDraft({}); }}>×</CloseX>
            </ModalHeader>
            <ModalBody>
              <Fields>
                {(FIELD_CONFIG[active] || []).map((f, i) => {
                  const id = `edit-${f.key}`;
                  const isImageField = ['imageurl','image','img'].includes((f.key||'').toLowerCase());
                  return (
                    <FieldRow key={f.key + i}>
                      <FieldLabel htmlFor={id}>{f.label || f.key}</FieldLabel>
                      {f.type === 'boolean' ? (
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <input id={id} type="checkbox" checked={!!draft[f.key]} onChange={(e) => setDraft({ ...draft, [f.key]: e.target.checked })} />
                          <Helper>{draft[f.key] ? 'Enabled' : 'Disabled'}</Helper>
                        </div>
                      ) : f.multiline ? (
                        <div>
                          <Textarea
                            id={id}
                            placeholder={f.label || f.key}
                            value={draft[f.key] || ''}
                            onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                          />
                        </div>
                      ) : (
                        <div>
                          <Input
                            id={id}
                            type={f.type === 'number' ? 'number' : 'text'}
                            placeholder={f.label || f.key}
                            value={draft[f.key] ?? ''}
                            onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                            aria-describedby={isImageField ? `${id}-help` : undefined}
                          />
                          {isImageField && (
                            <Helper id={`${id}-help`}>Preview below updates as you type.</Helper>
                          )}
                        </div>
                      )}
                      {isImageField && (draft[f.key] ? (
                        <Preview>
                          <PreviewImg src={draft[f.key]} alt="Preview" />
                          <Helper>Live preview</Helper>
                        </Preview>
                      ) : null)}
                    </FieldRow>
                  );
                })}
              </Fields>
            </ModalBody>
            <ModalActions>
              <SaveBtn onClick={() => { setShowEdit(false); setEditItem(null); setDraft({}); }} style={{ background: 'transparent', color:'inherit', border: '1px solid rgba(148,163,184,0.3)' }}>Cancel</SaveBtn>
              <SaveBtn onClick={saveEdit}>Save Changes</SaveBtn>
            </ModalActions>
          </Modal>
        </Overlay>
      )}
    </Container>
  );
}
