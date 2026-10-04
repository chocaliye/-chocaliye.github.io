import { skills } from "../../data/skills";
import { SectionHeader } from "../ui/SectionHeader";
import { SkillTag } from "../ui/SkillTag";

export function Expertise() {
  return (
    <section id="expertise" className="shell section">
      <SectionHeader eyebrow="EXPERTISE" title="Da interface à operação." />
      <div className="skillGrid">
        {skills.map((skill) => (
          <SkillTag key={skill}>{skill}</SkillTag>
        ))}
      </div>
    </section>
  );
}
