/* global React, Placeholder, Nav, PageShell, LiveTime */
// Work case study template — desktop + mobile via wf--mobile modifier.
// Uses the shared Nav + footer scaffold so the chrome stays consistent
// with the home wireframe.

const CASE_DATA = {
  meta: {
    num: "case 01",
    client: "TGR Studio",
    project: "Creative direction at TGR",
    year: "2024–present",
    role: "Creative Director · Brand & UX",
    status: "ongoing",
    sector: "Enterprise B2B · Brazil",
    deliverables: ["Brand system", "Platform UX", "Marketing surfaces", "Sales enablement"],
  },
  brief: {
    head: "Rebuild client trust. Grow the practice. Ship the work.",
    body: "TGR Studio asked for senior creative leadership to reset the relationship with key enterprise accounts and turn the team into something that consistently ships at the bar the brief implies. The work sits at the intersection of brand, UX, and pipeline — the practice has to feel calibrated end-to-end, not just at the cover.",
    callouts: [
      ["scope", "Cross-functional. Creative, UX, account, sales."],
      ["timeline", "12 months for the operational reset; brand + UX system overhaul is rolling."],
      ["constraint", "No reset of the staff — same team, sharper bar."],
    ],
  },
  approach: [
    { num: "01", title: "Audit", body: "Read every shipping artifact, sit in every recurring meeting, watch every client touchpoint. Map the gap between intent and output." },
    { num: "02", title: "Set the bar", body: "Define the calibration register the studio operates at — visual + writing + interaction — then make the bar legible to the team in artifacts they can copy." },
    { num: "03", title: "Process reset", body: "Rebuild the critique loop, the design review cadence, and the client-facing language. Reduce ceremony, raise the floor." },
    { num: "04", title: "Ship", body: "Every new pitch and platform goes through the new register. Compound the work — each engagement raises the bar for the next." },
  ],
  output: [
    { kind: "full", label: "platform cover · 16:9", note: "TGR's flagship enterprise UX engagement — landing surface." },
    { kind: "twin", labels: ["component system · 4:5", "type specimen · 4:5"], note: "Internal design system + Migra-anchored brand typography." },
    { kind: "wide", label: "in-platform UI · 16:9", note: "Dashboard-tier interaction patterns. Real client app, redacted." },
    { kind: "detail", label: "detail · 3:2", note: "Pitch artifact. Foil-stamped cobalt on bone." },
    { kind: "twin", labels: ["mobile flow · 9:19", "tablet · 4:3"], note: "Responsive system across three breakpoints." },
  ],
  results: [
    { stat: "+25%", note: "Revenue growth, year over year." },
    { stat: "12 mo.", note: "From audit to operational reset." },
    { stat: "6", note: "Enterprise platforms shipped under the new register." },
  ],
  quote: {
    text: "It took twelve months to feel like the work matches the intent. The bar moved — and now it stays there.",
    author: "(client testimonial)",
    role: "TGR Studio · senior stakeholder",
  },
  credits: [
    ["Creative Direction", "Alessandro Kuhn Contes"],
    ["Brand & UX team", "TGR Studio creative"],
    ["Client", "TGR Studio leadership"],
    ["Period", "2024 — present"],
    ["Status", "Ongoing engagement"],
  ],
  next: {
    num: "case 02",
    client: "K2 · K1 Group",
    title: "Productivity rebuild",
    year: "2022–2024",
  },
};

function CaseStudy({ data, dark, setDark, lang, setLang, mobile, tablet, caseData }) {
  const c = caseData || CASE_DATA;
  const m = (data && data.marks && data.marks.case) || {};
  // Resolve nextSlug → next case meta from data.cases (if available).
  const next = React.useMemo(() => {
    const all = (data && data.cases) || [];
    if (c.nextSlug) {
      const hit = all.find((x) => x.slug === c.nextSlug);
      if (hit) return { num: hit.meta.num, client: hit.meta.client, title: hit.meta.project, year: hit.meta.year, slug: hit.slug };
    }
    return c.next || { num: "case 02", client: "—", title: "—", year: "—" };
  }, [c, data]);
  const rootRef = React.useRef(null);
  if (window.useCobaltCursor) window.useCobaltCursor(rootRef);
  React.useEffect(() => {
    document.title = `${c.meta.project} — Alessandro Kuhn Contes`;
  }, [c.meta.project]);
  const cover = (
    <section className="case-cover">
      <div className="page">
        <div className="cover-meta">
          <div className="cover-num">{c.meta.num}</div>
          <div className="cover-anno"><span className="anno">// {m.coverAnno || "case study · template"}</span></div>
        </div>
        <h1 className="cover-title">{c.meta.project}.</h1>
        <div className="cover-row">
          <div className="col"><h4>{lang === "pt" ? "cliente" : "client"}</h4><p>{c.meta.client}</p></div>
          <div className="col"><h4>{lang === "pt" ? "ano" : "year"}</h4><p>{c.meta.year}</p></div>
          <div className="col"><h4>{lang === "pt" ? "função" : "role"}</h4><p>{t(c.meta.role, lang)}</p></div>
          <div className="col"><h4>{lang === "pt" ? "setor" : "sector"}</h4><p>{c.meta.sector}</p></div>
          <div className="col"><h4>{lang === "pt" ? "status" : "status"}</h4><p>{c.meta.status}</p></div>
        </div>
        <div className="cover-image">
          <ImgSlot
            id={`case-cover-${c.slug || c.meta.client}`}
            label={c.meta.client + " · cover · 21:9"}
            aspect="21/9"
          />
        </div>
      </div>
    </section>
  );

  return (
    <div ref={rootRef} className={`wf ${dark ? "dark" : ""} ${mobile ? "wf--mobile" : ""} ${tablet ? "wf--tablet" : ""} case`} id="top">
      <Nav darkOn={dark} onToggleDark={setDark} lang={lang} onLang={setLang} location={data.meta.location.toLowerCase()} mobile={mobile} />
      {cover}

      {/* 01 brief */}
      <section className="sec" id="brief">
        <div className="page">
          <div className="sec-head">
            <div><div className="num">{m.briefNum || "01 · brief"}</div><span className="anno">{m.briefAnno || "the problem · template"}</span></div>
            <div><h2>{t(c.brief.head, lang)}</h2></div>
          </div>
          <div className="brief-grid">
            <div className="brief-body">
              <p>{t(c.brief.body, lang)}</p>
              <ul className="brief-callouts">
                {c.brief.callouts.map(([k, cv], i) => (
                  <li key={i}><span className="k">{k}</span><span className="v">{t(cv, lang)}</span></li>
                ))}
              </ul>
            </div>
            <aside className="brief-side">
              <h4>deliverables</h4>
              <ul>
                {c.meta.deliverables.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* 02 approach */}
      <section className="sec sec--dark" id="approach">
        <div className="page">
          <div className="sec-head">
            <div><div className="num">{m.approachNum || "02 · approach"}</div><span className="anno">{m.approachAnno || "four moves · template"}</span></div>
            <div><h2>{lang === "pt" ? "Como o trabalho avançou." : "How the work moved."}</h2></div>
          </div>
          <ol className="approach">
            {c.approach.map((s, i) => (
              <li key={i}>
                <div className="step-num">{s.num}</div>
                <div className="step-body">
                  <h3>{t(s.title, lang)}</h3>
                  <p>{t(s.body, lang)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 03 output — image gallery */}
      <section className="sec" id="output">
        <div className="page">
          <div className="sec-head">
            <div><div className="num">{m.outputNum || "03 · output"}</div><span className="anno">{m.outputAnno || "artifacts · placeholders"}</span></div>
            <div><h2>What shipped.</h2><p className="sub">Image placeholders for real artifacts. Captions stand in for credits.</p></div>
          </div>
          <div className="gallery">
            {c.output.map((blk, i) => {
              const baseId = `case-output-${c.slug || c.meta.client}-${i}`;
              if (blk.kind === "full") {
                return (
                  <figure className="g g--full" key={i}>
                    <ImgSlot id={baseId} label={blk.label} aspect="16/9" />
                    <figcaption>{blk.note}</figcaption>
                  </figure>
                );
              }
              if (blk.kind === "wide") {
                return (
                  <figure className="g g--wide" key={i}>
                    <ImgSlot id={baseId} label={blk.label} aspect="16/9" />
                    <figcaption>{blk.note}</figcaption>
                  </figure>
                );
              }
              if (blk.kind === "detail") {
                return (
                  <figure className="g g--detail" key={i}>
                    <ImgSlot id={baseId} label={blk.label} aspect="3/2" />
                    <figcaption>{blk.note}</figcaption>
                  </figure>
                );
              }
              if (blk.kind === "twin") {
                const parseAspect = (label) => { const m = (label || "").match(/(\d+)[:/](\d+)\s*$/); return m ? `${m[1]}/${m[2]}` : "4/5"; };
                return (
                  <figure className="g g--twin" key={i}>
                    <div>
                      <ImgSlot id={`${baseId}-a`} label={blk.labels[0]} aspect={parseAspect(blk.labels[0])} />
                    </div>
                    <div>
                      <ImgSlot id={`${baseId}-b`} label={blk.labels[1]} aspect={parseAspect(blk.labels[1])} />
                    </div>
                    <figcaption>{t(blk.note, lang)}</figcaption>
                  </figure>
                );
              }
              return null;
            })}
          </div>
        </div>
      </section>

      {/* 04 results — KPI strip */}
      <section className="sec sec--bone" id="results">
        <div className="page">
          <div className="sec-head">
            <div><div className="num">{m.resultsNum || "04 · results"}</div><span className="anno">{m.resultsAnno || "numbers · template"}</span></div>
            <div><h2>What it moved.</h2></div>
          </div>
          <div className="kpis">
            {c.results.map((r, i) => (
              <div className="kpi" key={i}>
                <div className="kpi-stat">{r.stat}</div>
                <div className="kpi-note">{r.note}</div>
              </div>
            ))}
          </div>

          {/* quote */}
          <blockquote className="case-quote">
            <p>"{t(c.quote.text, lang)}"</p>
            <cite>
              <b>{c.quote.author}</b>
              <span>{t(c.quote.role, lang)}</span>
            </cite>
          </blockquote>
        </div>
      </section>

      {/* 05 credits */}
      <section className="sec" id="credits">
        <div className="page">
          <div className="sec-head">
            <div><div className="num">{m.creditsNum || "05 · credits"}</div><span className="anno">{m.creditsAnno || "team · static"}</span></div>
            <div><h2>Credits.</h2></div>
          </div>
          <ul className="credits">
            {c.credits.map(([k, v], i) => (
              <li key={i}><span className="k">{k}</span><span className="v">{v}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* next case teaser */}
      <section className="next-case" id="next">
        <div className="page">
          <div className="nc-row">
            <div className="nc-num">{next.num} · up next</div>
            <a href={next.slug ? `/case-study.html?slug=${next.slug}` : "/work.html"} className="nc-link">
              <span className="nc-client">{next.client.toLowerCase()} · {next.year}</span>
              <span className="nc-title">{next.title}</span>
              <span className="nc-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer — borrow from home; minimal version for case page */}
      <CaseFooter data={data} lang={lang} />
    </div>
  );
}

// Slimmer footer specific to case pages — same brand language as home,
// but the sign-off swaps to "more work" instead of newsletter capture.
function CaseFooter({ data, lang }) {
  return (
    <footer className="footer case-footer">
      <div className="page footer-inner">
        <div className="cf-row">
          <a href="/" className="cf-mark">
            <img src="assets/akc_logo_white.svg" alt="AKC" />
          </a>
          <div className="cf-links">
            <a href="/work.html">{lang === "pt" ? "Todos os trabalhos" : "All work"}</a>
            <a href="/about.html">About</a>
            <a href={`mailto:${data.meta.email}`}>Email</a>
            <a href={`https://${data.meta.linkedin}`} target="_blank" rel="noreferrer">LinkedIn</a>
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

Object.assign(window, { CaseStudy });
