// variables definidas para uso general
let resultados = []
const principalContainer = document.querySelector('#contenedorPrincipal')
const listadoCategorias = []
let htmlCategorias = ""
const contenedorCategorias = document.querySelector(".contenedorCategorias")
let categoriasSeleccionadas = []
let gananciaEventos = ""

// array de past events
let pastEvents = [];

let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"
let data;


async function getEventData() {
    try {
        const response = await fetch(urlApi);
        await response.json()

            .then(json => {
                data = json;

                pushearPastEvents()

                listaCategoriasPast()

                agregarCardPast()

                agregarCategoriasAListado()

                contenedorCategorias.innerHTML = htmlCategorias

                let casillasCheckbox = document.querySelectorAll('input[type=checkbox]')


                let search = document.querySelector('input[type=search]')


                casillasCheckbox.forEach(input => {
                    input.addEventListener('change', (e) => {
                        const casilla = e.target;
                        if (casilla.checked) {
                            categoriasSeleccionadas.push(casilla.value);
                        } else {
                            categoriasSeleccionadas = categoriasSeleccionadas.filter(categoria => categoria != casilla.value)
                        }
                        applyCategoryFilter()
                    })

                    document.addEventListener('submit', (eb) => {
                        let palabraBusqueda = eb.target[0].value.toLowerCase();
                        eb.preventDefault()
                        applyWordFilter(palabraBusqueda)
                    })

                    ganancia()
                })
            })
    } catch (error) {

    }
}
getEventData()

function pushearPastEvents() {
    for (let event of data.events) {
        let currentDate = new Date(data.currentDate);
        let eventDate = new Date(event.date);
        if (eventDate < currentDate) {
            pastEvents.push(event)

        }
    }
}

function listaCategoriasPast() {

    for (evento of pastEvents) {
        resultados.push(createCardEvent(evento))
        if (!listadoCategorias.includes(evento.category)) {
            listadoCategorias.push(evento.category)
        }
    }
}

function agregarCardPast() {
    for (let cardCreada of resultados) {
        principalContainer.innerHTML += cardCreada;
    }
}

function agregarCategoriasAListado() {
    for (let categoria of listadoCategorias) {
        htmlCategorias += addCategories(categoria)
    }
}