// Pavani IT landing page — small, dependency-free enhancements.

(() => {
  const SVG_NS = 'http://www.w3.org/2000/svg';

  /* ---------- Header: border on scroll, mobile menu ---------- */
  const header = document.querySelector('[data-header]');
  const nav = document.querySelector('[data-nav]');
  const menuBtn = document.querySelector('[data-menu-btn]');

  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (nav && menuBtn) {
    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
    };
    menuBtn.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); menuBtn.focus(); }
    });
  }

  /* ---------- Hero: this month's payroll and compliance calendar ---------- */
  const cal = document.querySelector('[data-cal]');
  if (cal) {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    const today = now.getDate();
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    // Salaries go out on the last working day (Mon–Fri) of the month.
    let payday = daysInMonth;
    while ([0, 6].includes(new Date(y, m, payday).getDay())) payday--;

    cal.querySelector('[data-cal-month]').textContent =
      now.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

    const dueDays = [];
    cal.querySelectorAll('[data-due]').forEach((item, i) => {
      const due = item.dataset.due === 'payday' ? payday : Number(item.dataset.due);
      dueDays.push(due);
      item.style.setProperty('--i', i);
      item.querySelector('[data-day]').textContent = due;

      const status = item.querySelector('[data-status]');
      const diff = due - today;
      if (diff < 0) {
        item.classList.add('is-done');
        status.append(checkIcon(), 'Done');
      } else if (diff === 0) {
        item.classList.add('is-today');
        status.textContent = 'Today';
      } else {
        status.textContent = diff === 1 ? 'Tomorrow' : `In ${diff} days`;
      }
    });

    const grid = cal.querySelector('[data-cal-grid]');
    const frag = document.createDocumentFragment();
    ['M', 'T', 'W', 'T', 'F', 'S', 'S'].forEach((d) => {
      const el = document.createElement('span');
      el.className = 'cal-dow';
      el.textContent = d;
      frag.append(el);
    });
    const offset = (new Date(y, m, 1).getDay() + 6) % 7; // Monday-first
    for (let i = 0; i < offset; i++) frag.append(document.createElement('span'));
    for (let day = 1; day <= daysInMonth; day++) {
      const el = document.createElement('span');
      el.className = 'cal-day';
      el.textContent = day;
      const dueIndex = dueDays.indexOf(day);
      if (day < today) el.classList.add('is-past');
      if (day === today) el.classList.add('is-today');
      if (dueIndex !== -1) {
        el.classList.add('is-due');
        el.style.setProperty('--i', dueIndex);
        if (day < today) el.classList.add('is-done');
      }
      frag.append(el);
    }
    grid.append(frag);
    grid.hidden = false;
    requestAnimationFrame(() => cal.classList.add('is-ready'));
  }

  function checkIcon() {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 12 12');
    svg.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', 'M2.5 6.5l2.3 2.3L9.5 3.5');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', '1.8');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    svg.append(path);
    return svg;
  }

  /* ---------- Enquiry form: compose an email (no backend yet) ---------- */
  const form = document.querySelector('[data-enquiry]');
  if (form) {
    const errorBox = form.querySelector('[data-form-error]');
    const listOf = (items) =>
      items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const invalid = [...form.elements].filter((el) => el.willValidate && !el.checkValidity());
      form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));

      if (invalid.length) {
        invalid.forEach((el) => el.setAttribute('aria-invalid', 'true'));
        const missing = invalid.filter((el) => !el.value).map((el) => el.dataset.label);
        const emailBad = invalid.some((el) => el.type === 'email' && el.value);
        errorBox.textContent = missing.length
          ? `Add ${listOf(missing)} to send your enquiry.`
          : 'Check the work email address, then send again.';
        if (missing.length && emailBad) errorBox.textContent += ' Also check the email address.';
        errorBox.hidden = false;
        invalid[0].focus();
        return;
      }
      errorBox.hidden = true;

      const data = Object.fromEntries(new FormData(form));
      const subject = `Enquiry: ${data.need} for ${data.company}`;
      const body = [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company}`,
        `Need: ${data.need}`,
        `Team size: ${data.size || 'Not sure'}`,
        '',
        data.message || '',
      ].join('\n');
      window.location.href =
        `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  /* ---------- Footer year ---------- */
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
