const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    counter.innerText = '0';

    const updateCounter = () => {
        const target = +counter.getAttribute('data-target'); //+ makes it a number, or use parseInt
        const c = +counter.innerText
        
        const increment = target / 200;

        if(c < target) {
            counter.innerText = `${Math.floor(c + increment)}`;
            setTimeout(updateCounter, 10)
        }
    }

    updateCounter();
})