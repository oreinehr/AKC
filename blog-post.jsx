/* global React, Placeholder, Nav, LiveTime, NewsletterForm */
// Blog post template — desktop + mobile.
// Long-form reading layout. In-line images, pull-quotes, related posts,
// newsletter capture at the bottom (loops back to the publish pipeline).

const POST_DATA = {
  meta: {
    num: "note 01",
    section: "Practice",
    date: "2026 · May",
    read: "8 min",
    title: "The lume rule: scarcity as design discipline",
    subtitle: "Why a signature accent earns its place by appearing on roughly one surface in ten.",
    cover: { label: "cover · 16:9 · brand specimen", aspect: "16/9" },
  },
  byline: {
    name: "Alessandro Kuhn Contes",
    role: "Creative Director",
    location: "Novo Hamburgo, BR",
  },
  // Blocks render in sequence. Kinds: p · h2 · h3 · quote · figure · twin · list
  body: [
    { kind: "p", text: "A watch dial has one signature color and a lume — a separate luminous compound that only activates in defined conditions: low light, motion. The lume is structural to the watch's identity, but it's not always visible. Designed in, dosed precisely, deployed sparingly." },
    { kind: "p", text: "That's the model. Most personal-brand visual systems fail not because the accent is wrong but because the accent is everywhere. A signature color used on every surface is wallpaper. A signature color used on roughly one surface in ten reads as discipline." },
    { kind: "h2", text: "What the rule actually does" },
    { kind: "p", text: "Three things, in order. First, it gives the brand a primary register — the working palette that holds 90% of surfaces. That's the calibration bar. Second, it earns the right to a moment — the 10% — by holding the other 90%. Third, it forces honest conversation about what counts as a moment: if everything's loud, nothing is." },
    { kind: "figure", label: "specimen · phosphor block with black type · 16:10", aspect: "16/10", caption: "Phosphor only appears in defined contexts — time-stamped graphics, kinetic moments, AI-forward tags. Never as text." },
    { kind: "h2", text: "Where the rule allows the accent" },
    { kind: "list", items: [
      "Time-stamped or year-stamped graphics — \"2026\" campaign tags, newsletter issue numbers.",
      "Motion / kinetic work showcases — video accents, generative samples, moving-image tiles.",
      "AI-content or technology-forward tags — signals current without putting the buzzword in copy.",
      "Single hero highlights on a landing page section. Not all of them.",
    ] },
    { kind: "quote", text: "If phosphor is everywhere, it becomes wallpaper. If it's never used, why have it. Aim for ~1 of every 10 surfaces.", attribution: "from the brand system, locked 2026-04-29" },
    { kind: "h2", text: "Where the rule keeps the accent out" },
    { kind: "list", items: [
      "Stationery — letterhead, business cards. Primary palette only.",
      "Email signature — primary only.",
      "Print proposals, RFPs, decks — primary only.",
      "As text. Phosphor fails contrast as type. Always a fill with black type on top.",
      "The logo — never recolor the mark.",
    ] },
    { kind: "twin", a: { label: "letterhead · primary · 4:5", aspect: "4/5" }, b: { label: "social tile · lume · 4:5", aspect: "4/5" }, caption: "Same brand, two registers. The letterhead holds the working palette; the social tile earns the lume." },
    { kind: "h3", text: "The carryable lesson" },
    { kind: "p", text: "Calibration is mostly restraint. The bar moves up when the system gives one thing the room to land — and refuses to spend that room on filler. The lume rule is one shape of that restraint. The deeper rule is older: scarcity is what makes a signal a signal." },
    { kind: "p", text: "Most brands don't have a lume. They have a color palette, evenly distributed. The work of moving past that isn't picking a different color — it's picking a discipline and keeping it." },
  ],
  tags: ["brand systems", "color discipline", "personal-brand work"],
  related: [
    { date: "2026 · Apr", read: "6 min", title: "Calibrated by harder rooms", excerpt: "Twenty years across Brazil and the U.S. tunes a different ear for what enterprise creative is supposed to do." },
    { date: "soon", read: "—", title: "What survives a platform shift", excerpt: "On what was never the work in the first place — and what holds when the tools change.", coming: true },
  ],
};

function BlogPost({ data, dark, setDark, lang, setLang, mobile, tablet, postData = POST_DATA }) {
  const p = postData;
  const marks = (data && data.marks && data.marks.post) || {};
  // Accept either the original shape (p.meta.*, p.byline.*) or the flat
  // shape used on data.blog rows (date/read/title/section at top level).
  const meta = p.meta || {
    num: p.num || (p.slug ? `note · ${p.slug}` : "note"),
    section: p.section || "Notes",
    date: p.date || "—",
    read: p.read || "—",
    title: p.title || "Untitled",
    subtitle: p.subtitle || p.excerpt || "",
    cover: p.cover || { label: "cover · 16:9", aspect: "16/9" },
  };
  const byline = p.byline || {
    name: data?.meta?.name || "—",
    role: data?.meta?.role || "—",
    location: data?.meta?.location || "—",
  };
  const tags = p.tags || [];
  const related = p.related || ((data && data.blog) ? data.blog.filter((b) => b.slug !== p.slug).slice(0, 2) : []);
  const rootRef = React.useRef(null);
  if (window.useCobaltCursor) window.useCobaltCursor(rootRef);
  React.useEffect(() => {
    document.title = `${t(meta.title, lang)} — Alessandro Kuhn Contes`;
  }, [meta.title, lang]);
  return (
    <div ref={rootRef} className={`wf ${dark ? "dark" : ""} ${mobile ? "wf--mobile" : ""} ${tablet ? "wf--tablet" : ""} post`} id="top">
      <Nav darkOn={dark} onToggleDark={setDark} lang={lang} onLang={setLang} location={data.meta.location.toLowerCase()} mobile={mobile} />

      {/* breadcrumb + meta */}
      <div className="post-crumb">
        <div className="page">
          <a href="/blog.html">{lang === "pt" ? "← Todas as notas" : "← All notes"}</a>
          <span className="dot">·</span>
          <span>{meta.section}</span>
          <span className="dot">·</span>
          <span>{meta.date}</span>
          <span className="dot">·</span>
          <span>{meta.read} read</span>
        </div>
      </div>

      {/* article header */}
      <header className="post-head">
        <div className="page">
          <div className="post-num">{meta.num}</div>
          <h1>{t(meta.title, lang)}</h1>
          {meta.subtitle && <p className="post-sub">{t(meta.subtitle, lang)}</p>}
          <div className="post-byline">
            <span><b>{byline.name}</b></span>
            <span className="dot">·</span>
            <span>{t(byline.role, lang)}</span>
            <span className="dot">·</span>
            <span>{byline.location}</span>
          </div>
        </div>
      </header>

      {/* cover */}
      <div className="post-cover">
        <div className="page">
          <ImgSlot id={`post-cover-${p.slug || "default"}`} label={meta.cover.label} aspect={meta.cover.aspect} />
        </div>
      </div>

      {/* body */}
      <article className="post-body">
        <div className="page">
          {(p.body || []).map((blk, i) => renderBlock(blk, i, p.slug, lang))}
        </div>
      </article>

      {/* tags + share strip */}
      <div className="post-end">
        <div className="page">
          <div className="post-tags">
            <span className="k">{marks.tagsLabel || "filed under"}</span>
            {tags.map((t, i) => <a key={i} href="#" className="tag">{t}</a>)}
          </div>
          <div className="post-share">
            <span className="k">share</span>
            <a href="#" onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(window.location.href); }}>Copy link</a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={`mailto:?subject=${encodeURIComponent(t(meta.title, lang))}&body=${encodeURIComponent(window.location.href)}`}>Email</a>
          </div>
        </div>
      </div>

      {/* newsletter capture — loops back to the publish pipeline */}
      <section className="post-news" id="news">
        <div className="page">
          <div className="pn-grid">
            <div>
              <div className="pn-num">{(typeof data.newsletter.title === "object" ? (data.newsletter.title[lang] || data.newsletter.title.en) : data.newsletter.title).toLowerCase()}</div>
              <h2>Get the next one in your inbox.</h2>
              <p>{t(data.newsletter.blurb, lang)}</p>
            </div>
            <NewsletterForm n={data.newsletter} />
          </div>
        </div>
      </section>

      {/* related posts */}
      <section className="post-related">
        <div className="page">
          <div className="sec-head">
            <div><div className="num">{marks.relatedNum || "related notes"}</div><span className="anno">{related.length} of {(data.blog || []).length}</span></div>
            <div><h2>Keep reading.</h2></div>
          </div>
          <div className="related-list">
            {related.map((r, i) => (
              <a key={i} className={`related-row ${r.coming ? "coming" : ""}`} href={r.coming || !r.slug ? undefined : `/blog-post.html?slug=${r.slug}`}>
                <div className="meta">{r.date} · {r.read}</div>
                <div>
                  <h3>{t(r.title, lang)}</h3>
                  <p>{t(r.excerpt, lang)}</p>
                </div>
                <div className="cta">{r.coming ? "soon" : "read →"}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* slim footer — same as case template */}
      <footer className="footer case-footer">
        <div className="page footer-inner">
          <div className="cf-row">
            <a href="#" className="cf-mark">
              <img src="assets/akc_logo_white.svg" alt="AKC" />
            </a>
            <div className="cf-links">
              <a href="/blog.html">{lang === "pt" ? "Todas as notas" : "All notes"}</a>
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
    </div>
  );
}

function renderBlock(b, i, postSlug = "default", lang = "en") {
  switch (b.kind) {
    case "p": return <p key={i}>{t(b.text, lang)}</p>;
    case "h2": return <h2 key={i}>{t(b.text, lang)}</h2>;
    case "h3": return <h3 key={i}>{t(b.text, lang)}</h3>;
    case "list":
      return (
        <ul key={i} className="post-list">
          {b.items.map((it, j) => <li key={j}>{t(it, lang)}</li>)}
        </ul>
      );
    case "quote":
      return (
        <blockquote key={i} className="post-quote">
          <p>"{t(b.text, lang)}"</p>
          {b.attribution && <cite>— {t(b.attribution, lang)}</cite>}
        </blockquote>
      );
    case "figure":
      return (
        <figure key={i} className="post-figure">
          <ImgSlot id={`post-fig-${postSlug}-${i}`} label={b.label} aspect={b.aspect} />
          {b.caption && <figcaption>{t(b.caption, lang)}</figcaption>}
        </figure>
      );
    case "twin":
      return (
        <figure key={i} className="post-figure post-figure--twin">
          <div className="twin-row">
            <ImgSlot id={`post-fig-${postSlug}-${i}-a`} label={b.a.label} aspect={b.a.aspect} />
            <ImgSlot id={`post-fig-${postSlug}-${i}-b`} label={b.b.label} aspect={b.b.aspect} />
          </div>
          {b.caption && <figcaption>{t(b.caption, lang)}</figcaption>}
        </figure>
      );
    default: return null;
  }
}

Object.assign(window, { BlogPost });
