(() => {
  const items = [
    [
      {
        img: 'https://www.motortrend.com/uploads/2023/04/1-2022-ram-1500-trx-ignition-edition.jpg?fit=around%7C875:492',
        h3: 'Hello World',
        p: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      },
      {
        img: 'https://www.motortrend.com/uploads/2023/04/1-2022-ram-1500-trx-ignition-edition.jpg?fit=around%7C875:492',
        h3: 'Hello World',
        p: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      },
    ],
    [
      {
        img: 'https://www.motortrend.com/uploads/2023/04/1-2022-ram-1500-trx-ignition-edition.jpg?fit=around%7C875:492',
        h3: 'Hello World',
        p: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      },
      {
        img: 'https://www.motortrend.com/uploads/2023/04/1-2022-ram-1500-trx-ignition-edition.jpg?fit=around%7C875:492',
        h3: 'Hello World',
        p: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      },
    ],
  ];

  buildItems(items);
  function buildItems(items) {
    const itemTemplate = window.document.querySelector(
      'template[seciton-4__slider__slider-container__item__template]',
    );

    items.forEach((item) => {
      const itemTemplateUsable =
        itemTemplate.content.cloneNode(true).children[0];

      const cardTemplate = itemTemplateUsable.querySelector(
        'template[seciton-4__slider__slider-container__item__card__template]',
      );

      item.forEach((card) => {
        const cardTemplateUsable =
          cardTemplate.content.cloneNode(true).children[0];

        const img = cardTemplateUsable.querySelector('img');
        img.setAttribute('src', card.img);
        img.setAttribute('h3', card.h3);
        cardTemplateUsable.querySelector('h3').innerText = card.h3;
        cardTemplateUsable.querySelector('p').innerText = card.p;

        cardTemplate.parentNode.append(cardTemplateUsable);
      });

      itemTemplate.parentNode.append(itemTemplateUsable);
    });
  }
})();

(() => {
  const slider = window.document.querySelector(
    'div[seciton-4__slider__slider-container]',
  );
  const items = window.document.querySelectorAll(
    'div[seciton-4__slider__slider-container__item]',
  );
  let itemsIndex = [];

  items.forEach((item, index) => {
    const itemWidth = item.offsetWidth; // Get the width of the item
    const scrollPosition =
      item.offsetLeft - (window.innerWidth - itemWidth) / 2; // Calculate the scroll position

    if (index === 0) {
      itemsIndex.push(scrollPosition);
    } else {
      itemsIndex.unshift(scrollPosition);
    }
  });

  itemsIndex.reverse();

  window.document
    .querySelectorAll('button[seciton-4__slider__button--move]')
    .forEach((button, index) => {
      button.addEventListener('click', () =>
        index === 0 ? moveLeft() : moveRight(),
      );
    });

  let currentIndex = 0;

  function moveRight() {
    if (currentIndex === items.length - 1) {
      return;
    }

    currentIndex++;

    slider.scrollTo({
      left: itemsIndex[currentIndex],
      behavior: 'smooth',
    });
  }

  function moveLeft() {
    if (currentIndex === 0) {
      return;
    }

    currentIndex--;

    slider.scrollTo({
      left: itemsIndex[currentIndex],
      behavior: 'smooth',
    });
  }
})();

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
    });

  window.addEventListener('resize', () => {
    controller.forEach((_, index) => {
      const closed = controller[index].textContainer.style.height === '0px';

      controller[index].textContainer.style.height = 'auto';

      controller[index].computedHeight = getComputedStyle(
        controller[index].textContainer,
      ).height;

      if (closed) {
        controller[index].textContainer.style.height = '0px';
      } else {
        controller[index].textContainer.style.height =
          controller[index].computedHeight;
      }
    });
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

window.document
  .querySelectorAll('div[slider-container]')
  .forEach((sliderContainer) => {
    let isDown = false;
    let startX;
    let scrollLeft;

    sliderContainer.addEventListener('touchmove', () => {
      isDown = true;
    });
    sliderContainer.addEventListener('touchend', () => {
      isDown = false;
    });
    sliderContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      sliderContainer.classList.add('active');
      startX = e.pageX - sliderContainer.offsetLeft;
      scrollLeft = sliderContainer.scrollLeft;
    });
    sliderContainer.addEventListener('mouseleave', () => {
      isDown = false;
      sliderContainer.classList.remove('active');
    });
    sliderContainer.addEventListener('mouseup', () => {
      isDown = false;
      sliderContainer.classList.remove('active');
    });
    sliderContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - sliderContainer.offsetLeft;
      const walk = x - startX;
      sliderContainer.scrollLeft = scrollLeft - walk;
      position = sliderContainer.scrollLeft;
    });
  });
