import { initSlider } from '../components/slider';

const coachPhotoModules = import.meta.glob('../images/coaches/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default'
});

const coachPhotoMap = Object.entries(coachPhotoModules).reduce((acc, [path, url]) => {
  const fileName = path.split('/').pop();
  if (fileName) acc[fileName] = url;
  return acc;
}, {});

function resolveCoachPhoto(photoPath) {
  if (!photoPath) return '';
  const fileName = photoPath.split('/').pop();
  return coachPhotoMap[fileName] || photoPath;
}

function renderCoachCard(c) {
  const photoUrl = resolveCoachPhoto(c.photo);
  return `
    <article class="coach-card">
      <div class="coach-photo" style="${photoUrl ? `background-image: url(${photoUrl})` : ''}"></div>
      <div class="coach-info">
        <span class="coach-role">${c.role || ''}</span>
        <h4 class="coach-name">${c.name || ''}</h4>
        <p class="coach-desc">${c.description || ''}</p>
      </div>
    </article>
  `;
}

export function renderCoaches(data) {
  const section = document.createElement('section');
  section.className = 'coaches';
  section.id = 'coaches';

  const source = Array.isArray(data) ? data : [];
  const list = [...source].sort((a, b) => {
    const orderA = Number.isFinite(Number(a?.order)) ? Number(a.order) : Number.MAX_SAFE_INTEGER;
    const orderB = Number.isFinite(Number(b?.order)) ? Number(b.order) : Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  });
  const cardsHtml = list.map(renderCoachCard).join('');

  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Тренеры</h2>
      </div>
      <div class="coaches-carousel">
        <button type="button" class="coaches-arrow coaches-arrow-prev" aria-label="Предыдущие">
          <span aria-hidden="true">‹</span>
        </button>
        <div class="coaches-viewport">
          <div class="coaches-track">
            ${cardsHtml}
          </div>
        </div>
        <button type="button" class="coaches-arrow coaches-arrow-next" aria-label="Следующие">
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </div>
  `;

  if (list.length === 0) return section;

  initSlider({
    root: section,
    viewportSelector: '.coaches-viewport',
    trackSelector: '.coaches-track',
    slideSelector: '.coach-card',
    prevSelector: '.coaches-arrow-prev',
    nextSelector: '.coaches-arrow-next',
    initialIndex: 0,
    getVisibleCount(width) {
      if (width < 400) return 1;
      if (width < 768) return 2;
      return 3;
    }
  });

  return section;
}
