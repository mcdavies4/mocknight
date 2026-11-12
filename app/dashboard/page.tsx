import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { db, must } from "@/lib/supabase";
import { getStudent } from "@/lib/students";
import { groupsOwnedBy, joinLink } from "@/lib/groups";
import { env } from "@/lib/env";
import { formatWat } from "@/lib/time";
import { trainingRecords } from "@/lib/training-records";
import { getLessons } from "@/lib/courses";

export const dynamic = "force-dynamic";
export const metadata = { title: "Tutor dashboard — Mock Night" };

interface MemberStat {
  student_id: string;
  first_name: string | null;
  username: string | null;
  school: string | null;
  state: string | null;
  has_seat: boolean;
  answered_7d: number;
  correct_7d: number;
  drills_7d: number;
  last_mock_score: number | null;
  last_mock_at: string | null;
}

export default async function Dashboard() {
  const token = (await cookies()).get("mn_dash")?.value;
  const auth = verifyToken(token);
  if (!auth) {
    return (
      <div className="center">
        <div>
          <h2>Dashboard link expired</h2>
          <p className="muted">Send /dashboard to the bot on Telegram to get a fresh link.</p>
        </div>
      </div>
    );
  }

  const tutor = await getStudent(auth.sid);
  const groups = await groupsOwnedBy(auth.sid);
  const totalModules = getLessons("FIRE").length;
  const data = await Promise.all(
    groups.map(async (g) => {
      const members = must(await db().rpc("group_member_stats", { p_group: g.id }), "member stats") as MemberStat[];
      const isCourse = g.currency === "GBP";
      const records = isCourse ? await trainingRecords(members.map((m) => m.student_id)) : null;
      return { group: g, members, records };
    }),
  );

  return (
    <div className="dash">
      <h1>Your students</h1>
      <p className="muted">Hi {tutor?.first_name ?? "there"} — numbers cover the last 7 days. Link expires in about an hour.</p>

      {data.length === 0 && <p>No groups yet. Send <code>/newgroup Name</code> to the bot.</p>}

      {data.map(({ group, members, records }) => {
        const active = members.filter((m) => Number(m.answered_7d) > 0).length;
        const answered = members.reduce((s, m) => s + Number(m.answered_7d), 0);
        const correct = members.reduce((s, m) => s + Number(m.correct_7d), 0);
        const mocked = members.filter((m) => m.last_mock_score !== null);
        const avgMock = mocked.length ? mocked.reduce((s, m) => s + Number(m.last_mock_score), 0) / mocked.length : null;
        const paid = group.paid_until && new Date(group.paid_until) > new Date();
        const sorted = [...members].sort((a, b) => Number(b.answered_7d) - Number(a.answered_7d));

        return (
          <section key={group.id} style={{ marginTop: 32 }}>
            <h2 style={{ marginBottom: 4 }}>
              {group.name} <span className="muted small">· code {group.join_code}</span>
            </h2>
            <p className="muted small" style={{ margin: 0 }}>
              Join link: <a href={joinLink(env.botUsername, group)}>{joinLink(env.botUsername, group)}</a>
              {" · "}
              {paid ? `${group.paid_seats} Premium seats until ${formatWat(group.paid_until!)}` : "No paid seats — send /seats N to the bot"}
            </p>

            {records && (
              <p style={{ margin: "8px 0 0" }}>
                <a className="btn secondary" style={{ minHeight: 36, padding: "6px 12px" }} href={`/dashboard/export?group=${group.id}`}>⬇️ Download training records (CSV)</a>
              </p>
            )}
            <div className="stats">
              {records && (
                <div className="stat"><span className="muted small">Certified (valid)</span><b>{[...records.values()].filter((r) => r.status === "valid" || r.status === "expiring").length}/{members.length}</b></div>
              )}
              <div className="stat"><span className="muted small">Learners</span><b>{members.length}</b></div>
              <div className="stat"><span className="muted small">Practised this week</span><b>{active}</b></div>
              <div className="stat"><span className="muted small">Questions answered</span><b>{answered}</b></div>
              <div className="stat"><span className="muted small">Accuracy</span><b>{answered ? Math.round((correct / answered) * 100) : 0}%</b></div>
              <div className="stat"><span className="muted small">Avg Mock Night</span><b>{avgMock === null ? "—" : `${Math.round(avgMock)}%`}</b></div>
            </div>

            <div className="tablewrap">
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>School</th>
                    <th>Drills (7d)</th>
                    <th>Answered</th>
                    <th>Accuracy</th>
                    <th>Last Mock Night</th>
                    <th>Premium</th>
                    {records && <th>Modules</th>}
                    {records && <th>Certificate</th>}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((m) => {
                    const n = Number(m.answered_7d);
                    const acc = n ? Math.round((Number(m.correct_7d) / n) * 100) : null;
                    return (
                      <tr key={m.student_id}>
                        <td>
                          {m.first_name ?? "—"} {m.username && <span className="muted small">@{m.username}</span>}
                        </td>
                        <td className="muted">{m.school ?? "—"}</td>
                        <td>{Number(m.drills_7d)}</td>
                        <td>{n}</td>
                        <td style={{ color: acc === null ? undefined : acc >= 70 ? "var(--ok)" : acc >= 50 ? "var(--warn)" : "var(--bad)" }}>
                          {acc === null ? "—" : `${acc}%`}
                        </td>
                        <td>{m.last_mock_score === null ? "—" : `${Math.round(Number(m.last_mock_score))}%`}</td>
                        <td>{m.has_seat ? <span className="pill ok">Seat</span> : <span className="pill no">Free</span>}</td>
                        {records && <td>{records.get(m.student_id)?.modules ?? 0}/{totalModules}</td>}
                        {records && (
                          <td>
                            {(() => {
                              const r = records.get(m.student_id);
                              if (!r || r.status === "none") return <span className="pill no">None</span>;
                              const d = new Date(r.expires_at!).toLocaleDateString("en-GB");
                              return r.status === "expired" ? <span className="pill no">Expired {d}</span> : <span className="pill ok">{r.status === "expiring" ? "⚠️ " : ""}Valid to {d}</span>;
                            })()}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                  {sorted.length === 0 && (
                    <tr>
                      <td colSpan={records ? 9 : 7} className="muted">No learners yet — share the join link.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </div>
  );
}
