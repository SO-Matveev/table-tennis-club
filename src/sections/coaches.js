export function renderCoaches(data) {
  const section = document.createElement('section');
  section.className = 'coaches';
  section.id = 'coaches';

  const list = Array.isArray(data) ? data : [];

  const cards = list
    .map(
      (c) => `
    <article class="coach-card">
      <div class="coach-photo" style="${c.photo ? `background-image: url(${c.photo})` : ''}"></div>
      <div class="coach-info">
        <span class="coach-role">${c.role || ''}</span>
        <h4 class="coach-name">${c.name || ''}</h4>
        <p class="coach-desc">${c.description || ''}</p>
      </div>
    </article>
  `
    )
    .join('');

  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Тренеры</h2>
      </div>
      <div class="coaches-grid">${cards}</div>
    </div>
  `;

  return section;
}
