import { ThemeToggle } from './theme-toggle';

export default function HomePage() {
  return (
    <div className="shell">
      <header className="header">
        <span className="brand">AsoHub</span>
        <ThemeToggle />
      </header>
      <main className="main">
        <h1 className="tagline">Made to measure. Tracked to the last stitch.</h1>
        <p className="description">
          See your outfit's progress, what you've paid and what you still owe, all in one place.
        </p>
        <button type="button" className="actionButton">
          Get started
        </button>
      </main>
    </div>
  );
}

