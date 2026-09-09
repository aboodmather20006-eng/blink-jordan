'use client';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="wrap empty-state">
      <h1>SOMETHING WENT WRONG.</h1>
      <p>Please try loading this page again.</p>
      <button className="button" onClick={reset}>
        TRY AGAIN
      </button>
    </div>
  );
}
