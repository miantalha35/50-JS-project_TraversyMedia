const panels = document.querySelectorAll('.panel');
//puts in an a nodeList which is similar to an array

panels.forEach((panel) => {
    panel.addEventListener('click', () => {
        removeActiveClasses(); //removes active classes from all of them
        panel.classList.add('active'); // adds active class to the one we want
    })
})

function removeActiveClasses() {
    panels.forEach( panel => {
        panel.classList.remove('active');
    })
}
