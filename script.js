document.querySelectorAll('.timeline img').forEach(img => {
    img.addEventListener('click', () => {
        const overlay = document.querySelector('.popup-overlay');
        overlay.querySelector('img').src = img.src;
        overlay.classList.add('active');
    });
});

document.querySelector('.popup-overlay').addEventListener('click', () => {
    document.querySelector('.popup-overlay').classList.remove('active');
});
