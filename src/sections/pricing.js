import { openQrModal } from './qr.js';

export function renderPricing(data) {
  const section = document.createElement('section');
  section.className = 'pricing';
  section.id = 'pricing';

  const list = Array.isArray(data) ? data : [];

  const cards = list.map((card) => {
    const items = card.items || [];
    const itemsHtml = items
      .map(
        (item) => `
        <li class="price-item">
          <span class="price-item-name">${item.name || ''}</span>
          <span class="price-item-value">${item.price || ''}</span>
        </li>
        ${item.note ? `<li class="price-item-note">${item.note}</li>` : ''}`
      )
      .join('');

    return `
    <article class="price-card">
      <h3 class="price-title">${card.title || ''}</h3>
      <ul class="price-items">${itemsHtml}</ul>
      <button type="button" class="btn btn-outline js-qr-open">${card.cta || 'Записаться'}</button>
    </article>
  `;
  });

  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Цены</h2>
        <p class="section-subtitle">Просто и доступно.</p>
      </div>
      <div class="pricing-grid">${cards.join('')}</div>
    </div>
  `;

  section.querySelectorAll('.js-qr-open').forEach((btn) => {
    btn.addEventListener('click', openQrModal);
  });

  return section;
}
