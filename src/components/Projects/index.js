import React, { useState, useEffect } from "react";
import {
  Container,
  Wrapper,
  CardContainer,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  EmptyProjectsMessage
} from "./ProjectsStyle";
import ProjectCard from "../Cards/ProjectCards";
import useContent from "../../hooks/useContent";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel, SectionTitle, SectionDesc, SectionHeadingWrapper } from "../SectionTitle";

const Projects = ({ openModal, setOpenModal }) => {
  const [toggle, setToggle] = useState("all");
  const { data: projectsData, loading } = useContent('projects');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const projectsPerPage = 6;

  // Filter projects based on selected category
  useEffect(() => {
    const src = projectsData || [];
    if (toggle === "all") {
      setFilteredProjects(src);
    } else {
      setFilteredProjects(src.filter(item => (Array.isArray(item.category) ? item.category : [item.category]).includes(toggle)));
    }
  }, [toggle, projectsData]);

  // Handle pagination
  useEffect(() => {
    if (showMore) {
      setVisibleProjects(filteredProjects);
    } else {
      setVisibleProjects(filteredProjects.slice(0, projectsPerPage));
    }
  }, [filteredProjects, showMore]);

  // Get unique categories for filter buttons
  const categories = ["all", ...new Set((projectsData || []).flatMap(project => Array.isArray(project.category) ? project.category : [project.category]).filter(Boolean))];

  return (
      <Container id="projects">
        <Wrapper>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
          <SectionHeadingWrapper>
            <SectionLabel>What I've Built</SectionLabel>
            <SectionTitle>Projects</SectionTitle>
          </SectionHeadingWrapper>
          <SectionDesc>
            I've worked on a variety of projects ranging from web applications to mobile apps and APIs.
            Here's a showcase of my recent work and ongoing projects.
          </SectionDesc>
          </motion.div>

          <ToggleButtonGroup>
            {categories.map((category) => (
                <React.Fragment key={category}>
                  {category !== categories[0] && <Divider />}
                  <ToggleButton
                      active={toggle === category}
                      onClick={() => setToggle(category)}
                  >
                    {category === "all" ? "ALL" :
                        category === "web app" ? "WEB APPS" :
                            category === "android app" ? "ANDROID APPS" :
                                category === "api" ? "APIs" :
                                    category.toUpperCase()}
                  </ToggleButton>
                </React.Fragment>
            ))}
          </ToggleButtonGroup>

          <CardContainer>
            <AnimatePresence>
              {loading ? null : visibleProjects.length > 0 ? (
                  visibleProjects.map((project, index) => (
                      <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <ProjectCard
                            project={project}
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                            index={index}
                        />
                      </motion.div>
                  ))
              ) : (
                  <EmptyProjectsMessage>
                    No projects found in this category. Check back soon!
                  </EmptyProjectsMessage>
              )}
            </AnimatePresence>
          </CardContainer>

          {filteredProjects.length > projectsPerPage && (
              <ToggleButton
                  className="show-more"
                  onClick={() => setShowMore(!showMore)}
                  style={{ marginTop: '40px' }}
              >
                {showMore ? "Show Less" : "Show More"}
              </ToggleButton>
          )}
        </Wrapper>
      </Container>
  );
};

export default Projects;
