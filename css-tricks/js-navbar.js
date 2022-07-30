const label = document.querySelectorAll('#nav label');

label.forEach(labelEl => {
    
    labelEl.addEventListener('click', e => {
        e.target.classList.toggle('active');
    });

});