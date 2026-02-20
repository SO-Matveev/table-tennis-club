export function renderAbout(data) {
  const section = document.createElement('section');
  section.className = 'about';
  section.id = 'about';

  const title = data.title || 'О клубе';
  const subtitle = data.subtitle || '';
  const text = data.text || '';
  const text2 = data.text2 || '';

  section.innerHTML = `
    <div class="container">
      <div class="about-header">
        <h2 class="section-label">${subtitle}</h2>
        <h3 class="section-title">${title}</h3>
      </div>
      <div class="about-body">
        <p class="about-lead">${text}</p>
        ${text2 ? `<p class="about-text">${text2}</p>` : ''}
      </div>
    </div>
  `;

  return section;
}
