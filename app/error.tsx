"use client";

/** Shown instead of a blank page if anything crashes in the browser. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="center">
      <div>
        <h2>Something went wrong</h2>
        <p className="muted small" style={{ wordBreak: "break-word" }}>{error.message || "Unknown error"}{error.digest ? ` (ref ${error.digest})` : ""}</p>
        <button className="btn" onClick={reset}>Try again</button>
      </div>
    </div>
  );
}
