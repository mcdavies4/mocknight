import Link from "next/link";
import type { ReactNode } from "react";

// Renders the small markdown subset used by blog posts: ## headings, - bullets, paragraphs, **bold**, *italic*, [text](href).
function inline(text: string, key = ""): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0, m: RegExpExecArray | null, i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const k = `${key}-${i++}`;
    if (m[1]) out.push(<b key={k}>{m[1]}</b>);
    else if (m[2]) out.push(<em key={k}>{m[2]}</em>);
    else out.push(m[4].startsWith("/") ? <Link key={k} href={m[4]}>{m[3]}</Link> : <a key={k} href={m[4]} rel="noopener">{m[3]}</a>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Prose({ body }: { body: string }) {
  const blocks = body.trim().split(/\n\s*\n/);
  return (
    <div className="prose">
      {blocks.map((b, i) => {
        const t = b.trim();
        if (t.startsWith("## ")) return <h2 key={i}>{inline(t.slice(3), `h${i}`)}</h2>;
        const lines = t.split("\n");
        if (lines.every((l) => l.trim().startsWith("- ")))
          return <ul key={i}>{lines.map((l, j) => <li key={j}>{inline(l.trim().slice(2), `l${i}-${j}`)}</li>)}</ul>;
        return <p key={i}>{inline(t.replace(/\n/g, " "), `p${i}`)}</p>;
      })}
    </div>
  );
}
