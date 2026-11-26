import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Bio } from '../../data/constants';

export default function Contact() {
  const form = useRef(null);
  const sending = useRef(false);
  const [status, setStatus] = useState('idle');

  async function sendMessage(event) {
    event.preventDefault();
    if (sending.current) return;

    sending.current = true;
    setStatus('sending');
    try {
      await emailjs.sendForm(
        'service_vixo1tf',
        'template_yf2eqgm',
        form.current,
        'CPSE96P74xatOp2o8'
      );
      form.current.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    } finally {
      sending.current = false;
    }
  }

  return (
    <section className="folio-section folio-contact" id="contact" data-chapter aria-labelledby="contact-heading">
      <div className="folio-wrap folio-contact-grid">
        <div>
          <h2 id="contact-heading">Let’s talk</h2>
          <p>Send me a message about a project or role, or find me on LinkedIn.</p>
          <div className="folio-actions">
            <a href={Bio.linkedin}>LinkedIn</a>
            <a href={Bio.github}>GitHub</a>
          </div>
        </div>
        <form ref={form} onSubmit={sendMessage}>
          <div className="folio-contact-fields">
            <label htmlFor="name">Name<input id="name" name="from_name" autoComplete="name" required /></label>
            <label htmlFor="email">Email<input id="email" name="from_email" type="email" autoComplete="email" required /></label>
          </div>
          <label htmlFor="subject">Subject<input id="subject" name="subject" required /></label>
          <label htmlFor="message">Message<textarea id="message" name="message" rows={4} required /></label>
          <button className="folio-button" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          <p role="status">
            {status === 'sent' && 'Message sent.'}
            {status === 'error' && 'Could not send your message. Please try again.'}
          </p>
        </form>
      </div>
    </section>
  );
}
