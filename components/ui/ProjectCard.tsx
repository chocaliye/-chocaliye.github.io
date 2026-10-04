import type { ProjectCase } from "../../types/project";

type ProjectCardProps = {
  project: ProjectCase;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const hasLivePreview = /^https?:\/\//.test(project.href);

  return (
    <article className="case">
      <div className="caseIndex">0{index + 1}</div>

      <div className="caseContent">
        <div className="caseCopy">
          <p className="eyebrow">{project.label}</p>
          <h3>{project.title}</h3>
          <p>{project.text}</p>
          <div className="stack">{project.stack}</div>
          <a
            href={project.href}
            target={hasLivePreview ? "_blank" : undefined}
            rel={hasLivePreview ? "noreferrer" : undefined}
          >
            {project.cta} ↗
          </a>
        </div>

        {hasLivePreview && (
          <div className="sitePreview" aria-label={`Live preview of ${project.label}`}>
            <div className="previewChrome" aria-hidden="true">
              <span />
              <span />
              <span />
              <small>{project.href.replace(/^https?:\/\//, "")}</small>
            </div>

            <iframe
              src={project.href}
              title={`${project.label} website preview`}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              referrerPolicy="strict-origin-when-cross-origin"
            />

            <a
              className="previewFallback"
              href={project.href}
              target="_blank"
              rel="noreferrer"
            >
              Open live site ↗
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
