import { Suspense } from "react";
import Cbt from "./cbt";

export const metadata = { title: "Mock Night CBT" };

export default function MockPage() {
  return (
    <Suspense fallback={<div className="center"><p className="muted">Loading…</p></div>}>
      <Cbt />
    </Suspense>
  );
}
