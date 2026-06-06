import '../css/swm.css';

let modalIdCounter = 0;
const openModals = [];
const focusableSelector = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

function getFocusableElements(container) {
  return Array.from(container.querySelectorAll(focusableSelector)).filter((element) => {
    return element.getAttribute('aria-hidden') !== 'true' && element.getClientRects().length > 0;
  });
}

function hexToRgba(hex, opacity) {
  if (!hex || !/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex)) {
    hex = '#000000';
  }
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function closeModalInstance(modalOverlay, triggerElement, keydownHandler) {
  modalOverlay.classList.add('swm-closing');
  const modal = modalOverlay.querySelector('.swm-modal');
  if (modal) {
    modal.classList.add('swm-closing');
  }

  function onOverlayAnimationEnd(e) {
    if (e.target !== modalOverlay) return;
    modalOverlay.removeEventListener('animationend', onOverlayAnimationEnd);
    if (modalOverlay.parentNode) {
      modalOverlay.parentNode.removeChild(modalOverlay);
    }
    if (triggerElement && typeof triggerElement.focus === 'function') {
      triggerElement.focus();
    }
  }

  modalOverlay.addEventListener('animationend', onOverlayAnimationEnd);

  if (keydownHandler) {
    document.removeEventListener('keydown', keydownHandler);
  }

  const index = openModals.indexOf(modalOverlay);
  if (index > -1) {
    openModals.splice(index, 1);
  }
}

const positionStyles = {
  'top left': { alignItems: 'flex-start', justifyContent: 'flex-start', padding: '1rem' },
  'top right': { alignItems: 'flex-start', justifyContent: 'flex-end', padding: '1rem' },
  'bottom left': { alignItems: 'flex-end', justifyContent: 'flex-start', padding: '1rem' },
  'bottom right': { alignItems: 'flex-end', justifyContent: 'flex-end', padding: '1rem' },
  'center': { alignItems: 'center', justifyContent: 'center', padding: '1rem' },
  'top': { alignItems: 'flex-start', justifyContent: 'center', padding: '1rem 0' },
  'bottom': { alignItems: 'flex-end', justifyContent: 'center', padding: '1rem 0' },
  'left': { alignItems: 'center', justifyContent: 'flex-start', padding: '0 1rem' },
  'right': { alignItems: 'center', justifyContent: 'flex-end', padding: '0 1rem' }
};

function createModal(options) {
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'swm-modal-overlay';

  const bgColor = options.bgColor || '#000000';
  const bgOpacity = options.bgOpacity != null ? parseFloat(options.bgOpacity) : 0.5;
  modalOverlay.style.setProperty('--swm-bg-color', hexToRgba(bgColor, bgOpacity));
  modalOverlay.style.setProperty('--swm-bg-blur', `${options.bgBlur || 0}px`);
  modalOverlay.style.setProperty('--swm-z-index', options.zIndex || '1000');

  const selectedPosition = positionStyles[options.position] || positionStyles['center'];
  Object.assign(modalOverlay.style, selectedPosition);

  const modal = document.createElement('div');
  modal.className = 'swm-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('tabindex', '-1');
  const titleId = `swm-title-${++modalIdCounter}`;
  const titleText = options.title || '';
  if (titleText) {
    modal.setAttribute('aria-labelledby', titleId);
  } else {
    modal.setAttribute('aria-label', 'Modal dialog');
  }

  const header = document.createElement('div');
  header.className = 'swm-modal-header';

  const title = document.createElement('h2');
  title.className = 'swm-modal-title';
  title.id = titleId;
  title.textContent = titleText;

  const closeBtn = document.createElement('button');
  closeBtn.className = 'swm-modal-close';
  closeBtn.setAttribute('aria-label', 'Close modal');
  closeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">  <path d="M6 18L18 6M6 6l12 12"></path></svg>';

  header.appendChild(title);
  header.appendChild(closeBtn);

  const body = document.createElement('div');
  body.className = 'swm-modal-body';
  body.innerHTML = options.content || '';

  modal.appendChild(header);
  modal.appendChild(body);

  if (options.footer) {
    const footer = document.createElement('div');
    footer.className = 'swm-modal-footer';
    footer.innerHTML = options.footer;
    modal.appendChild(footer);
  }

  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);
  openModals.push(modalOverlay);

  const triggerElement = document.activeElement;
  closeBtn.focus();

  let closed = false;
  function closeModal() {
    if (closed) return;
    closed = true;
    closeModalInstance(modalOverlay, triggerElement, keydownHandler);
  }

  function keydownHandler(e) {
    if (openModals[openModals.length - 1] !== modalOverlay) return;

    if (e.key === 'Escape') {
      closeModal();
      return;
    }

    if (e.key !== 'Tab') return;

    const focusableElements = getFocusableElements(modal);
    if (focusableElements.length === 0) {
      e.preventDefault();
      modal.focus();
      return;
    }

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && (document.activeElement === firstFocusableElement || !modal.contains(document.activeElement))) {
      e.preventDefault();
      lastFocusableElement.focus();
    } else if (!e.shiftKey && (document.activeElement === lastFocusableElement || !modal.contains(document.activeElement))) {
      e.preventDefault();
      firstFocusableElement.focus();
    }
  }
  document.addEventListener('keydown', keydownHandler);

  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  return { modalOverlay, modal, closeModal };
}

document.addEventListener('click', (e) => {
  const triggerElement = e.target.closest('[data-swm-btn]');
  if (!triggerElement) return;

  const modalContainer = triggerElement.closest('[data-swm]');
  if (!modalContainer) return;

  const bodyElement = modalContainer.querySelector('[data-swm-body]');
  if (!bodyElement) return;

  const options = {
    title: triggerElement.getAttribute('data-swm-title') || '',
    content: bodyElement.innerHTML,
    footer: triggerElement.getAttribute('data-swm-footer') || '',
    position: triggerElement.getAttribute('data-swm-position') || 'center',
    bgColor: triggerElement.getAttribute('data-swm-bg-color') || '#000000',
    bgOpacity: triggerElement.getAttribute('data-swm-bg-opacity') != null ? triggerElement.getAttribute('data-swm-bg-opacity') : '0.5',
    bgBlur: triggerElement.getAttribute('data-swm-bg-blur') || '0',
    zIndex: triggerElement.getAttribute('data-swm-z-index') || '1000'
  };
  createModal(options);
});

function openModal(selector) {
  const modalContainer = document.querySelector(selector);
  if (!modalContainer) {
    console.error(`No modal found with selector: ${selector}`);
    return;
  }

  const triggerElement = modalContainer.querySelector('[data-swm-btn]');
  if (triggerElement) {
    triggerElement.click();
    return;
  }

  const bodyElement = modalContainer.querySelector('[data-swm-body]');
  if (!bodyElement) {
    console.error(`No modal body found in: ${selector}`);
    return;
  }

  createModal({
    title: modalContainer.getAttribute('data-swm-title') || '',
    content: bodyElement.innerHTML,
    footer: modalContainer.getAttribute('data-swm-footer') || '',
    position: modalContainer.getAttribute('data-swm-position') || 'center',
    bgColor: modalContainer.getAttribute('data-swm-bg-color') || '#000000',
    bgOpacity: modalContainer.getAttribute('data-swm-bg-opacity') != null ? modalContainer.getAttribute('data-swm-bg-opacity') : '0.5',
    bgBlur: modalContainer.getAttribute('data-swm-bg-blur') || '0',
    zIndex: modalContainer.getAttribute('data-swm-z-index') || '1000'
  });
}

const SWM = { openModal, createModal };

export default SWM;
