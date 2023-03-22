// variables dde uso general

resultadosPasado = []
const contenedorPrincipal = document.querySelector('#contenedorPrincipal')
const listadoCategorias = []
let htmlCategorias = ""
const contenedorCategorias = document.querySelector(".contenedorCategorias")
let categoriasSeleccionadas = []
let pastEvents = []

for (let event of data.events) {
    let currentDate = new Date(data.currentDate);
    let eventDate = new Date(event.date);
    if (eventDate < currentDate) {
        pastEvents.push(event)
        console.log(pastEvents)
    }
}

for (evento of pastEvents) {
    resultadosPasado.push(crearCardParaEvento(evento))
    if (!listadoCategorias.includes(evento.category)) {
        listadoCategorias.push(evento.category)
    }
}

for (let cardCreada of resultadosPasado) {
    contenedorPrincipal.innerHTML += cardCreada;
}
for (let categoria of listadoCategorias) {
    htmlCategorias += agregoCategorias(categoria)
}
contenedorCategorias.innerHTML = htmlCategorias