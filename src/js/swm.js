// SenangWebs Modals JavaScript

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      define([], factory);
  } else if (typeof module === 'object' && module.exports) {
      module.exports = factory();
  } else {
      root.SWM = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  // Helper function to convert hex to rgba
  function hexToRgba(hex, opacity) {
      hex = hex.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // Modal creation function
  function createModal(options) {
      const modalOverlay = document.createElement('div');
      modalOverlay.className = 'swm-modal-overlay';

      // Apply options
      const bgColor = options.bgColor || '#000000';
      const bgOpacity = parseFloat(options.bgOpacity || '0.5');
      modalOverlay.style.setProperty('--swm-bg-color', hexToRgba(bgColor, bgOpacity));
      modalOverlay.style.setProperty('--swm-bg-blur', `${options.bgBlur || 0}px`);
      modalOverlay.style.setProperty('--swm-z-index', options.zIndex || '1000');

      const modal = document.createElement('div');
      modal.className = 'swm-modal';

      modal.innerHTML = `
          <div class="swm-modal-header">
              <h2 class="swm-modal-title">${options.title || ''}</h2>
              <button class="swm-modal-close">&times;</button>
          </div>
          <div class="swm-modal-body">${options.content || ''}</div>
          ${options.footer ? `<div class="swm-modal-footer">${options.footer}</div>` : ''}
      `;

      // Set modal position using flexbox
      const positionStyles = {
          'top left': { alignItems: 'flex-start', justifyContent: 'flex-start', padding: '20px' },
          'top right': { alignItems: 'flex-start', justifyContent: 'flex-end', padding: '20px' },
          'bottom left': { alignItems: 'flex-end', justifyContent: 'flex-start', padding: '20px' },
          'bottom right': { alignItems: 'flex-end', justifyContent: 'flex-end', padding: '20px' },
          'center': { alignItems: 'center', justifyContent: 'center' },
          'top': { alignItems: 'flex-start', justifyContent: 'center', padding: '20px 0' },
          'bottom': { alignItems: 'flex-end', justifyContent: 'center', padding: '20px 0' },
          'left': { alignItems: 'center', justifyContent: 'flex-start', padding: '0 20px' },
          'right': { alignItems: 'center', justifyContent: 'flex-end', padding: '0 20px' }
      };

      const selectedPosition = positionStyles[options.position] || positionStyles['center'];
      Object.assign(modalOverlay.style, selectedPosition);

      modalOverlay.appendChild(modal);
      document.body.appendChild(modalOverlay);

      // Close modal function
      function closeModal() {
          modalOverlay.classList.add('swm-closing');
          modal.classList.add('swm-closing');

          const removeModal = () => {
              document.body.removeChild(modalOverlay);
              modalOverlay.removeEventListener('animationend', removeModal);
          };

          modalOverlay.addEventListener('animationend', removeModal);
      }

      // Event listeners
      modal.querySelector('.swm-modal-close').addEventListener('click', closeModal);
      modalOverlay.addEventListener('click', (e) => {
          if (e.target === modalOverlay) closeModal();
      });

      return { modalOverlay, modal, closeModal };
  }

  // Attach event listeners to modal triggers
  document.addEventListener('click', (e) => {
      const triggerElement = e.target.closest('[data-swm-btn]');
      if (triggerElement) {
          const modalContainer = triggerElement.closest('[data-swm]');
          const options = {
              title: triggerElement.getAttribute('data-swm-title') || '',
              content: modalContainer.querySelector('[data-swm-body]').innerHTML,
              footer: triggerElement.getAttribute('data-swm-footer') || '',
              position: triggerElement.getAttribute('data-swm-position') || 'center',
              bgColor: triggerElement.getAttribute('data-swm-bg-color') || '#000000',
              bgOpacity: triggerElement.getAttribute('data-swm-bg-opacity') || '0.5',
              bgBlur: triggerElement.getAttribute('data-swm-bg-blur') || '0',
              zIndex: triggerElement.getAttribute('data-swm-z-index') || '1000'
          };
          createModal(options);
      }
  });

  // Return the public API
  return {
      openModal: function(selector) {
          const modalContainer = document.querySelector(selector);
          if (!modalContainer) {
              console.error(`No modal found with selector: ${selector}`);
              return;
          }
          const triggerElement = modalContainer.querySelector('[data-swm-btn]');
          if (triggerElement) {
              triggerElement.click();
          } else {
              console.error(`No trigger button found in modal with selector: ${selector}`);
          }
      },
      createModal: function(options) {
          return createModal(options);
      }
  };
}));