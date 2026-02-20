export function renderHeader(data) {
  const header = document.createElement('header');
  header.className = 'site-header';

  header.innerHTML = `
    <div class="container header-inner">
      <a href="#" class="logo">${data.title}</a>
      <button type="button" class="nav-toggle" aria-label="Меню">
        <span></span><span></span><span></span>
      </button>
      <nav class="nav">
        <a href="#about">О клубе</a>
        <a href="#coaches">Тренеры</a>
        <a href="#pricing">Цены</a>
        <a href="#gallery">Галерея</a>
        <a href="#reviews">Отзывы</a>
        <a href="#contacts">Контакты</a>
      </nav>
      <a href="#contacts" class="btn btn-primary">Связаться</a>
    </div>
  `;

  const toggle = header.querySelector('.nav-toggle');
  const nav = header.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('is-open'));
    nav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => nav.classList.remove('is-open'));
    });
  }

  return header;
}
