
resultadosFuturo = []
const contenedorPrincipal = document.querySelector('#contenedorPrincipal')
const listadoCategorias = []
let htmlCategorias = ""
const contenedorCategorias = document.querySelector(".contenedorCategorias")
let categoriasSeleccionadas = []
let upcomingEvents = []

for (let event of data.events) {
    let currentDate = new Date(data.currentDate);
    let eventDate = new Date(event.date);
    if (eventDate > currentDate) {
        upcomingEvents.push(event)
        console.log(upcomingEvents)
    }
}

for (evento of upcomingEvents) {
    resultadosFuturo.push(crearCardParaEvento(evento))
    if (!listadoCategorias.includes(evento.category)) {
        listadoCategorias.push(evento.category)
    }
}

for (let cardCreada of resultadosFuturo) {
    contenedorPrincipal.innerHTML += cardCreada;
}
for (let categoria of listadoCategorias) {
    htmlCategorias += agregoCategorias(categoria)
}
contenedorCategorias.innerHTML = htmlCategorias