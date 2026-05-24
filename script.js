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

// --- Lógica para el Video Completo (Modal) ---
const modalVideo = document.getElementById('modal-video');
const btnFull = document.getElementById('btn-full-animation');
const closeBtn = document.querySelector('.close-btn');
const videoComp = document.getElementById('video-completo');

if (btnFull && modalVideo && closeBtn && videoComp) {
    btnFull.addEventListener('click', () => {
        modalVideo.style.display = 'flex';
        videoComp.play();
    });

    closeBtn.addEventListener('click', () => {
        modalVideo.style.display = 'none';
        videoComp.pause();
        videoComp.currentTime = 0; // Reinicia el video al cerrar
    });

    window.addEventListener('click', (e) => {
        if (e.target === modalVideo) {
            modalVideo.style.display = 'none';
            videoComp.pause();
            videoComp.currentTime = 0;
        }
    });
}

// --- Lógica para el Formulario de Contacto ---
const submitBtn = document.getElementById('submit-btn');
const contactInput = document.querySelector('.input-box input');

if (submitBtn && contactInput) {
    submitBtn.addEventListener('click', () => {
        const userInput = contactInput.value;

        if (userInput.trim() === "") {
            alert("Por favor, escribe un mensaje antes de enviar.");
            return;
        }

        // 1. Guardar la información en una lista (array) para que actúe como un registro de formulario
        let historial = JSON.parse(localStorage.getItem('respuestas_formulario')) || [];
        historial.push({
            fecha: new Date().toLocaleString(),
            mensaje: userInput
        });
        localStorage.setItem('respuestas_formulario', JSON.stringify(historial));

        // 2. Ejecutar el envío por correo (Mailto)
        const emailDestino = "fatimarenteria832@gmail.com";
        const asunto = "Contacto desde Portafolio Web";
        const cuerpo = `Hola, se ha recibido la siguiente información desde tu portafolio: ${userInput}`;
        window.location.href = `mailto:${emailDestino}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

        // 3. Limpiar el diseño (input) después de guardar
        contactInput.value = "";
    });
}