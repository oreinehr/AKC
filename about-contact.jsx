/* global React, Placeholder, Nav, LiveTime, NewsletterForm */
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
            <div><div className="num">{m.practiceNum || "01 · practice"}</div><span className="anno">{m.practiceAnno || "scope · template"}</span></div>
            <div><h2>{lang === "pt" ? "Como a prática funciona." : "How the practice works."}</h2></div>
          </div>
          <ul className="ap-practice-list">
            {a.practice.map(([k, v], i) => (
              <li key={i}><span className="k">{k}</span><span className="v">{t(v, lang)}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* 02 timeline */}
      <section className="sec ap-timeline" id="timeline">
        <div className="page">
          <div className="sec-head">
            <div><div className="num">{m.timelineNum || "02 · timeline"}</div><span className="anno">{m.timelineAnno || "20 years · selected"}</span></div>
            <div><h2>{lang === "pt" ? "O trabalho, em ordem." : "The work, in order."}</h2></div>
          </div>
          <ol className="ap-tl">
            {data.timeline.map((t, i) => (
              <li key={i} className="ap-tl-row">
                <div className="ap-tl-year">{t.year}</div>
                <div className="ap-tl-body">
                  <div className="ap-tl-chapter">{t.chapter}<span className="dot">·</span><span className="ap-tl-role">{t.role}</span></div>
                  <div className="ap-tl-loc">{t.location}</div>
                  <div className="ap-tl-note">{t.note}</div>
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
            <div><div className="num">{m.clientsNum || "03 · clients"}</div><span className="anno">{m.clientsAnno || "selected · public"}</span></div>
            <div><h2>{lang === "pt" ? "Clientes selecionados." : "Selected clients."}</h2><p className="sub">{lang === "pt" ? "Empresas e organizações representadas ao longo de duas décadas. Subconjunto exibido — lista completa disponível sob solicitação." : "Companies and organizations represented across two decades. Subset shown — full list available on request."}</p></div>
          </div>
          <ul className="ap-clients-list">
            {data.clients.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      </section>

      {/* 04 recognition */}
      <section className="sec ap-recognition" id="recognition">
        <div className="page">
          <div className="sec-head">
            <div><div className="num">{m.recogNum || "04 · recognition"}</div><span className="anno">{m.recogAnno || "light · honest"}</span></div>
            <div><h2>{lang === "pt" ? "Reconhecimento." : "Recognition."}</h2></div>
          </div>
          <ul className="ap-recognition-list">
            {data.recognition.map((r, i) => (
              <li key={i}>
                <span className="r-year">{r.year}</span>
                <span className="r-item">{r.item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* contact teaser */}
      <section className="next-case" id="next">
        <div className="page">
          <div className="nc-row">
            <div className="nc-num">contact · next</div>
            <a href="/contact.html" className="nc-link">
              <span className="nc-client">{data.meta.email}</span>
              <span className="nc-title">{lang === "pt" ? "Vamos conversar." : "Let's talk."}</span>
              <span className="nc-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <SlimFooter data={data} />
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
            <div><div className="num">{m.fitNum || "01 · what to email about"}</div><span className="anno">{m.fitAnno || "honest framing"}</span></div>
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
            <div><div className="num">02 · {(typeof c.form.head === "object" ? (c.form.head[lang] || c.form.head.en) : c.form.head).toLowerCase()}</div><span className="anno">{m.formAnno || "form · mailto fallback"}</span></div>
            <div><h2>{t(c.form.head, lang)}</h2><p className="sub">{t(c.form.blurb, lang)}</p></div>
          </div>
          <ContactForm data={data} lang={lang} />
        </div>
      </section>

      <SlimFooter data={data} />
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

// Shared slim footer (case + post + about + contact use this).
function SlimFooter({ data }) {
  return (
    <footer className="footer case-footer">
      <div className="page footer-inner">
        <div className="cf-row">
          <a href="#" className="cf-mark">
            <img src="assets/akc_logo_white.svg" alt="AKC" />
          </a>
          <div className="cf-links">
            <a href="/">{data.lang === "pt" ? "Início" : "Home"}</a>
            <a href="/about.html">About</a>
            <a href="/work.html">Work</a>
            <a href="/blog.html">Blog</a>
            <a href="/contact.html">Contact</a>
            <a href={`mailto:${data.meta.email}`}>Email</a>
          </div>
        </div>
        <div className="cf-bottom">
          <span>© 2026 · {data.meta.name.toLowerCase()}</span>
          <span className="dot">·</span>
          <span>{data.meta.location.toLowerCase()}, br · <LiveTime /></span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { AboutPage, ContactPage, SlimFooter });
