function handlePropagandaScroll(controller, forward, ignoreIsMoving = false) {
  if (controller.isMoving && !ignoreIsMoving) {
    return;
  }

  forward ? controller.currentIndex++ : controller.currentIndex--;

  controller.imageSlider.scrollTo({
    left:
      (controller.imageSlider.scrollWidth / controller.numberOfPropagandas) *
      controller.currentIndex,
    top: 0,
    behavior: 'smooth',
  });

  const container = controller.imageSliderContainer.querySelectorAll('button');
  const firstButton = container[0];
  const lastButton = container[1];

  firstButton.classList.remove('--off');
  lastButton.classList.remove('--off');

  if (controller.currentIndex + 1 >= controller.numberOfPropagandas) {
    controller.currentIndex = controller.numberOfPropagandas - 1;
    controller.goingLeft = false;

    lastButton.classList.add('--off');
  }

  if (controller.currentIndex <= 0) {
    controller.currentIndex = 0;
    controller.goingLeft = true;

    firstButton.classList.add('--off');
  }
}

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

function buildSection4Builder(section4Builder) {
  const items = parseItems(section4Builder);

  const itemTemplate = window.document.querySelector(
    'template[seciton-4__slider__slider-container__item__template]',
  );

  items.forEach((item) => {
    const itemTemplateUsable = itemTemplate.content.cloneNode(true).children[0];

    const cardTemplate = itemTemplateUsable.querySelector(
      'template[seciton-4__slider__slider-container__item__card__template]',
    );

    item.forEach((card) => {
      const cardTemplateUsable =
        cardTemplate.content.cloneNode(true).children[0];

      const img = cardTemplateUsable.querySelector('img');
      img.setAttribute('src', card.src);
      img.setAttribute('h3', card.h3);
      cardTemplateUsable.querySelector('h3').innerText = card.h3;
      cardTemplateUsable.querySelector('p').innerText = card.p;

      cardTemplate.parentNode.append(cardTemplateUsable);
    });

    itemTemplate.parentNode.append(itemTemplateUsable);
  });
}

function handleAccordionContainer() {
  var controller = [];

  window.document
    .querySelectorAll('div[accordion-container]')
    .forEach((div, index) => {
      const textContainer = div.querySelector(
        'div[accordion-container__text-container]',
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
}

function handleFormFinalResponse(error) {
  const statusContainer = window.document.querySelector(
    'div[email-form-status-container]',
  );
  const statusContainerContent = window.document.querySelector(
    'div[email-form-status-container__content]',
  );
  const formContainer = window.document.querySelector(
    'div[email-form-container]',
  );

  if (error) {
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
      statusContainer.style.pointerEvents = 'all';

      setTimeout(() => {
        statusContainer.style.filter = 'opacity(100%)';
      }, 600);
    }, 500);
  }, 200);
}
