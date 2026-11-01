'use client';

import { useState, type FormEvent } from 'react';
import styles from './page.module.css';

type Feedback =
  | { kind: 'success'; id: number }
  | { kind: 'error' }
  | null;

export default function RequestFittingPage() {
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const formData = new FormData(event.currentTarget);
    setSending(true);
    setFeedback(null);

    try {
      const response = await fetch('/api/fitting-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.get('full_name'),
          phone: formData.get('phone'),
          outfit_type: formData.get('outfit_type'),
        }),
      });

      if (response.status !== 201) {
        setFeedback({ kind: 'error' });
        return;
      }

      const saved: unknown = await response.json();

      if (
        typeof saved !== 'object' ||
        saved === null ||
        !('id' in saved) ||
        typeof saved.id !== 'number'
      ) {
        setFeedback({ kind: 'error' });
        return;
      }

      setFeedback({ kind: 'success', id: saved.id });
    } catch {
      setFeedback({ kind: 'error' });
    } finally {
      setSending(false);
    }
  }

  return (
    <main className={`shell ${styles.page}`}>
      <h1 className={styles.title}>Request a fitting</h1>
      <p className={styles.intro}>Share your details to request a fitting.</p>

      <form className={styles.form} onSubmit={handleSubmit} aria-busy={sending}>
        <div className={styles.field}>
          <label htmlFor="full_name">Full name</label>
          <input id="full_name" name="full_name" type="text" autoComplete="name" />
        </div>

        <div className={styles.field}>
          <label htmlFor="phone">Phone number</label>
          <input
            id="phone"
            name="phone"
            type="text"
            inputMode="tel"
            autoComplete="tel"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="outfit_type">Outfit type</label>
          <select id="outfit_type" name="outfit_type">
            <option>Event outfit</option>
            <option>Corporate wear</option>
            <option>Wedding set</option>
            <option>Alteration</option>
          </select>
        </div>

        <button type="submit" className={`actionButton ${styles.submit}`} disabled={sending}>
          {sending ? 'Sending…' : 'Request a fitting'}
        </button>
      </form>

      <div aria-live="polite" aria-atomic="true">
        {feedback?.kind === 'success' && (
          <p className={`${styles.feedback} ${styles.success}`}>
            <span aria-hidden="true">✓</span>
            <span>Your fitting request was saved. Your request ID is {feedback.id}.</span>
          </p>
        )}
        {feedback?.kind === 'error' && (
          <p className={`${styles.feedback} ${styles.error}`}>
            <span aria-hidden="true">!</span>
            <span>Your fitting request could not be saved. Please try again.</span>
          </p>
        )}
      </div>
    </main>
  );
}
