import { Suspense } from "react";
import Learn from "./learn";

export const metadata = { title: "Your dashboard — Mock Night" };

export default function AppPage() {
  return (
    <Suspense fallback={<div className="center"><p className="muted">Loading…</p></div>}>
      <Learn />
    </Suspense>
  );
}
