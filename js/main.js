// ---- Countdown: 16 sep 2026, 10:00 AM hora Bogotá (UTC-5) ----
  const TARGET = new Date('2026-09-16T10:00:00-05:00').getTime();
  const pad = n => String(n).padStart(2, '0');
  const el = id => document.getElementById(id);

  function tick() {
    let diff = Math.max(0, TARGET - Date.now());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000) % 24;
    const m = Math.floor(diff / 60000) % 60;
    const s = Math.floor(diff / 1000) % 60;
    el('cd-d').textContent = pad(d);
    el('cd-h').textContent = pad(h);
    el('cd-m').textContent = pad(m);
    el('cd-s').textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);
  
  const FORM_ID = '1FAIpQLScwDgUbE1PQPDkXHyXKQ9kSmGkfq517Oc91xt25MONsOiMhGg';
  const ENTRY_ID = 'entry.1149404765';

  const input = el('email');
  const error = el('email-error');
  const success = el('email-success');
  const btn = el('notify-btn');

  function submitEmail() {
    const value = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!valid) {
      error.classList.add('visible');
      input.focus();
      return;
    }
    error.classList.remove('visible');

    // Estado de carga
    btn.disabled = true;
    btn.textContent = 'Enviando…';

    const url = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;
    const data = new FormData();
    data.append(ENTRY_ID, value);

    // no-cors: Google no devuelve CORS, así que la respuesta es opaca.
    // Si el fetch resuelve, asumimos éxito.
    fetch(url, { method: 'POST', mode: 'no-cors', body: data })
      .then(() => {
        input.value = '';
        input.style.display = 'none';
        btn.style.display = 'none';
        success.classList.add('visible');
      })
      .catch(() => {
        btn.disabled = false;
        btn.textContent = 'Avísenme';
        error.textContent = 'No se pudo enviar. Intenta de nuevo.';
        error.classList.add('visible');
      });
  }

  btn.addEventListener('click', submitEmail);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') submitEmail(); });
  input.addEventListener('input', () => error.classList.remove('visible'));
