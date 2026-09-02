/* Interactive flashcard component used on karticky.html and topic pages. */
document.addEventListener('DOMContentLoaded', initFlashcards);

function initFlashcards() {
  const app = document.querySelector('[data-flashcards]');
  if (!app || !window.FLASHCARD_DECKS) return;

  const defaultDeck = app.getAttribute('data-flashcards') || 'rostliny';
  const deckSelect = app.querySelector('[data-deck-select]');
  const stage = app.querySelector('[data-flashcard-stage]');
  const counter = app.querySelector('[data-flashcard-counter]');
  const prevBtn = app.querySelector('[data-flashcard-prev]');
  const nextBtn = app.querySelector('[data-flashcard-next]');
  const shuffleBtn = app.querySelector('[data-flashcard-shuffle]');

  let deckKey = FLASHCARD_DECKS[defaultDeck] ? defaultDeck : Object.keys(FLASHCARD_DECKS)[0];
  let cards = [...FLASHCARD_DECKS[deckKey]];
  let index = 0;
  let flipped = false;

  if (deckSelect) {
    deckSelect.innerHTML = (window.TOPICS || []).map((t) =>
      `<option value="${t.id}"${t.id === deckKey ? ' selected' : ''}>${t.title}</option>`
    ).join('');
    deckSelect.addEventListener('change', () => {
      deckKey = deckSelect.value;
      cards = [...(FLASHCARD_DECKS[deckKey] || [])];
      index = 0;
      flipped = false;
      render();
    });
  }

  prevBtn?.addEventListener('click', () => { step(-1); });
  nextBtn?.addEventListener('click', () => { step(1); });
  shuffleBtn?.addEventListener('click', () => {
    cards = cards
      .map((c) => ({ c, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map((x) => x.c);
    index = 0;
    flipped = false;
    render();
  });

  function step(dir) {
    if (!cards.length) return;
    index = (index + dir + cards.length) % cards.length;
    flipped = false;
    render();
  }

  function render() {
    if (!cards.length) {
      stage.innerHTML = '<p class="is-empty">Pro toto téma zatím kartičky připravujeme.</p>';
      if (counter) counter.textContent = '';
      return;
    }
    const card = cards[index];
    stage.innerHTML = `
      <button class="flashcard${flipped ? ' is-flipped' : ''}" type="button" aria-label="Otočit kartičku">
        <span class="flashcard-face flashcard-front">${card.front}</span>
        <span class="flashcard-face flashcard-back">${card.back}</span>
      </button>`;
    stage.querySelector('.flashcard').addEventListener('click', () => {
      flipped = !flipped;
      render();
    });
    if (counter) counter.textContent = `${index + 1} / ${cards.length}`;
  }

  render();
}
