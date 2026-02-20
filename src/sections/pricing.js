export function renderPricing(data) {
  const section = document.createElement('section');
  section.className = 'pricing';
  section.id = 'pricing';

  const list = Array.isArray(data) ? data : [];

  const cards = list
    .map(
      (p) => `
    <article class="price-card">
      <h3 class="price-title">${p.title || ''}</h3>
      <div class="price-amount">${p.price || ''}</div>
      <p class="price-period">${p.period || ''}</p>
      <ul class="price-features">
        ${(p.features || []).map((f) => `<li>${f}</li>`).join('')}
      </ul>
      <a href="#contacts" class="btn btn-outline">${p.cta || 'Записаться'}</a>
    </article>
  `
    )
    .join('');

  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Цены</h2>
        <p class="section-subtitle">Просто и доступно.</p>
      </div>
      <div class="pricing-grid">${cards}</div>
    </div>
  `;

  return section;
}
