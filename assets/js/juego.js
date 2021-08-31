
(() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0,
        puntosComputadora = 0;

    //referencias del HTML
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugador = document.querySelector('#Jugador-cartas'),
        divCartasComputadora = document.querySelector('#computadora-cartas'),
        puntosHTML = document.querySelectorAll('small');

    // //Esta funcion inicializa el juego
    // const inicializarJuego = () =>{
        
    // };

    //esta funcion mezcla las cartas
    const crearDeck = () => {

        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);

            }
        }
        return _.shuffle(deck);
    }
    crearDeck();
    //Esta funcion permite tomar una carta
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'no hay cartas';
        }
        return deck.pop();
    }

    //valor de la carta
    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;

    }

    //turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        do {
            const carta = pedirCarta();

            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHTML[1].innerText = puntosComputadora;

            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasComputadora.append(imgCarta);
            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora <= puntosMinimos) && (puntosMinimos <= 21));

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana');
            } else if (puntosMinimos > 21) {
                alert('Computadora gana');
            } else if (puntosComputadora > 21) {
                alert('Jugador gana');
            } else {
                alert('Computadora gana');
            }
        }, 1000);
    }

    //evento jugador
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();

        puntosJugador = puntosJugador + valorCarta(carta);
        puntosHTML[0].innerText = puntosJugador;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');

        divCartasJugador.append(imgCarta);

        if (puntosJugador > 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        } else if (puntosJugador === 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    //evento detener
    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    });

    //evento nuevo juego
    btnNuevo.addEventListener('click', () => {
        deck = [];
        deck = crearDeck();

        puntosComputadora = 0;
        puntosJugador = 0;
        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;
        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    });
})();

