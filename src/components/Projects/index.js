import React, { useState, useEffect } from "react";
import {
  Container,
  Wrapper,
  FilterRow,
  FilterChip,
  FilterCount,
  CardGrid,
  EmptyMessage,
  ShowMoreButton,
} from "./ProjectsStyle";
import ProjectCard from "../Cards/ProjectCards";
import useContent from "../../hooks/useContent";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel, SectionTitle, SectionDesc, SectionHeadingWrapper } from "../SectionTitle";

const LABEL_MAP = {
  all: "All",
  "web app": "Web Apps",
  "android app": "Android",
  api: "APIs",
};

const humanLabel = (cat) => LABEL_MAP[cat] || (cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : cat);

const Projects = ({ openModal, setOpenModal }) => {
  const [active, setActive] = useState("all");
  const { data: projectsData, loading } = useContent("projects");
  const [filtered, setFiltered] = useState([]);
  const [visible, setVisible] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const PER_PAGE = 6;

  // Derive categories + per-category counts
  const allProjects = projectsData || [];
  const categories = [
    "all",
    ...new Set(
      allProjects
        .flatMap((p) => (Array.isArray(p.category) ? p.category : [p.category]))
        .filter(Boolean)
    ),
  ];

  const countFor = (cat) =>
    cat === "all"
      ? allProjects.length
      : allProjects.filter((p) =>
          (Array.isArray(p.category) ? p.category : [p.category]).includes(cat)
        ).length;

  useEffect(() => {
    if (active === "all") {
      setFiltered(allProjects);
    } else {
      setFiltered(
        allProjects.filter((p) =>
          (Array.isArray(p.category) ? p.category : [p.category]).includes(active)
        )
      );
    }
    setShowMore(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, projectsData]);

  useEffect(() => {
    setVisible(showMore ? filtered : filtered.slice(0, PER_PAGE));
  }, [filtered, showMore]);

  return (
    <Container id="projects">
      <Wrapper>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}
        >
          <SectionHeadingWrapper>
            <SectionLabel>What I've Built</SectionLabel>
            <SectionTitle>Projects</SectionTitle>
          </SectionHeadingWrapper>
          <SectionDesc>
            A selection of projects I've built — from mobile apps to web platforms and APIs.
          </SectionDesc>
        </motion.div>

        {/* Filter chips */}
        <FilterRow>
          {categories.map((cat) => (
            <FilterChip
              key={cat}
              active={active === cat}
              onClick={() => setActive(cat)}
            >
              {humanLabel(cat)}
              <FilterCount active={active === cat}>{countFor(cat)}</FilterCount>
            </FilterChip>
          ))}
        </FilterRow>

        {/* Cards */}
        <CardGrid>
          <AnimatePresence mode="popLayout">
            {loading ? null : visible.length > 0 ? (
              visible.map((project, index) => (
                <motion.div
                  key={project.id ?? project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                >
                  <ProjectCard
                    project={project}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                  />
                </motion.div>
              ))
            ) : (
              <EmptyMessage>No projects in this category yet — check back soon!</EmptyMessage>
            )}
          </AnimatePresence>
        </CardGrid>

        {/* Show more */}
        {filtered.length > PER_PAGE && (
          <ShowMoreButton onClick={() => setShowMore((s) => !s)}>
            {showMore ? "Show less" : `Show ${filtered.length - PER_PAGE} more`}
          </ShowMoreButton>
        )}
      </Wrapper>
    </Container>
  );
};

export default Projects;
