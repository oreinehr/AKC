/* global React, Placeholder, Nav, LiveTime, NewsletterForm, FullFooter */
// About + Contact pages.
// Same document-opener register as the home / case / post templates.
// Slim footer (.case-footer) imported from the case study template.

function AboutPage({ data, dark, setDark, lang, setLang, mobile, tablet }) {
  const a = data.aboutPage;
  const m = (data.marks && data.marks.about) || {};
  const rootRef = React.useRef(null);
  if (window.useCobaltCursor) window.useCobaltCursor(rootRef);
  return (
    <div ref={rootRef} className={`wf ${dark ? "dark" : ""} ${mobile ? "wf--mobile" : ""} ${tablet ? "wf--tablet" : ""} about-page`} id="top">
      <Nav darkOn={dark} onToggleDark={setDark} lang={lang} onLang={setLang} location={data.meta.location.toLowerCase()} mobile={mobile} />

      {/* opener — document-style */}
      <section className="ap-opener">
        <div className="page">
          <div className="ap-eyebrow">{t(a.eyebrow, lang)}</div>
          <h1 className="ap-title">{t(a.title, lang)}</h1>
          <div className="ap-intro-row">
            <div className="ap-portrait">
              <img src="assets/Alessandro 2.jpg" alt={data.meta.name} className="p-rest" />
              <img src="assets/Alessandro_hover.jpg" alt="" className="p-hover" aria-hidden="true" />
            </div>
            <div className="ap-intro-body">
              <p className="ap-intro">{t(a.intro, lang)}</p>
              <p className="ap-body">{t(a.body, lang)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 01 practice */}
      <section className="sec ap-practice" id="practice">
        <div className="page">
          <div className="sec-head">
            <div><div className="num">{m.practiceNum || (lang === "pt" ? "01 · prática" : "01 · practice")}</div><span className="anno">{m.practiceAnno || (lang === "pt" ? "escopo · modelo" : "scope · template")}</span></div>
          </div>
          <ul className="ap-practice-list">
            {(a.practice || []).map(([k, v], i) => (
              <li key={i}><span className="k">{t(k, lang)}</span><span className="v">{t(v, lang)}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* 02 timeline */}
      <section className="sec ap-timeline" id="timeline">
        <div className="page">
          <div className="sec-head">
            <div><div className="num">{m.timelineNum || (lang === "pt" ? "02 · linha do tempo" : "02 · timeline")}</div><span className="anno">{m.timelineAnno || (lang === "pt" ? "20 anos · selecionado" : "20 years · selected")}</span></div>
          </div>
          <ol className="ap-tl">
            {(data.timeline || []).map((tl, i) => (
              <li key={i} className="ap-tl-row">
                <div className="ap-tl-year">{tl.year}</div>
                <div className="ap-tl-body">
                  <div className="ap-tl-chapter">{tl.chapter}<span className="dot">·</span><span className="ap-tl-role">{t(tl.role, lang)}</span></div>
                  <div className="ap-tl-loc">{tl.location}</div>
                  <div className="ap-tl-note">{t(tl.note, lang)}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 03 clients */}
      <section className="sec ap-clients" id="clients">
        <div className="page">
          <div className="sec-head">
            <div><div className="num">{m.clientsNum || (lang === "pt" ? "03 · clientes" : "03 · clients")}</div><span className="anno">{m.clientsAnno || (lang === "pt" ? "selecionados · público" : "selected · public")}</span></div>
          </div>
          <ul className="ap-clients-list">
            {data.clients.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      </section>

      {/* contact teaser */}
      <section className="sec ap-contact-closer" id="next">
        <div className="page">
          <div className="cp-eyebrow">{lang === "pt" ? "contato · próximo" : "contact · next"}</div>
          <h2 className="ap-closer-title">{lang === "pt" ? "Vamos conversar." : "Let's talk."}</h2>
          <a href={`mailto:${data.meta.email}`} className="ap-closer-email">{data.meta.email}</a>
        </div>
      </section>

      <FullFooter data={data} lang={lang} />
    </div>
  );
}

function ContactPage({ data, dark, setDark, lang, setLang, mobile, tablet }) {
  const c = data.contactPage;
  const m = (data.marks && data.marks.contact) || {};
  const rootRef = React.useRef(null);
  if (window.useCobaltCursor) window.useCobaltCursor(rootRef);
  return (
    <div ref={rootRef} className={`wf ${dark ? "dark" : ""} ${mobile ? "wf--mobile" : ""} ${tablet ? "wf--tablet" : ""} contact-page`} id="top">
      <Nav darkOn={dark} onToggleDark={setDark} lang={lang} onLang={setLang} location={data.meta.location.toLowerCase()} mobile={mobile} />

      {/* opener */}
      <section className="cp-opener">
        <div className="page">
          <div className="cp-eyebrow">{t(c.eyebrow, lang)}</div>
          <h1 className="cp-title">{t(c.title, lang)}</h1>
          <p className="cp-intro">{t(c.intro, lang)}</p>

          <div className="cp-contact-row">
            <a className="cp-email" href={`mailto:${data.meta.email}`}>{data.meta.email}</a>
            <div className="cp-meta">
              <div className="cp-meta-row">
                <span className="k">{lang === "pt" ? "telefone" : "phone"}</span>
                <span className="v">{data.socials.find((s) => s.href.startsWith("tel:"))?.label || "+55 51 99699 9909"}</span>
              </div>
              <div className="cp-meta-row">
                <span className="k">{lang === "pt" ? "local" : "location"}</span>
                <span className="v">{data.meta.location}, BR</span>
              </div>
              <div className="cp-meta-row">
                <span className="k">{lang === "pt" ? "horário" : "time"}</span>
                <span className="v"><LiveTime /></span>
              </div>
              <div className="cp-meta-row">
                <span className="k">{lang === "pt" ? "resposta" : "response"}</span>
                <span className="v">{t(c.response, lang)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* fit / not-fit */}
      <section className="sec cp-fit">
        <div className="page">
          <div className="sec-head">
            <div><div className="num">{m.fitNum || (lang === "pt" ? "01 · sobre o que escrever" : "01 · what to email about")}</div><span className="anno">{m.fitAnno || (lang === "pt" ? "enquadramento honesto" : "honest framing")}</span></div>
            <div><h2>{lang === "pt" ? "O que se encaixa." : "What's a fit."}</h2></div>
          </div>
          <div className="cp-fit-grid">
            {c.fit.map((f, i) => (
              <div key={i} className={`cp-fit-col cp-fit-col--${f.kind}`}>
                <div className="cp-fit-mark">{f.kind === "yes" ? "+" : "—"}</div>
                <h3>{t(f.title, lang)}</h3>
                <ul>
                  {f.items.map((it, j) => <li key={j}>{t(it, lang)}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* form */}
      <section className="sec cp-form-sec">
        <div className="page">
          <div className="sec-head">
            <div><div className="num">02 · {(typeof c.form.head === "object" ? (c.form.head[lang] || c.form.head.en) : c.form.head).toLowerCase()}</div><span className="anno">{m.formAnno || (lang === "pt" ? "formulário · fallback mailto" : "form · mailto fallback")}</span></div>
            <div><h2>{t(c.form.head, lang)}</h2><p className="sub">{t(c.form.blurb, lang)}</p></div>
          </div>
          <ContactForm data={data} lang={lang} />
        </div>
      </section>

      <FullFooter data={data} lang={lang} />
    </div>
  );
}

function ContactForm({ data, lang = "en" }) {
  const [state, setState] = React.useState({ name: "", email: "", company: "", scope: "", message: "" });
  const [done, setDone] = React.useState(false);
  const update = (k) => (e) => setState((s) => ({ ...s, [k]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    if (!state.email || !state.message) return;
    // Lo-fi: build a mailto and flip to confirmation state. Real wiring
    // routes to a transactional endpoint via the CMS Newsletter pane's
    // provider field — same pipeline.
    const body = `Name: ${state.name}\nEmail: ${state.email}\nCompany: ${state.company}\nScope: ${state.scope}\n\n${state.message}`;
    window.location.href = `mailto:${data.meta.email}?subject=${encodeURIComponent("Hello — " + (state.scope || "general"))}&body=${encodeURIComponent(body)}`;
    setDone(true);
  };
  if (done) return <div className="cp-form-done">{lang === "pt" ? "Obrigado. Responderei em até 48 horas." : "Thanks. I'll get back to you within 48 hours."}</div>;
  return (
    <form className="cp-form" onSubmit={onSubmit}>
      <div className="cp-form-row">
        <div className="field">
          <label>{lang === "pt" ? "nome" : "name"}</label>
          <input value={state.name} onChange={update("name")} placeholder={lang === "pt" ? "seu nome" : "your name"} />
        </div>
        <div className="field">
          <label>email</label>
          <input type="email" required value={state.email} onChange={update("email")} placeholder="you@company.com" />
        </div>
      </div>
      <div className="cp-form-row">
        <div className="field">
          <label>{lang === "pt" ? "empresa" : "company"}</label>
          <input value={state.company} onChange={update("company")} placeholder={lang === "pt" ? "organização (opcional)" : "organization (optional)"} />
        </div>
        <div className="field">
          <label>{lang === "pt" ? "escopo" : "scope"}</label>
          <select value={state.scope} onChange={update("scope")}>
            <option value="">{lang === "pt" ? "— escolha —" : "— choose —"}</option>
            <option value="creative-direction">Creative direction</option>
            <option value="brand-system">Brand system</option>
            <option value="ux-leadership">UX leadership</option>
            <option value="speaking-advisory">Speaking / advisory</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div className="field cp-form-message">
        <label>{lang === "pt" ? "mensagem" : "message"}</label>
        <textarea required rows={6} value={state.message} onChange={update("message")} placeholder={lang === "pt" ? "Qual é o projeto, o prazo e o que está em jogo." : "What's the project, the timeline, and what's at stake."} />
      </div>
      <button type="submit" className="cp-form-submit">{lang === "pt" ? "Enviar" : "Send"} <span className="arr">→</span></button>
    </form>
  );
}

Object.assign(window, { AboutPage, ContactPage });
