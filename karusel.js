document.addEventListener('DOMContentLoaded', function() {
    // Массив с URL фотографий 
    const photos = [
        'https://carexpert.ru/img/afoto_zoom.png',
        'https://carexpert.ru/img/foto800/rover/rovsw006.jpg',
        'https://carexpert.ru/img/foto800/rover/rovsw007.jpg',
        'https://carexpert.ru/img/foto800/rover/rovsw008.jpg',
        'https://carexpert.ru/img/foto800/rover/rovsw009.jpg',
        'https://carexpert.ru/img/foto800/rover/rovsw010.jpg',
        'https://carexpert.ru/img/afoto_zoom.png',
        'https://carexpert.ru/img/foto800/rover/rovsw012.jpg',
        'https://carexpert.ru/img/foto600/rover/rovsw001.jpg',
        'https://carexpert.ru/img/foto600/rover/rovsw002.jpg'
    ];

    const carousel = document.querySelector('.carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    let currentIndex = 0;
    let indicators = [];

    // Создаем элементы карусели
    photos.forEach((photo, index) => {
        // Создаем элемент карусели
        const item = document.createElement('div');
        item.className = 'carousel-item';
        
        const img = document.createElement('img');
        img.src = photo;
        img.alt = `Фото ${index + 1}`;
        
        item.appendChild(img);
        carousel.appendChild(item);
        
        // Создаем индикаторы
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
        indicators.push(indicator);
    });

    // Функция для перехода к конкретному слайду
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    // Функция для обновления карусели
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Обновляем индикаторы
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Переход к следующему слайду
    function nextSlide() {
        currentIndex = (currentIndex + 1) % photos.length;
        updateCarousel();
    }

    // Переход к предыдущему слайду
    function prevSlide() {
        currentIndex = (currentIndex - 1 + photos.length) % photos.length;
        updateCarousel();
    }

    // Обработчики событий для кнопок
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Автоматическая прокрутка (опционально)
    let interval = setInterval(nextSlide, 5000);

    // Остановка автоматической прокрутки при наведении
    carousel.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });

    // Возобновление автоматической прокрутки при уходе курсора
    carousel.addEventListener('mouseleave', () => {
        interval = setInterval(nextSlide, 5000);
    });

    // Обработчики для свайпов на мобильных устройствах (опционально)
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide(); // Свайп влево
        } else if (touchEndX > touchStartX + 50) {
            prevSlide(); // Свайп вправо
        }
    }
});