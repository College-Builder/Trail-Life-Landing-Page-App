(() => {
  const template = window.document.querySelector(
    'template[section-1__image-slider-template]',
  );

  section1Builder.forEach((item) => {
    const templateUsable = template.content.cloneNode(true).children[0];

    templateUsable.setAttribute('href', item.href);
    templateUsable.querySelector('source').setAttribute('srcset', item.srcset);
    templateUsable.querySelector('img').setAttribute('src', item.src);

    template.parentElement.append(templateUsable);
  });
})();

(() => {
  const div = window.document.querySelector('div[image-slider-container]');

  const controller = {
    imageSliderContainer: div,
    imageSlider: div.querySelector('div[image-slider-container__image-slider]'),
    numberOfPropagandas: div.querySelectorAll('img').length,
    currentIndex: 0,
    goingLeft: true,
    isMoving: false,
  };

  setInterval(() => {
    if (controller.goingLeft) {
      handlePropagandaScroll(controller, true);
    } else {
      handlePropagandaScroll(controller, false);
    }
  }, 10000);

  let restoreIsMoving;
  let move = true;

  controller.imageSliderContainer
    .querySelectorAll('button')
    .forEach((button, index) => {
      button.addEventListener('mousedown', () => {
        if (!move) {
          return;
        }

        move = false;

        setTimeout(() => {
          move = true;
        }, 600);

        if (restoreIsMoving) {
          clearTimeout(restoreIsMoving);
        }

        controller.isMoving = true;

        handlePropagandaScroll(controller, index === 0 ? false : true, true);

        restoreIsMoving = setTimeout(() => {
          controller.isMoving = false;
        }, 10000);
      });
    });

  window.addEventListener('resize', () => {
    controller.imageSlider.scrollLeft =
      (controller.imageSlider.scrollWidth / controller.numberOfPropagandas) *
      controller.currentIndex;
  });
})();

(() => {
  buildSection4Builder(section4Builder);

  window.addEventListener('resize', () => {
    window.document
      .querySelectorAll('div[seciton-4__slider__slider-container__item]')
      .forEach((div) => {
        div.remove();
      });

    buildSection4Builder(section4Builder);
  });
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

handleAccordionContainer();

(() => {
  const form = window.document.querySelector(
    'form[email-form-container__form]',
  );

  const method = form.getAttribute('method');
  const action = form.getAttribute('action');
  const button = form.querySelector('button');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = {
      name: e.target.elements.name.value,
      phone: e.target.elements.phone.value.replace(/\D/g, ''),
      email: e.target.elements.email.value,
      message: e.target.elements.message.value,
    };

    handleButtonLoading(true, button);

    const req = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (req.status === 400) {
      const { label, message } = await req.json();

      handleFormErrorMessageResponse(label, message);
      handleButtonLoading(false, button);
    } else {
      handleFormFinalResponse(req.status === 200 ? false : true);
    }
  });
})();
