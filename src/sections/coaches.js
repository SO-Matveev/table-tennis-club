function renderCoachCard(c) {
  return `
    <article class="coach-card">
      <div class="coach-photo" style="${c.photo ? `background-image: url(${c.photo})` : ''}"></div>
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

  const list = Array.isArray(data) ? data : [];
  const duplicated = [...list, ...list];
  const cardsHtml = duplicated.map(renderCoachCard).join('');

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

  const viewport = section.querySelector('.coaches-viewport');
  const track = section.querySelector('.coaches-track');
  const prevBtn = section.querySelector('.coaches-arrow-prev');
  const nextBtn = section.querySelector('.coaches-arrow-next');
  const gap = 32;
  let currentIndex = 0;

  function getVisibleCount() {
    const w = viewport.getBoundingClientRect().width;
    if (w < 400) return 1;
    if (w < 768) return 2;
    return 3;
  }

  function updateSlideWidth() {
    const n = getVisibleCount();
    const w = viewport.offsetWidth;
    const slideW = w && n ? (w - (n - 1) * gap) / n : 280;
    viewport.style.setProperty('--coach-slide-width', `${slideW}px`);
  }

  function getCardWidth() {
    const n = getVisibleCount();
    const w = viewport.offsetWidth;
    return w && n ? (w - (n - 1) * gap) / n + gap : 312;
  }

  function applyTransform(noTransition = false) {
    if (noTransition) track.style.transition = 'none';
    else track.style.transition = 'transform 0.35s ease';
    const step = getCardWidth();
    track.style.transform = `translateX(-${currentIndex * step}px)`;
    if (noTransition) {
      track.offsetHeight;
      track.style.transition = '';
    }
  }

  function goNext() {
    currentIndex++;
    applyTransform();
    if (currentIndex >= list.length) {
      track.addEventListener('transitionend', function onEnd() {
        track.removeEventListener('transitionend', onEnd);
        currentIndex = 0;
        applyTransform(true);
      }, { once: true });
    }
  }

  function goPrev() {
    if (currentIndex === 0) {
      currentIndex = list.length;
      applyTransform(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          currentIndex = list.length - 1;
          applyTransform();
        });
      });
    } else {
      currentIndex--;
      applyTransform();
    }
  }

  prevBtn.addEventListener('click', goPrev);
  nextBtn.addEventListener('click', goNext);

  window.addEventListener('resize', () => {
    updateSlideWidth();
    applyTransform(true);
  });

  setTimeout(updateSlideWidth, 0);

  return section;
}
