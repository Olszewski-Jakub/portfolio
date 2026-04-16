import React from "react";
import styled from "styled-components";

/* ─── Image area ─── */

const ImageArea = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
  flex-shrink: 0;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
`;

/* gradient sits over the image and shows the title */
const ImageGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.72) 0%,
    rgba(0, 0, 0, 0.1) 55%,
    transparent 100%
  );
`;

const ImageTitle = styled.div`
  position: absolute;
  bottom: 12px;
  left: 14px;
  right: 14px;
  color: #fff;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.3;
  /* clamp to 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CategoryBadge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 3px 10px;
  border-radius: 50px;
  text-transform: uppercase;
`;

const ViewBadge = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.25s ease;
  border-radius: 12px 12px 0 0;
`;

const ViewLabel = styled.span`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 50px;
  letter-spacing: 0.3px;
`;

/* ─── Body ─── */

const Body = styled.div`
  padding: 14px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => `${theme.primary}14`};
  padding: 2px 10px;
  border-radius: 50px;
  border: 1px solid ${({ theme }) => `${theme.primary}28`};
  white-space: nowrap;
`;

const Desc = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
  flex: 1;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
  border-top: 1px solid ${({ theme }) => `${theme.text_primary}10`};
`;

const DateText = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.text_secondary};
`;

const StatusPill = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => `${theme.primary}14`};
  padding: 2px 10px;
  border-radius: 50px;
  border: 1px solid ${({ theme }) => `${theme.primary}28`};
`;

/* ─── Card wrapper ─── */

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.card};
  border-radius: 14px;
  border: 1px solid ${({ theme }) => `${theme.text_primary}10`};
  overflow: hidden;
  cursor: pointer;
  /* no min-height — card grows with content */
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
    border-color: ${({ theme }) => `${theme.primary}40`};
  }

  &:hover ${Img} {
    transform: scale(1.06);
  }

  &:hover ${ViewBadge} {
    opacity: 1;
  }
`;

/* ─── Component ─── */

const categoryLabel = (cat) => {
  if (!cat) return null;
  const c = Array.isArray(cat) ? cat[0] : cat;
  const map = { "web app": "Web", "android app": "Android", "api": "API" };
  return map[c] || c;
};

const ProjectCards = ({ project, setOpenModal }) => {
  const imageSrc = project?.imageUrl || project?.image || project?.img || "";
  const label = categoryLabel(project?.category);

  return (
    <Card onClick={() => setOpenModal({ state: true, project })}>
      <ImageArea>
        <Img src={imageSrc} alt={project?.title || "project"} loading="lazy" />
        <ImageGradient />
        {label && <CategoryBadge>{label}</CategoryBadge>}
        <ImageTitle>{project?.title}</ImageTitle>
        <ViewBadge>
          <ViewLabel>View details</ViewLabel>
        </ViewBadge>
      </ImageArea>

      <Body>
        {project?.tags?.length > 0 && (
          <TagRow>
            {project.tags.slice(0, 4).map((tag, i) => (
              <Tag key={i}>{tag}</Tag>
            ))}
          </TagRow>
        )}

        {project?.description && (
          <Desc>{project.description}</Desc>
        )}

        <Footer>
          <DateText>{project?.date}</DateText>
          {project?.status && <StatusPill>{project.status}</StatusPill>}
        </Footer>
      </Body>
    </Card>
  );
};

export default ProjectCards;
