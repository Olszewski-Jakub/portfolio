import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import AdminPanel from './AdminPanel';

const Wrap = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
`;

const Center = styled.div`
  max-width: 720px;
  margin: 80px auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: start;
`;

const Button = styled.button`
  padding: 10px 14px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const Shell = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 20px 16px;
  background: ${({ theme }) => theme.card_light};
  border-right: 1px solid rgba(148,163,184,0.15);
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media (max-width: 900px) {
    position: static;
    height: auto;
    flex-direction: row;
    overflow-x: auto;
  }
`;

const Brand = styled.div`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 10px;
`;

const NavItem = styled.button`
  text-align: left;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid transparent;
  background: ${({ active, theme }) => (active ? theme.primary : 'transparent')};
  color: ${({ active, theme }) => (active ? theme.white : theme.text_secondary)};
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover { color: ${({ theme }) => theme.text_primary}; border-color: rgba(148,163,184,0.2); }
`;

const Main = styled.main`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
`;

const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: ${({ theme }) => theme.card_light};
  border-bottom: 1px solid rgba(148,163,184,0.15);
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
`;

const UserBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default function AdminApp() {
  const { user, loading, login, logout } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin(user);
  const [active, setActive] = useState('projects');

  if (loading || adminLoading) {
    return <Wrap><Center>Loading…</Center></Wrap>;
  }

  if (!user) {
    return (
      <Wrap>
        <Center>
          <h2>Admin Sign In</h2>
          <p>Sign in with your Google account to manage content.</p>
          <Button onClick={login}>Sign in with Google</Button>
        </Center>
      </Wrap>
    );
  }

  if (!isAdmin) {
    return (
      <Wrap>
        <Center>
          <h2>Not authorized</h2>
          <p>The signed-in account does not have access to the admin area.</p>
          <Button onClick={logout}>Sign out</Button>
        </Center>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Shell>
        <Sidebar>
          <Brand>Admin</Brand>
          <NavItem active={active === 'projects'} onClick={() => setActive('projects')}>Projects</NavItem>
          <NavItem active={active === 'experience'} onClick={() => setActive('experience')}>Experience</NavItem>
          <NavItem active={active === 'education'} onClick={() => setActive('education')}>Education</NavItem>
          <NavItem active={active === 'certificates'} onClick={() => setActive('certificates')}>Certificates</NavItem>
        </Sidebar>
        <Main>
          <TopBar>
            <Title>{active.charAt(0).toUpperCase() + active.slice(1)}</Title>
            <UserBar>
              <span>{user?.displayName || user?.email}</span>
              <Button onClick={logout}>Sign out</Button>
            </UserBar>
          </TopBar>
          <div style={{ padding: '16px' }}>
            <AdminPanel active={active} onActiveChange={setActive} hideTabs />
          </div>
        </Main>
      </Shell>
    </Wrap>
  );
}
