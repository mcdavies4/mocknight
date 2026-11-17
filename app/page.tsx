import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";
import { sortedPosts } from "@/lib/blog";
import { getSiteStats, plus } from "@/lib/stats";

export default async function Home() {
  const stats = await getSiteStats();
  const bot = process.env.TELEGRAM_BOT_USERNAME ?? "";
  return (
    <main className="wrap brand-home" style={{ maxWidth: 880 }}>
      <JsonLd data={[{ "@context": "https://schema.org", "@type": "Organization", name: "Mock Night", url: SITE_URL, logo: `${SITE_URL}/icons/icon-512.png`, sameAs: ["https://t.me/MocknightNGbot"] }, { "@context": "https://schema.org", "@type": "WebSite", name: "Mock Night", url: SITE_URL }]} />
      <section className="hero">
        <h1>Prepare for the exams that move you forward.</h1>
        <p className="muted">Mock Night brings academic exam practice and professional certification preparation together — with daily questions, timed mock exams, explanations and progress tracking on web and Telegram.</p>
        <p><Link className="btn" href="/exams">Explore all exam pathways</Link></p>
      </section>

      {stats && (
        <section className="stat-row" aria-label="Mock Night in numbers">
          <div className="stat"><b>{plus(stats.questions)}</b><span>practice questions</span></div>
          <div className="stat"><b>{stats.exams}</b><span>exams across {stats.countries} countries</span></div>
          {stats.learners ? (
            <div className="stat"><b>{plus(stats.learners)}</b><span>learners</span></div>
          ) : (
            <div className="stat"><b>100%</b><span>answers explained</span></div>
          )}
          <div className="stat"><b>14 days</b><span>free, everything unlocked</span></div>
        </section>
      )}

      <section className="card" style={{ marginBottom: 12 }}>
        <h2 style={{ marginTop: 0 }}>🌍 Technology & Digital Careers</h2>
        <p>Global IT support, Cisco networking, AWS, Azure and Python learning pathways — with practice on web and Telegram.</p>
        <Link className="btn" href="/technology">Explore technology pathways</Link>
      </section>

      <div className="grid2">
        <div className="card">
          <h2 style={{ marginTop: 0 }}>🇬🇧 Life in the UK Test</h2>
          <p>24-question practice tests in 45 minutes — exactly like the real test. Daily practice, a readiness score, and explanations for every answer.</p>
          <Link className="btn block" href="/life-in-the-uk">Start practising</Link>
        </div>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>🎓 JAMB & WAEC</h2>
          <p>Daily drills on Telegram, a real CBT practice screen, and <b>Mock Night</b> — the same exam for every student in Nigeria, every Sunday at 8pm.</p>
          {bot && <a className="btn block" href={`https://t.me/${bot}`}>Start on Telegram</a>}
          <Link className="btn secondary block" style={{ marginTop: 8 }} href="/app">Or use the web app</Link>
        </div>
      </div>

      <div className="grid2" style={{ marginTop: 12 }}>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>🩺 NMC CBT for nurses</h2>
          <p>Part A numeracy and Part B clinical practice tests for internationally educated nurses joining the UK register.</p>
          <Link className="btn block" href="/nmc-cbt">Start practising</Link>
        </div>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>✈️ Moving abroad</h2>
          <p>Citizenship tests for the UK, US, Canada and Australia, IELTS with essay marking, and licensing exams for doctors and nurses.</p>
          <Link className="btn block" href="/exams">See all pathways</Link>
        </div>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>⚕️ PLAB 1 for doctors</h2>
          <p>180-question best-of-five mocks timed to the real paper, with UK guideline-based explanations.</p>
          <Link className="btn block" href="/plab">Start practising</Link>
        </div>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>🏥 NCLEX-RN</h2>
          <p>Prioritisation, delegation, pharmacology and dosage calculation practice for nurses heading to the US.</p>
          <Link className="btn block" href="/nclex">Start practising</Link>
        </div>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>🇪🇹 Ethiopia Grade 12</h2>
          <p>Practice for the national exam: English, Maths, Aptitude and your stream subjects, with timed online-style tests.</p>
          <Link className="btn block" href="/ethiopia">Start practising</Link>
        </div>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>🇮🇳 SSC CGL / CHSL</h2>
          <p>Tier 1 mocks with +2/−0.5 marking, quant and reasoning sectionals, and daily questions on Telegram.</p>
          <Link className="btn block" href="/ssc">Start practising</Link>
        </div>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>📋 Project Management</h2>
          <p>PRINCE2 7 Foundation, Scrum PSM I and CAPM-style practice tests, with daily questions on Telegram.</p>
          <Link className="btn block" href="/project-management">Start practising</Link>
        </div>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>🧯 Fire Marshal training</h2>
          <p>8 short online modules, a final assessment and a certificate valid for 12 months. Company accounts with training records.</p>
          <Link className="btn block" href="/fire-marshal">Learn more</Link>
        </div>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>🏛️ Post-UTME & 🇬🇭 WASSCE Ghana</h2>
          <p>Fast timed screening practice for university admission, and free WASSCE practice for students in Ghana.</p>
          <Link className="btn secondary block" href="/app">Start practising</Link>
        </div>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        👩🏾‍🏫 <b>Tutors, schools and training providers:</b> one link for your learners, a dashboard of who&apos;s practising, and weekly results.
        {bot && <> Message <a href={`https://t.me/${bot}`}>@{bot}</a> and send <code>/newgroup</code>.</>}
      </div>
      <section style={{ marginTop: 28 }}>
        <h2>📚 Guides and study tips</h2>
        <div className="post-list">
          {sortedPosts().slice(0, 3).map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="card post-card">
              <div className="muted small">{p.tag} · {p.readMins} min read</div>
              <h3>{p.title}</h3>
              <p className="muted small" style={{ marginBottom: 0 }}>{p.description}</p>
            </Link>
          ))}
        </div>
        <p><Link className="btn secondary" href="/blog">Read all guides</Link></p>
      </section>
    </main>
  );
}
