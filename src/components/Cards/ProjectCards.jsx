import React from "react";
import styled from "styled-components";

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);
  flex-shrink: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: ${({ theme }) => theme.white};
  transition: transform 0.4s ease-in-out;
`;

const HoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
`;

const OverlayText = styled.span`
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const Card = styled.div`
  width: 330px;
  min-height: 420px;
  background-color: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  padding: 20px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.35s ease-in-out;
  border: 1px solid ${({ theme }) => `${theme.primary}18`};

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
    border-color: ${({ theme }) => `${theme.primary}50`};
  }

  &:hover ${Image} {
    transform: scale(1.05);
  }

  &:hover ${HoverOverlay} {
    opacity: 1;
  }
`;

const Tags = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 2px;
`;

const Tag = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => `${theme.primary}18`};
  padding: 3px 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => `${theme.primary}30`};
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 2px;
  flex: 1;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const Date = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 2px;
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  overflow: hidden;
  margin-top: 6px;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  line-height: 1.5;
`;

const Status = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => `${theme.primary}18`};
  padding: 3px 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => `${theme.primary}30`};
  width: fit-content;
`;

const Members = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const Avatar = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  margin-left: -10px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 3px solid ${({ theme }) => theme.card};
`;

const ProjectCards = ({ project, setOpenModal }) => {
  const imageSrc = project?.imageUrl || project?.image || project?.img || "";
  return (
    <Card onClick={() => setOpenModal({ state: true, project: project })}>
      <ImageWrapper>
        <Image src={imageSrc} alt={project?.title || "project image"} loading="lazy" />
        <HoverOverlay>
          <OverlayText>View Details →</OverlayText>
        </HoverOverlay>
      </ImageWrapper>
      <Tags>
        {project.tags?.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </Tags>
      <Details>
        <Title>{project.title}</Title>
        <Date>{project.date}</Date>
        {project.status && <Status>{project.status}</Status>}
        <Description>{project.description}</Description>
      </Details>
      {project.member?.length > 0 && (
        <Members>
          {project.member.map((member, idx) => (
            <Avatar key={idx} src={member.img} alt="" />
          ))}
        </Members>
      )}
    </Card>
  );
};

export default ProjectCards;
