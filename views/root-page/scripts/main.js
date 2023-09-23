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
