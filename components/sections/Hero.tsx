import { Navbar } from "../layout/Navbar";

const heroImage = "/david-hero-chair.webp";

export function Hero() {
  return (
    <section className="hero shell">
      <Navbar />

      <div className="heroGrid">
        <div className="heroCopy">
          <p className="eyebrow">FULL STACK DEVELOPER · TECH LEAD</p>
          <h1>I build products that have to work outside the demo.</h1>
          <p className="lead">
            Sou David Chocaliye. Desenvolvo SaaS, sistemas multi-tenant,
            integrações e agentes de IA — com experiência real em produto,
            infraestrutura e operação.
          </p>
          <div className="actions">
            <a className="primary" href="#work">Ver projetos</a>
            <a className="secondary" href="https://github.com/moxi-edtech">GitHub</a>
          </div>
        </div>

        <div className="heroPortrait">
          <img
            src={heroImage}
            alt="David Chocaliye working with a laptop"
            width="640"
            height="913"
            loading="eager"
          />
          <aside className="signal">
            <span>Currently building</span>
            <strong>KLASSE + Fexa</strong>
            <p>Software, infrastructure, AI and product.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
