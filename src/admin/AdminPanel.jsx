import React, { useEffect, useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import useContent from '../hooks/useContent';
import { db } from '../services/firebase';
import {
  doc,
  updateDoc,
  addDoc,
  collection,
  serverTimestamp,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore';
import {
  FaPlus,
  FaSearch,
  FaTrash,
  FaEdit,
  FaGripVertical,
  FaEye,
  FaEyeSlash,
  FaExclamationTriangle,
} from 'react-icons/fa';

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

const PRIMARY_KEY = {
  projects: 'title',
  experience: 'company',
  education: 'school',
  certificates: 'title',
};

const SECONDARY_KEY = {
  projects: 'summary',
  experience: 'role',
  education: 'degree',
  certificates: 'issuer',
};

const IMAGE_KEY = {
  projects: 'imageUrl',
  experience: 'img',
  education: 'img',
  certificates: 'image',
};

const DEFAULT_TITLE = {
  projects: 'Untitled project',
  experience: 'Untitled experience',
  education: 'Untitled education',
  certificates: 'Untitled certificate',
};

function getItemTitle(item, collectionId) {
  const key = PRIMARY_KEY[collectionId] || 'title';
  return item[key] || item.title || item.company || item.school || 'Untitled';
}

function getItemSubtitle(item, collectionId) {
  const key = SECONDARY_KEY[collectionId];
  if (!key) return '';
  const value = item[key];
  if (!value) return item.date || '';
  return value;
}

function getItemImage(item, collectionId) {
  const key = IMAGE_KEY[collectionId];
  return (key && item[key]) || item.imageUrl || item.image || item.img || '';
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  animation: ${fadeIn} 0.25s ease;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 18px;
`;

const ToolbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  min-width: 0;
  flex: 1;
`;

const SearchWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 200px;
  max-width: 340px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  color: ${({ theme }) => theme.text_secondary};
  display: grid;
  place-items: center;
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 11px 12px 11px 36px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => `${theme.text_primary}18`};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
  }

  &:focus {
    border-color: ${({ theme }) => `${theme.primary}88`};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.primary}22`};
  }
`;

const CountBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  background: ${({ theme }) => `${theme.text_primary}0c`};
  border: 1px solid ${({ theme }) => `${theme.text_primary}12`};
  white-space: nowrap;
`;

const Hint = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 12px;
  line-height: 1.4;
`;

const AddBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 16px;
  border-radius: 12px;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: filter 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    filter: brightness(1.08);
    box-shadow: 0 8px 22px ${({ theme }) => `${theme.primary}44`};
  }
`;

const Tabs = styled.div`
  display: inline-flex;
  gap: 4px;
  padding: 5px;
  border-radius: 12px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => `${theme.text_primary}14`};
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const Tab = styled.button`
  padding: 8px 14px;
  border-radius: 9px;
  border: none;
  background: ${({ active, theme }) => (active ? `${theme.primary}22` : 'transparent')};
  color: ${({ active, theme }) => (active ? theme.primary : theme.text_secondary)};
  font-weight: ${({ active }) => (active ? 600 : 500)};
  font-size: 13px;
  cursor: pointer;
  text-transform: capitalize;
  transition: all 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.text_primary};
  }
`;

const Panel = styled.div`
  border: 1px solid ${({ theme }) => `${theme.text_primary}14`};
  border-radius: 16px;
  background: ${({ theme }) => theme.card};
  overflow: hidden;
`;

const TableHead = styled.div`
  display: grid;
  grid-template-columns: 36px 56px minmax(0, 1fr) 88px 110px 148px;
  gap: 12px;
  align-items: center;
  padding: 12px 16px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text_secondary};
  background: ${({ theme }) => `${theme.text_primary}06`};
  border-bottom: 1px solid ${({ theme }) => `${theme.text_primary}12`};

  @media (max-width: 860px) {
    display: none;
  }
`;

const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 36px 56px minmax(0, 1fr) 88px 110px 148px;
  gap: 12px;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid ${({ theme }) => `${theme.text_primary}0e`};
  background: ${({ dragging, theme }) => (dragging ? `${theme.primary}10` : 'transparent')};
  outline: ${({ over, theme }) => (over ? `2px dashed ${theme.primary}66` : 'none')};
  outline-offset: -2px;
  transition: background 0.15s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => `${theme.text_primary}06`};
  }

  @media (max-width: 860px) {
    grid-template-columns: 28px 48px minmax(0, 1fr);
    grid-template-areas:
      'handle thumb meta'
      'handle thumb actions';
    gap: 10px 12px;
  }
`;

const Handle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.text_secondary};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'grab')};
  opacity: ${({ disabled }) => (disabled ? 0.35 : 1)};
  padding: 0;

  &:hover:not(:disabled) {
    background: ${({ theme }) => `${theme.text_primary}0c`};
    color: ${({ theme }) => theme.text_primary};
  }

  @media (max-width: 860px) {
    grid-area: handle;
  }
`;

const ThumbWrap = styled.div`
  width: 56px;
  height: 42px;
  border-radius: 8px;
  overflow: hidden;
  background: ${({ theme }) => theme.card_light};
  border: 1px solid ${({ theme }) => `${theme.text_primary}14`};
  display: grid;
  place-items: center;
  flex-shrink: 0;

  @media (max-width: 860px) {
    grid-area: thumb;
    width: 48px;
    height: 48px;
  }
`;

const Thumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ThumbPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => `${theme.primary}18`},
    ${({ theme }) => `${theme.text_primary}08`}
  );
`;

const Meta = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;

  @media (max-width: 860px) {
    grid-area: meta;
  }
`;

const TitleText = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const OrderInput = styled.input`
  width: 72px;
  padding: 8px 10px;
  border-radius: 9px;
  border: 1px solid ${({ theme }) => `${theme.text_primary}18`};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  font-size: 13px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => `${theme.primary}88`};
  }

  @media (max-width: 860px) {
    display: none;
  }
`;

const StatusBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: fit-content;
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid
    ${({ published, theme }) => (published ? `${theme.primary}44` : `${theme.text_primary}18`)};
  background: ${({ published, theme }) => (published ? `${theme.primary}18` : 'transparent')};
  color: ${({ published, theme }) => (published ? theme.primary : theme.text_secondary)};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    filter: brightness(1.08);
  }

  @media (max-width: 860px) {
    display: none;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: flex-end;

  @media (max-width: 860px) {
    grid-area: actions;
    justify-content: flex-start;
  }
`;

const IconBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: ${({ label }) => (label ? '8px 11px' : '8px')};
  min-width: 34px;
  height: 34px;
  border-radius: 9px;
  border: 1px solid
    ${({ danger, theme }) => (danger ? '#ef444455' : `${theme.text_primary}18`)};
  background: ${({ danger }) => (danger ? '#ef444412' : 'transparent')};
  color: ${({ danger, theme }) => (danger ? '#f87171' : theme.text_secondary)};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    color: ${({ danger, theme }) => (danger ? '#fff' : theme.text_primary)};
    background: ${({ danger, theme }) => (danger ? '#ef4444' : `${theme.text_primary}0c`)};
    border-color: ${({ danger, theme }) => (danger ? '#ef4444' : `${theme.text_primary}28`)};
  }

  span {
    @media (max-width: 520px) {
      display: none;
    }
  }
`;

const MobileStatus = styled.button`
  display: none;

  @media (max-width: 860px) {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 10px;
    border-radius: 999px;
    border: 1px solid
      ${({ published, theme }) => (published ? `${theme.primary}44` : `${theme.text_primary}18`)};
    background: ${({ published, theme }) => (published ? `${theme.primary}18` : 'transparent')};
    color: ${({ published, theme }) => (published ? theme.primary : theme.text_secondary)};
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }
`;

const EmptyState = styled.div`
  padding: 56px 24px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const EmptyTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const LoadingState = styled.div`
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
`;

const Spinner = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => `${theme.primary}33`};
  border-top-color: ${({ theme }) => theme.primary};
  animation: ${spin} 0.7s linear infinite;
`;

const Toast = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 3000;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 12px;
  background: ${({ theme, error }) => (error ? '#7f1d1d' : theme.card_light)};
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid
    ${({ theme, error }) => (error ? '#ef444466' : `${theme.primary}44`)};
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
  font-size: 13px;
  font-weight: 500;
  animation: ${fadeIn} 0.2s ease;
  max-width: min(360px, calc(100vw - 32px));
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.58);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 16px;
  animation: ${fadeIn} 0.15s ease;
`;

const Modal = styled.div`
  width: min(720px, 100%);
  max-height: min(90vh, 880px);
  overflow: auto;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid ${({ theme }) => `${theme.text_primary}16`};
  border-radius: 16px;
  box-shadow: 0 28px 64px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 20px;
  background: ${({ theme }) => `${theme.card}f2`};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => `${theme.text_primary}12`};
  z-index: 1;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

const CloseX = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 9px;
  border: 1px solid ${({ theme }) => `${theme.text_primary}16`};
  background: transparent;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  display: grid;
  place-items: center;

  &:hover {
    color: ${({ theme }) => theme.text_primary};
    background: ${({ theme }) => `${theme.text_primary}0a`};
  }
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const Fields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  grid-column: ${({ wide }) => (wide ? '1 / -1' : 'auto')};
`;

const FieldLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  letter-spacing: 0.02em;
`;

const Input = styled.input`
  width: 100%;
  padding: 11px 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => `${theme.text_primary}18`};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    border-color: ${({ theme }) => `${theme.primary}88`};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.primary}22`};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 110px;
  padding: 11px 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => `${theme.text_primary}18`};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  resize: vertical;
  outline: none;
  font-family: inherit;
  line-height: 1.5;

  &:focus {
    border-color: ${({ theme }) => `${theme.primary}88`};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.primary}22`};
  }
`;

const Helper = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.4;
`;

const SwitchRow = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
  width: fit-content;
`;

const SwitchTrack = styled.span`
  width: 42px;
  height: 24px;
  border-radius: 999px;
  background: ${({ on, theme }) => (on ? theme.primary : `${theme.text_primary}22`)};
  position: relative;
  transition: background 0.15s ease;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${({ on }) => (on ? '21px' : '3px')};
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: white;
    transition: left 0.15s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  }
`;

const SwitchInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const Preview = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  background: ${({ theme }) => `${theme.text_primary}06`};
  border: 1px solid ${({ theme }) => `${theme.text_primary}10`};
`;

const PreviewImg = styled.img`
  width: 112px;
  height: 72px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => `${theme.text_primary}14`};
  background: ${({ theme }) => theme.card_light};
`;

const ModalActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 14px 20px 18px;
  border-top: 1px solid ${({ theme }) => `${theme.text_primary}12`};
  position: sticky;
  bottom: 0;
  background: ${({ theme }) => `${theme.card}f2`};
  backdrop-filter: blur(10px);
`;

const Btn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px 16px;
  border-radius: 11px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s ease;
  border: 1px solid
    ${({ variant, theme }) =>
      variant === 'ghost' ? `${theme.text_primary}22` : 'transparent'};
  background: ${({ variant, theme }) =>
    variant === 'ghost' ? 'transparent' : theme.primary};
  color: ${({ variant, theme }) =>
    variant === 'ghost' ? theme.text_primary : theme.white};

  &:hover {
    filter: brightness(1.06);
    background: ${({ variant, theme }) =>
      variant === 'ghost' ? `${theme.text_primary}0a` : theme.primary};
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

function Switch({ id, checked, onChange, label }) {
  return (
    <SwitchRow htmlFor={id}>
      <SwitchInput
        id={id}
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <SwitchTrack on={!!checked} aria-hidden />
      <span>{label || (checked ? 'Published' : 'Draft')}</span>
    </SwitchRow>
  );
}

function FieldEditor({ fields, draft, setDraft, mode }) {
  return (
    <Fields>
      {fields.map((f, i) => {
        const id = `${mode}-${f.key}`;
        const isImageField = ['imageurl', 'image', 'img'].includes((f.key || '').toLowerCase());
        const wide = !!f.multiline || isImageField;

        return (
          <Field key={f.key} wide={wide}>
            <FieldLabel htmlFor={id}>{f.label || f.key}</FieldLabel>

            {f.type === 'boolean' ? (
              <Switch
                id={id}
                checked={!!draft[f.key]}
                onChange={(v) => setDraft({ ...draft, [f.key]: v })}
                label={draft[f.key] ? 'Published' : 'Draft'}
              />
            ) : f.multiline ? (
              <>
                <Textarea
                  id={id}
                  placeholder={f.label || f.key}
                  value={draft[f.key] || ''}
                  onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                />
                {f.key === 'summary' && (
                  <Helper>Short summary shown on project cards.</Helper>
                )}
              </>
            ) : (
              <>
                <Input
                  id={id}
                  autoFocus={i === 0}
                  type={f.type === 'number' ? 'number' : 'text'}
                  placeholder={f.label || f.key}
                  value={draft[f.key] ?? ''}
                  onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                />
                {isImageField && (
                  <Helper>Paste a public image URL. Preview updates live.</Helper>
                )}
              </>
            )}

            {isImageField && draft[f.key] ? (
              <Preview>
                <PreviewImg src={draft[f.key]} alt="Preview" />
                <Helper>Live preview</Helper>
              </Preview>
            ) : null}
          </Field>
        );
      })}
    </Fields>
  );
}

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
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const sorted = useMemo(() => {
    let next = [...(data || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const q = query.trim().toLowerCase();
    if (q) {
      next = next.filter((i) => {
        const hay = [
          i.title,
          i.company,
          i.school,
          i.role,
          i.degree,
          i.issuer,
          i.summary,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return hay.includes(q);
      });
    }
    return next;
  }, [data, query]);

  useEffect(() => {
    setList(sorted);
  }, [sorted]);

  useEffect(() => {
    setShowCreate(false);
    setShowEdit(false);
    setEditItem(null);
    setDraft({});
    setQuery('');
  }, [active]);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    if (!showCreate && !showEdit) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setShowCreate(false);
        setShowEdit(false);
        setEditItem(null);
        setDraft({});
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [showCreate, showEdit]);

  function notify(message, error = false) {
    setToast({ message, error });
  }

  function moveItem(arr, from, to) {
    const copy = arr.slice();
    const [moved] = copy.splice(from, 1);
    copy.splice(to, 0, moved);
    return copy;
  }

  const onDragStart = (index, e) => {
    if (query.trim()) return;
    setDragIndex(index);
    setOverIndex(index);
    try {
      e.dataTransfer.setData('text/plain', String(index));
    } catch {
      /* ignore */
    }
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
    if (query.trim()) return;
    try {
      const batch = writeBatch(db);
      list.forEach((item, idx) => {
        if ((item.order ?? idx) !== idx) {
          batch.update(doc(db, active, item.id), { order: idx });
        }
      });
      await batch.commit();
      await refresh();
      notify('Order saved');
    } catch {
      await refresh();
      notify('Could not save order', true);
    }
  };

  async function save(item, changes) {
    try {
      await updateDoc(doc(db, active, item.id), changes);
      await refresh();
    } catch {
      notify('Save failed', true);
      await refresh();
    }
  }

  function buildPayload(fromDraft) {
    const fields = FIELD_CONFIG[active] || [];
    const payload = {};
    fields.forEach((f) => {
      let v = fromDraft[f.key];
      if (f.array) v = (v || '').split(',').map((s) => s.trim()).filter(Boolean);
      if (f.type === 'number') v = Number(v || 0);
      if (f.type === 'boolean') v = Boolean(v);
      if (v !== undefined) payload[f.key] = v;
    });
    return payload;
  }

  async function create() {
    setSaving(true);
    try {
      const payload = buildPayload(draft);
      const primary = PRIMARY_KEY[active];
      if (primary && !payload[primary]) {
        payload[primary] = DEFAULT_TITLE[active] || 'Untitled';
      }
      if (payload.published === undefined) payload.published = true;
      if (payload.order === undefined) payload.order = list.length;
      payload.updatedAt = serverTimestamp();
      payload.createdAt = serverTimestamp();
      await addDoc(collection(db, active), payload);
      setShowCreate(false);
      setDraft({});
      await refresh();
      notify('Item created');
    } catch {
      notify('Create failed', true);
    } finally {
      setSaving(false);
    }
  }

  function openEdit(item) {
    setEditItem(item);
    const fields = FIELD_CONFIG[active] || [];
    const d = {};
    fields.forEach((f) => {
      let v = item[f.key];
      if (f.array && Array.isArray(v)) v = v.join(', ');
      d[f.key] = v ?? (f.type === 'boolean' ? false : f.type === 'number' ? 0 : '');
    });
    setDraft(d);
    setShowEdit(true);
  }

  async function saveEdit() {
    if (!editItem) return;
    setSaving(true);
    try {
      const changes = buildPayload(draft);
      changes.updatedAt = serverTimestamp();
      await updateDoc(doc(db, active, editItem.id), changes);
      setShowEdit(false);
      setEditItem(null);
      setDraft({});
      await refresh();
      notify('Changes saved');
    } catch {
      notify('Save failed', true);
    } finally {
      setSaving(false);
    }
  }

  async function removeItem(item) {
    if (!window.confirm(`Delete “${getItemTitle(item, active)}”? This cannot be undone.`)) return;
    try {
      await deleteDoc(doc(db, active, item.id));
      await refresh();
      notify('Item deleted');
    } catch {
      notify('Delete failed', true);
    }
  }

  const searchLocked = !!query.trim();
  const fields = FIELD_CONFIG[active] || [];
  const singular = active.replace(/s$/, '');

  return (
    <Container>
      {!hideTabs && (
        <Tabs>
          {collections.map((c) => (
            <Tab key={c} active={active === c} onClick={() => setActive(c)}>
              {c}
            </Tab>
          ))}
        </Tabs>
      )}

      <Toolbar>
        <ToolbarLeft>
          <SearchWrap>
            <SearchIcon>
              <FaSearch size={13} />
            </SearchIcon>
            <SearchInput
              placeholder="Search by title, company, school…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </SearchWrap>
          <CountBadge>
            {list.length} item{list.length === 1 ? '' : 's'}
          </CountBadge>
          {searchLocked ? (
            <Hint>Clear search to reorder</Hint>
          ) : (
            <Hint>Drag the handle to reorder</Hint>
          )}
        </ToolbarLeft>
        <AddBtn
          onClick={() => {
            setDraft({ published: true, order: list.length });
            setShowCreate(true);
          }}
        >
          <FaPlus size={12} />
          Add new
        </AddBtn>
      </Toolbar>

      <Panel>
        {loading ? (
          <LoadingState>
            <Spinner />
            Loading {active}…
          </LoadingState>
        ) : list.length === 0 ? (
          <EmptyState>
            <EmptyTitle>{query ? 'No matches' : `No ${active} yet`}</EmptyTitle>
            <div>
              {query
                ? 'Try a different search term.'
                : `Create your first ${singular} to get started.`}
            </div>
            {!query && (
              <AddBtn
                style={{ marginTop: 8 }}
                onClick={() => {
                  setDraft({ published: true, order: 0 });
                  setShowCreate(true);
                }}
              >
                <FaPlus size={12} />
                Add new
              </AddBtn>
            )}
          </EmptyState>
        ) : (
          <>
            <TableHead>
              <div />
              <div>Image</div>
              <div>Item</div>
              <div>Order</div>
              <div>Status</div>
              <div style={{ textAlign: 'right' }}>Actions</div>
            </TableHead>

            {list.map((item, index) => {
              const title = getItemTitle(item, active);
              const subtitle = getItemSubtitle(item, active);
              const image = getItemImage(item, active);
              const published = item.published !== false;

              return (
                <ItemRow
                  key={item.id}
                  dragging={dragIndex === index}
                  over={overIndex === index && dragIndex !== null}
                  onDragOver={(e) => onDragOver(index, e)}
                  onDrop={onDrop}
                >
                  <Handle
                    type="button"
                    draggable={!searchLocked}
                    disabled={searchLocked}
                    onDragStart={(e) => onDragStart(index, e)}
                    title={searchLocked ? 'Clear search to reorder' : 'Drag to reorder'}
                    aria-label="Reorder"
                  >
                    <FaGripVertical />
                  </Handle>

                  <ThumbWrap>
                    {image ? <Thumb src={image} alt="" /> : <ThumbPlaceholder />}
                  </ThumbWrap>

                  <Meta>
                    <TitleText title={title}>{title}</TitleText>
                    {subtitle ? <SubText title={subtitle}>{subtitle}</SubText> : null}
                  </Meta>

                  <OrderInput
                    type="number"
                    defaultValue={item.order ?? index}
                    key={`${item.id}-order-${item.order ?? index}`}
                    onBlur={(e) => {
                      const next = Number(e.target.value || 0);
                      if (next !== (item.order ?? 0)) save(item, { order: next });
                    }}
                    aria-label="Order"
                  />

                  <StatusBtn
                    type="button"
                    published={published}
                    onClick={() => save(item, { published: !published })}
                    title={published ? 'Click to unpublish' : 'Click to publish'}
                  >
                    {published ? <FaEye size={11} /> : <FaEyeSlash size={11} />}
                    {published ? 'Live' : 'Draft'}
                  </StatusBtn>

                  <Actions>
                    <MobileStatus
                      type="button"
                      published={published}
                      onClick={() => save(item, { published: !published })}
                    >
                      {published ? <FaEye size={11} /> : <FaEyeSlash size={11} />}
                      {published ? 'Live' : 'Draft'}
                    </MobileStatus>
                    <IconBtn type="button" label onClick={() => openEdit(item)}>
                      <FaEdit size={12} />
                      <span>Edit</span>
                    </IconBtn>
                    <IconBtn type="button" danger onClick={() => removeItem(item)} aria-label="Delete">
                      <FaTrash size={12} />
                    </IconBtn>
                  </Actions>
                </ItemRow>
              );
            })}
          </>
        )}
      </Panel>

      {showCreate && (
        <Overlay
          onClick={() => {
            setShowCreate(false);
            setDraft({});
          }}
        >
          <Modal
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-dialog-title"
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitle id="create-dialog-title">
                New {active.charAt(0).toUpperCase() + active.slice(1)}
              </ModalTitle>
              <CloseX
                aria-label="Close"
                onClick={() => {
                  setShowCreate(false);
                  setDraft({});
                }}
              >
                ×
              </CloseX>
            </ModalHeader>
            <ModalBody>
              <FieldEditor fields={fields} draft={draft} setDraft={setDraft} mode="create" />
            </ModalBody>
            <ModalActions>
              <Btn
                variant="ghost"
                onClick={() => {
                  setShowCreate(false);
                  setDraft({});
                }}
              >
                Cancel
              </Btn>
              <Btn onClick={create} disabled={saving}>
                {saving ? 'Creating…' : 'Create'}
              </Btn>
            </ModalActions>
          </Modal>
        </Overlay>
      )}

      {showEdit && (
        <Overlay
          onClick={() => {
            setShowEdit(false);
            setEditItem(null);
            setDraft({});
          }}
        >
          <Modal
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-dialog-title"
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitle id="edit-dialog-title">
                Edit {active.charAt(0).toUpperCase() + active.slice(1)}
              </ModalTitle>
              <CloseX
                aria-label="Close"
                onClick={() => {
                  setShowEdit(false);
                  setEditItem(null);
                  setDraft({});
                }}
              >
                ×
              </CloseX>
            </ModalHeader>
            <ModalBody>
              <FieldEditor fields={fields} draft={draft} setDraft={setDraft} mode="edit" />
            </ModalBody>
            <ModalActions>
              <Btn
                variant="ghost"
                onClick={() => {
                  setShowEdit(false);
                  setEditItem(null);
                  setDraft({});
                }}
              >
                Cancel
              </Btn>
              <Btn onClick={saveEdit} disabled={saving}>
                {saving ? 'Saving…' : 'Save changes'}
              </Btn>
            </ModalActions>
          </Modal>
        </Overlay>
      )}

      {toast && (
        <Toast error={toast.error}>
          {toast.error ? <FaExclamationTriangle size={13} /> : null}
          {toast.message}
        </Toast>
      )}
    </Container>
  );
}
