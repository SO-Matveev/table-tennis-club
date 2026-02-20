export function renderReviews(data) {
  const section = document.createElement('section');
  section.className = 'reviews';
  section.id = 'reviews';

  const list = Array.isArray(data) ? data : [];

  const cards = list
    .map(
      (r) => `
    <blockquote class="review-card">
      <p class="review-text">"${r.text || ''}"</p>
      <footer class="review-author">${r.author || ''}<span class="review-role">${r.role ? ` · ${r.role}` : ''}</span></footer>
    </blockquote>
  `
    )
    .join('');

  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Отзывы</h2>
        <p class="section-subtitle">Что говорят наши игроки.</p>
      </div>
      <div class="reviews-grid">${cards}</div>
    </div>
  `;

  return section;
}
