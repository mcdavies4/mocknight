"use client";
import { useState } from "react";
import { api } from "@/lib/client-api";

// ---------------------------------------------------------------------------
export function ExplainButton({ questionId }: { questionId: string }) {
  const [state, setState] = useState<{ status: "idle" | "loading" | "done" | "error"; text?: string }>({ status: "idle" });
  const run = async () => {
    setState({ status: "loading" });
    try {
      const r = await api<{ text: string }>("/api/app/explain", { questionId });
      setState({ status: "done", text: r.text });
    } catch (e: any) {
      const code = e.message;
      setState({
        status: "error",
        text:
          code === "LIMIT"
            ? `You've used today's ${e.data?.limit ?? 3} free explanations. Premium gets 40 a day.`
            : code === "DISABLED"
              ? "Explanations aren't switched on yet."
              : "Couldn't get an explanation right now. Try again.",
      });
    }
  };
  if (state.status === "done" || state.status === "error")
    return <div className="explain" style={{ marginTop: 8 }}>🤖 {state.text}</div>;
  return (
    <button className="btn secondary" style={{ marginTop: 10, minHeight: 38, padding: "6px 12px" }} onClick={run} disabled={state.status === "loading"}>
      {state.status === "loading" ? "Thinking…" : "🤖 Explain it to me"}
    </button>
  );
}
