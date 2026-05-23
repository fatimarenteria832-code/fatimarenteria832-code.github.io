const container = document.querySelector('#galeria-detallada .container');
const btnNext = document.querySelector('#nextGaleria');
const btnPrev = document.querySelector('#prevGaleria');

if (btnNext && btnPrev && container) {
    // Cantidad de píxeles que se desplaza en cada click
    const scrollAmount = 370; 

    btnNext.addEventListener('click', () => {
        container.scrollLeft += scrollAmount;
    });

    btnPrev.addEventListener('click', () => {
        container.scrollLeft -= scrollAmount;
    });
}

// --- Lógica para el Carrusel de Fotos (Drag to Scroll + Auto-scroll) ---
const imageSlider = document.querySelector('#carrusel .carrusel-container');
const imageWrapper = document.querySelector('#carrusel .wrapper');

if (imageSlider && imageWrapper) {
    let isDown = false;
    let startX;
    let scrollLeft;
    let autoScrollSpeed = 0.6; // Velocidad del movimiento automático
    let requestID;

    const step = () => {
        if (!isDown) {
            imageSlider.scrollLeft += autoScrollSpeed;
            if (imageSlider.scrollLeft >= imageWrapper.scrollWidth / 2) {
                imageSlider.scrollLeft = 0;
            }
        }
        requestID = requestAnimationFrame(step);
    };

    requestID = requestAnimationFrame(step);

    // Evita que el navegador intente arrastrar la imagen como archivo
    imageSlider.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });

    imageSlider.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Evita selección de texto e interferencias
        isDown = true;
        imageSlider.style.cursor = 'grabbing';
        startX = e.pageX - imageSlider.offsetLeft;
        scrollLeft = imageSlider.scrollLeft;
    });

    imageSlider.addEventListener('mouseleave', () => {
        isDown = false;
        imageSlider.style.cursor = 'grab';
    });

    imageSlider.addEventListener('mouseup', () => {
        isDown = false;
        imageSlider.style.cursor = 'grab';
    });

    imageSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - imageSlider.offsetLeft;
        const walk = (x - startX) * 2; 
        imageSlider.scrollLeft = scrollLeft - walk;
    });
}

// --- Lógica para el Carrusel de Videos (Drag to Scroll + Auto-scroll) ---
const videoSlider = document.querySelector('#carrusel-videos .carrusel-container');
const videoWrapper = document.querySelector('#carrusel-videos .wrapper-videos');

if (videoSlider && videoWrapper) {
    let isDown = false;
    let startX;
    let scrollLeft;
    let autoScrollSpeed = 0.8; // Velocidad del movimiento automático
    let requestID;

    // Función para el movimiento automático infinito
    const step = () => {
        if (!isDown) {
            videoSlider.scrollLeft += autoScrollSpeed;
            // Si llegamos a la mitad (donde empiezan los duplicados), reiniciamos
            if (videoSlider.scrollLeft >= videoWrapper.scrollWidth / 2) {
                videoSlider.scrollLeft = 0;
            }
        }
        requestID = requestAnimationFrame(step);
    };

    // Iniciar el auto-scroll
    requestID = requestAnimationFrame(step);

    // Evita que el navegador intente arrastrar el video como archivo
    videoSlider.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });

    // Eventos de Mouse para arrastrar
    videoSlider.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Evita interferencias al hacer clic
        isDown = true;
        videoSlider.style.cursor = 'grabbing';
        startX = e.pageX - videoSlider.offsetLeft;
        scrollLeft = videoSlider.scrollLeft;
    });

    videoSlider.addEventListener('mouseleave', () => {
        isDown = false;
        videoSlider.style.cursor = 'grab';
    });

    videoSlider.addEventListener('mouseup', () => {
        isDown = false;
        videoSlider.style.cursor = 'grab';
    });

    videoSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - videoSlider.offsetLeft;
        // Multiplicamos por 2 para que el desplazamiento sea más sensible
        const walk = (x - startX) * 2; 
        videoSlider.scrollLeft = scrollLeft - walk;
    });
}