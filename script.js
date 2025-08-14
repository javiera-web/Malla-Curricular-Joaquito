document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DATOS DE LA MALLA CURRICULAR ---
    const malla = {
        'Semestre 1': [
            'Electricidad Aplicada',
            'Historia de la Música',
            'Fundamentos de Acústica',
            'Nivelación Matemática',
            'Taller de Nivelación de Competencias Comunicativas',
            'Inglés Básico I',
            'Taller de Desarrollo Personal I'
        ],
        'Semestre 2': [
            'Edición de Audio Pro Tools',
            'Taller de Microfonía y Sonidos Directo',
            'Taller de Procesadores de Audio y Consolas',
            'Ejecución de Instrumentos Musicales',
            'Recintos Acústicos y Altavoces',
            'Cálculo I',
            'Inglés Básico II'
        ],
        'Semestre 3': [
            'Postproducción de Audio Pro Tools',
            'Taller de Grabación Musical',
            'Producción y Transmisión de Radio',
            'Taller de Mantenimiento de Equipos de Audio',
            'Sonido para Cine y TV',
            'Acústica',
            'Inglés Intermedio I',
            'Taller de Desarrollo Personal II'
        ],
        'Semestre 4': [
            'Mezcla y Masterización en Pro Tools',
            'Taller de Producción Musical',
            'Sonido en Vivo',
            'Inglés Intermedio II',
            'Fortalecimiento Emprendedor'
        ],
        'Semestre 5': [
            'Producción Musical Multimedia',
            'Postproducción Multimedia',
            'Música Electrónica',
            'Acondicionamiento Acústico',
            'Cultura y Valores',
            'Emprendimiento e Innovación'
        ],
        'Semestre 6': [
            'Audio Aplicado a Videojuegos I',
            'Integración de Sistemas Audiovisuales',
            'Técnicas de Conciertos y Eventos',
            'Metodología de la Investigación',
            'Formulación y Evaluación de Proyectos Audiovisuales'
        ],
        'Semestre 7': [
            'Audio Aplicado a Videojuegos II',
            'Taller de Actualización',
            'Proyectos y Prototipos Electroacústicos',
            'Protocolos Ambientales y Laborales',
            'Proyectos Colaborativos de Innovación',
            'Taller de Ingreso y Preparación al Mundo Laboral',
            'Ética Audio visual',
            'Creación y Gestión de Empresas Audiovisuales'
        ],
        'Semestre 8': [
            'Actividad de Titulación',
            'Práctica profesional'
        ]
    };

    // Diccionario de requisitos. La clave es el ramo y el valor es un array de sus requisitos.
    const requisitos = {
        'Edición de Audio Pro Tools': ['Fundamentos de Acústica'],
        'Taller de Microfonía y Sonidos Directo': ['Fundamentos de Acústica'],
        'Taller de Procesadores de Audio y Consolas': ['Electricidad Aplicada'],
        'Recintos Acústicos y Altavoces': ['Fundamentos de Acústica'],
        'Inglés Básico II': ['Inglés Básico I'],
        'Postproducción de Audio Pro Tools': ['Edición de Audio Pro Tools'],
        'Taller de Grabación Musical': ['Edición de Audio Pro Tools', 'Taller de Microfonía y Sonidos Directo'],
        'Producción y Transmisión de Radio': ['Taller de Procesadores de Audio y Consolas'],
        'Sonido para Cine y TV': ['Taller de Microfonía y Sonidos Directo'],
        'Acústica': ['Recintos Acústicos y Altavoces', 'Cálculo I'],
        'Inglés Intermedio I': ['Inglés Básico II'],
        'Taller de Desarrollo Personal II': ['Taller de Desarrollo Personal I'],
        'Mezcla y Masterización en Pro Tools': ['Postproducción de Audio Pro Tools'],
        'Taller de Producción Musical': ['Taller de Grabación Musical'],
        'Sonido en Vivo': ['Producción y Transmisión de Radio'],
        'Inglés Intermedio II': ['Inglés Intermedio I'],
        'Producción Musical Multimedia': ['Mezcla y Masterización en Pro Tools'],
        'Postproducción Multimedia': ['Sonido para Cine y TV'],
        'Música Electrónica': ['Taller de Producción Musical'],
        'Acondicionamiento Acústico': ['Acústica'],
        'Audio Aplicado a Videojuegos I': ['Producción Musical Multimedia', 'Postproducción Multimedia'],
        'Integración de Sistemas Audiovisuales': ['Acondicionamiento Acústico'],
        'Técnicas de Conciertos y Eventos': ['Sonido en Vivo'],
        'Formulación y Evaluación de Proyectos Audiovisuales': ['Fortalecimiento Emprendedor'],
        'Audio Aplicado a Videojuegos II': ['Audio Aplicado a Videojuegos I'],
        'Proyectos y Prototipos Electroacústicos': ['Integración de Sistemas Audiovisuales'],
        'Proyectos Colaborativos de Innovación': ['Emprendimiento e Innovación', 'Metodología de la Investigación'],
        'Actividad de Titulación': ['Taller de Ingreso y Preparación al Mundo Laboral', 'Proyectos Colaborativos de Innovación'],
        'Práctica profesional': ['Actividad de Titulación'],
    };

    // --- 2. GESTIÓN DEL ESTADO CON LOCALSTORAGE ---
    // Carga los ramos aprobados desde el almacenamiento local o inicializa un array vacío
    let ramosAprobados = JSON.parse(localStorage.getItem('ramosAprobados')) || [];

    // Guarda los ramos aprobados en el almacenamiento local
    const guardarEstado = () => {
        localStorage.setItem('ramosAprobados', JSON.stringify(ramosAprobados));
    };

    // --- 3. FUNCIONES AUXILIARES ---
    // Verifica si un ramo y sus requisitos están aprobados
    const tieneRequisitosCumplidos = (ramo) => {
        const reqs = requisitos[ramo];
        if (!reqs) return true; // Si no tiene requisitos, siempre está disponible
        return reqs.every(req => ramosAprobados.includes(req));
    };

    // Muestra un mensaje en el modal
    const mostrarModal = (mensaje) => {
        const modal = document.getElementById('modal');
        const modalText = document.getElementById('modal-text');
        modalText.innerText = mensaje;
        modal.classList.add('show');
    };

    // Cierra el modal
    const cerrarModal = () => {
        const modal = document.getElementById('modal');
        modal.classList.remove('show');
    };

    // --- 4. RENDERIZADO Y LÓGICA DE LA MALLA ---
    const renderizarMalla = () => {
        const mallaCurricular = document.getElementById('malla-curricular');
        mallaCurricular.innerHTML = ''; // Limpia el contenido antes de renderizar
    
        // Recorre cada semestre en el objeto de la malla
        for (const semestre in malla) {
            // Crea el contenedor del semestre
            const semestreDiv = document.createElement('div');
            semestreDiv.className = 'semestre';
    
            // Agrega el título del semestre
            const h2 = document.createElement('h2');
            h2.textContent = semestre;
            semestreDiv.appendChild(h2);
    
            // Crea la lista de ramos
            const ul = document.createElement('ul');
            ul.className = 'ramos-lista';
    
            // Recorre cada ramo del semestre
            malla[semestre].forEach(ramo => {
                const li = document.createElement('li');
                li.className = 'ramo';
                li.dataset.nombre = ramo; // Almacena el nombre del ramo en un atributo de datos
                li.textContent = ramo;
    
                // Aplica la clase 'aprobado' si el ramo ya está en la lista de aprobados
                if (ramosAprobados.includes(ramo)) {
                    li.classList.add('aprobado');
                } else if (!tieneRequisitosCumplidos(ramo)) {
                    // Aplica la clase 'bloqueado' si los requisitos no están cumplidos
                    li.classList.add('bloqueado');
                }
    
                ul.appendChild(li);
            });
    
            semestreDiv.appendChild(ul);
            mallaCurricular.appendChild(semestreDiv);
        }
    
        // Agrega el evento de clic a todos los ramos después de que se han renderizado
        document.querySelectorAll('.ramo').forEach(ramoElement => {
            ramoElement.addEventListener('click', manejarClickRamo);
        });
    };

    // Maneja el evento de clic en un ramo
    const manejarClickRamo = (event) => {
        const ramoNombre = event.target.dataset.nombre;
    
        if (event.target.classList.contains('aprobado')) {
            // Si ya está aprobado, no hacemos nada
            return;
        }
    
        if (!tieneRequisitosCumplidos(ramoNombre)) {
            // Si el ramo está bloqueado, muestra un mensaje con los requisitos faltantes
            const reqs = requisitos[ramoNombre];
            const requisitosFaltantes = reqs.filter(req => !ramosAprobados.includes(req));
            const mensaje = `Para aprobar ${ramoNombre}, primero debes aprobar los siguientes ramos: \n\n- ${requisitosFaltantes.join('\n- ')}`;
            mostrarModal(mensaje);
        } else {
            // Si los requisitos están cumplidos, marca el ramo como aprobado
            ramosAprobados.push(ramoNombre);
            event.target.classList.add('aprobado');
            guardarEstado(); // Guarda el estado en localStorage
            renderizarMalla(); // Vuelve a renderizar la malla para actualizar los bloqueos
        }
    };

    // Cierra el modal al hacer clic en el botón de cerrar
    document.querySelector('.close-button').addEventListener('click', cerrarModal);

    // Cierra el modal al hacer clic fuera de él
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            cerrarModal();
        }
    });

    // Inicia la aplicación renderizando la malla por primera vez
    renderizarMalla();
});
