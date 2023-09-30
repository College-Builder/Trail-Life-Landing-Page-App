(() => {
  var controller = [];

  window.document
    .querySelectorAll('div[section-6-accordion]')
    .forEach((div, index) => {
      const textContainer = div.querySelector(
        'div[section-6-accordion__text-container]',
      );
      const computedHeight = getComputedStyle(textContainer).height;

      controller.push({
        state: false,
        textContainer,
        computedHeight,
      });

      textContainer.style.height = '0px';

      div.querySelector('button').addEventListener('click', () => {
        controller.forEach((_, _index) => {
          if (index === _index) {
            return;
          }

          closeAccordion(_index);
        });

        controller[index].state ? closeAccordion(index) : openAccordion(index);
      });

      function openAccordion(index) {
        controller[index].textContainer.style.height =
          controller[index].computedHeight;
        controller[index].textContainer.parentNode.classList.add('--open');
        controller[index].state = true;
      }

      function closeAccordion(index) {
        controller[index].textContainer.style.height = '0px';
        controller[index].textContainer.parentNode.classList.remove('--open');
        controller[index].state = false;
      }
    });
})();

(() => {
  const phoneInput = window.document.querySelector('input[phone-input]');

  phoneInputProperties(phoneInput);

  function phoneInputProperties(input) {
    phoneInput.addEventListener('keydown', (event) => {
      const input = event.target;
      let value = String(input.value.replace(/\D/g, ''));

      if (event.key === 'Backspace') {
        if (value.length === 4) {
          input.value = `+${value.slice(0, 2)} (${value.slice(2, 3)})`;
        }

        if (value.length === 3) {
          input.value = value.slice(0, 3);
        }
      }
    });

    input.addEventListener('input', () => {
      let value = String(input.value.replace(/\D/g, ''));

      if (value.length === 0) {
        input.value = '';
      } else if (value.length <= 2) {
        input.value = `+${value}`;
      } else if (value.length === 3) {
        input.value = `+${value.slice(0, 2)} (${value.charAt(2)})`;
      } else if (value.length <= 4) {
        input.value = `+${value.slice(0, 2)} (${value.slice(2, 4)})`;
      } else if (value.length <= 9) {
        input.value = `+${value.slice(0, 2)} (${value.slice(
          2,
          4,
        )}) ${value.slice(4, 9)}`;
      } else {
        input.value = `+${value.slice(0, 2)} (${value.slice(
          2,
          4,
        )}) ${value.slice(4, 9)}-${value.slice(9, 13)}`;
      }
    });
  }
})();

(() => {
  window.document
    .querySelector('form[section-7-email-form]')
    .addEventListener('submit', (e) => {
      e.preventDefault();

      const name = e.target.elements.name.value;
      const phone = e.target.elements.phone.value;
      const email = e.target.elements.email.value;
      const message = e.target.elements.message.value;
    });
})();
