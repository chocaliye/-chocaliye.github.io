import { projects } from "../../data/projects";
import { ProjectCard } from "../ui/ProjectCard";
import { SectionHeader } from "../ui/SectionHeader";

export function Projects() {
  return (
    <section id="work" className="shell section">
      <SectionHeader
        eyebrow="SELECTED WORK"
        title="Produtos reais, não projetos de tutorial."
      />
      <div className="cases">
        {projects.map((project, index) => (
          <ProjectCard key={project.label} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
