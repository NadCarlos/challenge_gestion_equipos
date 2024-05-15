// Función para obtener los jugadores del localStorage
const obtenerJugadoresLocalStorage = () => {
    const jugadoresString = localStorage.getItem('jugadores');
    return jugadoresString ? JSON.parse(jugadoresString) : [];
};

// Función para guardar los jugadores en el localStorage
const guardarJugadoresLocalStorage = (jugadores) => {
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
};

// Función asíncrona para agregar un nuevo jugador al equipo usando un prompt de HTML
const agregarJugador = async () => {
    try {
        // Solicitar al usuario que ingrese los datos del jugador
        const nombre = prompt("Ingrese el nombre del jugador:");
        const edad = parseInt(prompt("Ingrese la edad del jugador:"));
        const posicion = prompt("Ingrese la posición del jugador:");
        const estado = prompt("Ingrese el estado del jugador:");

        // Obtener los jugadores del localStorage
        let jugadores = obtenerJugadoresLocalStorage();

        // Verificar si el jugador ya existe en el equipo
        const jugadorExistente = jugadores.find(jugador => jugador.nombre === nombre);
        if (jugadorExistente) {
            throw new Error('El jugador ya está en el equipo.');
        }
        else if (jugadores.length >= 21) {
            throw new Error('Cantidad maxima de jugadores en el plantel alcanzada.');
        }

        // Agregar el nuevo jugador al array de jugadores
        const newId = jugadores.length + 1
        jugadores.push({ id: newId, nombre: nombre, edad: edad, posicion: posicion, estado: estado });

        // Guardar los jugadores actualizados en el localStorage
        guardarJugadoresLocalStorage(jugadores);

        // Simular una demora de 1 segundo para la operación asíncrona
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mostrar un mensaje de éxito
        alert('Jugador agregado correctamente.');
        listarJugadores()
    } catch (error) {
        console.error('Error:', error.message);
    }
};

// Función asíncrona para listar todos los jugadores del equipo
const listarJugadores = async () => {
    //Armo lista de jugadores
    let jugadoresLista = document.getElementById('jugadoresLista');
    const listaJugadores = obtenerJugadoresLocalStorage()
    jugadoresLista.innerHTML = '';

    //god damn gi's, make me proud
    const titulares = listaJugadores.filter(jugador => jugador.estado.includes("titular"));
    console.log(titulares)
    if (titulares.length < 11) {
        alert('Faltan titulares.');
    }
    else if (titulares.length > 11) {
        alert('Hay mas de 11 titulares.');
    }

    //Armo cada jugador con sus detalles
    listaJugadores.forEach(jugador => {
        const li = document.createElement('li');

        const nombreJugador = document.createElement('h2');
        nombreJugador.textContent = jugador.nombre

        const edad = document.createElement('h2');
        edad.textContent = jugador.edad

        const posicion = document.createElement('h2');
        posicion.textContent = jugador.posicion

        const estado = document.createElement('h2');
        estado.textContent = jugador.estado

        //id deljugador
        const jugadorId = jugador.id

        //Boton Posicion
        const botonPosicion = document.createElement('button');
        botonPosicion.textContent = 'Asignar posición';
        botonPosicion.addEventListener('click', () => {
            asignarPosicion(jugadorId)
        });

        //Boton Cambio
        const botonCambio = document.createElement('button');
        botonCambio.textContent = 'Realizar Cambio';
        botonCambio.addEventListener('click', () => {
            realizarCambio(jugadorId)
        });

        //Boton Borrar
        const botonBorrar = document.createElement('button');
        botonBorrar.textContent = 'Borrar';
        botonBorrar.addEventListener('click', () => {
            console.log(listaJugadores)
            const listaJugadoresNueva = listaJugadores.filter(jugador => jugador.id !== jugadorId);
            console.log(listaJugadoresNueva)
            guardarJugadoresLocalStorage(listaJugadoresNueva)
            listarJugadores()
        });

        li.appendChild(nombreJugador);
        li.appendChild(edad);
        li.appendChild(posicion);
        li.appendChild(estado);
        li.appendChild(botonPosicion);
        li.appendChild(botonCambio);
        li.appendChild(botonBorrar);
        jugadoresLista.appendChild(li);
    });
};

// Función asíncrona para asignar una nueva posición a un jugador
const asignarPosicion = async (jugadorId) => {
    try {
        // Implementación para asignar una nueva posición a un jugador
        const listaJugadores = obtenerJugadoresLocalStorage()
        //Conseguir el jugador con la id que traje y actualizar la posicion
        const nuevaPosicion = prompt("Ingrese la posición del jugador:");
        let jugador = listaJugadores.find(jugador => jugador.id === jugadorId);
        if (jugador) {
            jugador.posicion = nuevaPosicion
        }
        guardarJugadoresLocalStorage(listaJugadores);
        listarJugadores();
    } catch (error) {
        console.error('Error:', error.message);
    }
};

// Función asíncrona para realizar un cambio durante un partido
const realizarCambio = async (jugadorSeleccionadoId) => {
    try {
        // Implementación para realizar un cambio durante un partido
        const listaJugadores = obtenerJugadoresLocalStorage()
        //
        const nombreEntrante = prompt("Ingrese nombre jugador entrante:");
        let jugadorEntrante = listaJugadores.find(jugador => jugador.nombre === nombreEntrante);
        if (jugadorEntrante !== 'titular') {
            jugadorEntrante.estado = 'titular'
        }

        let jugadorSaliente = listaJugadores.find(jugador => jugador.id === jugadorSeleccionadoId);
        if (jugadorSaliente) {
            jugadorSaliente.estado = prompt("Estado del jugador saliente:")
        }

        guardarJugadoresLocalStorage(listaJugadores);
        listarJugadores();
    } catch (error) {
        console.error('Error:', error.message);
    }
};

// Función principal asíncrona que interactúa con el usuario
const main = async (entrada) => {
    try {
        if(entrada == 'agregarJugador'){
            agregarJugador()
        }
        listarJugadores()
    } catch (error) {
        console.error('Error:', error);
    }
};

// Llamar a la función principal para iniciar la aplicación
main();