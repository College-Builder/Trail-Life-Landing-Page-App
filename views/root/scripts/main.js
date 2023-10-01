(() => {
  const items = [
    {
      img: 'https://college-builder--pj3-trail-life-app--static.s3.amazonaws.com/assets/images/general/bulk-liquid-cargoes.png',
      h3: 'Cargas de Granéis Líquidos',
      p: 'Recomendado para empresas que precisam transportar cargas como óleo cru, produtos químicos líquidos não perigosos e outros líquidos que são transportados em grandes quantidades.',
    },
    {
      img: 'https://college-builder--pj3-trail-life-app--static.s3.amazonaws.com/assets/images/general/special-cargoes.png',
      h3: 'Cargas Especiais',
      p: 'Recomendado para empresas que precisam transportar cargas pesadas e longas.',
    },
    {
      img: 'https://college-builder--pj3-trail-life-app--static.s3.amazonaws.com/assets/images/general/dangerous-cargo.png',
      h3: 'Cargas Perigosa',
      p: 'Recomendado para empresas que precisam transportar mercadoria com uma taxa de risco como produtos químicos, inflamáveis, substâncias tóxicas e outros itens que apresentam riscos à segurança durante o transporte.',
    },
    {
      img: 'https://college-builder--pj3-trail-life-app--static.s3.amazonaws.com/assets/images/general/general-cargo.png',
      h3: 'Cargas em Geral',
      p: 'Recomendado para empresas que desejam contratar para transporte de mercadorias de diferentes tipos e tamanhos.',
    },

    {
      img: 'https://college-builder--pj3-trail-life-app--static.s3.amazonaws.com/assets/images/general/fractionated-cargo.png',
      h3: 'Cargas Fracionada',
      p: 'Recomendado para empresas que desejam contratar apenas um espaço no veículo de transporte.',
    },
    {
      img: 'https://college-builder--pj3-trail-life-app--static.s3.amazonaws.com/assets/images/general/express-cargoperishable-cargo.png',
      h3: 'Cargas Expressa',
      p: 'Recomendado para empresas que precisam que o tempo de entrega da carga seja rápido. ',
    },
    {
      img: 'https://college-builder--pj3-trail-life-app--static.s3.amazonaws.com/assets/images/general/perishable-cargo.png',
      h3: 'Cargas Perecível',
      p: 'Recomendado para empresas que necessita o transporte de alimentos, medicamentos e itens sensíveis à temperatura que requerem transporte refrigerado ou congelado para manter a qualidade.',
    },
    {
      img: 'https://college-builder--pj3-trail-life-app--static.s3.amazonaws.com/assets/images/general/dedicated-cargo.png',
      h3: 'Cargas Dedicada',
      p: 'Recomendado para empresas que tem a necessidade de um fornecimento exclusivo da carga.',
    },
    {
      img: 'https://college-builder--pj3-trail-life-app--static.s3.amazonaws.com/assets/images/general/pharmaceutical-cargo.png',
      h3: 'Cargas Farmacêuticas',
      p: 'Recomendado para empresas que precisam transportar produtos farmacêuticos e medicamentos e que exige condições controladas de temperatura e segurança.',
    },
  ];

  buildItems(parseItems(items));

  window.addEventListener('resize', () => {
    window.document
      .querySelectorAll('div[seciton-4__slider__slider-container__item]')
      .forEach((div) => {
        div.remove();
      });

    buildItems(parseItems(items));
  });

  function parseItems(items) {
    const windowSize = window.innerWidth;
    let loops;
    let itemPerLoop;

    if (windowSize < 700) {
      loops = items.length;
      itemPerLoop = 1;
    } else if (windowSize < 1300) {
      loops = items.length / 2;
      itemPerLoop = 2;
    } else {
      loops = items.length / 3;
      itemPerLoop = 3;
    }

    const parsedItems = [];
    let currentItem = 0;

    for (let c = 0; c < loops; c++) {
      parsedItems.push([]);

      for (let i = 0; i < itemPerLoop; i++) {
        if (!items[currentItem]) {
          parsedItems.pop();

          continue;
        }

        parsedItems[c].push(items[currentItem]);

        currentItem++;
      }
    }

    return parsedItems;
  }

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
  let items = window.document.querySelectorAll(
    'div[seciton-4__slider__slider-container__item]',
  );
  const moveButtons = window.document.querySelectorAll(
    'button[seciton-4__slider__button--move]',
  );

  let itemsIndex = [];
  let currentIndex = 0;
  let goToTheBeggining = true;
  let resizeTimer;

  buildItemsIndex();

  window.addEventListener('resize', () => {
    if (goToTheBeggining) {
      goToTheBeggining = false;

      slider.scrollTo({
        left: 0,
        behavior: 'smooth',
      });

      moveButtons[0].classList.add('--off');
      moveButtons[1].classList.remove('--off');
    }

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      goToTheBeggining = true;
    }, 200);

    items = window.document.querySelectorAll(
      'div[seciton-4__slider__slider-container__item]',
    );

    itemsIndex = [];
    currentIndex = 0;

    buildItemsIndex();
  });

  let moveButtonActive = true;

  moveButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (moveButtonActive) {
        moveButtonActive = false;

        setTimeout(() => {
          moveButtonActive = true;
        }, 800);
      } else {
        return;
      }

      index === 0 ? moveLeft() : moveRight();

      if (currentIndex === 0) {
        moveButtons[0].classList.add('--off');
      } else if (moveButtons[0].classList.contains('--off')) {
        moveButtons[0].classList.remove('--off');
      }

      if (currentIndex === items.length - 1) {
        moveButtons[1].classList.add('--off');
      } else if (moveButtons[1].classList.contains('--off')) {
        moveButtons[1].classList.remove('--off');
      }
    });
  });

  function buildItemsIndex() {
    items.forEach((item, index) => {
      const itemWidth = item.offsetWidth;
      const scrollPosition =
        item.offsetLeft - (window.innerWidth - itemWidth) / 2;

      if (index === 0) {
        itemsIndex.push(scrollPosition);
      } else {
        itemsIndex.unshift(scrollPosition);
      }
    });

    itemsIndex.reverse();
  }

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
  const statusContainer = window.document.querySelector(
    'div[email-form-status-container]',
  );
  const statusContainerContent = window.document.querySelector(
    'div[email-form-status-container__content]',
  );

  statusContainer.style.height = '0px';
  statusContainer.style.filter = 'opacity(0%)';

  const formContainer = window.document.querySelector(
    'div[email-form-container]',
  );

  window.document
    .querySelector('form[email-form-container__form]')
    .addEventListener('submit', (e) => {
      e.preventDefault();

      const name = e.target.elements.name.value;
      const phone = e.target.elements.phone.value;
      const email = e.target.elements.email.value;
      const message = e.target.elements.message.value;

      handleResponse();
    });

  function handleResponse(status500) {
    if (status500) {
      statusContainer.classList.add('--status-500');
    }

    formContainer.style.height = window.getComputedStyle(formContainer).height;

    setTimeout(() => {
      formContainer.style.filter = 'opacity(0%)';

      setTimeout(() => {
        formContainer.style.height = '0px';
        statusContainer.style.height = window.getComputedStyle(
          statusContainerContent,
        ).height;

        setTimeout(() => {
          statusContainer.style.filter = 'opacity(100%)';
        }, 600);
      }, 500);
    }, 200);
  }
})();
