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

function setPhoneInputProperties(input) {
  input.addEventListener('keydown', (event) => {
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
      input.value = `+${value.slice(0, 2)} (${value.slice(2, 4)}) ${value.slice(
        4,
        9,
      )}`;
    } else {
      input.value = `+${value.slice(0, 2)} (${value.slice(2, 4)}) ${value.slice(
        4,
        9,
      )}-${value.slice(9, 13)}`;
    }
  });
}

function handleFormLoading(loading, buttonTag) {
  const button = window.document.querySelector(`button[${buttonTag}]`);

  if (loading) {
    button.classList.add('--loading');
  } else {
    button.classList.remove('--loading');
  }
}

function handleFormErrorMessageResponse(label, message) {
  window.document.querySelectorAll('div[default-input]').forEach((div) => {
    div.classList.remove('--show-error');
  });

  const container = window.document.querySelector(
    `input[name='${label}']`,
  ).parentElement;

  container.classList.add('--show-error');
  container.querySelector('i[error-message]').innerText = message;
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
