export function renderHero(data) {
  const section = document.createElement('section');
  section.className = 'hero';

  const headline = data.headline || 'Играй. Учись. Соревнуйся.';
  const subline = data.subline || 'Клуб настольного тенниса';
  const imgSrc = data.image || '';

  const phone = data.phone || '';
  section.innerHTML = `
    <div class="hero-media" style="${imgSrc ? `background-image: url(${imgSrc})` : ''}"></div>
    <div class="hero-overlay">
      <div class="container hero-content">
        <p class="hero-subline">${subline}</p>
        <h1 class="hero-headline">${headline}</h1>
        ${phone ? `<a href="tel:${phone.replace(/\s/g, '')}" class="hero-phone">${phone}</a>` : ''}
      </div>
    </div>
  `;

  return section;
}
