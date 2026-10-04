"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ScrollIndicator } from "./components/ScrollIndicator";
import { WeightShiftText } from "./components/WeightShiftText";

type Locale = "pt" | "en";

const copy = {
  pt: {
    nav: { work: "Projetos", expertise: "Meu arsenal", about: "Sobre", contact: "Contato" },
    hero: {
      eyebrow: "Desenvolvedor Full Stack · Product Engineer",
      title: "Construo software para",
      titleAccent: " operação real.",
      body: "SaaS, sistemas multi-tenant, infraestrutura e produtos com IA — pensados para funcionar no dia a dia, não apenas numa demonstração.",
      cta: "Ver projetos",
      location: "Produto · Engenharia · Software",
    },
    manifesto: {
      first: "IA acelera a construção.",
      second: " Produção ainda exige engenharia.",
    },
    work: {
      eyebrow: "PROJETOS",
      title: "Produtos em operação.",
      open: "Ver projeto",
      view: "Ver site",
      problem: "Problema",
      build: "Construção",
      architecture: "Arquitetura",
      technicalDetails: "Detalhes técnicos",
      stack: "Stack",
    },
    expertise: {
      eyebrow: "MEU ARSENAL",
      title: "As ferramentas que levo da ideia à produção.",
      lead: "Tecnologias que uso no trabalho real — produto, dados, automação e infraestrutura.",
    },
    about: {
      eyebrow: "Sobre",
      title: "Gosto de construir perto do problema.",
      big: "Não separo produto, infraestrutura e operação quando estou construindo software.",
      p1: "Minha experiência em desenvolvimento e infraestrutura corporativa me levou a olhar cedo para autenticação, dados, deploy, observabilidade e manutenção — não como acabamento, mas como parte do produto.",
      p2: "Também participo das decisões de interface e de como o produto chega ao mercado. Para mim, construir termina quando a solução consegue ser entendida, usada e mantida.",
    },
    contact: {
      eyebrow: "Contato",
      first: "Tem algo",
      second: " que vale a pena construir?",
      email: "E-mail",
    },
    footer: "Full Stack · Product Engineering · IA",
  },
  en: {
    nav: { work: "Work", expertise: "My toolkit", about: "About", contact: "Contact" },
    hero: {
      eyebrow: "Full Stack Developer · Product Engineer",
      title: "I build software for",
      titleAccent: " real operations.",
      body: "SaaS, multi-tenant systems, infrastructure and AI products — designed to work in day-to-day operations, not just in a demo.",
      cta: "Explore selected work",
      location: "Product · Engineering · Software",
    },
    manifesto: {
      first: "AI accelerates the build.",
      second: " Production still needs engineering.",
    },
    work: {
      eyebrow: "SELECTED WORK",
      title: "Products in operation.",
      open: "View project",
      view: "View site",
      problem: "Problem",
      build: "Build",
      architecture: "Architecture",
      technicalDetails: "Technical details",
      stack: "Stack",
    },
    expertise: {
      eyebrow: "MY TOOLKIT",
      title: "The tools I take from idea to production.",
      lead: "Technologies I use in real work — product, data, automation and infrastructure.",
    },
    about: {
      eyebrow: "About",
      title: "I like building close to the problem.",
      big: "I do not separate product, infrastructure and operations when building software.",
      p1: "My background in development and corporate infrastructure pushed me to think early about authentication, data, deployment, observability and maintenance — not as finishing work, but as part of the product.",
      p2: "I also take part in interface decisions and how a product reaches the market. For me, the build is complete when the solution can be understood, used and maintained.",
    },
    contact: {
      eyebrow: "Get in touch",
      first: "Have something",
      second: " worth building?",
      email: "Email",
    },
    footer: "Full Stack · Product Engineering · AI",
  },
} as const;

const projects = {
  pt: [
    {
      label: "01 / KLASSE",
      title: "Gestão escolar construída para a realidade das escolas angolanas.",
      text: "Plataforma escolar multi-tenant para matrícula, finanças, operação acadêmica, consultas com IA e isolamento seguro entre instituições.",
      problem: "Processos acadêmicos e financeiros dispersos entre papel, WhatsApp e rotinas manuais, com pouca visibilidade operacional.",
      build: "Matrícula, propinas, notas, portais por perfil e consultas operacionais com IA dentro de uma única plataforma.",
      architecture: "Multi-tenant · Supabase Auth · PostgreSQL · RLS por escola · Next.js · Vercel",
      stack: "Next.js · TypeScript · PostgreSQL · Supabase · RLS · Vercel",
      href: "https://klasse.ao",
      accent: "SaaS para educação",
    },
    {
      label: "02 / FEXA",
      title: "Operação comercial com IA dentro do WhatsApp.",
      text: "Plataforma para qualificação, atendimento, catálogo, pedidos, CRM, handoff humano e follow-up, com arquitetura multiempresa.",
      problem: "Atendimento comercial no WhatsApp exige triagem constante, contexto do cliente e continuidade quando a conversa passa para uma pessoa.",
      build: "Qualificação automática, catálogo, registro de pedidos, CRM, handoff humano, follow-ups e relatórios no mesmo fluxo comercial.",
      architecture: "WhatsApp Cloud API · IA · PostgreSQL · Supabase · isolamento multiempresa",
      stack: "Node.js · PostgreSQL · Supabase · APIs de IA · WhatsApp Cloud API",
      href: "https://fexabusiness.com",
      accent: "IA para vendas",
    },
  ],
  en: [
    {
      label: "01 / KLASSE",
      title: "School management built for the reality of Angolan schools.",
      text: "A multi-tenant school platform for enrollment, finance, academic operations, AI-assisted queries and secure tenant isolation.",
      problem: "Academic and financial workflows spread across paper, WhatsApp and manual routines, with limited operational visibility.",
      build: "Enrollment, tuition, grades, role-based portals and AI-assisted operational queries inside one platform.",
      architecture: "Multi-tenant · Supabase Auth · PostgreSQL · school-level RLS · Next.js · Vercel",
      stack: "Next.js · TypeScript · PostgreSQL · Supabase · RLS · Vercel",
      href: "https://klasse.ao",
      accent: "Education SaaS",
    },
    {
      label: "02 / FEXA",
      title: "AI-assisted commercial operations inside WhatsApp.",
      text: "A platform for qualification, customer service, catalog, orders, CRM, human handoff and follow-up, built around multi-company isolation.",
      problem: "WhatsApp sales operations require constant triage, customer context and continuity when a conversation moves to a human.",
      build: "Automated qualification, catalog, order capture, CRM, human handoff, follow-ups and reporting in the same commercial flow.",
      architecture: "WhatsApp Cloud API · AI · PostgreSQL · Supabase · multi-company isolation",
      stack: "Node.js · PostgreSQL · Supabase · AI APIs · WhatsApp Cloud API",
      href: "https://fexabusiness.com",
      accent: "AI Commerce",
    },
  ],
} as const;

const skills = {
  pt: [
    {
      title: "Produto",
      note: "Construção de produto e interface",
      tools: ["Next.js", "React", "TypeScript", "UX", "Arquitetura de produto"],
    },
    {
      title: "Dados & Segurança",
      note: "Estrutura, acesso e isolamento",
      tools: ["PostgreSQL", "Supabase", "RLS", "RBAC", "Multi-tenancy"],
    },
    {
      title: "IA & Automação",
      note: "Fluxos que reduzem trabalho manual",
      tools: ["APIs de IA", "Agentes", "Automação de fluxos", "WhatsApp"],
    },
    {
      title: "Infraestrutura",
      note: "Entrega, operação e ambiente corporativo",
      tools: ["Vercel", "Cloudflare", "Microsoft 365", "Redes"],
    },
  ],
  en: [
    {
      title: "Product",
      note: "Product and interface engineering",
      tools: ["Next.js", "React", "TypeScript", "UX", "Product architecture"],
    },
    {
      title: "Data & Security",
      note: "Structure, access and isolation",
      tools: ["PostgreSQL", "Supabase", "RLS", "RBAC", "Multi-tenancy"],
    },
    {
      title: "AI & Automation",
      note: "Flows that reduce manual work",
      tools: ["AI APIs", "Agents", "Workflow automation", "WhatsApp"],
    },
    {
      title: "Infrastructure",
      note: "Delivery, operations and enterprise environments",
      tools: ["Vercel", "Cloudflare", "Microsoft 365", "Networking"],
    },
  ],
} as const;

export default function Home() {
  const [locale, setLocale] = useState<Locale>("pt");
  const t = copy[locale];
  const scrollSections = [
    { id: "work", label: t.nav.work },
    { id: "expertise", label: t.nav.expertise },
    { id: "about", label: t.nav.about },
    { id: "contact", label: t.nav.contact },
  ] as const;

  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const titleYTarget = useTransform(scrollY, [0, 900], [0, -16], { clamp: true });
  const photoYTarget = useTransform(scrollY, [0, 900], [0, 30], { clamp: true });
  const titleY = useSpring(titleYTarget, { stiffness: 150, damping: 28, mass: 0.38 });
  const photoY = useSpring(photoYTarget, { stiffness: 135, damping: 30, mass: 0.42 });

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  }, [locale]);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      }),
      { threshold: 0.16, rootMargin: "-6% 0px -10% 0px" }
    );

    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const titles = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-title]"));

    const update = () => {
      frame = 0;

      titles.forEach(title => {
        const rect = title.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const distance = (center - viewportCenter) / window.innerHeight;
        const shift = Math.max(-16, Math.min(16, distance * -18));
        title.style.setProperty("--title-shift", `${shift}px`);
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main>
      <header className="topbar shell">
        <a className="brand" href="#">DC.</a>

        <div className="topbarRight">
          <nav className="navlinks">
            <a href="#work"><WeightShiftText>{t.nav.work}</WeightShiftText></a>
            <a href="#expertise"><WeightShiftText>{t.nav.expertise}</WeightShiftText></a>
            <a href="#about"><WeightShiftText>{t.nav.about}</WeightShiftText></a>
            <a href="#contact"><WeightShiftText>{t.nav.contact}</WeightShiftText></a>
          </nav>

          <div className="languageSwitch" aria-label="Selecionar idioma">
            <button
              type="button"
              className={locale === "pt" ? "is-active" : ""}
              onClick={() => setLocale("pt")}
              aria-pressed={locale === "pt"}
            >
              PT
            </button>
            <span>/</span>
            <button
              type="button"
              className={locale === "en" ? "is-active" : ""}
              onClick={() => setLocale("en")}
              aria-pressed={locale === "en"}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      <ScrollIndicator sections={scrollSections} />

      <section className="hero shell">
        <div className="heroStatement">
          <p className="eyebrow hero-enter hero-enter-1">{t.hero.eyebrow}</p>
          <motion.div className="heroTitleMotion" style={{ y: reduceMotion ? 0 : titleY }}>
            <h1 className="hero-enter hero-enter-2">
              {t.hero.title}
              <span>{t.hero.titleAccent}</span>
            </h1>
          </motion.div>
          <div className="heroBottom hero-enter hero-enter-3">
            <p>{t.hero.body}</p>
            <a href="#work"><WeightShiftText>{t.hero.cta}</WeightShiftText></a>
          </div>
        </div>

        <div className="heroVisual hero-enter hero-enter-photo">
          <motion.div className="heroPhotoMotion" style={{ y: reduceMotion ? 0 : photoY }}>
            <img src="/david-hero-chair.webp" alt="David Chocaliye com um laptop" />
          </motion.div>
          <div className="heroCaption">
            <span>David Chocaliye</span>
            <span>{t.hero.location}</span>
          </div>
        </div>
      </section>

      <section className="manifesto shell reveal reveal-up" data-reveal>
        <p className="manifestoIndex">00</p>
        <p className="manifestoText">
          {t.manifesto.first}
          <span>{t.manifesto.second}</span>
        </p>
      </section>

      <section id="work" className="work">
        <div className="shell workIntro reveal reveal-up" data-reveal>
          <p className="eyebrow">{t.work.eyebrow}</p>
          <h2 data-scroll-title>{t.work.title}</h2>
        </div>

        {projects[locale].map((project, index) => (
          <article className={`projectStory ${index % 2 ? "projectReverse" : ""}`} key={project.label}>
            <div className="shell projectGrid">
              <div className="projectMeta reveal reveal-left" data-reveal>
                <p className="projectNumber">{project.label}</p>
                <p className="projectAccent">{project.accent}</p>
                <h3>{project.title}</h3>
                <p className="projectDescription">{project.text}</p>

                <div className="projectFacts">
                  <div className="projectFact">
                    <span>{t.work.problem}</span>
                    <p>{project.problem}</p>
                  </div>
                  <div className="projectFact">
                    <span>{t.work.build}</span>
                    <p>{project.build}</p>
                  </div>
                  <div className="projectFact projectArchitecture">
                    <span>{t.work.architecture}</span>
                    <p>{project.architecture}</p>
                  </div>
                </div>

                <p className="projectStack">{project.stack}</p>

                <details className="projectTechDetails">
                  <summary>{t.work.technicalDetails}</summary>
                  <div className="projectTechBody">
                    <div>
                      <span>{t.work.architecture}</span>
                      <p>{project.architecture}</p>
                    </div>
                    <div>
                      <span>{t.work.stack}</span>
                      <p>{project.stack}</p>
                    </div>
                  </div>
                </details>
                <a className="projectLink" href={project.href} target="_blank" rel="noreferrer">
                  <WeightShiftText>{t.work.open}</WeightShiftText>
                </a>
              </div>

              <div className="projectCanvas reveal reveal-right" data-reveal>
                <div className="browserBar">
                  <div><i /><i /><i /></div>
                  <span>{project.href.replace(/^https?:\/\//, "")}</span>
                </div>
                <iframe
                  src={project.href}
                  title={`${project.accent} live preview`}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
                <a className="canvasFallback" href={project.href} target="_blank" rel="noreferrer">
                  {t.work.view}
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="statementBand" aria-label="Engineering principles">
        <div className="statementViewport">
          <div className="statementTrack">
            {[0, 1].map(group => (
              <div className="statementGroup" aria-hidden={group === 1} key={group}>
                <span>AUTH</span>
                <i />
                <span>RLS</span>
                <i />
                <span>TENANT ISOLATION</span>
                <i />
                <span>OBSERVABILITY</span>
                <i />
                <span>PRODUCTION</span>
                <i />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="expertise" className="arsenalSection">
        <div className="shell">
          <div className="arsenalLead reveal reveal-up" data-reveal>
            <p className="eyebrow">{t.expertise.eyebrow}</p>
            <div className="arsenalLeadGrid">
              <h2 data-scroll-title>{t.expertise.title}</h2>
              <p>{t.expertise.lead}</p>
            </div>
          </div>

          <div className="arsenalList">
            {skills[locale].map((group, index) => (
              <article className="arsenalRow reveal reveal-up" data-reveal key={group.title}>
                <p className="arsenalIndex">0{index + 1}</p>
                <div className="arsenalMeta">
                  <h3>{group.title}</h3>
                  <p>{group.note}</p>
                </div>
                <div className="arsenalTools" aria-label={group.title}>
                  {group.tools.map(tool => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="aboutEditorial">
        <div className="shell aboutGrid">
          <div className="aboutSticky reveal reveal-left" data-reveal>
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2 data-scroll-title>{t.about.title}</h2>
          </div>

          <div className="aboutFlow reveal reveal-right" data-reveal>
            <p className="aboutBig">{t.about.big}</p>
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>
        </div>
      </section>

      <section id="contact" className="contactStage">
        <div className="shell contactInner reveal reveal-up" data-reveal>
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2 data-scroll-title>
            {t.contact.first}
            <span>{t.contact.second}</span>
          </h2>
          <div className="contactLinks">
            <a href="mailto:katanhaboutjob@gmail.com">{t.contact.email}</a>
            <a href="https://wa.me/5519981682877" target="_blank" rel="noreferrer">WhatsApp</a>
            <a href="https://linkedin.com/in/david-chocaliye-214429210" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/moxi-edtech" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.instagram.com/katanhadavid" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.threads.com/@katanhadavid" target="_blank" rel="noreferrer">Threads</a>
          </div>
        </div>
      </section>

      <footer className="siteFooter">
        <div className="shell footerSignature">
          <div className="footerSignatureMain">
            <a className="footerBrand" href="#">David Chocaliye</a>
            <p>
              {locale === "pt"
                ? "Construído por David Chocaliye · Next.js · 2026"
                : "Built by David Chocaliye · Next.js · 2026"}
            </p>
          </div>

          <div className="footerSocials">
            <a href="mailto:katanhaboutjob@gmail.com">{t.contact.email}</a>
            <a href="https://wa.me/5519981682877" target="_blank" rel="noreferrer">WhatsApp</a>
            <a href="https://linkedin.com/in/david-chocaliye-214429210" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/moxi-edtech" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.instagram.com/katanhadavid" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.threads.com/@katanhadavid" target="_blank" rel="noreferrer">Threads</a>
          </div>
        </div>

        <div className="shell footerBottom">
          <span>© 2026</span>
          <a href="#">{locale === "pt" ? "Voltar ao topo" : "Back to top"}</a>
        </div>
      </footer>
    </main>
  );
}
