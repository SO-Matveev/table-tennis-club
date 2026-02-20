export function renderAbout(data) {
  const section = document.createElement('section');
  section.className = 'about';
  section.id = 'about';

  const title = data.title || 'О клубе';
  const subtitle = data.subtitle || '';
  const text = data.text || '';
  const text2 = data.text2 || '';
  const blocks = data.blocks || [];
  const footer = data.footer || '';

  let bodyHtml = '';
  if (text) bodyHtml += `<p class="about-lead">${text}</p>`;
  blocks.forEach((b) => {
    if (b.title) bodyHtml += `<h4 class="about-block-title">${b.title}</h4>`;
    if (b.content) bodyHtml += `<p class="about-text">${b.content}</p>`;
  });
  if (text2 && !blocks.length) bodyHtml += `<p class="about-text">${text2}</p>`;
  if (footer) bodyHtml += `<p class="about-footer">${footer}</p>`;

  section.innerHTML = `
    <div class="container">
      <div class="about-header">
        <h2 class="section-label">${subtitle}</h2>
        <h3 class="section-title">${title}</h3>
      </div>
      <div class="about-body">${bodyHtml}</div>
    </div>
  `;

  return section;
}
