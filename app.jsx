/* global React */
// AKC Landing — wireframe components
// Two variations + admin/CMS view, all bound to localStorage-backed state.

const { useState, useEffect, useMemo } = React;

// ─── Default content (mirrors brief / positioning / bio) ────────────
const DEFAULTS = {
  meta: {
    name: "Alessandro Kuhn Contes",
    role: { en: "Creative Director · Brand & UX", pt: "Diretor Criativo · Marca & UX" },
    location: "Novo Hamburgo, RS",
    timezone: "BRT",
    email: "hello@akcontes.com",
    linkedin: "linkedin.com/in/akcontes",
    domain: "akcontes.com",
  },
  hero: {
    eyebrow: { en: "Calibrated by craft. Built for the long game.", pt: "Calibrado pelo ofício. Construído para o longo prazo." },
    proof: { en: "Technology evolves. Excellence holds.", pt: "A tecnologia evolui. A excelência permanece." },
    leadA: { en: "Creative direction, calibrated.", pt: "Direção criativa, calibrada." },
    highlight: { en: "calibrated", pt: "calibrada" },
    roleLine: { en: "Twenty years across Brazil and the United States. Currently leading creative at TGR Studio.", pt: "Vinte anos entre Brasil e Estados Unidos. Atualmente liderando a criação na TGR Studio." },
    tag1: { en: "Creative Direction", pt: "Direção Criativa" },
    tag2: { en: "Brand & UX", pt: "Marca & UX" },
    tag3: "BR ↔ US",
  },
  about: {
    proof: { en: "Technology evolves. Excellence holds.", pt: "A tecnologia evolui. A excelência permanece." },
    body: { en: "I'm Alessandro Kuhn Contes — a Creative Director and UX Designer working between Brazil and the United States. Currently leading creative at TGR Studio. The work sits at the intersection of brand, UX, and creative leadership. What makes it hold up across formats and decades isn't taste or trend — it's a calibration bar tuned in cultures that don't tolerate slack.", pt: "Sou Alessandro Kuhn Contes — Diretor Criativo e Designer de UX atuando entre Brasil e Estados Unidos. Atualmente liderando a criação na TGR Studio. O trabalho situa-se na interseção de marca, UX e liderança criativa. O que o sustenta ao longo de formatos e décadas não é gosto ou tendência — é uma barra de calibração afinada em culturas que não toleram imprecisão." },
    bullets: [
      ["01", { en: "274% productivity lift inside K2 (K1 Group), in twelve months.", pt: "274% de aumento de produtividade na K2 (K1 Group), em doze meses." }],
      ["02", { en: "25% revenue growth at TGR through rebuilt client trust.", pt: "25% de crescimento de receita na TGR por meio da reconstrução da confiança dos clientes." }],
      ["03", { en: "Public campaign work for NYC Service, distributed across the New York City subway system.", pt: "Campanha pública para o NYC Service, distribuída pelo metrô de Nova York." }],
    ],
    signoff: { en: "Calibrated by craft. Built for the long game.", pt: "Calibrado pelo ofício. Construído para o longo prazo." },
  },
  work: [
    { client: "TGR Studio", year: "2024–present", title: { en: "Creative direction at TGR", pt: "Direção criativa na TGR" }, summary: { en: "UX and brand work across enterprise web platforms.", pt: "Trabalho de UX e marca em plataformas web corporativas." }, tone: "depth", caseSlug: "tgr-studio" },
    { client: "K2 · K1 Group", year: "2022–2024", title: { en: "Productivity rebuild", pt: "Reconstrução de produtividade" }, summary: { en: "Team and process reset; 274% lift inside twelve months.", pt: "Reset de time e processo; 274% de ganho em doze meses." }, tone: "tonal", caseSlug: "k2-k1-group" },
    { client: "NYC Service", year: "2018", title: { en: "Subway campaign system", pt: "Sistema de campanha no metrô" }, summary: { en: "Public-facing identity distributed across the NYC transit network.", pt: "Identidade pública distribuída pela rede de transporte de NYC." }, tone: "kinetic", caseSlug: "nyc-service" },
    { client: "Bureau Blank · NY", year: "2016–2018", title: { en: "Civic brand work", pt: "Trabalho de marca cívica" }, summary: { en: "Senior creative leadership across public-sector accounts.", pt: "Liderança criativa sênior em contas do setor público." }, tone: "depth", caseSlug: null },
    { client: "Confidential · BR", year: "2020–2022", title: { en: "Enterprise platform reset", pt: "Reset de plataforma enterprise" }, summary: { en: "Brand + UX system for a multi-product surface.", pt: "Sistema de marca + UX para uma superfície multi-produto." }, tone: "tonal", caseSlug: null },
    { client: "Personal", year: "2025", title: { en: "AI-native practice notes", pt: "Notas de prática nativa com IA" }, summary: { en: "Working method for AI as a daily teammate, not a tagline.", pt: "Método de trabalho com IA como parceira diária, não como slogan." }, tone: "kinetic", caseSlug: null },
  ],
  blog: [
    {
      slug: "lume-rule",
      date: "2026", read: "8 min",
      title: { en: "The lume rule: scarcity as design discipline", pt: "A regra do lume: escassez como disciplina de design" },
      excerpt: { en: "Why a signature accent earns its place by appearing on roughly one surface in ten.", pt: "Por que um acento de assinatura se justifica aparecendo em apenas uma de cada dez superfícies." },
      subtitle: { en: "Why a signature accent earns its place by appearing on roughly one surface in ten.", pt: "Por que um acento de assinatura se justifica aparecendo em apenas uma de cada dez superfícies." },
      section: "Practice",
      body: [
        { kind: "p", text: { en: "A watch dial has one signature color and a lume — a separate luminous compound that only activates in defined conditions: low light, motion. The lume is structural to the watch's identity, but it's not always visible. Designed in, dosed precisely, deployed sparingly.", pt: "O mostrador de um relógio tem uma cor de assinatura e um lume — um composto luminoso separado que só se ativa em condições definidas: pouca luz, movimento. O lume é estrutural à identidade do relógio, mas nem sempre está visível. Projetado dentro, dosado com precisão, aplicado com parcimônia." } },
        { kind: "p", text: { en: "That's the model. Most personal-brand visual systems fail not because the accent is wrong but because the accent is everywhere. A signature color used on every surface is wallpaper. A signature color used on roughly one surface in ten reads as discipline.", pt: "Esse é o modelo. A maioria dos sistemas visuais de marca pessoal falha não porque o acento está errado, mas porque o acento está em todo lugar. Uma cor de assinatura usada em todas as superfícies é papel de parede. Uma cor de assinatura usada em aproximadamente uma de cada dez superfícies transmite disciplina." } },
        { kind: "h2", text: { en: "What the rule actually does", pt: "O que a regra realmente faz" } },
        { kind: "p", text: { en: "Three things, in order. First, it gives the brand a primary register — the working palette that holds 90% of surfaces. That's the calibration bar. Second, it earns the right to a moment — the 10% — by holding the other 90%. Third, it forces honest conversation about what counts as a moment: if everything's loud, nothing is.", pt: "Três coisas, em ordem. Primeiro, ela dá à marca um registro primário — a paleta de trabalho que sustenta 90% das superfícies. Essa é a barra de calibração. Segundo, ela conquista o direito a um momento — os 10% — ao segurar os outros 90%. Terceiro, ela força uma conversa honesta sobre o que conta como momento: se tudo é barulhento, nada é." } },
        { kind: "figure", label: "specimen · phosphor block with black type · 16:10", aspect: "16/10", caption: { en: "Phosphor only appears in defined contexts — time-stamped graphics, kinetic moments, AI-forward tags. Never as text.", pt: "O fósforo aparece apenas em contextos definidos — gráficos com marcação de tempo, momentos cinéticos, tags de orientação para IA. Nunca como texto." } },
        { kind: "h2", text: { en: "Where the rule allows the accent", pt: "Onde a regra permite o acento" } },
        { kind: "list", items: [
          { en: "Time-stamped or year-stamped graphics — \"2026\" campaign tags, newsletter issue numbers.", pt: "Gráficos com marcação de tempo ou ano — tags de campanha \"2026\", números de edições de newsletter." },
          { en: "Motion / kinetic work showcases — video accents, generative samples, moving-image tiles.", pt: "Showcases de trabalho em motion / cinético — acentos em vídeo, amostras generativas, tiles de imagem em movimento." },
          { en: "AI-content or technology-forward tags — signals current without putting the buzzword in copy.", pt: "Tags de conteúdo com IA ou orientadas à tecnologia — sinalizam atualidade sem colocar o buzzword no copy." },
          { en: "Single hero highlights on a landing page section. Not all of them.", pt: "Destaques hero pontuais em uma seção de landing page. Não em todas." },
        ] },
        { kind: "quote", text: { en: "If phosphor is everywhere, it becomes wallpaper. If it's never used, why have it. Aim for ~1 of every 10 surfaces.", pt: "Se o fósforo está em todo lugar, vira papel de parede. Se nunca é usado, para que tê-lo. Mire em ~1 de cada 10 superfícies." }, attribution: "from the brand system, locked 2026-04-29" },
        { kind: "h2", text: { en: "Where the rule keeps the accent out", pt: "Onde a regra mantém o acento fora" } },
        { kind: "list", items: [
          { en: "Stationery — letterhead, business cards. Primary palette only.", pt: "Papelaria — timbrado, cartões de visita. Somente paleta primária." },
          { en: "Email signature — primary only.", pt: "Assinatura de e-mail — somente primária." },
          { en: "Print proposals, RFPs, decks — primary only.", pt: "Propostas impressas, RFPs, decks — somente primária." },
          { en: "As text. Phosphor fails contrast as type. Always a fill with black type on top.", pt: "Como texto. O fósforo falha em contraste como tipografia. Sempre como fundo com texto preto por cima." },
          { en: "The logo — never recolor the mark.", pt: "O logo — nunca recolorir a marca." },
        ] },
        { kind: "h3", text: { en: "The carryable lesson", pt: "A lição que se carrega" } },
        { kind: "p", text: { en: "Calibration is mostly restraint. The bar moves up when the system gives one thing the room to land — and refuses to spend that room on filler. The lume rule is one shape of that restraint. The deeper rule is older: scarcity is what makes a signal a signal.", pt: "Calibração é, em grande parte, contenção. A barra sobe quando o sistema dá a uma coisa o espaço para pousar — e recusa gastar esse espaço com filler. A regra do lume é uma forma dessa contenção. A regra mais profunda é mais antiga: escassez é o que faz um sinal ser um sinal." } },
      ],
      tags: ["brand systems", "color discipline", "personal-brand work"],
    },
    {
      slug: "harder-rooms",
      date: "2026", read: "6 min",
      title: { en: "Calibrated by harder rooms", pt: "Calibrado por salas mais difíceis" },
      excerpt: { en: "Twenty years across Brazil and the U.S. tunes a different ear for what enterprise creative is supposed to do.", pt: "Vinte anos entre Brasil e EUA afinam um ouvido diferente para o que a criação enterprise deve fazer." },
      subtitle: { en: "Working in cultures that don't tolerate slack changes how you set the bar.", pt: "Trabalhar em culturas que não toleram imprecisão muda como você define a barra." },
      section: "Practice",
      body: [
        { kind: "p", text: { en: "The phrase \"calibrated by craft\" earns its weight from where the calibration happened. Brazil teaches you to ship inside constraints — budget, timeline, client patience — without dropping the bar. The U.S. teaches you to defend the bar at scale, in rooms with louder voices and bigger numbers.", pt: "A expressão \"calibrado pelo ofício\" ganha peso de onde a calibração aconteceu. O Brasil ensina a entregar dentro de restrições — orçamento, prazo, paciência do cliente — sem baixar a barra. Os EUA ensinam a defender a barra em escala, em salas com vozes mais altas e números maiores." } },
        { kind: "p", text: { en: "Twenty years inside both means the bar gets set by the harder room you've been in this week, not the softer one. That's the deal. The work either survives the harder room or it doesn't.", pt: "Vinte anos dentro dos dois significa que a barra é definida pela sala mais difícil em que você esteve nessa semana, não pela mais fácil. Esse é o acordo. O trabalho ou sobrevive à sala mais difícil ou não sobrevive." } },
        { kind: "h2", text: { en: "What harder rooms teach", pt: "O que salas mais difíceis ensinam" } },
        { kind: "list", items: [
          { en: "Defending a decision in the language of business outcomes, not aesthetics.", pt: "Defender uma decisão na linguagem de resultados de negócio, não de estética." },
          { en: "Translating a creative call into a number an operator will recognize.", pt: "Traduzir uma decisão criativa em um número que um operador reconheça." },
          { en: "Knowing which fights to take and which to log and walk away from.", pt: "Saber quais brigas travar e quais registrar e deixar passar." },
          { en: "Reading the room before opening the file.", pt: "Ler a sala antes de abrir o arquivo." },
        ] },
        { kind: "p", text: { en: "None of these are taught. All of them are calibrated — by being in the room enough times that the next room reads cleaner.", pt: "Nenhuma dessas coisas é ensinada. Todas são calibradas — por estar na sala vezes suficientes para que a próxima sala pareça mais clara." } },
      ],
      tags: ["practice", "career notes"],
    },
    {
      slug: "platform-shift",
      date: "soon", read: "—",
      title: "What survives a platform shift",
      excerpt: "On what was never the work in the first place — and what holds when the tools change.",
      subtitle: "Coming soon.",
      section: "Practice",
      coming: true,
      body: [],
      tags: [],
    },
  ],
  inspiration: [
    { artist: "Felipe Pantone", note: "generative · 2024", tone: "depth" },
    { artist: "A. Lange & Söhne", note: "watch · ref. 1815", tone: "tonal" },
    { artist: "Maceo Plex", note: "set art · awakenings", tone: "kinetic" },
    { artist: "Massimo Vignelli", note: "specimen · 1972", tone: "depth" },
    { artist: "Rafa Nadal", note: "roland-garros · 2022", tone: "tonal" },
    { artist: "Casey Reas", note: "process · 2023", tone: "kinetic" },
    { artist: "Jeremy Cowart", note: "portrait · 2021", tone: "depth" },
  ],

  // Wireframe marks — section numbers, anno pills, version stamps. All
  // CMS-editable. Page surfaces read from data.marks[surface][key].
  marks: {
    home: {
      heroVersion: "v 0.3 · hi-fi",
      heroDate: "2026-05-14",
      aboutNum: "02 · about",
      aboutAnno: "about · medium bio",
      workNum: "03 · selected work",
      workAnno: "3-up grid · §5.4",
      blogNum: "04 · blog",
      blogAnno: "text-led · §5.5",
      inspNum: "05 · weekly inspiration",
    },
    case: {
      coverAnno: "case study · template",
      briefNum: "01 · brief", briefAnno: "the problem · template",
      approachNum: "02 · approach", approachAnno: "four moves · template",
      outputNum: "03 · output", outputAnno: "artifacts · placeholders",
      resultsNum: "04 · results", resultsAnno: "numbers · template",
      creditsNum: "05 · credits", creditsAnno: "team · static",
    },
    post: {
      tagsLabel: "filed under",
      relatedNum: "related notes",
    },
    about: {
      practiceNum: "01 · practice", practiceAnno: "scope · template",
      timelineNum: "02 · timeline", timelineAnno: "20 years · selected",
      clientsNum: "03 · clients", clientsAnno: "selected · public",
      recogNum: "04 · recognition", recogAnno: "light · honest",
    },
    contact: {
      fitNum: "01 · what to email about", fitAnno: "honest framing",
      formAnno: "form · mailto fallback",
    },
  },

  // i18n state — drives the language toggle in the nav. Bilingual fields
  // in the store can be authored as either a plain string (used for both
  // languages) or as `{ en, pt }` — t(value, lang) reads either shape.
  lang: "en",
  // Dark/light is a global state, persisted to localStorage too so it
  // matches across reloads.
  dark: true,
  contact: {
    head: { en: "Let's talk.", pt: "Vamos conversar." },
    lede: { en: "For senior creative direction and brand work — currently leading at TGR Studio, open to the right conversation.", pt: "Para direção criativa sênior e trabalho de marca — atualmente liderando na TGR Studio, aberto à conversa certa." },
  },
  newsletter: {
    title: { en: "Newsletter", pt: "Newsletter" },
    blurb: { en: "The blog, delivered. Low cadence, signal only — one note when there's something to send.", pt: "O blog, entregue. Baixa cadência, apenas sinal — uma nota quando há algo a enviar." },
    placeholder: { en: "your@email.com", pt: "seu@email.com" },
    cta: { en: "Subscribe", pt: "Inscrever-se" },
    success: { en: "Subscribed. See you in your inbox.", pt: "Inscrito. Até mais na sua caixa de entrada." },
    provider: "buttondown",
    listId: "akcontes",
  },
  socials: [
    { label: "hello@akcontes.com", href: "mailto:hello@akcontes.com" },
    { label: "+55 51 99699 9909", href: "tel:+5551996999909" },
    { label: "linkedin.com/in/akcontes", href: "https://www.linkedin.com/in/akcontes/" },
    { label: "instagram.com/akcontes", href: "https://www.instagram.com/akcontes/" },
  ],
  // Case studies — each Work entry can link to one of these. The case
  // template (case-study.jsx) reads from data.cases[i].
  cases: [
    {
      slug: "tgr-studio",
      meta: {
        num: "case 01",
        client: "TGR Studio",
        project: "Creative direction at TGR",
        year: "2024–present",
        role: { en: "Creative Director · Brand & UX", pt: "Diretor Criativo · Marca & UX" },
        status: "ongoing",
        sector: "Enterprise B2B · Brazil",
        deliverables: ["Brand system", "Platform UX", "Marketing surfaces", "Sales enablement"],
      },
      brief: {
        head: { en: "Rebuild client trust. Grow the practice. Ship the work.", pt: "Reconstruir a confiança dos clientes. Fazer a prática crescer. Entregar o trabalho." },
        body: { en: "TGR Studio asked for senior creative leadership to reset the relationship with key enterprise accounts and turn the team into something that consistently ships at the bar the brief implies. The work sits at the intersection of brand, UX, and pipeline — the practice has to feel calibrated end-to-end, not just at the cover.", pt: "A TGR Studio precisou de liderança criativa sênior para resetar o relacionamento com as principais contas enterprise e transformar o time em algo que entrega consistentemente no nível que o brief implica. O trabalho fica na interseção de marca, UX e pipeline — a prática precisa soar calibrada do início ao fim, não apenas na capa." },
        callouts: [
          ["scope", { en: "Cross-functional. Creative, UX, account, sales.", pt: "Interfuncional. Criação, UX, atendimento, vendas." }],
          ["timeline", { en: "12 months for the operational reset; brand + UX system overhaul is rolling.", pt: "12 meses para o reset operacional; o redesenho do sistema de marca + UX está em andamento." }],
          ["constraint", { en: "No reset of the staff — same team, sharper bar.", pt: "Sem troca de equipe — mesmo time, barra mais alta." }],
        ],
      },
      approach: [
        { num: "01", title: { en: "Audit", pt: "Auditoria" }, body: { en: "Read every shipping artifact, sit in every recurring meeting, watch every client touchpoint. Map the gap between intent and output.", pt: "Ler todos os artefatos entregues, participar de todas as reuniões recorrentes, acompanhar cada touchpoint com o cliente. Mapear a distância entre intenção e output." } },
        { num: "02", title: { en: "Set the bar", pt: "Definir a barra" }, body: { en: "Define the calibration register the studio operates at — visual + writing + interaction — then make the bar legible to the team in artifacts they can copy.", pt: "Definir o registro de calibração em que o estúdio opera — visual + escrita + interação — e tornar essa barra legível para o time em artefatos que possam ser copiados." } },
        { num: "03", title: { en: "Process reset", pt: "Reset de processo" }, body: { en: "Rebuild the critique loop, the design review cadence, and the client-facing language. Reduce ceremony, raise the floor.", pt: "Reconstruir o loop de crítica, a cadência de revisão de design e a linguagem voltada ao cliente. Reduzir cerimônia, elevar o piso." } },
        { num: "04", title: { en: "Ship", pt: "Entregar" }, body: { en: "Every new pitch and platform goes through the new register. Compound the work — each engagement raises the bar for the next.", pt: "Cada novo pitch e plataforma passa pelo novo registro. O trabalho se acumula — cada projeto eleva a barra para o próximo." } },
      ],
      output: [
        { kind: "full", label: "platform cover · 16:9", note: { en: "TGR's flagship enterprise UX engagement — landing surface.", pt: "Principal engajamento de UX enterprise da TGR — superfície de entrada." } },
        { kind: "twin", labels: ["component system · 4:5", "type specimen · 4:5"], note: { en: "Internal design system + Migra-anchored brand typography.", pt: "Design system interno + tipografia de marca ancorada na Migra." } },
        { kind: "wide", label: "in-platform UI · 16:9", note: { en: "Dashboard-tier interaction patterns. Real client app, redacted.", pt: "Padrões de interação em nível de dashboard. App real do cliente, redatado." } },
        { kind: "detail", label: "detail · 3:2", note: { en: "Pitch artifact. Foil-stamped cobalt on bone.", pt: "Artefato de pitch. Hot stamping cobalto sobre bone." } },
        { kind: "twin", labels: ["mobile flow · 9:19", "tablet · 4:3"], note: { en: "Responsive system across three breakpoints.", pt: "Sistema responsivo em três breakpoints." } },
      ],
      results: [
        { stat: "+25%", note: { en: "Revenue growth, year over year.", pt: "Crescimento de receita, ano a ano." } },
        { stat: "12 mo.", note: { en: "From audit to operational reset.", pt: "Do audit ao reset operacional." } },
        { stat: "6", note: { en: "Enterprise platforms shipped under the new register.", pt: "Plataformas enterprise entregues sob o novo registro." } },
      ],
      quote: {
        text: { en: "It took twelve months to feel like the work matches the intent. The bar moved — and now it stays there.", pt: "Levou doze meses para o trabalho começar a corresponder à intenção. A barra subiu — e agora ela se mantém." },
        author: "(client testimonial)",
        role: { en: "TGR Studio · senior stakeholder", pt: "TGR Studio · stakeholder sênior" },
      },
      credits: [
        ["Creative Direction", "Alessandro Kuhn Contes"],
        ["Brand & UX team", "TGR Studio creative"],
        ["Client", "TGR Studio leadership"],
        ["Period", "2024 — present"],
        ["Status", "Ongoing engagement"],
      ],
      nextSlug: "k2-k1-group",
    },
    {
      slug: "k2-k1-group",
      meta: {
        num: "case 02",
        client: "K2 · K1 Group",
        project: "Productivity rebuild",
        year: "2022–2024",
        role: { en: "Creative Director · Operations", pt: "Diretor Criativo · Operações" },
        status: "shipped",
        sector: "Holding company · Brazil",
        deliverables: ["Team reset", "Process redesign", "Tool stack", "Output system"],
      },
      brief: {
        head: { en: "Turn a creative team from output-bound to outcome-bound.", pt: "Transformar um time criativo de orientado a output para orientado a resultado." },
        body: { en: "K2 (inside K1 Group) had the talent and the budget — the throughput wasn't there. The mandate: rebuild the team's operating model without firing anyone, and make the gain legible at the holding-company level inside twelve months.", pt: "A K2 (dentro do K1 Group) tinha o talento e o orçamento — o throughput não estava lá. O mandato: reconstruir o modelo operacional do time sem demitir ninguém, e tornar o ganho legível no nível da holding em doze meses." },
        callouts: [
          ["scope", { en: "Internal creative org. ~22 people across creative, copy, motion.", pt: "Organização criativa interna. ~22 pessoas entre criação, copy e motion." }],
          ["timeline", { en: "12 months, two operational milestones at month 4 and 9.", pt: "12 meses, dois marcos operacionais no mês 4 e no mês 9." }],
          ["constraint", { en: "Zero staff reset. Same people, new system.", pt: "Zero reset de equipe. Mesmas pessoas, sistema novo." }],
        ],
      },
      approach: [
        { num: "01", title: { en: "Measure", pt: "Medir" }, body: { en: "Instrument the team. Track hours, briefs, revision cycles, time-to-first-draft, accept rate. Get a baseline that's defensible.", pt: "Instrumentar o time. Rastrear horas, briefs, ciclos de revisão, tempo até o primeiro rascunho, taxa de aprovação. Estabelecer uma baseline defensável." } },
        { num: "02", title: { en: "Cut ceremony", pt: "Cortar cerimônia" }, body: { en: "Identify every meeting, hand-off, and approval gate that doesn't make the work better. Kill or compress.", pt: "Identificar cada reunião, handoff e gate de aprovação que não melhora o trabalho. Eliminar ou comprimir." } },
        { num: "03", title: { en: "Re-tool", pt: "Re-ferramentar" }, body: { en: "Swap brittle tooling for a stack the team can actually move inside. Standardize the creative file model so handoffs aren't fragile.", pt: "Trocar ferramentas frágeis por um stack dentro do qual o time consiga se mover de verdade. Padronizar o modelo de arquivo criativo para que os handoffs não sejam frágeis." } },
        { num: "04", title: { en: "Compound", pt: "Acumular" }, body: { en: "Every brief now ships through the new model. Throughput stacks every quarter as the team internalizes the rhythm.", pt: "Cada brief agora passa pelo novo modelo. O throughput cresce a cada trimestre conforme o time internaliza o ritmo." } },
      ],
      output: [
        { kind: "full", label: "ops dashboard · 16:9", note: { en: "Throughput tracking — visible to the team and the holding C-suite.", pt: "Rastreamento de throughput — visível para o time e para o C-suite da holding." } },
        { kind: "twin", labels: ["brief template · 4:5", "review rubric · 4:5"], note: { en: "Two artifacts that did most of the work.", pt: "Dois artefatos que fizeram a maior parte do trabalho." } },
        { kind: "wide", label: "creative system overview · 16:9", note: { en: "File model + handoff specification.", pt: "Modelo de arquivo + especificação de handoff." } },
      ],
      results: [
        { stat: "+274%", note: { en: "Team productivity lift, year over year.", pt: "Aumento de produtividade do time, ano a ano." } },
        { stat: "12 mo.", note: { en: "Audit → fully re-tooled team.", pt: "Audit → time totalmente re-ferramentado." } },
        { stat: "0", note: { en: "People let go in the reset.", pt: "Pessoas dispensadas no reset." } },
      ],
      quote: {
        text: { en: "The team's better at the same headcount. The numbers are real, and they hold quarter over quarter.", pt: "O time está melhor com o mesmo headcount. Os números são reais e se mantêm trimestre a trimestre." },
        author: "(K1 Group leadership)",
        role: { en: "K1 Group · senior leadership", pt: "K1 Group · liderança sênior" },
      },
      credits: [
        ["Creative Direction", "Alessandro Kuhn Contes"],
        ["Team", "K2 creative · 22 people"],
        ["Client", "K1 Group leadership"],
        ["Period", "2022 — 2024"],
        ["Status", "Shipped · still in use"],
      ],
      nextSlug: "nyc-service",
    },
    {
      slug: "nyc-service",
      meta: {
        num: "case 03",
        client: "NYC Service",
        project: "Subway campaign system",
        year: "2018",
        role: { en: "Senior Creative · Bureau Blank", pt: "Criativo Sênior · Bureau Blank" },
        status: "shipped",
        sector: "Public-sector · New York City",
        deliverables: ["Identity system", "Transit campaign", "Out-of-home rollout", "Print collateral"],
      },
      brief: {
        head: { en: "Public-facing identity, distributed across the New York City subway system.", pt: "Identidade pública, distribuída pelo sistema de metrô de Nova York." },
        body: { en: "NYC Service needed an identity strong enough to live next to MTA's permanent signage without disappearing — and to feel like a civic invitation, not an ad. Designed at Bureau Blank, rolled out across the transit network.", pt: "O NYC Service precisava de uma identidade forte o suficiente para conviver com a sinalização permanente do MTA sem desaparecer — e para soar como um convite cívico, não como um anúncio. Desenhada na Bureau Blank, distribuída por toda a rede de transporte." },
        callouts: [
          ["scope", { en: "Identity + campaign system + transit rollout.", pt: "Identidade + sistema de campanha + distribuição em trânsito." }],
          ["timeline", { en: "Identity 6 weeks. Rollout staged across 4 months.", pt: "Identidade em 6 semanas. Distribuição em etapas ao longo de 4 meses." }],
          ["constraint", { en: "Public-sector procurement timeline. Print-first.", pt: "Cronograma de aquisição do setor público. Print primeiro." }],
        ],
      },
      approach: [
        { num: "01", title: { en: "Civic register", pt: "Registro cívico" }, body: { en: "Find a visual register that's distinct from commercial OOH but doesn't read as government wallpaper. Civic, not corporate.", pt: "Encontrar um registro visual distinto do OOH comercial, mas que não pareça papelão de governo. Cívico, não corporativo." } },
        { num: "02", title: { en: "Live with MTA", pt: "Conviver com o MTA" }, body: { en: "Test every layout against the actual subway environment — fluorescent light, sticker tags, crowd density.", pt: "Testar cada layout no ambiente real do metrô — luz fluorescente, etiquetas de adesivo, densidade de passageiros." } },
        { num: "03", title: { en: "Print system", pt: "Sistema de impressão" }, body: { en: "Production-real specs from day one. The identity has to survive offset, riso, large-format print, vinyl.", pt: "Especificações reais de produção desde o primeiro dia. A identidade precisa sobreviver a offset, riso, impressão em grande formato e vinil." } },
        { num: "04", title: { en: "Ship into the city", pt: "Lançar na cidade" }, body: { en: "Stage the rollout across stations. Every placement is documented and feeds back into refinement.", pt: "Distribuir nas estações em etapas. Cada placement é documentado e retorna como input para refinamento." } },
      ],
      output: [
        { kind: "full", label: "platform poster · 16:9", note: { en: "Hero rollout across major subway hubs.", pt: "Distribuição hero pelos principais hubs do metrô." } },
        { kind: "twin", labels: ["station signage · 4:5", "in-car ad · 4:5"], note: { en: "Two of the eight distinct placements.", pt: "Dois dos oito placements distintos." } },
        { kind: "wide", label: "print specimen · 16:9", note: { en: "Identity specimen, production-spec.", pt: "Espécime de identidade, spec de produção." } },
        { kind: "detail", label: "detail · 3:2", note: { en: "Type detail · custom letterforms.", pt: "Detalhe tipográfico · letterforms customizados." } },
      ],
      results: [
        { stat: "8", note: { en: "Distinct placements across the subway system.", pt: "Placements distintos pelo sistema de metrô." } },
        { stat: "4 mo.", note: { en: "End-to-end identity rollout.", pt: "Rollout de identidade do início ao fim." } },
        { stat: "—", note: { en: "Lives in the city since 2018. Still cited.", pt: "Vive na cidade desde 2018. Ainda referenciado." } },
      ],
      quote: {
        text: { en: "It still reads right when I'm standing on the platform. That's the whole job.", pt: "Ainda funciona quando estou parado na plataforma. Esse era o trabalho inteiro." },
        author: "(self · 2023 retrospective)",
        role: { en: "Looking back, five years on", pt: "Olhando para trás, cinco anos depois" },
      },
      credits: [
        ["Studio", "Bureau Blank · New York"],
        ["Senior Creative", "Alessandro Kuhn Contes"],
        ["Client", "NYC Service"],
        ["Period", "2018"],
        ["Status", "Shipped · live in the system"],
      ],
      nextSlug: "tgr-studio",
    },
  ],
  activeCaseSlug: null,
  activePostSlug: null,

  // Long-form About page surface
  aboutPage: {
    eyebrow: { en: "About · the practice", pt: "Sobre · a prática" },
    title: { en: "Twenty years calibrating creative across two cultures.", pt: "Vinte anos calibrando criatividade entre duas culturas." },
    intro: { en: "I'm Alessandro Kuhn Contes — Creative Director and UX Designer working between Brazil and the United States. Currently leading creative at TGR Studio. The work sits at the intersection of brand, UX, and creative leadership.", pt: "Sou Alessandro Kuhn Contes — Diretor Criativo e Designer de UX atuando entre Brasil e Estados Unidos. Atualmente liderando a criação na TGR Studio. O trabalho situa-se na interseção de marca, UX e liderança criativa." },
    body: { en: "What makes the practice hold up across formats and decades isn't taste or trend — it's a calibration bar tuned in cultures that don't tolerate slack. Brazil teaches you to ship inside constraints; the U.S. teaches you to make the bar legible at scale. The output is a working method that ages: a brand system that reads the same in 2026 and 2036, a UX rhythm that survives the next platform shift, and a creative team that knows how to run without you in the room.", pt: "O que sustenta a prática ao longo de formatos e décadas não é gosto ou tendência — é uma barra de calibração afinada em culturas que não toleram imprecisão. O Brasil ensina a entregar dentro de restrições; os EUA ensinam a tornar a barra legível em escala. O resultado é um método de trabalho que envelhece bem: um sistema de marca que lê igual em 2026 e 2036, um ritmo de UX que sobrevive à próxima virada de plataforma, e um time criativo que sabe funcionar sem você na sala." },
    practice: [
      ["how", { en: "Senior creative direction, brand systems, UX leadership, team operating models.", pt: "Direção criativa sênior, sistemas de marca, liderança em UX, modelos operacionais de time." }],
      ["where", { en: "Remote-first from Novo Hamburgo. Travel for client work — São Paulo, New York, Lisbon.", pt: "Remote-first de Novo Hamburgo. Viagens para trabalho com clientes — São Paulo, Nova York, Lisboa." }],
      ["when", { en: "Selective. One major engagement at a time. Currently leading at TGR Studio.", pt: "Seletivo. Um grande projeto por vez. Atualmente liderando na TGR Studio." }],
      ["who for", { en: "Enterprise B2B, civic + public-sector creative, senior personal brands.", pt: "Enterprise B2B, criativo cívico e setor público, marcas pessoais sênior." }],
    ],
  },

  timeline: [
    { year: "2024 — present", chapter: "TGR Studio", role: "Creative Director", location: "São Paulo, BR", note: "Brand, UX, and senior creative leadership across enterprise platforms. Live engagement." },
    { year: "2022 — 2024", chapter: "K2 · K1 Group", role: "Creative Director", location: "São Paulo, BR", note: "Productivity rebuild — operational reset of the creative org. 274% throughput lift." },
    { year: "2020 — 2022", chapter: "Confidential · BR", role: "Senior Creative", location: "Porto Alegre, BR", note: "Brand + UX system for a multi-product enterprise platform." },
    { year: "2018 — 2020", chapter: "Independent", role: "Creative Direction", location: "São Paulo · NY", note: "Bridge years — selective enterprise and civic brand work across markets." },
    { year: "2016 — 2018", chapter: "Bureau Blank", role: "Senior Creative", location: "New York, US", note: "Civic and public-sector brand leadership. NYC Service subway campaign system." },
    { year: "2014 — 2016", chapter: "—", role: "Creative", location: "São Paulo, BR", note: "Agency-side senior creative on enterprise accounts." },
    { year: "2006 — 2014", chapter: "Early career", role: "Designer → Creative", location: "Porto Alegre · Curitiba", note: "Eight years calibrating the bar across editorial, brand, and digital." },
  ],

  clients: [
    "TGR Studio", "K1 Group / K2", "NYC Service", "Bureau Blank", "Confidential · enterprise BR",
    "Independent senior brands", "Civic + public sector NY", "Editorial · longform clients",
  ],

  recognition: [
    { year: "2024", item: "Featured speaker · Brazil enterprise UX summit (private)" },
    { year: "2022", item: "K1 Group leadership recognition · productivity reset case study" },
    { year: "2018", item: "NYC Service · subway campaign — public archive" },
    { year: "—", item: "Selected work across two decades. No award-show entries — by choice." },
  ],

  contactPage: {
    eyebrow: { en: "Contact", pt: "Contato" },
    title: { en: "Let's talk.", pt: "Vamos conversar." },
    intro: { en: "For senior creative direction and brand work. Currently leading at TGR Studio — open to the right conversation.", pt: "Para direção criativa sênior e trabalho de marca. Atualmente liderando na TGR Studio — aberto à conversa certa." },
    fit: [
      { kind: "yes", title: { en: "A good fit", pt: "Um bom encaixe" }, items: [{ en: "Senior creative direction (interim, fractional, or full-time)", pt: "Direção criativa sênior (interim, fracionada ou integral)" }, { en: "Brand system work for enterprise or personal brands at the senior level", pt: "Sistemas de marca para empresas ou marcas pessoais em nível sênior" }, { en: "Creative operating-model resets — team, process, throughput", pt: "Resets de modelo operacional criativo — time, processo, throughput" }, { en: "Speaking + advisory engagements on the above", pt: "Palestras e consultorias sobre os temas acima" }] },
      { kind: "no", title: { en: "Probably not a fit", pt: "Provavelmente não é o encaixe certo" }, items: [
        { en: "Junior creative or single-deliverable freelance work", pt: "Trabalho criativo júnior ou freelance de entrega única" },
        { en: "Crypto, gambling, sectors with reputational drag", pt: "Cripto, apostas, setores com arrasto reputacional" },
        { en: "Spec work, contests, unpaid pitches", pt: "Trabalho especulativo, concursos, pitches não remunerados" },
        { en: "Recruiter outreach for unrelated roles", pt: "Abordagem de recrutadores para vagas sem relação com a prática" },
      ] },
    ],
    response: { en: "Response within 48 hours, Monday — Friday. Weekend mail is read but answered Monday.", pt: "Resposta em até 48 horas, segunda a sexta. E-mails de fim de semana são lidos, mas respondidos na segunda." },
    form: {
      head: { en: "Or send a note directly.", pt: "Ou envie uma mensagem diretamente." },
      blurb: { en: "The fastest path is email. Form below routes to the same inbox.", pt: "O caminho mais rápido é o e-mail. O formulário abaixo vai para a mesma caixa de entrada." },
    },
  },
  sections: {
    aboutTitle: { en: "The practice in 200 words.", pt: "A prática em 200 palavras." },
    aboutSub: { en: "Calibration sources, three numbers, sign-off.", pt: "Fontes de calibração, três números, encerramento." },
    workTitle: { en: "Selected work.", pt: "Trabalhos selecionados." },
    workSub: { en: "Six pieces. Placeholder images in phase 1 — real imagery via the CMS.", pt: "Seis peças. Imagens de rascunho na fase 1 — imagens reais via CMS." },
    blogTitle: { en: "Notes.", pt: "Notas." },
    blogSub: { en: "Low cadence, high substance.", pt: "Baixa cadência, alto conteúdo." },
    inspTitle: { en: "What I'm looking at.", pt: "O que estou observando." },
    inspWeek: "Week of Apr 27, 2026",
    footerQuote: "If you want to be a better designer, don't study design books. Study sculpture. Study paintings. Study cars, watches, philosophers, movies, fiction, music, people. Study the world.",
    footerQuoteAuthor: "Tobias van Schneider",
    footerVersion: "v 0.3 · hi-fi",
  },
};

// ─── Live store — localStorage (fast) + server API (persistent) ─────
const STORE_KEY = "akc-cms-v6";
function mergeWithDefaults(defaults, saved) {
  const out = { ...defaults };
  for (const k of Object.keys(saved)) {
    if (k in defaults && typeof defaults[k] === 'object' && !Array.isArray(defaults[k]) && saved[k] && typeof saved[k] === 'object' && !Array.isArray(saved[k])) {
      out[k] = { ...defaults[k], ...saved[k] };
    } else {
      out[k] = saved[k];
    }
  }
  return out;
}
function loadStore() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return DEFAULTS;
    return mergeWithDefaults(DEFAULTS, JSON.parse(raw));
  } catch { return DEFAULTS; }
}
function saveStore(state) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch {}
}

function useStore() {
  const [state, setState] = useState(loadStore);
  // skipSave prevents echoing server data back to the server on init
  const skipSave = React.useRef(false);

  // On mount: fetch from server — server is the source of truth
  useEffect(() => {
    fetch('/api/data')
      .then(r => r.ok ? r.json() : null)
      .then(saved => {
        if (saved && typeof saved === 'object') {
          skipSave.current = true;
          const merged = mergeWithDefaults(DEFAULTS, saved);
          setState(merged);
          saveStore(merged);
        }
      })
      .catch(() => {});
  }, []);

  // On every change: save to localStorage immediately + server with debounce
  useEffect(() => {
    saveStore(state);
    if (skipSave.current) { skipSave.current = false; return; }
    const t = setTimeout(() => {
      fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('akc-admin-token') || ''}`,
        },
        body: JSON.stringify(state),
      }).catch(() => {});
    }, 600);
    return () => clearTimeout(t);
  }, [state]);

  // Cross-tab sync via storage event
  useEffect(() => {
    const onStorage = (e) => { if (e.key === STORE_KEY) setState(loadStore()); };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return [state, setState];
}

// Bilingual field reader. Pass a string (returned as-is) or a {en, pt}
// object (returns the value for the current lang, falling back to en).
// Authoring is incremental: any field can be upgraded to bilingual by
// turning "string" into { en: "string", pt: "string em pt" }.
function t(value, lang = "en") {
  if (value == null) return "";
  if (typeof value === "object" && (value.en !== undefined || value.pt !== undefined)) {
    return value[lang] ?? value.en ?? "";
  }
  return value;
}

// Cobalt cursor follower. Mounted via the page-shell wrappers (any .wf
// root). Attaches one .wf-cursor child, tracks the real mouse via
// pointermove, and grows when hovering interactive elements.
//
// React effect — runs once per artboard mount, cleans up on unmount.
function useCobaltCursor(rootRef) {
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cursor = document.createElement('div');
    cursor.className = 'wf-cursor';
    root.appendChild(cursor);

    const onMove = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursor.classList.add('wf-cursor--active');
      // Hover-grow when over an interactive element. closest() walks up
      // the DOM and short-circuits on the first matching ancestor.
      const inside = e.target.closest('a, button, [role="button"], input, textarea, select, .work-card, .blog-row');
      cursor.classList.toggle('wf-cursor--hover', !!inside);
    };
    const onLeave = () => cursor.classList.remove('wf-cursor--active');

    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);
    return () => {
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
      cursor.remove();
    };
  }, [rootRef]);
}

// ─── small bits ─────────────────────────────────────────────────────
function Placeholder({ label, style }) {
  return (
    <div className="ph" style={style}>
      <span className="ph-label">{label || "image · placeholder"}</span>
    </div>
  );
}

// Drop-target image slot wrapper. Renders the <image-slot> custom element
// at the given aspect ratio and surfaces a small caption underneath. The
// `id` MUST be unique per slot (otherwise drops collide in the persistence
// sidecar). Aspect is "W/H" — same syntax as Placeholder.
function ImgSlot({ id, label, aspect = "16/9", shape = "rect", style }) {
  // aspect-ratio on the wrapper div (a real element) is reliable;
  // the custom element fills it via width/height 100%.
  return (
    <div className="img-slot" style={{ aspectRatio: aspect, ...style }}>
      <image-slot
        id={id}
        shape={shape}
        fit="cover"
        placeholder={label}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}

// Renders a video from a URL. Detects YouTube/Vimeo → iframe; otherwise → <video>.
// Used both in the public case-study page and the admin preview.
function VideoBlock({ url, aspect = "16/9", style }) {
  if (!url) return (
    <div className="ph" style={{ aspectRatio: aspect, ...style }}>
      <span className="ph-label">video · placeholder</span>
    </div>
  );
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/);
  if (ytMatch) return (
    <div style={{ aspectRatio: aspect, position: "relative", overflow: "hidden", background: "#000", ...style }}>
      <iframe
        src={`https://www.youtube.com/embed/${ytMatch[1]}`}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return (
    <div style={{ aspectRatio: aspect, position: "relative", overflow: "hidden", background: "#000", ...style }}>
      <iframe
        src={`https://player.vimeo.com/video/${vimeoMatch[1]}`}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
  return (
    <div style={{ aspectRatio: aspect, background: "#000", ...style }}>
      <video controls style={{ width: "100%", height: "100%", display: "block" }} src={url} />
    </div>
  );
}

// Admin-only video slot: URL input + file upload button + preview.
function VideoAdminSlot({ id, url, onUrlChange, aspect = "16/9" }) {
  const [uploading, setUploading] = useState(false);
  const fileRef = React.useRef(null);
  const upload = async (file) => {
    setUploading(true);
    try {
      const token = sessionStorage.getItem('akc-admin-token') || '';
      const safeName = `${id}-${Date.now()}.${(file.name.split('.').pop() || 'mp4').toLowerCase()}`;
      const res = await fetch(`/api/upload?name=${encodeURIComponent(safeName)}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': file.type || 'video/mp4' },
        body: file,
      });
      const d = await res.json();
      if (d.url) onUrlChange(d.url);
    } catch (e) { alert('Upload falhou: ' + e.message); }
    finally { setUploading(false); }
  };
  return (
    <div style={{ marginBottom: 8 }}>
      <div className="field" style={{ marginBottom: 6 }}>
        <label>URL do vídeo (YouTube, Vimeo ou .mp4 direto)</label>
        <input value={url || ""} onChange={(e) => onUrlChange(e.target.value)}
          placeholder="https://youtube.com/watch?v=... · https://vimeo.com/..." />
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <button className="add-btn" disabled={uploading}
          onClick={() => fileRef.current && fileRef.current.click()}>
          {uploading ? "enviando…" : "↑ upload vídeo"}
        </button>
        <input ref={fileRef} type="file" accept="video/*" style={{ display: "none" }}
          onChange={(e) => e.target.files[0] && upload(e.target.files[0])} />
      </div>
      <VideoBlock url={url} aspect={aspect} />
    </div>
  );
}
function LiveTime({ tz = "America/Sao_Paulo", code = "BRT" }) {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const opts = { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: tz };
      setT(new Intl.DateTimeFormat("en-GB", opts).format(d));
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [tz]);
  return <span>{t} {code}</span>;
}

// Inline email-capture used in the footer. Pure wireframe: validates the
// shape of the address, then flips into a thank-you state. Wiring to a real
// provider happens via the CMS Newsletter pane (provider + listId).
function NewsletterForm({ n, lang = "en" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | done | error
  const submit = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setState("loading");
    try {
      if (n.provider === "buttondown" && n.listId) {
        const res = await fetch(`https://buttondown.com/api/emails/embed-subscribe/${n.listId}`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ email }),
        });
        setState(res.ok ? "done" : "error");
      } else {
        setState("done");
      }
    } catch {
      setState("error");
    }
  };
  if (state === "done") return <div className="news-success">{t(n.success, lang)}</div>;
  return (
    <form className="news-form" onSubmit={submit}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t(n.placeholder, lang)}
        aria-label="Email address"
        disabled={state === "loading"}
      />
      <button type="submit" disabled={state === "loading"}>
        {state === "loading" ? "…" : <>{t(n.cta, lang)} <span className="arr">→</span></>}
      </button>
      {state === "error" && <p className="news-error" style={{ fontSize: 12, color: "var(--color-accent-loud)", marginTop: 8 }}>{lang === "pt" ? "Algo deu errado. Tente novamente." : "Something went wrong. Please try again."}</p>}
    </form>
  );
}

function Nav({ darkOn, onToggleDark, lang = "en", onLang, location, mobile }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <div className="nav"><div className="nav-inner">
      <a href="/" className="brand" aria-label="AKC — home">
        <img src={darkOn ? "assets/akc_logo_white.svg" : "assets/akc_logo_black.svg"} alt="AKC" className="brand-mark" />
      </a>
      <ul>
        <li><a href="/about.html">{lang === "pt" ? "Sobre" : "About"}</a></li>
        <li><a href="/work.html">{lang === "pt" ? "Trabalhos" : "Work"}</a></li>
        <li><a href="/blog.html">Blog</a></li>
        <li><a href="/contact.html">{lang === "pt" ? "Contato" : "Contact"}</a></li>
      </ul>
      <div className="nav-right">
        <span className="meta"><span className="now-dot" />{location} · <LiveTime /></span>
        <span className="lang">
          <button className={lang === "en" ? "on" : ""} onClick={() => onLang && onLang("en")}>EN</button>|
          <button className={lang === "pt" ? "on" : ""} onClick={() => onLang && onLang("pt")}>PT</button>
        </span>
        <span className="mode">
          <button className={!darkOn ? "on" : ""} onClick={() => onToggleDark(false)}>light</button>|
          <button className={darkOn ? "on" : ""} onClick={() => onToggleDark(true)}>dark</button>
        </span>
      </div>
      {mobile && (
        <button className="nav-burger" aria-label="menu" onClick={() => setOpen(o => !o)}>
          <span /><span /><span />
        </button>
      )}
      {mobile && open && (
        <div className="nav-overlay">
          <button className="nav-overlay-close" onClick={close} aria-label="close menu">×</button>
          <ul>
            <li><a href="/about.html" onClick={close}>{lang === "pt" ? "Sobre" : "About"}</a></li>
            <li><a href="/work.html" onClick={close}>{lang === "pt" ? "Trabalhos" : "Work"}</a></li>
            <li><a href="/blog.html" onClick={close}>Blog</a></li>
            <li><a href="/contact.html" onClick={close}>{lang === "pt" ? "Contato" : "Contact"}</a></li>
          </ul>
        </div>
      )}
    </div></div>
  );
}

function PageShell({ data, dark, setDark, lang, setLang, hero, mobile, tablet, navigate, activeCaseSlug, activePostSlug }) {
  const openCase = (navigate && navigate.openCase) || (() => {});
  const openPost = (navigate && navigate.openPost) || (() => {});
  const m = (data.marks && data.marks.home) || {};
  const sc = data.sections || {};
  const rootRef = React.useRef(null);
  useCobaltCursor(rootRef);
  return (
    <div ref={rootRef} className={`wf ${dark ? "dark" : ""} ${mobile ? "wf--mobile" : ""} ${tablet ? "wf--tablet" : ""}`} id="top">
      <Nav darkOn={dark} onToggleDark={setDark} lang={lang} onLang={setLang} location={data.meta.location.toLowerCase()} mobile={mobile} />
      {hero}

      {/* About */}
      <section className="sec" id="about">
        <div className="page">
          <div className="sec-head">
            <div><div className="num">{m.aboutNum || "02 · about"}</div><span className="anno">{m.aboutAnno || "about · medium bio"}</span></div>
            <div><h2>{t(sc.aboutTitle, lang)}</h2><p className="sub">{t(sc.aboutSub, lang)}</p></div>
          </div>
          <div className="about-grid">
            <div />
            <div className="body">
              <p>{t(data.about.body, lang)}</p>
              <ul>
                {data.about.bullets.map(([n, btext], i) => (
                  <li key={i}><span className="num">{n}</span><span>{t(btext, lang)}</span></li>
                ))}
              </ul>
              <p className="signoff">{t(data.about.signoff, lang)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <section className="sec" id="work">
        <div className="page">
          <div className="sec-head">
            <div><div className="num">{m.workNum || "03 · selected work"}</div><span className="anno">{m.workAnno || "3-up grid · §5.4"}</span></div>
            <div><h2>{t(sc.workTitle, lang)}</h2><p className="sub">{t(sc.workSub, lang)}</p></div>
          </div>
          <div className="work-grid">
            {data.work.slice(0, 6).map((w, i) => {
              const linked = !!w.caseSlug;
              const active = linked && w.caseSlug === activeCaseSlug;
              return (
                <a
                  key={i}
                  className={`work-card ${linked ? "linked" : "unlinked"} ${active ? "active" : ""}`}
                  href={linked ? `#case/${w.caseSlug}` : undefined}
                  onClick={(e) => { if (linked) { e.preventDefault(); openCase(w.caseSlug); } }}
                  aria-disabled={!linked}
                >
                  <ImgSlot
                    id={w.caseSlug ? `case-cover-${w.caseSlug}` : `work-thumb-unlinked-${i}`}
                    label={`work · ${w.tone}`}
                    aspect="16/9"
                  />
                  <div className="meta">
                    <span>{w.client.toLowerCase()} · {w.year}</span>
                    {linked && <span className="link-badge">{active ? (lang === "pt" ? "aberto ↓" : "open ↓") : (lang === "pt" ? "ver →" : "read →")}</span>}
                    {!linked && <span className="link-badge link-badge--soon">{lang === "pt" ? "em breve" : "case soon"}</span>}
                  </div>
                  <h3 className="title">{t(w.title, lang)}</h3>
                  <p className="summary">{t(w.summary, lang)}</p>
                </a>
              );
            })}
          </div>
          {data.work.length > 6 && (
            <div className="work-see-all">
              <a href="/work.html" className="work-see-all__link">
                {lang === "pt" ? `ver todos (${data.work.length}) →` : `view all (${data.work.length}) →`}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Blog */}
      <section className="sec" id="blog">
        <div className="page">
          <div className="sec-head">
            <div><div className="num">{m.blogNum || "04 · blog"}</div><span className="anno">{m.blogAnno || "text-led · §5.5"}</span></div>
            <div><h2>{t(sc.blogTitle, lang)}</h2><p className="sub">{t(sc.blogSub, lang)}</p></div>
          </div>
          <div className="blog-list">
            {data.blog.map((b, i) => {
              const linked = !b.coming && !!b.slug;
              const active = linked && b.slug === activePostSlug;
              return (
                <a
                  key={i}
                  className={`blog-row ${linked ? "linked" : "unlinked"} ${active ? "active" : ""}`}
                  data-coming={b.coming || undefined}
                  href={linked ? `#post/${b.slug}` : undefined}
                  onClick={(e) => { if (linked) { e.preventDefault(); openPost(b.slug); } }}
                  aria-disabled={!linked}
                >
                  <div className="meta">{b.date} · {b.read}</div>
                  <div>
                    <h3 className="title">{t(b.title, lang)}</h3>
                    <p className="excerpt">{t(b.excerpt, lang)}</p>
                  </div>
                  <div className="read">{b.coming ? (lang === "pt" ? "em breve" : "soon") : (active ? (lang === "pt" ? "aberto ↓" : "open ↓") : (lang === "pt" ? "ler →" : "read →"))}</div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inspiration */}
      <section className="sec" id="inspiration">
        <div className="page">
          <div className="insp-head">
            <div>
              <div className="num" style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em", textTransform: "lowercase", color: "var(--muted)", marginBottom: 6 }}>{m.inspNum || "05 · weekly inspiration"}</div>
              <h2>{t(sc.inspTitle, lang)}</h2>
            </div>
            {sc.inspWeek && <div className="pill">{sc.inspWeek}</div>}
          </div>
          <div className="carousel">
            {data.inspiration.map((it, i) => (
              <div className="insp-item" key={i}>
                <ImgSlot id={`insp-${i}`} label={it.tone || "inspiration"} aspect="1/1" />
                <div className="cap"><b>{it.artist}</b><br/>{it.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact — removed; reach-out lives in the footer Connect column */}

      {/* Footer */}
      <footer className="footer">
        <div className="page footer-inner">
          <div className="f-grid">
            {/* Col 1 — Logo + Tobias quote */}
            <div className="f-col f-brand">
              <img src="assets/akc_logo_white.svg" alt="AKC" className="f-logo" />
              <blockquote className="f-quote">
                <p>{sc.footerQuote}</p>
                <cite>— {sc.footerQuoteAuthor}</cite>
              </blockquote>
            </div>

            {/* Col 2 — Sitemap */}
            <div className="f-col">
              <h4>{lang === "pt" ? "Mapa do site" : "Sitemap"}</h4>
              <ul>
                <li><a href="#top">Home</a></li>
                <li><a href="#about">{lang === "pt" ? "Sobre" : "About"}</a></li>
                <li><a href="#work">{lang === "pt" ? "Trabalhos" : "Work"}</a></li>
                <li><a href="#blog">{lang === "pt" ? "Blog" : "Blog"}</a></li>
                <li><a href="#inspiration">{lang === "pt" ? "Inspiração" : "Inspiration"}</a></li>
              </ul>
            </div>

            {/* Col 3 — Socials (plain text, linked) */}
            <div className="f-col">
              <h4>{lang === "pt" ? "Contato" : "Connect"}</h4>
              <ul>
                {data.socials.map((s, i) => (
                  <li key={i}>
                    <a href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{s.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Newsletter signup */}
            <div className="f-col f-news">
              <h4>{t(data.newsletter.title, lang)}</h4>
              <p className="f-news-blurb">{t(data.newsletter.blurb, lang)}</p>
              <NewsletterForm n={data.newsletter} lang={lang} />
            </div>
          </div>

          <div className="f-bottom">
            <div className="f-meta">
              <span>© 2026 · {data.meta.name.toLowerCase()}</span>
              <span className="dot">·</span>
              <span>{data.meta.location.toLowerCase()}, br · <LiveTime /></span>
            </div>
            <div className="f-version">{sc.footerVersion}</div>
            <a href="#top" className="f-top-link">back to top <span className="arr">↑</span></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Variation A — quiet editorial hero ────────────────────────────
function VariationA({ data, dark, setDark }) {
  const lead = data.hero.leadA;
  const hl = data.hero.highlight;
  const parts = useMemo(() => {
    if (!hl) return [{ t: lead, h: false }];
    const idx = lead.toLowerCase().indexOf(hl.toLowerCase());
    if (idx < 0) return [{ t: lead, h: false }];
    return [
      { t: lead.slice(0, idx), h: false },
      { t: lead.slice(idx, idx + hl.length), h: true },
      { t: lead.slice(idx + hl.length), h: false },
    ];
  }, [lead, hl]);
  const hero = (
    <section className="heroA">
      <div className="page">
        <div className="eyebrow">{t(data.hero.eyebrow, "en")}</div>
        <h1 className="lead">
          {parts.map((p, i) => p.h ? <em key={i}>{p.t}</em> : <span key={i}>{p.t}</span>)}
        </h1>
        <div className="role">
          <div className="micro micro--strong">{t(data.meta.role, "en").toLowerCase()}</div>
          <div className="desc">
            {t(data.hero.proof, "en")} <br />
            {data.hero.roleLine}
          </div>
          <div className="portrait-wrap">
            <Placeholder label="portrait · 3:4" style={{ aspectRatio: "3/4", width: 180 }} />
          </div>
        </div>
      </div>
    </section>
  );
  return <PageShell data={data} dark={dark} setDark={setDark} hero={hero} />;
}

function VariationB({ data, dark, setDark, lang, setLang, mobile, tablet, navigate, activeCaseSlug, activePostSlug }) {
  const lead = t(data.hero.leadA, lang);
  const hl = t(data.hero.highlight, lang);
  const parts = useMemo(() => {
    if (!hl) return [{ t: lead, h: false }];
    const idx = lead.toLowerCase().indexOf(hl.toLowerCase());
    if (idx < 0) return [{ t: lead, h: false }];
    const end = idx + hl.length;
    const tail = /^[.,!?]/.test(lead.slice(end)) ? 1 : 0;
    return [
      { t: lead.slice(0, idx), h: false },
      { t: lead.slice(idx, end + tail), h: true },
      { t: lead.slice(end + tail), h: false },
    ];
  }, [lead, hl]);
  const m = (data.marks && data.marks.home) || {};
  const hero = (
    <section className="heroB">
      <div className="page">
        <div className="doc-head">
          <div className="col">
            <h4>document</h4>
            <p>akc — landing</p>
            <p>{m.heroVersion}</p>
            <p className="stamp">{m.heroDate}</p>
          </div>
          <div className="col">
            <h4>filed under</h4>
            {data.hero.tag1 && <p><a href="#" className="tag">{t(data.hero.tag1, lang)}</a></p>}
            {data.hero.tag2 && <p><a href="#" className="tag">{t(data.hero.tag2, lang)}</a></p>}
            {data.hero.tag3 && <p><a href="#" className="tag">{t(data.hero.tag3, lang)}</a></p>}
          </div>
          <div className="portrait-wrap">
            <div className="portrait">
              <img src="assets/Alessandro 2.jpg" alt={data.meta.name} className="p-rest" />
              <img src="assets/Alessandro_hover.jpg" alt="" className="p-hover" aria-hidden="true" />
            </div>
            <div className="caption">akc · portrait · hover ↔</div>
          </div>
        </div>

        <div className="byline">
          <span className="micro">by</span>
          <span className="name">{data.meta.name}</span>
          <span className="sep">·</span>
          <span className="role">{t(data.meta.role, lang)}</span>
        </div>

        <h1 className="lead">{parts.map((p, i) => p.h ? <em key={i}>{p.t}</em> : <span key={i}>{p.t}</span>)}</h1>

        <p className="role-line">{t(data.hero.roleLine, lang)}</p>
      </div>
    </section>
  );
  return <PageShell data={data} dark={dark} setDark={setDark} lang={lang} setLang={setLang} hero={hero} mobile={mobile} tablet={tablet} navigate={navigate} activeCaseSlug={activeCaseSlug} activePostSlug={activePostSlug} />;
}

// Expose shared components to window so other Babel scripts (case-study.jsx,
// about-contact.jsx, etc.) can reference them regardless of load order or
// whether the main App ever renders.
function useBreakpoint() {
  const get = () => ({ mobile: window.innerWidth < 768, tablet: window.innerWidth >= 768 && window.innerWidth < 1280 });
  const [bp, setBp] = useState(get);
  useEffect(() => {
    const onResize = () => setBp(get());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return bp;
}

Object.assign(window, { Placeholder, ImgSlot, VideoBlock, Nav, PageShell, LiveTime, NewsletterForm, t, useCobaltCursor, useBreakpoint });

// ─── Admin / CMS ───────────────────────────────────────────────────
const ADMIN_TABS = [
  ["meta", "Site & contact"],
  ["hero", "Hero copy"],
  ["sections", "Home sections"],
  ["about", "About (home)"],
  ["aboutPage", "About page"],
  ["timeline", "Timeline"],
  ["clients", "Clients"],
  ["recognition", "Recognition"],
  ["contactPage", "Contact page"],
  ["cases", "Cases & work"],
  ["blog", "Blog"],
  ["newsletter", "Newsletter"],
  ["socials", "Socials"],
  ["inspiration", "Inspiration"],
  ["images", "Images"],
  ["marks", "Wireframe marks"],
  ["lang", "Language"],
];

// Bilingual field editor — renders EN + PT inputs side by side.
// value can be a plain string or {en, pt} object; always saves as {en, pt}.
function BiField({ label, value, path, set, multiline = false }) {
  const isObj = value && typeof value === "object" && ("en" in value || "pt" in value);
  const enVal = isObj ? (value.en || "") : (typeof value === "string" ? value : "");
  const ptVal = isObj ? (value.pt || "") : "";
  const upd = (lng, text) => set(path, { en: lng === "en" ? text : enVal, pt: lng === "pt" ? text : ptVal });
  const Tag = multiline ? "textarea" : "input";
  const extra = multiline ? { rows: 4 } : {};
  return (
    <div className="row2">
      <div className="field">
        <label>{label} <span style={{ opacity: 0.45, fontSize: 10, fontFamily: "var(--font-mono)" }}>EN</span></label>
        <Tag {...extra} value={enVal} onChange={(e) => upd("en", e.target.value)} />
      </div>
      <div className="field">
        <label>{label} <span style={{ opacity: 0.45, fontSize: 10, fontFamily: "var(--font-mono)" }}>PT</span></label>
        <Tag {...extra} value={ptVal} onChange={(e) => upd("pt", e.target.value)} />
      </div>
    </div>
  );
}

function AdminView({ data, setData }) {
  const [tab, setTab] = useState("meta");
  const [toast, setToast] = useState("");
  const set = (path, value) => {
    setData((s) => {
      const next = JSON.parse(JSON.stringify(s));
      let o = next;
      for (let i = 0; i < path.length - 1; i++) o = o[path[i]];
      o[path[path.length - 1]] = value;
      return next;
    });
    setToast("saved");
    clearTimeout(window.__toastT);
    window.__toastT = setTimeout(() => setToast(""), 1200);
  };
  const counts = {
    meta: 5, hero: 8, sections: Object.keys(data.sections || {}).length, about: data.about.bullets.length + 2,
    aboutPage: 5 + (data.aboutPage?.practice?.length || 0),
    timeline: (data.timeline || []).length,
    clients: (data.clients || []).length,
    recognition: (data.recognition || []).length,
    contactPage: 4 + ((data.contactPage?.fit || []).reduce((a, f) => a + (f.items?.length || 0), 0)),
    cases: (data.cases || []).length + (data.work || []).filter((w) => !w.caseSlug).length,
    blog: data.blog.length,
    newsletter: 5, socials: data.socials.length,
    inspiration: data.inspiration.length,
    images: (data.work || []).length + (data.cases || []).reduce((a, c) => a + 1 + (c.output || []).reduce((b, o) => b + (o.kind === "twin" ? 2 : 1), 0), 0),
    marks: Object.values(data.marks || {}).reduce((a, s) => a + Object.keys(s).length, 0),
    lang: 2,
  };

  return (
    <div className="admin">
      <div className="topbar">
        <div className="brand">AKC · CMS</div>
        <div className="crumb">/admin · hi-fi sketch</div>
        <div className="actions">
          <button className="btn" onClick={() => { if (confirm("Reset to defaults?")) { localStorage.removeItem(STORE_KEY); location.reload(); } }}>Reset</button>
          <button className="btn btn--primary">Publish</button>
        </div>
      </div>
      <div className="layout">
        <aside className="side">
          <h4>content</h4>
          <ul>
            {ADMIN_TABS.map(([k, l]) => (
              <li key={k}><button className={tab === k ? "on" : ""} onClick={() => setTab(k)}>
                <span>{l}</span><span className="count">{counts[k]}</span>
              </button></li>
            ))}
          </ul>
          <h4>system</h4>
          <ul>
            <li><button>Languages (EN · PT)</button></li>
            <li><button>Theme (light · dark)</button></li>
            <li><button>Analytics</button></li>
          </ul>
        </aside>
        <main className="main">
          {tab === "meta" && <MetaPane data={data} set={set} />}
          {tab === "hero" && <HeroPane data={data} set={set} />}
          {tab === "sections" && <HomeSectionsPane data={data} set={set} />}
          {tab === "about" && <AboutPane data={data} set={set} setData={setData} />}
          {tab === "aboutPage" && <AboutPagePane data={data} set={set} setData={setData} />}
          {tab === "timeline" && <ListPane title="Timeline" subtitle="Career chapters, in chronological order. Drives the About page timeline section." data={data} setData={setData} field="timeline" cols={[["year","Year"],["chapter","Chapter"],["role","Role"],["location","Location"],["note","Note"]]} />}
          {tab === "clients" && <StringListPane title="Clients" subtitle="Selected clients, displayed in two columns on the About page. One line per client." data={data} setData={setData} field="clients" />}
          {tab === "recognition" && <ListPane title="Recognition" subtitle="Light and honest. Talks, mentions, press. Drives the About page recognition section." data={data} setData={setData} field="recognition" cols={[["year","Year"],["item","Item"]]} />}
          {tab === "contactPage" && <ContactPagePane data={data} set={set} setData={setData} />}
          {tab === "cases" && <CasesPane data={data} setData={setData} />}
          {tab === "blog" && <BlogPane data={data} setData={setData} />}
          {tab === "newsletter" && <NewsletterPane data={data} set={set} />}
          {tab === "socials" && <ListPane title="Socials" subtitle="Plain-text contact and profile links. Appears in the footer Connect column." data={data} setData={setData} field="socials" cols={[["label","Label"],["href","URL or mailto:/tel:"]]} />}
          {tab === "inspiration" && <ListPane title="Inspiration" subtitle="Weekly cadence. 5–10 items per week." data={data} setData={setData} field="inspiration" cols={[["artist","Artist"],["note","Caption"]]} />}
          {tab === "images" && <ImagesPane data={data} />}
          {tab === "marks" && <MarksPane data={data} set={set} />}
          {tab === "lang" && <LangPane data={data} setData={setData} />}
        </main>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function ImagesPane({ data }) {
  const monoLabel = { fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: 6, textTransform: "lowercase", letterSpacing: "0.03em" };
  const grid2 = { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px 20px", marginBottom: 32 };

  // Home — only unlinked work cards (linked ones share case-cover-{slug}, shown below)
  const workSlots = (data.work || []).flatMap((w, i) => {
    if (w.caseSlug) return [];
    return [{ id: `work-thumb-unlinked-${i}`, label: `${w.client || "card"} · ${w.year || "—"}`, aspect: "16/9" }];
  });

  // Cases — each case is its own section
  const caseGroups = (data.cases || []).map((c) => {
    const cover = { id: `case-cover-${c.slug}`, label: "cover · 16:9", aspect: "16/9" };
    const outputs = (c.output || []).flatMap((blk, i) => {
      if (blk.kind === "video") return []; // vídeos não têm image slot
      const base = `case-output-${c.slug}-${i}`;
      if (blk.kind === "twin") return [
        { id: `${base}-a`, label: blk.labels[0], aspect: "4/5" },
        { id: `${base}-b`, label: blk.labels[1], aspect: "4/5" },
      ];
      const asp = blk.kind === "detail" ? "3/2" : "16/9";
      return [{ id: base, label: blk.label || blk.kind, aspect: asp }];
    });
    return { title: `${c.meta.client} · ${c.meta.year}`, slots: [cover, ...outputs] };
  });

  // Inspiration — one slot per item (index-keyed, matches carousel rendering)
  const inspSlots = (data.inspiration || []).map((it, i) => ({
    id: `insp-${i}`,
    label: `${it.artist} · ${it.note}`,
    aspect: "1/1",
  }));

  // Blog posts — cover + inline figures per post (skip "coming soon")
  const postGroups = (data.blog || []).filter((b) => !b.coming && b.slug).map((b) => {
    const title = typeof b.title === "object" ? b.title.en : b.title;
    const cover = { id: `post-cover-${b.slug}`, label: "cover · 16:9", aspect: "16/9" };
    const figures = (b.body || []).flatMap((blk, i) => {
      if (blk.kind === "figure") return [{ id: `post-fig-${b.slug}-${i}`, label: blk.label || "figure", aspect: blk.aspect || "16/9" }];
      if (blk.kind === "twin") return [
        { id: `post-fig-${b.slug}-${i}-a`, label: blk.a?.label || "twin a", aspect: blk.a?.aspect || "4/5" },
        { id: `post-fig-${b.slug}-${i}-b`, label: blk.b?.label || "twin b", aspect: blk.b?.aspect || "4/5" },
      ];
      return [];
    });
    return { title: `${title} · ${b.date}`, slots: [cover, ...figures] };
  });

  const SlotGrid = ({ slots }) => (
    <div style={grid2}>
      {slots.map((slot) => (
        <div key={slot.id}>
          <div style={monoLabel}>{slot.label}</div>
          <ImgSlot id={slot.id} label={slot.label} aspect={slot.aspect} />
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <h1>Images</h1>
      <p className="subhead">Arraste ou clique para fazer upload. Salvo no servidor e refletido em todas as páginas.</p>

      {/* Home */}
      {workSlots.length > 0 && (
        <div>
          <div className="group-head" style={{ marginTop: 24 }}>Home · work cards</div>
          <SlotGrid slots={workSlots} />
        </div>
      )}

      {/* One section per case */}
      {caseGroups.map(({ title, slots }) => (
        <div key={title}>
          <div className="group-head" style={{ marginTop: 8 }}>{title}</div>
          <SlotGrid slots={slots} />
        </div>
      ))}

      {/* Inspiration */}
      {inspSlots.length > 0 && (
        <div>
          <div className="group-head" style={{ marginTop: 8 }}>Home · inspiration</div>
          <SlotGrid slots={inspSlots} />
        </div>
      )}

      {/* One section per blog post */}
      {postGroups.map(({ title, slots }) => (
        <div key={title}>
          <div className="group-head" style={{ marginTop: 8 }}>{title}</div>
          <SlotGrid slots={slots} />
        </div>
      ))}
    </div>
  );
}

function HomeSectionsPane({ data, set }) {
  const sc = data.sections || {};
  return (
    <div>
      <h1>Home sections</h1>
      <p className="subhead">Campos bilíngues — EN e PT lado a lado.</p>
      <div className="group-head">about section</div>
      <BiField label="Title" value={sc.aboutTitle} path={["sections", "aboutTitle"]} set={set} />
      <BiField label="Subtitle" value={sc.aboutSub} path={["sections", "aboutSub"]} set={set} />
      <div className="group-head">work section</div>
      <BiField label="Title" value={sc.workTitle} path={["sections", "workTitle"]} set={set} />
      <BiField label="Subtitle" value={sc.workSub} path={["sections", "workSub"]} set={set} />
      <div className="group-head">blog section</div>
      <BiField label="Title" value={sc.blogTitle} path={["sections", "blogTitle"]} set={set} />
      <BiField label="Subtitle" value={sc.blogSub} path={["sections", "blogSub"]} set={set} />
      <div className="group-head">inspiration section</div>
      <BiField label="Title" value={sc.inspTitle} path={["sections", "inspTitle"]} set={set} />
      <div className="field"><label>Week pill</label><input value={sc.inspWeek || ""} onChange={(e) => set(["sections", "inspWeek"], e.target.value)} /></div>
      <div className="group-head">footer</div>
      <div className="field"><label>Quote text</label><textarea rows={4} value={sc.footerQuote || ""} onChange={(e) => set(["sections", "footerQuote"], e.target.value)} /></div>
      <div className="row2">
        <div className="field"><label>Quote author</label><input value={sc.footerQuoteAuthor || ""} onChange={(e) => set(["sections", "footerQuoteAuthor"], e.target.value)} /></div>
        <div className="field"><label>Version string</label><input value={sc.footerVersion || ""} onChange={(e) => set(["sections", "footerVersion"], e.target.value)} /></div>
      </div>
    </div>
  );
}
function MetaPane({ data, set }) {
  const m = data.meta;
  return (
    <div>
      <h1>Site & contact</h1>
      <p className="subhead">Identity — appears in nav, contact, footer, signature.</p>
      <div className="row2">
        <div className="field"><label>Name</label><input value={m.name || ""} onChange={(e) => set(["meta", "name"], e.target.value)} /></div>
        <div className="field"><label>Email</label><input value={m.email || ""} onChange={(e) => set(["meta", "email"], e.target.value)} /></div>
        <div className="field"><label>LinkedIn</label><input value={m.linkedin || ""} onChange={(e) => set(["meta", "linkedin"], e.target.value)} /></div>
        <div className="field"><label>Location</label><input value={m.location || ""} onChange={(e) => set(["meta", "location"], e.target.value)} /></div>
        <div className="field"><label>Domain</label><input value={m.domain || ""} onChange={(e) => set(["meta", "domain"], e.target.value)} /></div>
      </div>
      <BiField label="Role / title" value={m.role} path={["meta", "role"]} set={set} />
    </div>
  );
}
function HeroPane({ data, set }) {
  const h = data.hero;
  return (
    <div>
      <h1>Hero copy</h1>
      <p className="subhead">Campos bilíngues — edite EN e PT lado a lado.</p>
      <BiField label="Lead phrase" value={h.leadA} path={["hero", "leadA"]} set={set} />
      <BiField label="Role line" value={h.roleLine} path={["hero", "roleLine"]} set={set} />
      <BiField label="Highlighted word (lume)" value={h.highlight} path={["hero", "highlight"]} set={set} />
      <BiField label="Eyebrow" value={h.eyebrow} path={["hero", "eyebrow"]} set={set} />
      <BiField label="Proof phrase" value={h.proof} path={["hero", "proof"]} set={set} />
      <div className="group-head">filed under · tags</div>
      <BiField label="Tag 1" value={h.tag1} path={["hero", "tag1"]} set={set} />
      <BiField label="Tag 2" value={h.tag2} path={["hero", "tag2"]} set={set} />
      <div className="field"><label>Tag 3</label><input value={typeof h.tag3 === "string" ? h.tag3 : (h.tag3 && h.tag3.en) || ""} onChange={(e) => set(["hero", "tag3"], e.target.value)} /></div>
    </div>
  );
}
function AboutPane({ data, set, setData }) {
  const a = data.about;
  const setBulletCopy = (i, val) => setData((s) => {
    const n = JSON.parse(JSON.stringify(s));
    n.about.bullets[i][1] = val;
    return n;
  });
  const setBulletNum = (i, val) => setData((s) => {
    const n = JSON.parse(JSON.stringify(s));
    n.about.bullets[i][0] = val;
    return n;
  });
  const addBullet = () => setData((s) => ({ ...s, about: { ...s.about, bullets: [...s.about.bullets, [String(s.about.bullets.length + 1).padStart(2, "0"), { en: "New proof point.", pt: "Novo ponto de prova." }]] } }));
  const removeBullet = (i) => setData((s) => ({ ...s, about: { ...s.about, bullets: s.about.bullets.filter((_, k) => k !== i) } }));
  return (
    <div>
      <h1>About</h1>
      <p className="subhead">Medium bio surface. Proof phrase, paragraph, three quantified bullets, sign-off.</p>
      <BiField label="Proof phrase (opener)" value={a.proof} path={["about", "proof"]} set={set} />
      <BiField label="Paragraph" value={a.body} path={["about", "body"]} set={set} multiline />
      <div className="group-head">proof points</div>
      {a.bullets.map((b, i) => (
        <div key={i} style={{ border: "1px solid var(--border)", padding: "10px 12px", marginBottom: 10 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
            <div className="field" style={{ marginBottom: 0, width: 60 }}><label>num</label><input value={b[0]} onChange={(e) => setBulletNum(i, e.target.value)} /></div>
            <button className="add-btn" style={{ height: 36, marginLeft: "auto" }} onClick={() => removeBullet(i)}>remove</button>
          </div>
          <BiField label="copy" value={b[1]} path={null} set={(_, val) => setBulletCopy(i, val)} />
        </div>
      ))}
      <button className="add-btn" onClick={addBullet}>+ add proof point</button>
      <div style={{ marginTop: 24 }}>
        <BiField label="Sign-off" value={a.signoff} path={["about", "signoff"]} set={set} />
      </div>
    </div>
  );
}
// ─── About / Contact extended panes ─────────────────────────
function AboutPagePane({ data, set, setData }) {
  const a = data.aboutPage || {};
  return (
    <div>
      <h1>About page</h1>
      <p className="subhead">Long-form bio surface. Opener copy, intro paragraph, body, and the practice key/value list.</p>
      <div className="field"><label>Eyebrow</label><input value={a.eyebrow || ""} onChange={(e) => set(["aboutPage", "eyebrow"], e.target.value)} /></div>
      <div className="field"><label>Title</label><textarea rows={2} value={a.title || ""} onChange={(e) => set(["aboutPage", "title"], e.target.value)} /></div>
      <div className="field"><label>Intro (italic Migra paragraph)</label><textarea rows={3} value={a.intro || ""} onChange={(e) => set(["aboutPage", "intro"], e.target.value)} /></div>
      <div className="field"><label>Body</label><textarea rows={6} value={a.body || ""} onChange={(e) => set(["aboutPage", "body"], e.target.value)} /></div>

      <div className="group-head">practice (key / value)</div>
      {(a.practice || []).map((row, i) => (
        <div key={i} className="row2" style={{ gridTemplateColumns: "160px 1fr 80px", alignItems: "end", marginBottom: 10 }}>
          <div className="field" style={{ marginBottom: 0 }}><input value={row[0]} placeholder="key" onChange={(e) => setData((s) => { const n = JSON.parse(JSON.stringify(s)); n.aboutPage.practice[i][0] = e.target.value; return n; })} /></div>
          <div className="field" style={{ marginBottom: 0 }}><input value={row[1]} placeholder="value" onChange={(e) => setData((s) => { const n = JSON.parse(JSON.stringify(s)); n.aboutPage.practice[i][1] = e.target.value; return n; })} /></div>
          <button className="add-btn" style={{ height: 38 }} onClick={() => setData((s) => { const n = JSON.parse(JSON.stringify(s)); n.aboutPage.practice = n.aboutPage.practice.filter((_, k) => k !== i); return n; })}>remove</button>
        </div>
      ))}
      <button className="add-btn" onClick={() => set(["aboutPage", "practice"], [...(a.practice || []), ["key", "value"]])}>+ row</button>
    </div>
  );
}

function ContactPagePane({ data, set, setData }) {
  const c = data.contactPage || {};
  return (
    <div>
      <h1>Contact page</h1>
      <p className="subhead">Opener copy, response policy, fit / not-fit lists, and the form's intro.</p>
      <div className="row2">
        <div className="field"><label>Eyebrow</label><input value={c.eyebrow || ""} onChange={(e) => set(["contactPage", "eyebrow"], e.target.value)} /></div>
        <div className="field"><label>Title</label><input value={c.title || ""} onChange={(e) => set(["contactPage", "title"], e.target.value)} /></div>
      </div>
      <div className="field"><label>Intro</label><textarea rows={3} value={c.intro || ""} onChange={(e) => set(["contactPage", "intro"], e.target.value)} /></div>
      <div className="field"><label>Response policy</label><input value={c.response || ""} onChange={(e) => set(["contactPage", "response"], e.target.value)} /></div>

      <div className="group-head">fit / not-fit columns</div>
      {(c.fit || []).map((col, ci) => (
        <div key={ci} style={{ marginBottom: 24, padding: 16, border: "1px solid var(--rule-light)" }}>
          <div className="row2" style={{ gridTemplateColumns: "160px 1fr", alignItems: "end" }}>
            <div className="field" style={{ marginBottom: 0 }}>
              <label>kind</label>
              <select value={col.kind} onChange={(e) => set(["contactPage", "fit", ci, "kind"], e.target.value)}>
                <option value="yes">yes (good fit)</option>
                <option value="no">no (not a fit)</option>
              </select>
            </div>
            <div className="field" style={{ marginBottom: 0 }}><label>title</label><input value={col.title} onChange={(e) => set(["contactPage", "fit", ci, "title"], e.target.value)} /></div>
          </div>
          <label className="mini-label">items (one per line)</label>
          <textarea rows={4} value={(col.items || []).join("\n")} onChange={(e) => set(["contactPage", "fit", ci, "items"], e.target.value.split("\n").filter(Boolean))} style={{ width: "100%", font: "14px/1.5 var(--font-sans)", padding: "10px 12px", border: "1px solid var(--rule-light)", borderRadius: 0, background: "white" }} />
        </div>
      ))}

      <div className="group-head">form intro</div>
      <div className="row2">
        <div className="field"><label>Form headline</label><input value={c.form?.head || ""} onChange={(e) => set(["contactPage", "form", "head"], e.target.value)} /></div>
        <div className="field"><label>Form blurb</label><input value={c.form?.blurb || ""} onChange={(e) => set(["contactPage", "form", "blurb"], e.target.value)} /></div>
      </div>
    </div>
  );
}

// Plain-string list editor — used by the Clients pane (and any other
// surface where the model is just an array of strings).
function StringListPane({ title, subtitle, data, setData, field }) {
  const items = data[field] || [];
  const update = (i, v) => setData((s) => {
    const n = JSON.parse(JSON.stringify(s));
    n[field][i] = v;
    return n;
  });
  const add = () => setData((s) => ({ ...s, [field]: [...(s[field] || []), ""] }));
  const remove = (i) => setData((s) => ({ ...s, [field]: s[field].filter((_, k) => k !== i) }));
  const move = (i, dir) => setData((s) => {
    const arr = [...s[field]];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return s;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    return { ...s, [field]: arr };
  });
  return (
    <div>
      <h1>{title}</h1>
      <p className="subhead">{subtitle}</p>
      <div className="card-list">
        {items.map((it, i) => (
          <div className="card-row" key={i} style={{ gridTemplateColumns: "1fr auto" }}>
            <div className="field" style={{ marginBottom: 0 }}>
              <input value={it} onChange={(e) => update(i, e.target.value)} />
            </div>
            <div className="ctrls">
              <button onClick={() => move(i, -1)}>↑</button>
              <button onClick={() => move(i, +1)}>↓</button>
              <button onClick={() => remove(i)}>delete</button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-btn" onClick={add}>+ add</button>
    </div>
  );
}

function NewsletterPane({ data, set }) {
  const n = data.newsletter;
  return (
    <div>
      <h1>Newsletter</h1>
      <p className="subhead">The blog list, mirrored as email. Each new blog post in the table is sent to the newsletter list when published.</p>
      <div className="row2">
        <div className="field"><label>Section title</label><input value={n.title} onChange={(e) => set(["newsletter", "title"], e.target.value)} /></div>
        <div className="field"><label>CTA button label</label><input value={n.cta} onChange={(e) => set(["newsletter", "cta"], e.target.value)} /></div>
      </div>
      <div className="field"><label>Blurb (under the title)</label><textarea rows={3} value={n.blurb} onChange={(e) => set(["newsletter", "blurb"], e.target.value)} /></div>
      <div className="row2">
        <div className="field"><label>Input placeholder</label><input value={n.placeholder} onChange={(e) => set(["newsletter", "placeholder"], e.target.value)} /></div>
        <div className="field"><label>Success message</label><input value={n.success} onChange={(e) => set(["newsletter", "success"], e.target.value)} /></div>
      </div>
      <div className="group-head">delivery</div>
      <p className="subhead" style={{ marginBottom: 16 }}>Connect your email provider. New blog posts are pushed to this list on publish.</p>
      <div className="row2">
        <div className="field">
          <label>Provider</label>
          <select value={n.provider} onChange={(e) => set(["newsletter", "provider"], e.target.value)}>
            <option value="buttondown">Buttondown</option>
            <option value="substack">Substack</option>
            <option value="mailchimp">Mailchimp</option>
            <option value="convertkit">ConvertKit</option>
            <option value="resend">Resend</option>
          </select>
        </div>
        <div className="field"><label>List / publication ID</label><input value={n.listId} onChange={(e) => set(["newsletter", "listId"], e.target.value)} /></div>
      </div>
      <div className="callout">
        <span className="dot" /> blog → newsletter
        <p>Each row in the <b>Blog</b> table is published to this list as a broadcast on save. Existing rows can be re-sent from the row's action menu (hi-fi: not wired in this prototype).</p>
      </div>
    </div>
  );
}

// Wireframe-marks editor. The store keeps section numbers, anno pills, and
// version stamps under data.marks[surface][key] — this pane lets the user
// retitle them or remove them entirely (set to "") without touching code.
function MarksPane({ data, set }) {
  const marks = data.marks || {};
  const surfaces = [
    { key: "home", title: "Home", desc: "Section numbers and anno pills on the landing page." },
    { key: "case", title: "Case study", desc: "Numbers and anno pills on the case template." },
    { key: "post", title: "Blog post", desc: "Inline labels on the post template." },
    { key: "about", title: "About page", desc: "Numbers and anno pills on the about template." },
    { key: "contact", title: "Contact page", desc: "Numbers and anno pills on the contact template." },
  ];
  return (
    <div>
      <h1>Wireframe marks</h1>
      <p className="subhead">Section numbers (<b>01 · brief</b>), yellow anno pills (<b>// case study · template</b>), version stamps. Useful for review; leave a field empty to hide that mark.</p>
      {surfaces.map(({ key, title, desc }) => {
        const surface = marks[key] || {};
        return (
          <div key={key}>
            <div className="group-head">{key} · {title}</div>
            <p className="subhead" style={{ margin: "-8px 0 16px" }}>{desc}</p>
            <div className="row2">
              {Object.entries(surface).map(([k, v]) => (
                <div key={k} className="field">
                  <label>{k}</label>
                  <input value={v || ""} onChange={(e) => set(["marks", key, k], e.target.value)} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Language pane — informational. Shows the current lang, lets you flip it
// for preview, and explains the bilingual schema (string OR {en,pt}).
function LangPane({ data, setData }) {
  const lang = data.lang || "en";
  return (
    <div>
      <h1>Language</h1>
      <p className="subhead">The site renders in one language at a time. Toggle below to preview the current state — wireframes mirror immediately.</p>
      <div className="row2" style={{ gridTemplateColumns: "1fr 1fr", maxWidth: 480, marginBottom: 32 }}>
        <button
          className={`add-btn ${lang === "en" ? "btn--primary" : ""}`}
          onClick={() => setData((s) => ({ ...s, lang: "en" }))}
          style={{ borderColor: lang === "en" ? "var(--color-accent-loud)" : undefined, color: lang === "en" ? "var(--color-accent-loud)" : undefined, fontWeight: 500 }}
        >English {lang === "en" && "· active"}</button>
        <button
          className={`add-btn ${lang === "pt" ? "btn--primary" : ""}`}
          onClick={() => setData((s) => ({ ...s, lang: "pt" }))}
          style={{ borderColor: lang === "pt" ? "var(--color-accent-loud)" : undefined, color: lang === "pt" ? "var(--color-accent-loud)" : undefined, fontWeight: 500 }}
        >Português {lang === "pt" && "· ativo"}</button>
      </div>

      <div className="group-head">bilingual schema</div>
      <div className="callout">
        <span className="dot" /> how to author bilingual fields
        <p style={{ marginTop: 8 }}>
          Any text field in the store can be authored as either:
        </p>
        <p style={{ marginTop: 8, fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.5 }}>
          <b>plain string</b> — shows in every language unchanged.<br />
          <b>{"{ en: \"…\", pt: \"…\" }"}</b> — picks the value for the current lang.
        </p>
        <p style={{ marginTop: 8 }}>
          All major content fields are bilingual. Edit EN and PT side by side in each pane — the toggle above instantly previews how the page reads in each language.
        </p>
      </div>
    </div>
  );
}

// Master-detail editor for case studies. Reads/writes data.cases[], and
// drives the case-study artboards via data.activeCaseSlug.
function CasesPane({ data, setData }) {
  const cases = data.cases || [];
  const [selSlug, setSelSlug] = useState(data.activeCaseSlug || (cases[0] && cases[0].slug));
  const idx = Math.max(0, cases.findIndex((c) => c.slug === selSlug));
  const c = cases[idx];

  // setCase(path, value) — patch a path inside cases[idx]
  const setCase = (path, value) => {
    setData((s) => {
      const next = JSON.parse(JSON.stringify(s));
      let o = next.cases[idx];
      for (let i = 0; i < path.length - 1; i++) {
        if (o[path[i]] == null) o[path[i]] = (typeof path[i + 1] === "number" ? [] : {});
        o = o[path[i]];
      }
      o[path[path.length - 1]] = value;
      return next;
    });
  };

  // setWork(key, value) — patch the work entry linked to this case
  const setWork = (key, value) => {
    setData((s) => {
      const next = JSON.parse(JSON.stringify(s));
      const wi = next.work.findIndex((w) => w.caseSlug === c.slug);
      if (wi === -1) return s;
      next.work[wi][key] = value;
      return next;
    });
  };

  const setActive = (slug) => {
    setSelSlug(slug);
    setData((s) => ({ ...s, activeCaseSlug: slug }));
  };

  const addCase = () => {
    const n = cases.length + 1;
    const slug = `case-${Date.now()}`;
    const newCase = {
      slug,
      meta: { num: `case 0${n}`, client: "New client", project: "New project", year: "2026",
        role: { en: "Creative Director", pt: "Diretor Criativo" }, status: "draft", sector: "—", deliverables: [] },
      brief: { head: { en: "—", pt: "—" }, body: { en: "—", pt: "—" }, callouts: [] },
      approach: [], output: [], results: [],
      quote: { text: { en: "", pt: "" }, author: "", role: { en: "", pt: "" } },
      credits: [],
      nextSlug: cases[0] ? cases[0].slug : null,
    };
    setData((s) => ({
      ...s,
      cases: [...s.cases, newCase],
      // Auto-create a linked Work entry so the case appears in the work grid
      work: [...s.work, {
        client: "New client", year: "2026",
        title: { en: "New project", pt: "Novo projeto" },
        summary: { en: "—", pt: "—" },
        tone: "depth", caseSlug: slug,
      }],
    }));
    setSelSlug(slug);
  };

  const moveCase = (dir) => {
    const arr = [...cases];
    const j = idx + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[idx], arr[j]] = [arr[j], arr[idx]];
    setData((s) => ({ ...s, cases: arr }));
  };

  const removeCase = () => {
    if (!confirm(`Delete "${c.meta.client}"? This can't be undone.`)) return;
    const slug = c.slug;
    const remaining = cases.filter((x) => x.slug !== slug);
    setData((s) => ({
      ...s,
      cases: remaining,
      activeCaseSlug: remaining[0] ? remaining[0].slug : null,
      // Unlink any Work entries that pointed to this case
      work: s.work.map((w) => w.caseSlug === slug ? { ...w, caseSlug: null } : w),
    }));
    if (remaining[0]) setSelSlug(remaining[0].slug);
    else setSelSlug(null);
  };

  if (!c) {
    return (
      <div>
        <h1>Case studies</h1>
        <p className="subhead">No cases yet.</p>
        <button className="add-btn" onClick={addCase}>+ add case</button>
      </div>
    );
  }

  // Nested-array helpers — approach steps, output blocks, results KPIs,
  // credits rows, deliverables list, brief callouts.
  const arrPush = (key, blank) => setData((s) => {
    const n = JSON.parse(JSON.stringify(s));
    n.cases[idx][key] = [...(n.cases[idx][key] || []), blank];
    return n;
  });
  const arrSplice = (key, i) => setData((s) => {
    const n = JSON.parse(JSON.stringify(s));
    n.cases[idx][key] = n.cases[idx][key].filter((_, k) => k !== i);
    return n;
  });

  return (
    <div className="cases-pane">
      <div className="cases-top">
        <h1>Case studies</h1>
        <p className="subhead">Each Work entry can link to one of these. The active case is rendered in the canvas above. <b>{cases.length}</b> cases.</p>
      </div>

      <div className="cases-layout">
        {/* Left: case list */}
        <div className="cases-list">
          <div className="cases-list-head">cases</div>
          <ul>
            {cases.map((cc, ci) => (
              <li key={cc.slug} style={{ display: "flex", alignItems: "stretch" }}>
                <button className={cc.slug === selSlug ? "on" : ""} onClick={() => setActive(cc.slug)} style={{ flex: 1 }}>
                  <span className="cl-num">{cc.meta.num}</span>
                  <span className="cl-title">{cc.meta.project}</span>
                  <span className="cl-client">{cc.meta.client.toLowerCase()} · {cc.meta.year}</span>
                </button>
                {cc.slug === selSlug && (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <button onClick={() => moveCase(-1)} disabled={ci === 0} style={{ flex: 1, padding: "0 6px", fontSize: 11 }}>↑</button>
                    <button onClick={() => moveCase(+1)} disabled={ci === cases.length - 1} style={{ flex: 1, padding: "0 6px", fontSize: 11 }}>↓</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <button className="add-btn" onClick={addCase}>+ add case</button>
        </div>

        {/* Right: detail editor */}
        <div className="cases-detail">
          <div className="cases-detail-head">
            <div>
              <div className="cl-num">{c.meta.num}</div>
              <h2>{c.meta.project || "—"}</h2>
            </div>
            <button className="add-btn" style={{ color: "var(--color-accent-quiet)" }} onClick={removeCase}>delete case</button>
          </div>

          {/* ── Home card ── */}
          {(() => {
            const w = (data.work || []).find((w) => w.caseSlug === c.slug);
            if (!w) return (
              <div className="group-head" style={{ color: "var(--muted)" }}>home card · not linked to a work entry</div>
            );
            return (
              <>
                <div className="group-head">home card</div>
                <div className="row2">
                  <div className="field"><label>Client</label><input value={w.client || ""} onChange={(e) => setWork("client", e.target.value)} /></div>
                  <div className="field"><label>Year</label><input value={w.year || ""} onChange={(e) => setWork("year", e.target.value)} /></div>
                </div>
                <BiField label="Title" value={w.title} path={null} set={(_, val) => setWork("title", val)} />
                <BiField label="Summary" value={w.summary} path={null} set={(_, val) => setWork("summary", val)} multiline />
                <div className="field">
                  <label>Tone</label>
                  <select value={w.tone || "depth"} onChange={(e) => setWork("tone", e.target.value)}>
                    <option value="depth">depth</option>
                    <option value="tonal">tonal</option>
                    <option value="kinetic">kinetic</option>
                  </select>
                </div>
              </>
            );
          })()}

          <div className="group-head">cover image</div>
          <ImgSlot id={`case-cover-${c.slug}`} label="cover · 16:9" aspect="16/9" />

          <div className="group-head" style={{ marginTop: 24 }}>cover meta</div>
          <div className="row2">
            <div className="field"><label>Slug</label><input value={c.slug} onChange={(e) => setCase(["slug"], e.target.value)} /></div>
            <div className="field"><label>Case number label</label><input value={c.meta.num} onChange={(e) => setCase(["meta", "num"], e.target.value)} /></div>
            <div className="field"><label>Client</label><input value={c.meta.client} onChange={(e) => setCase(["meta", "client"], e.target.value)} /></div>
            <div className="field"><label>Project title</label><input value={c.meta.project} onChange={(e) => setCase(["meta", "project"], e.target.value)} /></div>
            <div className="field"><label>Year(s)</label><input value={c.meta.year} onChange={(e) => setCase(["meta", "year"], e.target.value)} /></div>
            <div className="field"><label>Sector</label><input value={c.meta.sector} onChange={(e) => setCase(["meta", "sector"], e.target.value)} /></div>
            <div className="field"><label>Status</label>
              <select value={c.meta.status} onChange={(e) => setCase(["meta", "status"], e.target.value)}>
                <option>draft</option><option>ongoing</option><option>shipped</option>
              </select>
            </div>
          </div>
          <BiField label="Role" value={c.meta.role} path={["meta", "role"]} set={setCase} />
          <div className="field">
            <label>Deliverables (one per line)</label>
            <textarea rows={4} value={(c.meta.deliverables || []).join("\n")} onChange={(e) => setCase(["meta", "deliverables"], e.target.value.split("\n").filter(Boolean))} />
          </div>

          <div className="group-head">01 brief</div>
          <BiField label="Headline" value={c.brief.head} path={["brief", "head"]} set={setCase} />
          <BiField label="Body" value={c.brief.body} path={["brief", "body"]} set={setCase} multiline />
          <label className="mini-label">Callouts (key / value)</label>
          {(c.brief.callouts || []).map((co, i) => (
            <div key={i} className="row2" style={{ gridTemplateColumns: "140px 1fr 80px", alignItems: "end", marginBottom: 10 }}>
              <div className="field" style={{ marginBottom: 0 }}><input value={co[0]} placeholder="key" onChange={(e) => setCase(["brief", "callouts", i, 0], e.target.value)} /></div>
              <div className="field" style={{ marginBottom: 0 }}><input value={typeof co[1] === "object" ? (co[1].en || "") : (co[1] || "")} placeholder="value" onChange={(e) => setCase(["brief", "callouts", i, 1], e.target.value)} /></div>
              <button className="add-btn" style={{ height: 38 }} onClick={() => setData((s) => {
                const n = JSON.parse(JSON.stringify(s));
                n.cases[idx].brief.callouts = n.cases[idx].brief.callouts.filter((_, k) => k !== i);
                return n;
              })}>remove</button>
            </div>
          ))}
          <button className="add-btn" onClick={() => setCase(["brief", "callouts"], [...(c.brief.callouts || []), ["key", "value"]])}>+ callout</button>

          <div className="group-head">02 approach</div>
          {(c.approach || []).map((s, i) => (
            <div key={i} style={{ border: "1px solid var(--border)", padding: "10px 12px", marginBottom: 10 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                <div className="field" style={{ marginBottom: 0, width: 70 }}><label>num</label><input value={s.num} onChange={(e) => setCase(["approach", i, "num"], e.target.value)} /></div>
                <button className="add-btn" style={{ height: 36, marginLeft: "auto" }} onClick={() => arrSplice("approach", i)}>remove</button>
              </div>
              <BiField label="title" value={s.title} path={["approach", i, "title"]} set={setCase} />
              <BiField label="body" value={s.body} path={["approach", i, "body"]} set={setCase} multiline />
            </div>
          ))}
          <button className="add-btn" onClick={() => arrPush("approach", { num: String((c.approach || []).length + 1).padStart(2, "0"), title: { en: "Step", pt: "Passo" }, body: { en: "—", pt: "—" } })}>+ step</button>

          <div className="group-head">03 output</div>
          {(c.output || []).map((o, i) => {
            const base = `case-output-${c.slug}-${i}`;
            const isTwin = o.kind === "twin";
            const isVideo = o.kind === "video";
            return (
              <div key={i} style={{ border: "1px solid var(--border)", padding: "12px 14px", marginBottom: 10 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                  <select value={o.kind} onChange={(e) => setCase(["output", i, "kind"], e.target.value)}
                    style={{ fontFamily: "var(--font-mono)", fontSize: 11, padding: "4px 6px", background: "var(--input-bg)", color: "var(--fg)", border: "1px solid var(--border)" }}>
                    <option value="full">imagem · full 16:9</option>
                    <option value="wide">imagem · wide 16:9</option>
                    <option value="detail">imagem · detail 3:2</option>
                    <option value="twin">imagem · twin 4:5</option>
                    <option value="video">vídeo · 16:9</option>
                  </select>
                  <button onClick={() => arrSplice("output", i)} style={{ marginLeft: "auto" }}>remove</button>
                </div>
                {isVideo ? (
                  <VideoAdminSlot
                    id={base}
                    url={o.url || ""}
                    onUrlChange={(url) => setCase(["output", i, "url"], url)}
                    aspect="16/9"
                  />
                ) : isTwin ? (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 8 }}>
                    <div>
                      <ImgSlot id={`${base}-a`} label={(o.labels && o.labels[0]) || "twin a · 4:5"} aspect="4/5" />
                      <div className="field" style={{ marginTop: 6, marginBottom: 0 }}>
                        <label>label a</label>
                        <input value={(o.labels && o.labels[0]) || ""} onChange={(e) => setCase(["output", i, "labels", 0], e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <ImgSlot id={`${base}-b`} label={(o.labels && o.labels[1]) || "twin b · 4:5"} aspect="4/5" />
                      <div className="field" style={{ marginTop: 6, marginBottom: 0 }}>
                        <label>label b</label>
                        <input value={(o.labels && o.labels[1]) || ""} onChange={(e) => setCase(["output", i, "labels", 1], e.target.value)} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <ImgSlot id={base} label={o.label || o.kind} aspect={o.kind === "detail" ? "3/2" : "16/9"} style={{ marginBottom: 8 }} />
                )}
                {!isVideo && (
                  <div className="field" style={{ marginBottom: 4 }}>
                    <label>label</label>
                    <input value={o.label || ""} onChange={(e) => setCase(["output", i, "label"], e.target.value)} />
                  </div>
                )}
                <BiField label="caption" value={o.note} path={["output", i, "note"]} set={setCase} />
              </div>
            );
          })}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="add-btn" onClick={() => arrPush("output", { kind: "full", label: "image · 16:9", note: { en: "", pt: "" } })}>+ imagem</button>
            <button className="add-btn" onClick={() => arrPush("output", { kind: "video", url: "", note: { en: "", pt: "" } })}>+ vídeo</button>
          </div>

          <div className="group-head">04 results</div>
          {(c.results || []).map((r, i) => (
            <div key={i} style={{ border: "1px solid var(--border)", padding: "10px 12px", marginBottom: 10 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                <div className="field" style={{ marginBottom: 0, width: 120 }}><label>stat</label><input value={r.stat} onChange={(e) => setCase(["results", i, "stat"], e.target.value)} /></div>
                <button className="add-btn" style={{ height: 36, marginLeft: "auto" }} onClick={() => arrSplice("results", i)}>remove</button>
              </div>
              <BiField label="caption" value={r.note} path={["results", i, "note"]} set={setCase} />
            </div>
          ))}
          <button className="add-btn" onClick={() => arrPush("results", { stat: "—", note: { en: "—", pt: "—" } })}>+ kpi</button>

          <div className="group-head">quote</div>
          <BiField label="Quote text" value={c.quote.text} path={["quote", "text"]} set={setCase} multiline />
          <div className="row2">
            <div className="field"><label>Author</label><input value={c.quote.author} onChange={(e) => setCase(["quote", "author"], e.target.value)} /></div>
          </div>
          <BiField label="Role / context" value={c.quote.role} path={["quote", "role"]} set={setCase} />

          <div className="group-head">05 credits</div>
          {(c.credits || []).map((cr, i) => (
            <div key={i} className="row2" style={{ gridTemplateColumns: "200px 1fr 80px", alignItems: "end", marginBottom: 10 }}>
              <div className="field" style={{ marginBottom: 0 }}><input value={cr[0]} placeholder="role" onChange={(e) => setCase(["credits", i, 0], e.target.value)} /></div>
              <div className="field" style={{ marginBottom: 0 }}><input value={cr[1]} placeholder="credit" onChange={(e) => setCase(["credits", i, 1], e.target.value)} /></div>
              <button className="add-btn" style={{ height: 38 }} onClick={() => arrSplice("credits", i)}>remove</button>
            </div>
          ))}
          <button className="add-btn" onClick={() => arrPush("credits", ["Role", "Name"])}>+ credit row</button>

          <div className="group-head">next case</div>
          <div className="field"><label>Next case (slug)</label>
            <select value={c.nextSlug || ""} onChange={(e) => setCase(["nextSlug"], e.target.value)}>
              <option value="">— none —</option>
              {cases.filter((x) => x.slug !== c.slug).map((x) => (
                <option key={x.slug} value={x.slug}>{x.meta.client} · {x.meta.project}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Standalone work cards (no case linked) */}
      {(() => {
        const unlinked = (data.work || []).filter((w) => !w.caseSlug);
        if (!unlinked.length) return null;
        const updateUnlinked = (slug_or_i, key, val) => setData((s) => {
          const n = JSON.parse(JSON.stringify(s));
          const wi = n.work.findIndex((w, i) => !w.caseSlug && (w._id === slug_or_i || i === slug_or_i));
          if (wi === -1) return s;
          n.work[wi][key] = val;
          return n;
        });
        const removeUnlinked = (wi) => setData((s) => ({ ...s, work: s.work.filter((_, k) => k !== wi) }));
        return (
          <div style={{ marginTop: 48, borderTop: "1px solid var(--border)", paddingTop: 24 }}>
            <div className="cases-top">
              <h2 style={{ fontSize: 18, marginBottom: 4 }}>Cards sem case</h2>
              <p className="subhead">Entradas na grade da home que não têm um case study vinculado.</p>
            </div>
            <div className="card-list" style={{ marginTop: 16 }}>
              {(data.work || []).map((w, wi) => {
                if (w.caseSlug) return null;
                return (
                  <div className="card-row" key={wi}>
                    <div className="info" style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                      <div className="row2">
                        <div className="field" style={{ marginBottom: 0 }}><label>client</label><input value={w.client || ""} onChange={(e) => { const n = JSON.parse(JSON.stringify(data)); n.work[wi].client = e.target.value; setData(() => n); }} /></div>
                        <div className="field" style={{ marginBottom: 0 }}><label>year</label><input value={w.year || ""} onChange={(e) => { const n = JSON.parse(JSON.stringify(data)); n.work[wi].year = e.target.value; setData(() => n); }} /></div>
                      </div>
                      <div className="field" style={{ marginBottom: 0 }}><label>title</label><input value={typeof w.title === "object" ? (w.title.en || "") : (w.title || "")} onChange={(e) => { const n = JSON.parse(JSON.stringify(data)); n.work[wi].title = e.target.value; setData(() => n); }} /></div>
                      <div className="field" style={{ marginBottom: 0 }}><label>summary</label><input value={typeof w.summary === "object" ? (w.summary.en || "") : (w.summary || "")} onChange={(e) => { const n = JSON.parse(JSON.stringify(data)); n.work[wi].summary = e.target.value; setData(() => n); }} /></div>
                    </div>
                    <div className="ctrls">
                      <button onClick={() => removeUnlinked(wi)}>delete</button>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="add-btn" onClick={() => setData((s) => ({ ...s, work: [...s.work, { client: "", year: "", title: "", summary: "", tone: "depth", caseSlug: null }] }))}>+ add card</button>
          </div>
        );
      })()}
    </div>
  );
}

function WorkPane({ data, setData }) {
  const items = data.work || [];
  const cases = data.cases || [];
  const update = (i, key, val) => setData((s) => {
    const n = JSON.parse(JSON.stringify(s));
    n.work[i][key] = val;
    return n;
  });
  const add = () => setData((s) => ({ ...s, work: [...s.work, { client: "", year: "", title: "", summary: "", tone: "depth", caseSlug: null }] }));
  const remove = (i) => setData((s) => ({ ...s, work: s.work.filter((_, k) => k !== i) }));
  const move = (i, dir) => setData((s) => {
    const arr = [...s.work];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return s;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    return { ...s, work: arr };
  });
  return (
    <div>
      <h1>Selected work</h1>
      <p className="subhead">Cada entrada aparece na grade da home. Linke a um case study pelo slug para ativar o link "read →".</p>
      <div className="card-list">
        {items.map((w, i) => (
          <div className="card-row" key={i}>
            <div className="thumb" />
            <div className="info" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div className="row2">
                <div className="field" style={{ marginBottom: 0 }}><label>client</label><input value={w.client || ""} onChange={(e) => update(i, "client", e.target.value)} /></div>
                <div className="field" style={{ marginBottom: 0 }}><label>year</label><input value={w.year || ""} onChange={(e) => update(i, "year", e.target.value)} /></div>
              </div>
              <div className="field" style={{ marginBottom: 0 }}><label>title</label><input value={w.title || ""} onChange={(e) => update(i, "title", e.target.value)} /></div>
              <div className="field" style={{ marginBottom: 0 }}><label>summary</label><input value={w.summary || ""} onChange={(e) => update(i, "summary", e.target.value)} /></div>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>case study link</label>
                <select value={w.caseSlug || ""} onChange={(e) => update(i, "caseSlug", e.target.value || null)}>
                  <option value="">— sem link —</option>
                  {cases.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.meta.client} · {c.meta.project}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="ctrls">
              <button onClick={() => move(i, -1)}>↑</button>
              <button onClick={() => move(i, +1)}>↓</button>
              <button onClick={() => remove(i)}>delete</button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-btn" onClick={add}>+ add work entry</button>
    </div>
  );
}
function BlogPane({ data, setData }) {
  const posts = data.blog || [];
  const [selSlug, setSelSlug] = useState((posts[0] && posts[0].slug) || null);
  const idx = Math.max(0, posts.findIndex((p) => p.slug === selSlug));
  const p = posts[idx];

  const setPost = (path, value) => {
    setData((s) => {
      const n = JSON.parse(JSON.stringify(s));
      let o = n.blog[idx];
      for (let i = 0; i < path.length - 1; i++) {
        if (o[path[i]] == null) o[path[i]] = typeof path[i + 1] === "number" ? [] : {};
        o = o[path[i]];
      }
      o[path[path.length - 1]] = value;
      return n;
    });
  };

  const addPost = () => {
    const slug = `post-${Date.now()}`;
    setData((s) => ({
      ...s,
      blog: [...(s.blog || []), {
        slug,
        date: "2026",
        read: "5 min",
        title: { en: "New post", pt: "Novo post" },
        excerpt: { en: "", pt: "" },
        subtitle: { en: "", pt: "" },
        section: "Practice",
        coming: false,
        body: [],
        tags: [],
      }],
    }));
    setSelSlug(slug);
  };

  const movePost = (dir) => {
    const arr = [...posts];
    const j = idx + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[idx], arr[j]] = [arr[j], arr[idx]];
    setData((s) => ({ ...s, blog: arr }));
  };

  const removePost = () => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    const remaining = posts.filter((x) => x.slug !== selSlug);
    setData((s) => ({ ...s, blog: remaining }));
    if (remaining[0]) setSelSlug(remaining[0].slug);
    else setSelSlug(null);
  };

  const blankBlock = (kind) => ({
    p:      { kind: "p",      text: { en: "", pt: "" } },
    h2:     { kind: "h2",     text: { en: "", pt: "" } },
    h3:     { kind: "h3",     text: { en: "", pt: "" } },
    list:   { kind: "list",   items: [{ en: "", pt: "" }] },
    quote:  { kind: "quote",  text: { en: "", pt: "" }, attribution: "" },
    figure: { kind: "figure", label: "figure · 16:9", aspect: "16/9", caption: { en: "", pt: "" } },
  }[kind]);

  const addBlock    = (kind) => setPost(["body"], [...(p.body || []), blankBlock(kind)]);
  const removeBlock = (i)    => setPost(["body"], p.body.filter((_, k) => k !== i));
  const moveBlock   = (i, dir) => {
    const arr = [...p.body];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setPost(["body"], arr);
  };
  const changeBlockKind = (i, kind) => {
    const arr = [...p.body];
    arr[i] = blankBlock(kind);
    setPost(["body"], arr);
  };

  if (!p) {
    return (
      <div>
        <h1>Blog</h1>
        <p className="subhead">No posts yet.</p>
        <button className="add-btn" onClick={addPost}>+ add post</button>
      </div>
    );
  }

  const postTitle = (pp) => typeof pp.title === "object" ? pp.title.en : pp.title;

  return (
    <div className="cases-pane">
      <div className="cases-top">
        <h1>Blog</h1>
        <p className="subhead">Notes. Low cadence, high substance. <b>{posts.length}</b> posts.</p>
      </div>
      <div className="cases-layout">
        {/* Left: post list */}
        <div className="cases-list">
          <div className="cases-list-head">posts</div>
          <ul>
            {posts.map((pp, pi) => (
              <li key={pp.slug} style={{ display: "flex", alignItems: "stretch" }}>
                <button className={pp.slug === selSlug ? "on" : ""} onClick={() => setSelSlug(pp.slug)} style={{ flex: 1 }}>
                  <span className="cl-num">{pp.date || "—"}</span>
                  <span className="cl-title">{postTitle(pp) || "—"}</span>
                  <span className="cl-client">{pp.section || "—"}{pp.coming ? " · coming" : ""}</span>
                </button>
                {pp.slug === selSlug && (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <button onClick={() => movePost(-1)} disabled={pi === 0} style={{ flex: 1, padding: "0 6px", fontSize: 11 }}>↑</button>
                    <button onClick={() => movePost(+1)} disabled={pi === posts.length - 1} style={{ flex: 1, padding: "0 6px", fontSize: 11 }}>↓</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <button className="add-btn" onClick={addPost}>+ add post</button>
        </div>

        {/* Right: detail editor */}
        <div className="cases-detail">
          <div className="cases-detail-head">
            <div>
              <div className="cl-num">{p.date || "—"}</div>
              <h2>{postTitle(p) || "—"}</h2>
            </div>
            <button className="add-btn" style={{ color: "var(--color-accent-quiet)" }} onClick={removePost}>delete post</button>
          </div>

          <div className="group-head">meta</div>
          <div className="row2">
            <div className="field"><label>Slug</label><input value={p.slug || ""} onChange={(e) => setPost(["slug"], e.target.value)} /></div>
            <div className="field"><label>Section</label><input value={p.section || ""} onChange={(e) => setPost(["section"], e.target.value)} /></div>
            <div className="field"><label>Date</label><input value={p.date || ""} onChange={(e) => setPost(["date"], e.target.value)} /></div>
            <div className="field"><label>Read time</label><input value={p.read || ""} onChange={(e) => setPost(["read"], e.target.value)} /></div>
          </div>
          <div className="field" style={{ marginBottom: 8 }}>
            <label>Tags (comma-separated)</label>
            <input value={(p.tags || []).join(", ")} onChange={(e) => setPost(["tags"], e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
          </div>
          <div className="field" style={{ marginBottom: 16 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontWeight: "normal" }}>
              <input type="checkbox" checked={!!p.coming} onChange={(e) => setPost(["coming"], e.target.checked)} style={{ width: "auto", margin: 0 }} />
              Coming soon (esconde o corpo, mostra placeholder)
            </label>
          </div>

          <div className="group-head">cover image</div>
          <ImgSlot id={`post-cover-${p.slug}`} label="cover · 16:9" aspect="16/9" />

          <div className="group-head" style={{ marginTop: 24 }}>copy</div>
          <BiField label="Title"    value={p.title}    path={["title"]}    set={setPost} />
          <BiField label="Excerpt"  value={p.excerpt}  path={["excerpt"]}  set={setPost} multiline />
          <BiField label="Subtitle" value={p.subtitle} path={["subtitle"]} set={setPost} multiline />

          <div className="group-head" style={{ marginTop: 24 }}>body blocks</div>
          <p className="subhead" style={{ margin: "0 0 16px" }}>Compõe o artigo. Cada bloco é um parágrafo, heading, lista, quote ou figura.</p>

          {(p.body || []).map((blk, i) => (
            <div key={i} style={{ border: "1px solid var(--border)", padding: "12px 14px", marginBottom: 10 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                <select value={blk.kind} onChange={(e) => changeBlockKind(i, e.target.value)}
                  style={{ fontFamily: "var(--font-mono)", fontSize: 11, padding: "4px 6px", background: "var(--input-bg)", color: "var(--fg)", border: "1px solid var(--border)" }}>
                  <option value="p">paragraph</option>
                  <option value="h2">heading 2</option>
                  <option value="h3">heading 3</option>
                  <option value="list">list</option>
                  <option value="quote">quote</option>
                  <option value="figure">figure</option>
                </select>
                <button onClick={() => moveBlock(i, -1)}>↑</button>
                <button onClick={() => moveBlock(i, +1)}>↓</button>
                <button onClick={() => removeBlock(i)} style={{ marginLeft: "auto" }}>remove</button>
              </div>

              {["p", "h2", "h3"].includes(blk.kind) && (
                <BiField label="text" value={blk.text} path={["body", i, "text"]} set={setPost} multiline={blk.kind === "p"} />
              )}

              {blk.kind === "list" && (
                <div>
                  {(blk.items || []).map((item, j) => (
                    <div key={j} className="row2" style={{ gridTemplateColumns: "1fr 1fr 60px", alignItems: "end", marginBottom: 8 }}>
                      <div className="field" style={{ marginBottom: 0 }}><label>EN</label><input value={item.en || ""} onChange={(e) => setPost(["body", i, "items", j, "en"], e.target.value)} /></div>
                      <div className="field" style={{ marginBottom: 0 }}><label>PT</label><input value={item.pt || ""} onChange={(e) => setPost(["body", i, "items", j, "pt"], e.target.value)} /></div>
                      <button className="add-btn" style={{ height: 38 }} onClick={() => setPost(["body", i, "items"], blk.items.filter((_, k) => k !== j))}>rem</button>
                    </div>
                  ))}
                  <button className="add-btn" onClick={() => setPost(["body", i, "items"], [...(blk.items || []), { en: "", pt: "" }])}>+ item</button>
                </div>
              )}

              {blk.kind === "quote" && (
                <div>
                  <BiField label="quote" value={blk.text} path={["body", i, "text"]} set={setPost} multiline />
                  <div className="field" style={{ marginTop: 8, marginBottom: 0 }}>
                    <label>attribution</label>
                    <input value={blk.attribution || ""} onChange={(e) => setPost(["body", i, "attribution"], e.target.value)} />
                  </div>
                </div>
              )}

              {blk.kind === "figure" && (
                <div>
                  <ImgSlot id={`post-fig-${p.slug}-${i}`} label={blk.label || "figure"} aspect={blk.aspect || "16/9"} style={{ marginBottom: 12 }} />
                  <div className="row2" style={{ marginBottom: 8 }}>
                    <div className="field" style={{ marginBottom: 0 }}><label>label</label><input value={blk.label || ""} onChange={(e) => setPost(["body", i, "label"], e.target.value)} /></div>
                    <div className="field" style={{ marginBottom: 0 }}><label>aspect ratio (ex: 16/9)</label><input value={blk.aspect || "16/9"} onChange={(e) => setPost(["body", i, "aspect"], e.target.value)} /></div>
                  </div>
                  <BiField label="caption" value={blk.caption} path={["body", i, "caption"]} set={setPost} />
                </div>
              )}
            </div>
          ))}

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
            {["p", "h2", "h3", "list", "quote", "figure"].map((kind) => (
              <button key={kind} className="add-btn" onClick={() => addBlock(kind)}>+ {kind}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ListPane({ title, subtitle, data, setData, field, cols }) {
  const items = data[field] || [];
  const update = (i, key, val) => {
    setData((s) => {
      const n = JSON.parse(JSON.stringify(s));
      n[field][i][key] = val;
      return n;
    });
  };
  const add = () => {
    const blank = Object.fromEntries(cols.map(([k]) => [k, ""]));
    setData((s) => ({ ...s, [field]: [...(s[field] || []), blank] }));
  };
  const remove = (i) => setData((s) => ({ ...s, [field]: s[field].filter((_, k) => k !== i) }));
  const move = (i, dir) => {
    setData((s) => {
      const arr = [...s[field]];
      const j = i + dir;
      if (j < 0 || j >= arr.length) return s;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return { ...s, [field]: arr };
    });
  };
  return (
    <div>
      <h1>{title}</h1>
      <p className="subhead">{subtitle}</p>
      <div className="card-list">
        {items.map((it, i) => (
          <div className="card-row" key={i}>
            <div className="thumb" />
            <div className="info" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {cols.map(([k, lbl]) => (
                <div className="field" style={{ marginBottom: 0 }} key={k}>
                  <label>{lbl.toLowerCase()}</label>
                  <input value={it[k] || ""} onChange={(e) => update(i, k, e.target.value)} />
                </div>
              ))}
            </div>
            <div className="ctrls">
              <button onClick={() => move(i, -1)}>↑</button>
              <button onClick={() => move(i, +1)}>↓</button>
              <button onClick={() => remove(i)}>delete</button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-btn" onClick={add}>+ add {field === "inspiration" ? "item" : field.replace(/s?$/, "")}</button>
    </div>
  );
}

// ─── App ───────────────────────────────────────────────────────────
function App() {
  const [data, setData] = useStore();
  // Global dark/light + lang. Both persist via useStore (the store has
  // `dark` and `lang` fields). Nav toggles update them; every artboard
  // mirrors the same source of truth.
  const dark = data.dark !== false;
  const setDark = (v) => setData((s) => ({ ...s, dark: !!v }));
  const lang = data.lang || "en";
  const setLang = (v) => setData((s) => ({ ...s, lang: v }));
  // Active case selected in the CMS — the case-study artboards mirror it
  // so the user can preview any case in the canvas just by clicking it in
  // the Cases admin list.
  const activeCase = useMemo(() => {
    const cs = data.cases || [];
    return cs.find((c) => c.slug === data.activeCaseSlug) || cs[0];
  }, [data.cases, data.activeCaseSlug]);
  // Same idea for blog posts — clicking a row in the home wireframe sets
  // activePostSlug, the Post artboards mirror it.
  const activePost = useMemo(() => {
    const all = data.blog || [];
    return all.find((p) => p.slug === data.activePostSlug) || all[0];
  }, [data.blog, data.activePostSlug]);
  // Imperative setters bound through the store so any child can navigate.
  const navigate = useMemo(() => ({
    openCase: (slug) => slug && setData((s) => ({ ...s, activeCaseSlug: slug })),
    openPost: (slug) => slug && setData((s) => ({ ...s, activePostSlug: slug })),
  }), [setData]);
  // (shared components already exposed at module level below)
  return (
    <DesignCanvas>
      <DCSection id="hero-options" title="Home — landing wireframe" subtitle="Document opener · desktop, tablet, mobile breakpoints side by side.">
        <DCArtboard id="B" label="Home · desktop · 1280" width={1280} height={4500}>
          <div className={`artboard-shell ${dark ? "dark" : ""}`}><VariationB data={data} dark={dark} setDark={setDark} lang={lang} setLang={setLang} navigate={navigate} activeCaseSlug={data.activeCaseSlug} activePostSlug={data.activePostSlug} /></div>
        </DCArtboard>
        <DCArtboard id="B-tablet" label="Home · tablet · 768" width={768} height={5200}>
          <div className={`artboard-shell artboard-shell--tablet ${dark ? "dark" : ""}`}><VariationB data={data} dark={dark} setDark={setDark} lang={lang} setLang={setLang} tablet={true} navigate={navigate} activeCaseSlug={data.activeCaseSlug} activePostSlug={data.activePostSlug} /></div>
        </DCArtboard>
        <DCArtboard id="B-mobile" label="Home · mobile · 390" width={390} height={6000}>
          <div className={`artboard-shell artboard-shell--mobile ${dark ? "dark" : ""}`}><VariationB data={data} dark={dark} setDark={setDark} lang={lang} setLang={setLang} mobile={true} navigate={navigate} activeCaseSlug={data.activeCaseSlug} activePostSlug={data.activePostSlug} /></div>
        </DCArtboard>
      </DCSection>
      <DCSection id="case-study" title="Work — case study template" subtitle="Detail page template. Driven by data.cases in the CMS. Desktop, tablet, mobile breakpoints.">
        <DCArtboard id="C" label="Case · desktop · 1280" width={1280} height={7900}>
          <div className={`artboard-shell ${dark ? "dark" : ""}`}><CaseStudy data={data} dark={dark} setDark={setDark} lang={lang} setLang={setLang} caseData={activeCase} /></div>
        </DCArtboard>
        <DCArtboard id="C-tablet" label="Case · tablet · 768" width={768} height={8400}>
          <div className={`artboard-shell artboard-shell--tablet ${dark ? "dark" : ""}`}><CaseStudy data={data} dark={dark} setDark={setDark} lang={lang} setLang={setLang} caseData={activeCase} tablet={true} /></div>
        </DCArtboard>
        <DCArtboard id="C-mobile" label="Case · mobile · 390" width={390} height={9200}>
          <div className={`artboard-shell artboard-shell--mobile ${dark ? "dark" : ""}`}><CaseStudy data={data} dark={dark} setDark={setDark} lang={lang} setLang={setLang} caseData={activeCase} mobile={true} /></div>
        </DCArtboard>
      </DCSection>
      <DCSection id="blog-post" title="Blog — post template" subtitle="Long-form reading layout. Drives the publish → newsletter pipeline.">
        <DCArtboard id="D" label="Post · desktop · 1280" width={1280} height={6800}>
          <div className={`artboard-shell ${dark ? "dark" : ""}`}><BlogPost data={data} dark={dark} setDark={setDark} lang={lang} setLang={setLang} postData={activePost} /></div>
        </DCArtboard>
        <DCArtboard id="D-tablet" label="Post · tablet · 768" width={768} height={7500}>
          <div className={`artboard-shell artboard-shell--tablet ${dark ? "dark" : ""}`}><BlogPost data={data} dark={dark} setDark={setDark} lang={lang} setLang={setLang} postData={activePost} tablet={true} /></div>
        </DCArtboard>
        <DCArtboard id="D-mobile" label="Post · mobile · 390" width={390} height={8800}>
          <div className={`artboard-shell artboard-shell--mobile ${dark ? "dark" : ""}`}><BlogPost data={data} dark={dark} setDark={setDark} lang={lang} setLang={setLang} postData={activePost} mobile={true} /></div>
        </DCArtboard>
      </DCSection>
      <DCSection id="about-page" title="About — page template" subtitle="Long-form bio, timeline, clients, recognition. Standalone surface.">
        <DCArtboard id="E" label="About · desktop · 1280" width={1280} height={4100}>
          <div className={`artboard-shell ${dark ? "dark" : ""}`}><AboutPage data={data} dark={dark} setDark={setDark} lang={lang} setLang={setLang} /></div>
        </DCArtboard>
        <DCArtboard id="E-mobile" label="About · mobile · 390" width={390} height={4700}>
          <div className={`artboard-shell artboard-shell--mobile ${dark ? "dark" : ""}`}><AboutPage data={data} dark={dark} setDark={setDark} lang={lang} setLang={setLang} mobile={true} /></div>
        </DCArtboard>
      </DCSection>
      <DCSection id="contact-page" title="Contact — page template" subtitle="Single-surface contact page. Email-first, with a fit/not-fit framing and a routing form.">
        <DCArtboard id="F" label="Contact · desktop · 1280" width={1280} height={2400}>
          <div className={`artboard-shell ${dark ? "dark" : ""}`}><ContactPage data={data} dark={dark} setDark={setDark} lang={lang} setLang={setLang} /></div>
        </DCArtboard>
        <DCArtboard id="F-mobile" label="Contact · mobile · 390" width={390} height={3000}>
          <div className={`artboard-shell artboard-shell--mobile ${dark ? "dark" : ""}`}><ContactPage data={data} dark={dark} setDark={setDark} lang={lang} setLang={setLang} mobile={true} /></div>
        </DCArtboard>
      </DCSection>
      <DCSection id="archives" title="Archives — work + notes" subtitle="Filterable browse pages. Each archive routes into its detail template.">
        <DCArtboard id="G" label="Work archive · desktop · 1280" width={1280} height={2300}>
          <div className={`artboard-shell ${dark ? "dark" : ""}`}><ArchiveWork data={data} dark={dark} setDark={setDark} lang={lang} setLang={setLang} navigate={navigate} /></div>
        </DCArtboard>
        <DCArtboard id="G-mobile" label="Work archive · mobile · 390" width={390} height={3300}>
          <div className={`artboard-shell artboard-shell--mobile ${dark ? "dark" : ""}`}><ArchiveWork data={data} dark={dark} setDark={setDark} lang={lang} setLang={setLang} mobile={true} navigate={navigate} /></div>
        </DCArtboard>
        <DCArtboard id="H" label="Notes archive · desktop · 1280" width={1280} height={1300}>
          <div className={`artboard-shell ${dark ? "dark" : ""}`}><ArchiveNotes data={data} dark={dark} setDark={setDark} lang={lang} setLang={setLang} navigate={navigate} /></div>
        </DCArtboard>
        <DCArtboard id="H-mobile" label="Notes archive · mobile · 390" width={390} height={1700}>
          <div className={`artboard-shell artboard-shell--mobile ${dark ? "dark" : ""}`}><ArchiveNotes data={data} dark={dark} setDark={setDark} lang={lang} setLang={setLang} mobile={true} navigate={navigate} /></div>
        </DCArtboard>
      </DCSection>
      <DCSection id="cms" title="Admin · CMS" subtitle="Where every text, image, blog post and work entry lives. Bound to localStorage so edits flow into the wireframes above instantly.">
        <DCArtboard id="admin" label="Admin · content editor" width={1280} height={1100}>
          <div className="artboard-shell" style={{ height: 1100 }}><AdminView data={data} setData={setData} /></div>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

Object.assign(window, { AdminView, useStore, STORE_KEY, DEFAULTS, VariationB });
if (!window.__skipAppMount) {
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
}
