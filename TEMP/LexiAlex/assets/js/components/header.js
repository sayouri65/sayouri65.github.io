/* <site-header> — single place to edit the site navigation. */
class SiteHeader extends HTMLElement {
  connectedCallback() {
    const page = (location.pathname.split('/').pop() || 'index.html');

    const links = [
      { href: `/index.html`, label: 'Domů' },
      { href: `/o-projektu.html`, label: 'O projektu' },
      { href: `/studijni-materialy.html`, label: 'Studijní materiály' },
      { href: `/karticky.html`, label: 'Kartičky' },
      { href: `/kvizy.html`, label: 'Kvízy' },
      { href: `/tipy-na-uceni.html`, label: 'Tipy na učení' },
      { href: `/zdroje.html`, label: 'Zdroje' }
    ];

    const topicsMenu = (window.TOPICS || []).map(t =>
      `<a href="/${t.href}">${icon(t.icon)}<span>${t.title}</span></a>`
    ).join('');

    this.innerHTML = `
      <div class="header-inner">
        <a class="brand" href="/index.html">
          ${icon('leaf', 'brand-icon')}
          <span>Zemědělství <em>trochu jinak</em></span>
        </a>
        <nav class="main-nav" id="mainNav">
          <ul>
            ${links.slice(0, 2).map(l => navItem(l, page)).join('')}
            <li class="has-dropdown">
              <button class="dropdown-toggle" aria-expanded="false">
                Témata ${icon('chevron')}
              </button>
              <div class="dropdown-menu">${topicsMenu}</div>
            </li>
            ${links.slice(2).map(l => navItem(l, page)).join('')}
          </ul>
        </nav>
        <button class="nav-toggle" id="navToggle" aria-label="Otevřít menu" aria-expanded="false">
          ${icon('menu', 'icon-open')}${icon('close', 'icon-close')}
        </button>
      </div>`;

    function navItem(l, page) {
      const active = l.href.endsWith(page) ? ' aria-current="page"' : '';
      return `<li><a href="${l.href}"${active}>${l.label}</a></li>`;
    }

    const toggle = this.querySelector('#navToggle');
    const nav = this.querySelector('#mainNav');
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    const dropdownToggle = this.querySelector('.dropdown-toggle');
    dropdownToggle.addEventListener('click', () => {
      const parent = dropdownToggle.closest('.has-dropdown');
      const open = parent.classList.toggle('open');
      dropdownToggle.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', (e) => {
      if (!this.contains(e.target)) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}
customElements.define('site-header', SiteHeader);
