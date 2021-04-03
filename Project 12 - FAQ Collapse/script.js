const buttons = document.querySelectorAll('.faq-toggle');

buttons.forEach((button) => {
    let FAQ = button.parentElement;
    button.addEventListener('click', () => {
        FAQ.classList.toggle('active')
    })
})

