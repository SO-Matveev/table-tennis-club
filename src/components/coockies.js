export function renderCoockies(data = {}) {
  const styles = getCookieStyles();
  const title = data.title || 'Мы используем cookies 🍪';
  const text =
    data.text ||
    'Для улучшения работы сайта и анализа его использования мы используем файлы cookies. Продолжая пользоваться сайтом, вы соглашаетесь с нашей политикой использования cookies.';
  const buttonText = data.buttonText || '';

  const notification = document.createElement('div');
  notification.className = 'notification notification--hidden js-notification';
  notification.setAttribute('data-storage', 'table-tennis-cookie-accepted');
  notification.setAttribute('data-bg-color', styles.backgroundColor);
  notification.setAttribute('data-color', styles.textColor);
  notification.setAttribute('data-font-size', styles.fontSize);
  notification.setAttribute('data-width', styles.width);
  notification.setAttribute('data-delay', styles.fadeDelay);
  notification.setAttribute('data-grid', styles.grid);
  notification.setAttribute('data-position', styles.position);
  notification.setAttribute('data-block-text', 'none');

  notification.innerHTML = `
    <div class="notification-container">
      <div class="notification-text">
        <p>${title}</p>
        <p>${text}</p>
      </div>
      <button type="button" class="notification-btn js-notification-btn">${buttonText}</button>
    </div>
  `;

  return notification;
}

export function initCoockies() {
  const styles = getCookieStyles();
  const notificationPanel = document.querySelector('.js-notification');

  if (!notificationPanel) {
    return;
  }

  const cookiePanels = document.querySelectorAll('.js-notification');

  cookiePanels.forEach((panel) => {
    const pBgColor = panel.getAttribute('data-bg-color');
    const pTextColor = panel.getAttribute('data-color');
    const pFontSize = panel.getAttribute('data-font-size');
    const pWidth = panel.getAttribute('data-width');
    const pGrid = panel.getAttribute('data-grid');
    const pDelay = panel.getAttribute('data-delay');
    const pTextBlock = panel.getAttribute('data-block-text');

    panel.style.fontFamily = `${styles.fontFamily}, Roboto, Helvetica, Arial, sans-serif`;
    panel.style.backgroundColor = pBgColor || styles.backgroundColor;
    panel.style.color = pTextColor || styles.textColor;
    panel.style.fontSize = addPx(pFontSize) || addPx(styles.fontSize);
    panel.style.maxWidth = addPx(pWidth) || addPx(styles.width);

    if (
      pTextBlock &&
      pTextBlock !== 'none' &&
      pTextBlock !== 'null' &&
      pTextBlock !== 'empty'
    ) {
      const cookieBlock = document.querySelector(`div[data-code="${pTextBlock}"]`);

      if (cookieBlock) {
        const fTextElements = cookieBlock.querySelectorAll('.f-text');
        const notificationText = panel.querySelector('.notification-text');

        if (notificationText) {
          notificationText.innerHTML = '';
          fTextElements.forEach((fText) => {
            const paragraph = document.createElement('p');
            paragraph.innerHTML = fText.innerHTML;
            notificationText.appendChild(paragraph);
          });
        }
      }
    }

    if (pGrid === 'vertical' || styles.grid === 'vertical') {
      panel.classList.add('js-notification-vertical');
    }

    const cookieName = panel.getAttribute('data-storage');
    const button = panel.querySelector('.js-notification-btn');

    if (cookieName && localStorage[cookieName] === undefined) {
      setTimeout(() => {
        panel.classList.remove('notification--hidden');
      }, Number(pDelay || styles.fadeDelay));
    }

    if (cookieName && button) {
      button.addEventListener('click', () => {
        localStorage[cookieName] = 'true';
        panel.classList.add('notification--hidden');
      });
    }
  });

  const updatePanelPosition = () => {
    const widthValue = parseInt(styles.width, 10);
    if (window.innerWidth <= widthValue) {
      notificationPanel.style.right = '50%';
      notificationPanel.style.transform = 'translateX(50%)';
    } else {
      notificationPanel.style.right = '20px';
      notificationPanel.style.transform = 'none';
    }
  };

  updatePanelPosition();
  window.addEventListener('resize', updatePanelPosition);
}

function addPx(value) {
  if (value && !value.endsWith('px')) {
    return `${value}px`;
  }
  return value;
}

function getCookieStyles() {
  const rootStyles = getComputedStyle(document.documentElement);

  return {
    backgroundColor:
      rootStyles.getPropertyValue('--cookies-bg-color').trim() ||
      'var(--color-bg-alt)',
    textColor:
      rootStyles.getPropertyValue('--cookies-text-color').trim() ||
      'var(--color-text-on-primary)',
    fontSize: rootStyles.getPropertyValue('--cookies-font-size').trim() || '20px',
    fontFamily:
      rootStyles.getPropertyValue('--cookies-font-family').trim() ||
      'var(--font-body)',
    width: rootStyles.getPropertyValue('--cookies-width').trim() || '800px',
    fadeDelay:
      rootStyles.getPropertyValue('--cookies-fade-delay').trim() || '1000',
    grid: rootStyles.getPropertyValue('--cookies-grid').trim() || 'horizonal',
    position:
      rootStyles.getPropertyValue('--cookies-position').trim() ||
      'bottom-right',
  };
}
