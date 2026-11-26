import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import ProjectDetails, { projectHref } from '../ProjectDetails';
import { Bio, projects, experiences, skills, education, certificates } from '../../data/constants';
import useContent from '../../hooks/useContent';
import { FiMoon, FiSun } from 'react-icons/fi';
import PathPreview from './PathPreview';
import SignalObject from './SignalObject';
import Contact from '../Contact';
import './portfolio.css';

const Page = styled.div`
  --paper: ${({ theme }) => theme.bg};
  --ink: ${({ theme }) => theme.text_primary};
  --muted: ${({ theme }) => theme.text_secondary};
  --accent: ${({ theme }) => theme.primary};
  --rule: ${({ theme }) => theme.portfolioRule};
  --panel: ${({ theme }) => theme.card_light};
  background: var(--paper);
  color: var(--ink);
`;

const filters = {
  'web app': 'Web',
  'android app': 'Android',
  'ios app': 'iOS',
  api: 'APIs',
  visualization: 'Visualization',
  simulation: 'Simulation',
};

const categoriesOf = (project) => [project.category].flat().filter(Boolean);
const categoryLabel = (category) => filters[category] || category;

function usePortfolioContent(name, preview) {
  const configured = Boolean(process.env.REACT_APP_PROJECT_ID);
  const { data, loading, error } = useContent(configured ? name : null);
  if (!configured) return { data: preview };
  return { data, loading, error };
}

function CollectionStatus({ loading, error, count, label }) {
  if (loading) return <p role="status">Loading {label}…</p>;
  if (error) return <p role="status">Could not load {label}. Please try again later.</p>;
  if (!count) return <p>No {label} listed.</p>;
  return null;
}

function ProjectImage({ project, className, active }) {
  const [failedSource, setFailedSource] = useState(null);
  const source = project.imageUrl || project.image;
  return (
    <div className={className} data-active={active} aria-hidden="true">
      {source && source !== failedSource ? (
        <img src={source} alt="" loading="lazy" onError={() => setFailedSource(source)} />
      ) : <span>{project.title}</span>}
    </div>
  );
}

function Work({ collection, filter, setFilter }) {
  const all = collection.data;
  const categories = [...new Set(all.flatMap(categoriesOf))];
  const currentFilter = categories.includes(filter) ? filter : null;
  const visible = currentFilter ? all.filter((project) => categoriesOf(project).includes(currentFilter)) : all;
  const [featured, ...archive] = visible;

  return (
    <section className="folio-section folio-wrap" id="projects" aria-labelledby="work-heading">
      <div className="folio-section-head">
        <h2 id="work-heading">Selected work</h2>
        <p>Mobile apps, web projects and the APIs that power them.</p>
      </div>
      <CollectionStatus {...collection} count={all.length} label="projects" />
      {featured && (
        <>
          <div className="folio-filters" role="group" aria-label="Filter projects">
            {[null, ...categories].map((category) => (
              <button key={category ?? 'all'} type="button" aria-pressed={currentFilter === category} onClick={() => setFilter(category)}>
                {category ? categoryLabel(category) : 'All work'}
              </button>
            ))}
          </div>
          <p className="folio-sr-only" role="status">{visible.length} projects</p>
          <article className="folio-feature" data-reveal>
            <ProjectImage project={featured} className="folio-feature-image" />
            <div className="folio-feature-copy">
              <p className="folio-meta">{categoriesOf(featured).map(categoryLabel).join(' / ')}</p>
              <h3>{featured.title}</h3>
              {featured.description && <p className="folio-feature-description">{featured.description}</p>}
              <Link className="folio-button" to={projectHref(featured)}>View project</Link>
            </div>
          </article>
          {archive.length > 0 && (
            <ul className="folio-project-list">
              {archive.map((project) => (
                <li key={project.id ?? project.title}>
                  <Link to={projectHref(project)}>
                    <ProjectImage project={project} className="folio-project-thumb" />
                    <span className="folio-project-name">{project.title}</span>
                    <span className="folio-meta">{categoriesOf(project).map(categoryLabel).join(' / ')}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}

function Lab({ projects }) {
  const [selection, setSelection] = useState(null);
  const [animatePreview, setAnimatePreview] = useState(false);
  const experiments = projects.filter((project) =>
    categoriesOf(project).some((category) => category === 'simulation' || category === 'visualization')
  );
  const active = experiments.find((project) => (project.id ?? project.title) === selection) ?? experiments[0];

  return (
    <section className="folio-lab folio-section" id="lab" aria-labelledby="lab-heading">
      <div className="folio-wrap">
        <div className="folio-section-head">
          <h2 id="lab-heading">The lab</h2>
          <p>Explore how algorithms find a route and how gravity shapes an orbit.</p>
        </div>
        {active && <div className="folio-lab-grid" data-reveal>
          <div>
            <div className="folio-lab-picker" role="group" aria-label="Choose an experiment">
              {experiments.map((project) => (
                <button
                  key={project.id ?? project.title}
                  type="button"
                  aria-pressed={project === active}
                  onClick={(event) => {
                    setAnimatePreview(event.detail > 0);
                    setSelection(project.id ?? project.title);
                  }}
                >
                  {project.title}
                </button>
              ))}
            </div>
            <div className="folio-actions">
              {active.webapp && <a className="folio-button" href={active.webapp}>Open experiment</a>}
              <Link to={projectHref(active)}>Project details</Link>
            </div>
          </div>
          <div className="folio-lab-stage" data-animate={animatePreview ? 'true' : undefined}>
            {experiments.map((project) => (
              <ProjectImage
                key={project.id ?? project.title}
                project={project}
                className="folio-lab-image"
                active={project === active}
              />
            ))}
          </div>
        </div>}
        <div className="folio-lab-demo" data-reveal><PathPreview /></div>
      </div>
    </section>
  );
}

function Career() {
  const experience = usePortfolioContent('experience', experiences);
  return (
    <section className="folio-section folio-wrap" id="experience" aria-labelledby="career-heading">
      <div className="folio-section-head">
        <h2 id="career-heading">Experience</h2>
      </div>
      <div className="folio-career" data-reveal>
        <div>
          <CollectionStatus {...experience} count={experience.data.length} label="roles" />
          {experience.data.map((entry) => (
            <details className="folio-disclosure" key={entry.id ?? entry.role}>
              <summary>
                <span className="folio-role">
                  <strong>{entry.role}</strong>
                  <span>{entry.company}</span>
                </span>
                <span className="folio-meta">{entry.date}</span>
              </summary>
              <div className="folio-disclosure-body">
                {entry.location && <p className="folio-meta">{entry.location}</p>}
                {entry.desc && <p className="folio-prose">{entry.desc}</p>}
                {entry.skills?.length > 0 && <p>{entry.skills.join(' · ')}</p>}
                <div className="folio-actions">
                  {entry.companyUrl && <a href={entry.companyUrl}>Company website</a>}
                  {entry.pdf && <a href={entry.pdf}>View document</a>}
                  {entry.additionalResources?.filter((resource) => resource.url).map((resource) => (
                    <a key={resource.url} href={resource.url}>{resource.title}</a>
                  ))}
                </div>
                {entry.additionalImage && <img className="folio-role-image" src={entry.additionalImage} alt="" loading="lazy" />}
              </div>
            </details>
          ))}
        </div>
        <aside id="skills" className="folio-toolkit" aria-labelledby="toolkit-heading">
          <h3 id="toolkit-heading">Toolkit</h3>
          <dl>
            {skills.map((group) => (
              <div key={group.id ?? group.title}>
                <dt>{group.title}</dt>
                <dd>{group.skills?.map((skill) => skill.name).join(', ')}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}

function Credentials() {
  const schools = usePortfolioContent('education', education);
  const credentials = usePortfolioContent('certificates', certificates);
  return (
    <section className="folio-section folio-wrap folio-credentials" data-reveal aria-label="Education and certificates">
      <div id="education">
        <h2>Education</h2>
        <CollectionStatus {...schools} count={schools.data.length} label="education records" />
        {schools.data.map((school) => (
          <details className="folio-disclosure" key={school.id ?? school.school}>
            <summary>
              <span className="folio-role"><strong>{school.school}</strong><span>{school.degree}</span></span>
            </summary>
            <div className="folio-disclosure-body">
              <p className="folio-meta">{school.date}</p>
              {school.grade && <p>{school.grade}</p>}
              {school.desc && <p>{school.desc}</p>}
              {school.website && <a href={school.website}>School website</a>}
            </div>
          </details>
        ))}
      </div>
      <div id="certificates">
        <h2>Certificates</h2>
        <CollectionStatus {...credentials} count={credentials.data.length} label="certificates" />
        {credentials.data.map((certificate) => (
          <details className="folio-disclosure" key={certificate.id ?? certificate.title}>
            <summary>
              <span className="folio-role"><strong>{certificate.title}</strong><span>{certificate.issuer}</span></span>
            </summary>
            <div className="folio-disclosure-body">
              <p className="folio-meta">{certificate.date}</p>
              {certificate.score && <p>{certificate.score}</p>}
              {certificate.skills?.length > 0 && <p>{certificate.skills.join(' · ')}</p>}
              {certificate.url && <a href={certificate.url}>View credential</a>}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function Portfolio({ darkMode, toggleDarkMode, onEasterEgg }) {
  const [filter, setFilter] = useState(null);
  const { hash, pathname } = useLocation();
  const collection = usePortfolioContent('projects', projects);

  useEffect(() => {
    if (pathname === '/' && hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
    }
  }, [hash, pathname]);
  useEffect(() => {
    if (typeof IntersectionObserver !== 'function' || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.dataset.visible = 'true';
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    document.querySelectorAll('.folio [data-reveal]').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [collection.loading, pathname]);

  return (
    <Page className="folio">
      <a className="folio-skip" href="#main">Skip to content</a>
      <header className="folio-wrap folio-header">
        <Link className="folio-brand" to="/#about"><span aria-hidden="true">JO</span>{Bio.name}</Link>
        <nav aria-label="Main navigation">
          <Link to="/#projects">Work</Link>
          <Link to="/#lab">Lab</Link>
          <Link to="/#experience">Experience</Link>
          <Link to="/#contact">Contact</Link>
        </nav>
        <button type="button" className="folio-theme" aria-label="Dark mode" aria-pressed={darkMode} onClick={toggleDarkMode}>
          {darkMode ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
        </button>
      </header>
      <Routes>
        <Route path="/projects/:projectId/:projectSlug" element={<ProjectDetails collection={collection} />} />
        <Route path="*" element={(
            <main id="main" tabIndex={-1}>
              <section className="folio-wrap folio-hero" id="about" aria-labelledby="home-heading">
                <div className="folio-hero-copy">
                  <p className="folio-kicker">Software developer · Android / iOS / Backend</p>
                  <h1 id="home-heading">Jakub<br /><span>Olszewski</span></h1>
                  <p className="folio-intro">I build mobile apps, the APIs behind them, and experiments you can try here.</p>
                  <div className="folio-actions">
                    <Link className="folio-button" to="/#projects">Explore my work</Link>
                    <a href={Bio.resume}>View résumé</a>
                  </div>
                </div>
                <SignalObject />
              </section>
              <Work collection={collection} filter={filter} setFilter={setFilter} />
              <Lab projects={collection.data} />
              <Career />
              <Credentials />
              <Contact />
            </main>
        )} />
      </Routes>
      <footer className="folio-wrap folio-footer">
        <button className="folio-text-button" type="button" onClick={onEasterEgg}>{Bio.name}</button>
        <nav aria-label="Footer navigation">
          <a href={Bio.github}>GitHub</a>
          <a href={Bio.linkedin}>LinkedIn</a>
          <Link to="/#about">Back to top</Link>
        </nav>
      </footer>
    </Page>
  );
}
