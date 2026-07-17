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

  // ---- Form: mailto con validación ----
  const input = el('email');
  const error = el('email-error');

  function submitEmail() {
    const value = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!valid) {
      error.classList.add('visible');
      input.focus();
      return;
    }
    error.classList.remove('visible');
    const subject = encodeURIComponent('Agregar a lista de difusión');
    const body = encodeURIComponent(value);
    window.location.href = `mailto:info@lacazasubastas.com?subject=${subject}&body=${body}`;
  }

  el('notify-btn').addEventListener('click', submitEmail);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') submitEmail(); });
  input.addEventListener('input', () => error.classList.remove('visible'));
