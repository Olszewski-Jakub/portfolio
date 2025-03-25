import React, { useState, useEffect } from "react";
import {
  Container,
  Wrapper,
  Title,
  Desc,
  CardContainer,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  EmptyProjectsMessage
} from "./ProjectsStyle";
import ProjectCard from "../Cards/ProjectCards";
import { projects } from "../../data/constants";
import { motion, AnimatePresence } from "framer-motion";

const Projects = ({ openModal, setOpenModal }) => {
  const [toggle, setToggle] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const projectsPerPage = 6;

  // Filter projects based on selected category
  useEffect(() => {
    if (toggle === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(item => item.category.includes(toggle)));
    }
  }, [toggle]);

  // Handle pagination
  useEffect(() => {
    if (showMore) {
      setVisibleProjects(filteredProjects);
    } else {
      setVisibleProjects(filteredProjects.slice(0, projectsPerPage));
    }
  }, [filteredProjects, showMore]);

  // Get unique categories for filter buttons
  const categories = ["all", ...new Set(projects.flatMap(project => project.category))];

  return (
      <Container id="projects">
        <Wrapper>
          <Title>Projects</Title>
          <Desc>
            I've worked on a variety of projects ranging from web applications to mobile apps and APIs.
            Here's a showcase of my recent work and ongoing projects.
          </Desc>

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
              {visibleProjects.length > 0 ? (
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