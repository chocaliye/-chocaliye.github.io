import type { ProjectCase } from "../types/project";

export const projects: ProjectCase[] = [
  {
    label: "KLASSE",
    title: "SaaS escolar multi-tenant em operação",
    text: "Plataforma de gestão escolar desenvolvida e operada como produto real, atualmente utilizada por 5 escolas. Atuação como Founder & Tech Lead em arquitetura, produto, segurança, dados, deploy e evolução contínua.",
    stack: "Next.js · TypeScript · PostgreSQL · Supabase · RLS · Vercel",
    href: "https://klasse.ao",
    cta: "Ver KLASSE",
  },
  {
    label: "FEXA",
    title: "Automação comercial com IA para WhatsApp",
    text: "Produto focado em atendimento e operação comercial multiempresa, com arquitetura de isolamento por tenant, agentes, integrações e fluxos de handoff humano.",
    stack: "Node.js · PostgreSQL · Supabase · IA via API · WhatsApp",
    href: "https://fexabusiness.com",
    cta: "Ver Fexa",
  },
  {
    label: "BUSINESS EXPORT",
    title: "Arquitetura para agente, CRM e aquisição",
    text: "Monorepo estruturado para separar agente conversacional, CRM e landing, mantendo regras de domínio compartilhadas, tipagem e pipeline de dados consistente.",
    stack: "TypeScript · Turborepo · Supabase · CRM · Agent architecture",
    href: "#contact",
    cta: "Falar sobre o case",
  },
];
