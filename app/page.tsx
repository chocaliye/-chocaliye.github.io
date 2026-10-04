"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ScrollIndicator } from "./components/ScrollIndicator";
import { WeightShiftText } from "./components/WeightShiftText";

type Locale = "pt" | "en";

const copy = {
  pt: {
    nav: { work: "Projetos", trajectory: "Trajetória", expertise: "Meu arsenal", about: "Sobre", contact: "Contato" },
    hero: {
      eyebrow: "ENGENHARIA DE SOFTWARE",
      title: "David Chocaliye",
      role: "Desenvolvedor Full Stack · Product Engineer",
      body: "SaaS · IA · Sistemas multi-tenant · Infraestrutura",
      cta: "VER MAIS",
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
    trajectory: {
      eyebrow: "TRAJETÓRIA",
      title: "Experiência que sustenta o produto.",
      lead: "Minha carreira começou em infraestrutura e operação. Hoje essa base entra no desenvolvimento como vantagem: penso em identidade, redes, automação, segurança e produção junto com o código.",
      experienceTitle: "EXPERIÊNCIA PROFISSIONAL",
      educationTitle: "FORMAÇÃO",
    },
    about: {
      eyebrow: "Sobre",
      title: "Um pouco sobre mim",
      intro: "Sou desenvolvedor Full Stack e Product Engineer. Trabalho entre produto, engenharia e infraestrutura, construindo software para operação real.",
      profileTitle: "PERFIL",
      profile: "Minha experiência cruza desenvolvimento de aplicações, sistemas corporativos e infraestrutura. Por isso, autenticação, dados, segurança, deploy, observabilidade e manutenção entram no produto desde o início.",
      dailyTitle: "NO DIA A DIA",
      daily: "Transformo problemas operacionais em produto: desenho fluxos, modelo dados, integro APIs e IA, implemento interfaces e acompanho o sistema até produção.",
      practiceLabel: "Atuação",
      practice: "Full Stack · Product Engineering · IA · Infraestrutura",
      locationLabel: "Localização",
      location: "São Paulo, Brasil",
      emailLabel: "Email",
      email: "katanhaboutjob@gmail.com",
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
    nav: { work: "Work", trajectory: "Journey", expertise: "My toolkit", about: "About", contact: "Contact" },
    hero: {
      eyebrow: "SOFTWARE ENGINEERING",
      title: "David Chocaliye",
      role: "Full Stack Developer · Product Engineer",
      body: "SaaS · AI · Multi-tenant systems · Infrastructure",
      cta: "SEE MORE",
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
    trajectory: {
      eyebrow: "JOURNEY",
      title: "Experience behind the product work.",
      lead: "My career started in infrastructure and operations. Today that foundation strengthens how I build software: identity, networking, automation, security and production are considered alongside the code.",
      experienceTitle: "PROFESSIONAL EXPERIENCE",
      educationTitle: "EDUCATION",
    },
    about: {
      eyebrow: "About",
      title: "A little about me",
      intro: "I am a Full Stack Developer and Product Engineer. I work across product, engineering and infrastructure, building software for real operations.",
      profileTitle: "PROFILE",
      profile: "My background spans application development, corporate systems and infrastructure. That is why authentication, data, security, deployment, observability and maintenance are part of the product from the start.",
      dailyTitle: "DAY TO DAY",
      daily: "I turn operational problems into products: I design flows, model data, integrate APIs and AI, build interfaces and follow systems all the way to production.",
      practiceLabel: "Focus",
      practice: "Full Stack · Product Engineering · AI · Infrastructure",
      locationLabel: "Location",
      location: "São Paulo, Brazil",
      emailLabel: "Email",
      email: "katanhaboutjob@gmail.com",
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

const trajectory = {
  pt: {
    experience: [
      {
        period: "2024 — atual",
        role: "Analista de Suporte de TI N2",
        company: "Bracell & Averis Américas",
        detail: "Automação e operação de ambientes corporativos com Microsoft 365, Entra ID, Exchange Online e PowerShell, além de troubleshooting e padronização de rotinas.",
      },
      {
        period: "jan — jun 2024",
        role: "Analista de Suporte Técnico N1",
        company: "GSB Solutions",
        detail: "Atuação com sistemas corporativos, SAP, SQL, Microsoft 365, VPN, redes, servidores e implantação de sistemas.",
      },
      {
        period: "jul 2023 — jan 2024",
        role: "Administrador de Rede",
        company: "3AM IT Services · Claro",
        detail: "Operação de conectividade com SD-WAN VeloCloud, MPLS, TCP/IP, LAN/WAN, Active Directory, Windows e SQL Server.",
      },
      {
        period: "2020 — 2022",
        role: "Suporte de TI",
        company: "Guiché Único da Empresa · PREI",
        detail: "Base profissional em sistemas, Active Directory, DNS, SQL Server, Windows, macOS, hardware e atendimento técnico.",
      },
    ],
    education: [
      {
        period: "",
        course: "Tecnologia em Redes de Computadores",
        school: "UNASP",
      },
      {
        period: "Concluída em 2023",
        course: "Engenharia Informática",
        school: "Universidade Metodista de Angola",
      },
      {
        period: "2016 — 2018",
        course: "Técnico de Informática",
        school: "Ensino médio técnico",
      },
    ],
  },
  en: {
    experience: [
      {
        period: "2024 — present",
        role: "IT Support Analyst L2",
        company: "Bracell & Averis Americas",
        detail: "Automation and operation of corporate environments with Microsoft 365, Entra ID, Exchange Online and PowerShell, plus troubleshooting and operational standardization.",
      },
      {
        period: "Jan — Jun 2024",
        role: "Technical Support Analyst L1",
        company: "GSB Solutions",
        detail: "Worked across corporate systems, SAP, SQL, Microsoft 365, VPN, networks, servers and system deployment.",
      },
      {
        period: "Jul 2023 — Jan 2024",
        role: "Network Administrator",
        company: "3AM IT Services · Claro",
        detail: "Connectivity operations with SD-WAN VeloCloud, MPLS, TCP/IP, LAN/WAN, Active Directory, Windows and SQL Server.",
      },
      {
        period: "2020 — 2022",
        role: "IT Support",
        company: "Guiché Único da Empresa · PREI",
        detail: "Early professional foundation in systems, Active Directory, DNS, SQL Server, Windows, macOS, hardware and technical support.",
      },
    ],
    education: [
      {
        period: "",
        course: "Technology Degree in Computer Networks",
        school: "UNASP",
      },
      {
        period: "Completed in 2023",
        course: "Computer Engineering",
        school: "Universidade Metodista de Angola",
      },
      {
        period: "2016 — 2018",
        course: "Technical Diploma in Information Technology",
        school: "Technical High School",
      },
    ],
  },
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
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[locale];
  const scrollSections = [
    { id: "about", label: t.nav.about },
    { id: "work", label: t.nav.work },
    { id: "trajectory", label: t.nav.trajectory },
    { id: "expertise", label: t.nav.expertise },
    { id: "contact", label: t.nav.contact },
  ] as const;

  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const titleYTarget = useTransform(scrollY, [0, 900], [0, -16], { clamp: true });
  const titleY = useSpring(titleYTarget, { stiffness: 150, damping: 28, mass: 0.38 });

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
        <a className="brand" href="#" aria-label="David Chocaliye">DC</a>

        <div className="topbarRight">
          <nav className="navlinks">
            <a href="#about"><WeightShiftText>{t.nav.about}</WeightShiftText></a>
            <a href="#work"><WeightShiftText>{t.nav.work}</WeightShiftText></a>
            <a href="#trajectory"><WeightShiftText>{t.nav.trajectory}</WeightShiftText></a>
            <a href="#expertise"><WeightShiftText>{t.nav.expertise}</WeightShiftText></a>
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

          <button
            className={`menuButton ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(open => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`mobileMenu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav>
          <a href="#about" onClick={() => setMenuOpen(false)}>{t.nav.about}</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>{t.nav.work}</a>
          <a href="#trajectory" onClick={() => setMenuOpen(false)}>{t.nav.trajectory}</a>
          <a href="#expertise" onClick={() => setMenuOpen(false)}>{t.nav.expertise}</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact}</a>
        </nav>
      </div>

      <ScrollIndicator sections={scrollSections} />

      <section className="hero">
        <div className="heroBackdrop" aria-hidden="true" />
        <img
          className="heroPortrait"
          src="/david-hero-chair.webp"
          alt=""
          aria-hidden="true"
        />

        <div className="shell heroInner">
          <div className="heroStatement">
            <p className="eyebrow hero-enter hero-enter-1">{t.hero.eyebrow}</p>

            <motion.div className="heroTitleMotion" style={{ y: reduceMotion ? 0 : titleY }}>
              <h1 className="hero-enter hero-enter-2">{t.hero.title}</h1>
            </motion.div>

            <div className="heroIdentity hero-enter hero-enter-3">
              <p className="heroRole">{t.hero.role}</p>
              <p className="heroSpecialties">{t.hero.body}</p>
            </div>

            <div className="heroActions hero-enter hero-enter-3">
              <a className="heroPrimaryAction" href="#work">
                <WeightShiftText>{t.hero.cta}</WeightShiftText>
                <span aria-hidden="true">↓</span>
              </a>
              <a
                className="heroSocial"
                href="https://www.linkedin.com/in/david-chocaliye-214429210"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="aboutProfile">
        <div className="shell">
          <header className="aboutHeading reveal reveal-up" data-reveal>
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2 data-scroll-title>{t.about.title}</h2>
          </header>

          <div className="aboutIntro reveal reveal-up" data-reveal>
            <div className="aboutPortraitFrame">
              <img
                className="aboutPortrait"
                src="/david-hero-chair.webp"
                alt="David Chocaliye"
              />
            </div>
            <p>{t.about.intro}</p>
          </div>

          <div className="aboutColumns">
            <article className="aboutBlock reveal reveal-left" data-reveal>
              <h3>{t.about.profileTitle}</h3>
              <p>{t.about.profile}</p>

              <dl className="aboutFacts">
                <div>
                  <dt>{t.about.practiceLabel}</dt>
                  <dd>{t.about.practice}</dd>
                </div>
                <div>
                  <dt>{t.about.locationLabel}</dt>
                  <dd>{t.about.location}</dd>
                </div>
                <div>
                  <dt>{t.about.emailLabel}</dt>
                  <dd>
                    <a href={`mailto:${t.about.email}`}>{t.about.email}</a>
                  </dd>
                </div>
              </dl>
            </article>

            <article className="aboutBlock reveal reveal-right" data-reveal>
              <h3>{t.about.dailyTitle}</h3>
              <p>{t.about.daily}</p>
            </article>
          </div>
        </div>
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

      <section id="trajectory" className="trajectorySection">
        <div className="shell">
          <header className="trajectoryLead reveal reveal-up" data-reveal>
            <p className="eyebrow">{t.trajectory.eyebrow}</p>
            <div className="trajectoryLeadGrid">
              <h2 data-scroll-title>{t.trajectory.title}</h2>
              <p>{t.trajectory.lead}</p>
            </div>
          </header>

          <div className="trajectoryColumns">
            <div className="trajectoryColumn">
              <h3>{t.trajectory.experienceTitle}</h3>
              <div className="timelineList">
                {trajectory[locale].experience.map(item => (
                  <article className="timelineItem reveal reveal-up" data-reveal key={`${item.period}-${item.company}`}>
                    <p className="timelinePeriod">{item.period}</p>
                    <div className="timelineBody">
                      <h4>{item.role}</h4>
                      <p className="timelineCompany">{item.company}</p>
                      <p className="timelineDetail">{item.detail}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="trajectoryColumn trajectoryEducation">
              <h3>{t.trajectory.educationTitle}</h3>
              <div className="educationList">
                {trajectory[locale].education.map(item => (
                  <article className="educationItem reveal reveal-up" data-reveal key={`${item.course}-${item.school}`}>
                    {item.period && <p className="educationPeriod">{item.period}</p>}
                    <h4>{item.course}</h4>
                    <p>{item.school}</p>
                  </article>
                ))}
              </div>
            </div>
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
