import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  FaBriefcase,
  FaCertificate,
  FaFolderOpen,
  FaGraduationCap,
  FaGoogle,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import AdminPanel from './AdminPanel';

const NAV = [
  { id: 'projects', label: 'Projects', icon: FaFolderOpen },
  { id: 'experience', label: 'Experience', icon: FaBriefcase },
  { id: 'education', label: 'Education', icon: FaGraduationCap },
  { id: 'certificates', label: 'Certificates', icon: FaCertificate },
];

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Wrap = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(ellipse 80% 50% at 10% -10%, ${({ theme }) => theme.gradients.wrapper.pinkLight}, transparent),
    radial-gradient(ellipse 60% 40% at 100% 0%, ${({ theme }) => theme.gradients.wrapper.blueLight}, transparent),
    ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
`;

const Gate = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
`;

const GateCard = styled.div`
  width: min(420px, 100%);
  padding: 36px 32px;
  border-radius: 16px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => `${theme.text_primary}14`};
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.28);
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const GateEyebrow = styled.div`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
`;

const GateTitle = styled.h1`
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const GateText = styled.p`
  margin: 0 0 8px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.55;
  font-size: 15px;
`;

const PrimaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 16px;
  border: none;
  border-radius: 12px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;

  &:hover {
    filter: brightness(1.08);
    box-shadow: 0 8px 24px ${({ theme }) => `${theme.primary}55`};
  }

  &:active {
    transform: translateY(1px);
  }
`;

const GhostBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => `${theme.text_primary}22`};
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;

  &:hover {
    background: ${({ theme }) => `${theme.text_primary}08`};
    border-color: ${({ theme }) => `${theme.text_primary}35`};
  }
`;

const Spinner = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => `${theme.primary}33`};
  border-top-color: ${({ theme }) => theme.primary};
  animation: ${spin} 0.7s linear infinite;
`;

const LoadingBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
`;

const Shell = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 22px 14px;
  background: ${({ theme }) => `${theme.card}ee`};
  backdrop-filter: blur(12px);
  border-right: 1px solid ${({ theme }) => `${theme.text_primary}12`};
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 960px) {
    position: static;
    height: auto;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => `${theme.text_primary}12`};
    padding: 14px 12px;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 10px 18px;
`;

const BrandMark = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, #0ea5e9);
  display: grid;
  place-items: center;
  color: white;
  font-weight: 800;
  font-size: 14px;
  flex-shrink: 0;
`;

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const BrandName = styled.div`
  font-weight: 700;
  font-size: 15px;
  letter-spacing: -0.01em;
`;

const BrandSub = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
`;

const NavLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text_secondary};
  padding: 8px 12px 6px;
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;

  @media (max-width: 960px) {
    flex-direction: row;
    overflow-x: auto;
    flex: none;
    gap: 6px;
    padding-bottom: 2px;
  }
`;

const NavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: left;
  padding: 11px 12px;
  border-radius: 11px;
  border: 1px solid transparent;
  background: ${({ active, theme }) => (active ? `${theme.primary}22` : 'transparent')};
  color: ${({ active, theme }) => (active ? theme.primary : theme.text_secondary)};
  font-weight: ${({ active }) => (active ? 600 : 500)};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;

  svg {
    flex-shrink: 0;
    opacity: ${({ active }) => (active ? 1 : 0.75)};
  }

  &:hover {
    color: ${({ theme }) => theme.text_primary};
    background: ${({ active, theme }) => (active ? `${theme.primary}22` : `${theme.text_primary}08`)};
  }

  @media (max-width: 960px) {
    padding: 9px 12px;
  }
`;

const SidebarFooter = styled.div`
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid ${({ theme }) => `${theme.text_primary}12`};

  @media (max-width: 960px) {
    display: none;
  }
`;

const Main = styled.main`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  min-width: 0;
`;

const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 28px;
  background: ${({ theme }) => `${theme.card}cc`};
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => `${theme.text_primary}12`};
  position: sticky;
  top: 0;
  z-index: 10;

  @media (max-width: 720px) {
    padding: 14px 16px;
  }
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
`;

const UserBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`;

const UserMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 560px) {
    span {
      display: none;
    }
  }
`;

const Avatar = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => `${theme.primary}55`};
  background: ${({ theme }) => theme.card_light};
`;

const AvatarFallback = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: ${({ theme }) => `${theme.primary}28`};
  color: ${({ theme }) => theme.primary};
  font-weight: 700;
  font-size: 13px;
  border: 2px solid ${({ theme }) => `${theme.primary}55`};
`;

const UserName = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Content = styled.div`
  padding: 24px 28px 48px;
  min-width: 0;

  @media (max-width: 720px) {
    padding: 16px 14px 40px;
  }
`;

const SECTION_COPY = {
  projects: 'Manage portfolio projects, links, and publish state.',
  experience: 'Update roles, companies, and work history.',
  education: 'Edit schools, degrees, and achievements.',
  certificates: 'Keep certifications and credentials current.',
};

export default function AdminApp() {
  const { user, loading, login, logout } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin(user);
  const [active, setActive] = useState('projects');

  if (loading || adminLoading) {
    return (
      <Wrap>
        <Gate>
          <LoadingBox>
            <Spinner />
            Loading admin…
          </LoadingBox>
        </Gate>
      </Wrap>
    );
  }

  if (!user) {
    return (
      <Wrap>
        <Gate>
          <GateCard>
            <GateEyebrow>Portfolio CMS</GateEyebrow>
            <GateTitle>Admin sign in</GateTitle>
            <GateText>Sign in with your Google account to manage projects, experience, education, and certificates.</GateText>
            <PrimaryBtn onClick={login}>
              <FaGoogle size={14} />
              Sign in with Google
            </PrimaryBtn>
          </GateCard>
        </Gate>
      </Wrap>
    );
  }

  if (!isAdmin) {
    return (
      <Wrap>
        <Gate>
          <GateCard>
            <GateEyebrow>Access denied</GateEyebrow>
            <GateTitle>Not authorized</GateTitle>
            <GateText>
              {user.email || 'This account'} does not have access to the admin area. Sign out and try an allowed account.
            </GateText>
            <GhostBtn onClick={logout}>
              <FaSignOutAlt size={13} />
              Sign out
            </GhostBtn>
          </GateCard>
        </Gate>
      </Wrap>
    );
  }

  const activeNav = NAV.find((n) => n.id === active) || NAV[0];
  const initials = (user.displayName || user.email || '?')
    .split(/\s|@/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');

  return (
    <Wrap>
      <Shell>
        <Sidebar>
          <Brand>
            <BrandMark>JO</BrandMark>
            <BrandText>
              <BrandName>Content Admin</BrandName>
              <BrandSub>Portfolio CMS</BrandSub>
            </BrandText>
          </Brand>

          <NavLabel>Collections</NavLabel>
          <NavList>
            {NAV.map(({ id, label, icon: Icon }) => (
              <NavItem key={id} active={active === id} onClick={() => setActive(id)}>
                <Icon size={15} />
                {label}
              </NavItem>
            ))}
          </NavList>

          <SidebarFooter>
            <GhostBtn onClick={logout} style={{ width: '100%' }}>
              <FaSignOutAlt size={13} />
              Sign out
            </GhostBtn>
          </SidebarFooter>
        </Sidebar>

        <Main>
          <TopBar>
            <TitleBlock>
              <Title>{activeNav.label}</Title>
              <Subtitle>{SECTION_COPY[active]}</Subtitle>
            </TitleBlock>
            <UserBar>
              <UserMeta>
                {user.photoURL ? (
                  <Avatar src={user.photoURL} alt="" />
                ) : (
                  <AvatarFallback>{initials}</AvatarFallback>
                )}
                <UserName>{user.displayName || user.email}</UserName>
              </UserMeta>
              <GhostBtn onClick={logout} aria-label="Sign out">
                <FaSignOutAlt size={13} />
                Sign out
              </GhostBtn>
            </UserBar>
          </TopBar>
          <Content>
            <AdminPanel active={active} onActiveChange={setActive} hideTabs />
          </Content>
        </Main>
      </Shell>
    </Wrap>
  );
}
