/**
 * Модальное окно с QR-кодом для записи.
 * Изображение: src/images/qr.png (замените placeholder на свой QR).
 */
import qrImage from '../images/qr.png';

let qrModal = null;
const qrImageSrc = qrImage;

function createModal() {
  const overlay = document.createElement('div');
  overlay.className = 'qr-modal-overlay';
  overlay.setAttribute('aria-hidden', 'true');

  const dialog = document.createElement('div');
  dialog.className = 'qr-modal';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'QR-код для записи');

  dialog.innerHTML = `
    <button type="button" class="qr-modal-close" aria-label="Закрыть">
      <span aria-hidden="true">&times;</span>
    </button>
    <div class="qr-modal-content">
      <p class="qr-modal-title">Отсканируйте для записи</p>
      <img src="${qrImageSrc}" alt="QR-код для записи в клуб" class="qr-modal-image" width="200" height="200" />
    </div>
  `;

  overlay.appendChild(dialog);

  const close = () => {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const open = () => {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  dialog.querySelector('.qr-modal-close').addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
  });

  return { overlay, open, close };
}

function getModal() {
  if (!qrModal) {
    const { overlay, open, close } = createModal();
    document.body.appendChild(overlay);
    qrModal = { overlay, open, close };
  }
  return qrModal;
}

export function openQrModal() {
  getModal().open();
}

export function closeQrModal() {
  if (qrModal) qrModal.close();
}
