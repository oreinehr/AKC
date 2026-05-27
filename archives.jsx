/* global React, Placeholder, ImgSlot, Nav, LiveTime, useCobaltCursor */
// Archive pages — /work (all cases) and /notes (all posts).
// Filterable by year + (sector | tag). Same dark register as the rest.

const { useState: useStateA, useMemo: useMemoA, useRef: useRefA } = React;

// Small filter-chip strip used by both archives.
function FilterStrip({ label, options, value, onChange }) {
  return (
    <div className="ar-filter">
      <span className="ar-filter-k">{label}</span>
      <div className="ar-filter-chips">
        <button className={!value ? "on" : ""} onClick={() => onChange(null)}>all</button>
        {options.map((o) => (
          <button key={o} className={value === o ? "on" : ""} onClick={() => onChange(o)}>{o}</button>
        ))}
      </div>
    </div>
  );
}

function ArchiveWork({ data, dark, setDark, lang, setLang, mobile, navigate }) {
  const rootRef = useRefA(null);
  useCobaltCursor(rootRef);
  const openCase = (navigate && navigate.openCase) || (() => {});
  const items = data.work || [];

  // Build option lists from the data. Year first segment ("2024–present" → "2024").
  const yearOf = (s) => (s || "").split("–")[0].trim();
  const yearOpts = useMemoA(() => Array.from(new Set(items.map((w) => yearOf(w.year)))).sort().reverse(), [items]);
  // Sector comes from the linked case (data.cases) if available; otherwise "—".
  const sectorOf = (w) => {
    const cs = (data.cases || []).find((c) => c.slug === w.caseSlug);
    return cs ? (cs.meta.sector || "—") : "—";
  };
  const sectorOpts = useMemoA(() => Array.from(new Set(items.map(sectorOf))).filter((x) => x !== "—"), [items, data.cases]);

  const [year, setYear] = useStateA(null);
  const [sector, setSector] = useStateA(null);

  const filtered = items.filter((w) => {
    if (year && yearOf(w.year) !== year) return false;
    if (sector && sectorOf(w) !== sector) return false;
    return true;
  });

  return (
    <div ref={rootRef} className={`wf ${dark ? "dark" : ""} ${mobile ? "wf--mobile" : ""} archive archive-work`} id="top">
      <Nav darkOn={dark} onToggleDark={setDark} lang={lang} onLang={setLang} location={data.meta.location.toLowerCase()} mobile={mobile} />

      <section className="ar-head">
        <div className="page">
          <div className="ar-eyebrow">{lang === "pt" ? "Trabalhos · arquivo" : "Work · archive"}</div>
          <h1>{lang === "pt" ? "Trabalhos selecionados, 2006 — presente." : "Selected work, 2006 — present."}</h1>
          <p className="ar-lede">{lang === "pt" ? "Todo projeto que ganhou uma linha na prática. Filtre por ano ou setor; clique para o case completo." : "Every engagement that earned a row in the practice. Filter by year or sector; click through for the full case."}</p>
        </div>
      </section>

      <section className="ar-filters">
        <div className="page">
          <FilterStrip label="year" options={yearOpts} value={year} onChange={setYear} />
          <FilterStrip label="sector" options={sectorOpts} value={sector} onChange={setSector} />
          <div className="ar-count">{filtered.length} of {items.length}</div>
        </div>
      </section>

      <section className="ar-list-sec">
        <div className="page">
          <div className="ar-work-list">
            {filtered.map((w, i) => {
              const linked = !!w.caseSlug;
              const cs = (data.cases || []).find((c) => c.slug === w.caseSlug);
              const sector = cs ? cs.meta.sector : "—";
              return (
                <a
                  key={i}
                  className={`ar-work-row ${linked ? "linked" : "unlinked"}`}
                  href={linked ? `case-study.html?slug=${w.caseSlug}` : undefined}
                  onClick={(e) => { if (linked) { e.preventDefault(); openCase(w.caseSlug); } }}
                  aria-disabled={!linked}
                >
                  <div className="ar-work-thumb">
                    <ImgSlot id={w.caseSlug ? `case-cover-${w.caseSlug}` : `archive-work-unlinked-${i}`} label={`work · ${w.tone}`} aspect="16/9" />
                  </div>
                  <div className="ar-work-meta">
                    <div className="ar-meta-row">
                      <span className="ar-year">{w.year}</span>
                      <span className="dot">·</span>
                      <span className="ar-client">{w.client.toLowerCase()}</span>
                    </div>
                    <h3>{t(w.title, lang)}</h3>
                    <p>{t(w.summary, lang)}</p>
                    <div className="ar-tag-row">
                      <span className="ar-tag">{sector}</span>
                      <span className="ar-cta">{linked ? (lang === "pt" ? "ver case →" : "read case →") : (lang === "pt" ? "em breve" : "case soon")}</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <ArchiveSlimFooter data={data} />
    </div>
  );
}

function ArchiveNotes({ data, dark, setDark, lang, setLang, mobile, navigate }) {
  const rootRef = useRefA(null);
  useCobaltCursor(rootRef);
  const openPost = (navigate && navigate.openPost) || (() => {});
  const items = data.blog || [];

  const yearOpts = useMemoA(() => Array.from(new Set(items.map((b) => b.date))).filter((y) => y !== "soon").sort().reverse(), [items]);
  const tagOpts = useMemoA(() => {
    const all = new Set();
    items.forEach((b) => (b.tags || []).forEach((t) => all.add(t)));
    return [...all].sort();
  }, [items]);

  const [year, setYear] = useStateA(null);
  const [tag, setTag] = useStateA(null);

  const filtered = items.filter((b) => {
    if (year && b.date !== year) return false;
    if (tag && !(b.tags || []).includes(tag)) return false;
    return true;
  });

  return (
    <div ref={rootRef} className={`wf ${dark ? "dark" : ""} ${mobile ? "wf--mobile" : ""} archive archive-notes`} id="top">
      <Nav darkOn={dark} onToggleDark={setDark} lang={lang} onLang={setLang} location={data.meta.location.toLowerCase()} mobile={mobile} />

      <section className="ar-head">
        <div className="page">
          <div className="ar-eyebrow">{lang === "pt" ? "Notas · arquivo" : "Notes · archive"}</div>
          <h1>{lang === "pt" ? "Todas as notas, em ordem." : "All notes, in order."}</h1>
          <p className="ar-lede">{lang === "pt" ? "Baixa cadência, alto conteúdo. Filtre por ano ou tag. Inscreva-se — cada nova nota chega na caixa de entrada." : "Low cadence, high substance. Filter by year or tag. Subscribe at the bottom — each new note ships to the inbox."}</p>
        </div>
      </section>

      <section className="ar-filters">
        <div className="page">
          <FilterStrip label="year" options={yearOpts} value={year} onChange={setYear} />
          <FilterStrip label="tag" options={tagOpts} value={tag} onChange={setTag} />
          <div className="ar-count">{filtered.length} of {items.length}</div>
        </div>
      </section>

      <section className="ar-list-sec">
        <div className="page">
          <div className="ar-notes-list">
            {filtered.map((b, i) => {
              const linked = !b.coming && !!b.slug;
              return (
                <a
                  key={i}
                  className={`ar-note-row ${linked ? "linked" : "unlinked"}`}
                  href={linked ? `#post/${b.slug}` : undefined}
                  onClick={(e) => { if (linked) { e.preventDefault(); openPost(b.slug); } }}
                  aria-disabled={!linked}
                >
                  <div className="meta">{b.date} · {b.read}</div>
                  <div>
                    <h3>{t(b.title, lang)}</h3>
                    <p>{t(b.excerpt, lang)}</p>
                    {(b.tags || []).length > 0 && (
                      <div className="ar-tag-row">
                        {b.tags.map((tg, k) => <span key={k} className="ar-tag">{tg}</span>)}
                      </div>
                    )}
                  </div>
                  <div className="cta">{b.coming ? (lang === "pt" ? "em breve" : "soon") : (lang === "pt" ? "ler →" : "read →")}</div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <ArchiveSlimFooter data={data} />
    </div>
  );
}

// Slim footer is defined in about-contact.jsx and lives on window.
// Read it lazily at render time so it's the real component, not this file.
function ArchiveSlimFooter(props) {
  const F = window.SlimFooter;
  return F ? <F {...props} /> : null;
}

Object.assign(window, { ArchiveWork, ArchiveNotes });
