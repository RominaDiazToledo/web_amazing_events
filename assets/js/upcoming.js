// variables definidas para uso general
resultados = []
const principalContainer = document.querySelector('#contenedorPrincipal')
const listadoCategorias = []
let htmlCategorias = ""
const contenedorCategorias = document.querySelector(".contenedorCategorias")
let categoriasSeleccionadas = []

// array de upcoming events
let upcomingEvents = []

let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"
let data;

async function getEventData() {
    try {
        const response = await fetch(urlApi);
        await response.json()
            .then(json => {
                data = json;

                pushearUpcomingEvents()

                listaCategoriasUpcoming()

                agregarCardUpcoming()

                agregarCategoriasAListadoUpcoming()

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
                })
            })
    } catch (error) {

    }
}
getEventData()




function pushearUpcomingEvents() {
    for (let event of data.events) {
        let currentDate = new Date(data.currentDate);
        let eventDate = new Date(event.date);
        if (eventDate > currentDate) {
            upcomingEvents.push(event)

        }
    }
}

function listaCategoriasUpcoming() {
    for (evento of upcomingEvents) {
        resultados.push(createCardEvent(evento))
        if (!listadoCategorias.includes(evento.category)) {
            listadoCategorias.push(evento.category)
        }
    }
}

function agregarCardUpcoming() {
    for (let cardCreada of resultados) {
        principalContainer.innerHTML += cardCreada;
    }
}
function agregarCategoriasAListadoUpcoming() {
    for (let categoria of listadoCategorias) {
        htmlCategorias += addCategories(categoria)
    }
}