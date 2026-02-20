export function renderContacts(data) {
  const section = document.createElement('section');
  section.className = 'contacts';
  section.id = 'contacts';

  const title = data?.title || 'Контакты';
  const address = data?.address || '';
  const hours = data?.hours || '';
  const phone = data?.phone || '';
  const mapLink = data?.mapLink || '#';
  const cta = data?.cta || 'Связаться';

  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">${title}</h2>
      </div>
      <div class="contacts-body">
        <div class="contacts-info">
          ${phone ? `<p class="contacts-phone"><a href="tel:${phone.replace(/\s/g, '')}">${phone}</a></p>` : ''}
          <p class="contacts-address">${address}</p>
          ${hours ? `<p class="contacts-hours">${hours}</p>` : ''}
          <a href="${mapLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">${cta}</a>
        </div>
        <div class="contacts-map">
          <a href="${mapLink}" target="_blank" rel="noopener noreferrer" class="map-link" aria-label="Открыть карту">
            <span class="map-placeholder">Карта</span>
          </a>
        </div>
      </div>
    </div>
  `;

  return section;
}
