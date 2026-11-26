import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useGithubContributors from '../../hooks/useGithubContributors';

function projectKey(project) {
  return String(project.id ?? project.title).normalize('NFC');
}

export function projectHref(project) {
  const slug = project.title.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `/projects/${encodeURIComponent(projectKey(project))}/${slug || 'overview'}`;
}

function liveLabel(categories) {
  if (categories.includes('android app')) return 'Google Play';
  if (categories.includes('ios app')) return 'App Store';
  if (categories.includes('api')) return 'API documentation';
  return 'Open project';
}

function ProjectArticle({ project }) {
  const { contributors } = useGithubContributors(project.github, { limit: 12 });
  const [imageFailed, setImageFailed] = useState(false);
  const categories = [project.category].flat().filter(Boolean);
  const image = project.imageUrl || project.image;
  const facts = [
    ['Date', project.date],
    ['Type', categories.join(' / ')],
    ['Status', project.status],
    ['Built with', project.tags?.join(', ')],
  ].filter(([, value]) => value);

  return (
    <article className="folio-case">
      <header className="folio-case-intro">
        {categories.length > 0 && <p className="folio-kicker">{categories.join(' / ')}</p>}
        <h1>{project.title}</h1>
        {(project.github || project.webapp) && (
          <div className="folio-actions">
            {project.webapp && <a className="folio-button" href={project.webapp === '#about' ? '/#about' : project.webapp}>{liveLabel(categories)}</a>}
            {project.github && <a href={project.github}>View source</a>}
          </div>
        )}
      </header>
      {image && !imageFailed && (
        <figure className="folio-case-art" data-reveal>
          <img src={image} alt={project.title} onError={() => setImageFailed(true)} />
        </figure>
      )}
      <div className="folio-case-body" data-reveal>
        <div>
          {project.description && <section><h2>Overview</h2><p className="folio-prose">{project.description}</p></section>}
          {project.member?.length > 0 && (
            <section>
              <h2>Team</h2>
              <ul className="folio-case-people">
                {project.member.map((member, index) => (
                  <li key={member.github || member.linkedin || `${member.name}-${index}`}>
                    {member.img && <img src={member.img} alt="" loading="lazy" />}
                    <span>{member.name}</span>
                    {member.github && <a href={member.github} aria-label={`${member.name} on GitHub`}>GitHub</a>}
                    {member.linkedin && <a href={member.linkedin} aria-label={`${member.name} on LinkedIn`}>LinkedIn</a>}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {contributors?.length > 0 && (
            <section>
              <h2>Contributors</h2>
              <ul className="folio-case-people">
                {contributors.map((person) => (
                  <li key={person.id || person.login}>
                    <a href={person.html_url}>
                      <img src={person.avatar_url} alt="" loading="lazy" /> @{person.login}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
        {facts.length > 0 && <dl>{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
      </div>
    </article>
  );
}

export default function ProjectDetails({ collection }) {
  const { projectId, projectSlug } = useParams();
  const project = collection.data.find((item) => projectKey(item) === projectId);
  const main = useRef(null);
  const title = project?.title;

  useEffect(() => {
    const originalTitle = document.title;
    window.scrollTo({ top: 0, behavior: 'instant' });
    main.current?.focus({ preventScroll: true });
    return () => { document.title = originalTitle; };
  }, [projectId, projectSlug]);

  useEffect(() => {
    document.title = `${title || 'Project'} · Jakub Olszewski`;
  }, [title, projectId, projectSlug]);

  return (
    <main className="folio-wrap folio-case-page" id="main" tabIndex={-1} ref={main}>
      <Link className="folio-case-back" to="/#projects">All projects</Link>
      {project ? <ProjectArticle key={projectId} project={project} /> : (
        <div className="folio-case-intro">
          {collection.loading ? <h1>Loading project…</h1> :
            <h1>{collection.error ? 'Could not load this project' : 'Project not found'}</h1>}
        </div>
      )}
    </main>
  );
}
