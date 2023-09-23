(() => {
  const menu = window.document.querySelector('div[mobile-header-menu]');
  const buttonFull = window.document.querySelector(
    'button[mobile-header-menu-button--full]',
  );
  const buttonClose = window.document.querySelector(
    'button[mobile-header-menu-button--close]',
  );

  let active;

  buttonFull.addEventListener('click', () => {
    active ? closeMenu() : openMenu();
  });

  menu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      closeMenu();
    });
  });

  buttonClose.addEventListener('click', () => {
    closeMenu();
  });

  function openMenu() {
    menu.style.height = `${menu.scrollHeight}px`;
    active = true;
    buttonClose.classList.remove('--off');
  }

  function closeMenu() {
    menu.style.height = '0px';
    active = false;
    buttonClose.classList.add('--off');
  }
})();
