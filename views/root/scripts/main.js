(() => {
  const section1 = window.document.querySelector('div[section-1]');

  const section1NumberOfContainers = section1.querySelectorAll(
    'div[section-1-container]',
  ).length;

  section1.querySelectorAll('button').forEach((button, index) => {
    let clickable = true;

    button.addEventListener('click', () => {
      if (!clickable) {
        return;
      }

      clickable = false;

      setTimeout(() => {
        clickable = true;
      }, 1000);

      index === 0 ? moveLeft() : moveRight();
    });
  });

  let currentContainer = 1;

  window.addEventListener('resize', () => {
    section1.scrollLeft =
      (section1.scrollWidth / section1NumberOfContainers) *
      (currentContainer - 1);
  });

  function moveRight() {
    const currentPosition = section1.scrollLeft;

    section1.scrollTo({
      top: 0,
      left: currentPosition + section1.scrollWidth / section1NumberOfContainers,
      behavior: 'smooth',
    });

    section1.querySelectorAll('button')[0].classList.remove('--off');

    currentContainer++;

    if (currentContainer === section1NumberOfContainers) {
      section1.querySelectorAll('button')[1].classList.add('--off');
    }
  }

  function moveLeft() {
    const currentPosition = section1.scrollLeft;

    section1.scrollTo({
      top: 0,
      left: currentPosition - section1.scrollWidth / section1NumberOfContainers,
      behavior: 'smooth',
    });

    section1.querySelectorAll('button')[1].classList.remove('--off');

    currentContainer--;

    if (currentContainer === 1) {
      section1.querySelectorAll('button')[0].classList.add('--off');
    }
  }
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
    .querySelector('form[email-form]')
    .addEventListener('submit', (e) => {
      e.preventDefault();

      const name = e.target.elements.name.value;
      const phone = e.target.elements.phone.value;
      const email = e.target.elements.email.value;
      const message = e.target.elements.message.value;
    });
})();
