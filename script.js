const gun = document.querySelector('.gun-card');
const buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    gun.classList.add('shoot');

    window.setTimeout(() => {
      gun.classList.remove('shoot');
    }, 220);
  });
});
