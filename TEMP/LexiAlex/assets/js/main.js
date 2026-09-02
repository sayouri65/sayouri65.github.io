/* Shared front-end behaviour: reveal animations, topic grid rendering, small helpers. */
document.addEventListener('DOMContentLoaded', () => {
  initStaticIcons();
  initTopicGrid();
  initMaterialsLists();
  initSourcesLists();
  initTipsGrid();
  initInterviews();
  initRevealAnimations();
  initSmoothAnchors();
});

function initStaticIcons() {
  document.querySelectorAll('[data-icon]').forEach((el) => {
    el.classList.add('icon');
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = (window.ICONS && ICONS[el.getAttribute('data-icon')]) || '';
  });
}

function initRevealAnimations() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach((el) => observer.observe(el));
}

function initTopicGrid() {
  const grid = document.querySelector('[data-topics-grid]');
  if (!grid || !window.TOPICS) return;
  grid.innerHTML = TOPICS.map((t, i) => `
    <a class="topic-card" href="/${t.href}" data-reveal style="--delay:${i * 70}ms">
      <span class="topic-icon topic-icon--${t.color}">${icon(t.icon)}</span>
      <h3>${t.title}</h3>
      <p>${t.desc}</p>
      <span class="topic-link">Prozkoumat ${icon('arrow')}</span>
    </a>`).join('');
}

function initMaterialsLists() {
  document.querySelectorAll('[data-materials]').forEach((el) => {
    const key = el.getAttribute('data-materials');
    const items = (window.MATERIALS && MATERIALS[key]) || [];
    el.innerHTML = items.map((m) => `
      <li class="material-item">
        <span class="material-icon">${icon(m.type === 'Prezentace' ? 'play' : 'book')}</span>
        <div>
          <strong>${m.title}</strong>
          <span class="material-type">${m.type}</span>
        </div>
        <span class="material-status">Připravujeme ${icon('download')}</span>
      </li>`).join('') || '<li class="material-item is-empty">Materiály pro toto téma zatím připravujeme.</li>';
  });
}

function initSourcesLists() {
  document.querySelectorAll('[data-sources]').forEach((el) => {
    const key = el.getAttribute('data-sources');
    const items = (window.SOURCES && SOURCES[key]) || [];
    el.innerHTML = items.map((s) => `
      <li><a href="${s.url}">${icon('link')}<span>${s.title}</span></a></li>`).join('');
  });
}

function initTipsGrid() {
  const grid = document.querySelector('[data-tips-grid]');
  if (!grid || !window.TIPS) return;
  grid.innerHTML = TIPS.map((t, i) => `
    <article class="tip-card" data-reveal style="--delay:${i * 70}ms">
      <span class="tip-icon">${icon(t.icon)}</span>
      <h3>${t.title}</h3>
      <p>${t.text}</p>
    </article>`).join('');
}

function initInterviews() {
  const wrap = document.querySelector('[data-interviews]');
  if (!wrap || !window.INTERVIEWS) return;
  wrap.innerHTML = INTERVIEWS.map((p) => `
    <article class="interview-card" data-reveal>
      <span class="quote-icon">${icon('quote')}</span>
      <p>${p.quote}</p>
      <footer><strong>${p.name}</strong> &middot; ${p.role}</footer>
    </article>`).join('');
}

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
