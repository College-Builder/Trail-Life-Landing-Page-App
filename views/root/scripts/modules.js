function handleButtonLoading(loading, button) {
  if (loading) {
    button.classList.add('--pre-loading');

    setTimeout(() => {
      if (button.classList.contains('--pre-loading')) {
        button.classList.remove('--pre-loading');
        button.classList.add('--loading');
      }
    }, 500);
  } else {
    button.classList.remove('--pre-loading');
    button.classList.remove('--loading');
  }
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
