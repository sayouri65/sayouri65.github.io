/* <site-footer> — auto-updates the copyright year and lists site sections. */
class SiteFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();

    this.innerHTML = `
      <div class="footer-inner">
        <div class="footer-col footer-brand">
          <a class="brand" href="/index.html">
            ${icon('leaf', 'brand-icon')}
            <span>Zemědělství <em>trochu jinak</em></span>
          </a>
          <p>Vzdělávací projekt, který má studium zemědělství přiblížit trochu jinak — hravě, srozumitelně a se zápalem pro obor.</p>
          <div class="footer-social">
            <a href="mailto:info@example.com" aria-label="Napsat e-mail" title="Kontaktní e-mail (placeholder)">${icon('mail')}</a>
            <a href="#" aria-label="Instagram" title="Instagram (brzy dostupné)">${icon('instagram')}</a>
          </div>
        </div>

        <div class="footer-col">
          <h3>Obsah</h3>
          <ul>
            <li><a href="/studijni-materialy.html">Studijní materiály</a></li>
            <li><a href="/karticky.html">Kartičky</a></li>
            <li><a href="/kvizy.html">Kvízy</a></li>
            <li><a href="/tipy-na-uceni.html">Tipy na učení</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h3>Projekt</h3>
          <ul>
            <li><a href="/o-projektu.html">O projektu</a></li>
            <li><a href="/zdroje.html">Zdroje &amp; citace</a></li>
          </ul>
        </div>

        <div class="footer-col footer-disclaimer">
          <h3>${icon('shield')} Upozornění</h3>
          <p>Tento projekt je vzdělávacím doplňkem a nenahrazuje učitele, výuku ani odbornou literaturu.</p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; <span id="footerYear">${year}</span> Zemědělství trochu jinak &middot; vytvořil <a href="https://sayouri.dev" target="_blank" rel="noopener">sayouri.dev</a></p>
      </div>`;
  }
}
customElements.define('site-footer', SiteFooter);
