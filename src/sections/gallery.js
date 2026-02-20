export function renderGallery(data) {
  const section = document.createElement('section');
  section.className = 'gallery';
  section.id = 'gallery';

  const images = Array.isArray(data) ? data : [];

  const items = images
    .map(
      (src) => `
    <div class="gallery-item" style="background-image: url(${src})"></div>
  `
    )
    .join('');

  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2 class="section-label">Галерея клуба</h2>
        <h3 class="section-title">Фото с тренировок и мероприятий</h3>
        <p class="section-subtitle">Зал, турниры и атмосфера клуба.</p>
      </div>
      <div class="gallery-grid">${items}</div>
    </div>
  `;

  return section;
}
