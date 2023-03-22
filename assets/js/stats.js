let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

let results = []
let pastEvents = []
let listPastCategories = []
let upcomingEvents = []
let listUpcomingCategories = []


let data;

async function getEventData(){
   
    const response = await fetch(urlApi)
    data = await response.json().then(data => {
        addFirstTable(data)
        getUpcomingData(data)
        getPastData(data)

    })


}
getEventData()


function getUpcomingData(data){
    pushearUpcomingEvents(data)

    addSecondTable(upcomingEvents)
}


async function getPastData(data){
    pushearPastEvents(data)
    addThirdTable(pastEvents);
}

function eventAttendance(evento) {
    let capacidad = evento.capacity;
    let asistencia = evento.assistance;
    let porcentajeAsistencia = asistencia/capacidad * 100;
    return porcentajeAsistencia;
}


function greaterAttendance(data) {
    let porcentajeMayorHastaAhora = 0;
    let eventoMayorHastaAhora = null;
    for (evento of data.events) {
        let porcentajeAComparar = eventAttendance(evento);
        if (porcentajeAComparar > porcentajeMayorHastaAhora) {
            porcentajeMayorHastaAhora = porcentajeAComparar
            eventoMayorHastaAhora = evento
            results.push(eventoMayorHastaAhora);
        }
    }
    return eventoMayorHastaAhora;
}


function lowerAttendance(data) {
    let porcentajeMenorHastaAhora = 100;
    let eventoMenorHastaAhora = null;
    for (evento of data.events) {
        let porcentajeACompararMinimo = eventAttendance(evento);
        if (porcentajeACompararMinimo < porcentajeMenorHastaAhora) {
            porcentajeMenorHastaAhora = porcentajeACompararMinimo
            eventoMenorHastaAhora = evento
        }
    }
    return eventoMenorHastaAhora;
}


function greaterCapacity(data){
    let mayorCapacidadHastaAhora = 0
    let eventoMayorCapacidad = null;
    for (evento of data.events) {
        let capacidad = evento.capacity;
        if (mayorCapacidadHastaAhora < capacidad){
            mayorCapacidadHastaAhora = capacidad
            eventoMayorCapacidad = evento;
        }
    }
    return eventoMayorCapacidad

}

function getCategoryRevenue(data) {
    let cantidadEventos = data.length;
    let ganancia = 0;
    data.forEach(element => {
        const estimate = element.estimate||element.assistance;
        const price = element.price;
        ganancia += (estimate * price / cantidadEventos);
    });
    if (ganancia === 0) {
        return "No events scheduled"
    } else {
        return "$" + ganancia + " average per event";
    }
}

function getCategoryAttendance(data) {
    let cantidadEventos = data.length;
    let asistencia = 0;
    data.forEach(element => {
        asistencia += element.estimate||element.assistance;
    });
    if (asistencia === 0) {
        return "No events scheduled"
    } else {
        return Math.round(asistencia / cantidadEventos) + " average per event";
    }
}


function addFirstTable (data){
    let container = document.getElementById("primeraTabla");
    let tableBodyHTML = "";
    const eventoMayorAsistencia = greaterAttendance(data);
    const eventoMenorAsistencia = lowerAttendance(data);
    const eventoMayorCapacidad = greaterCapacity (data);
    tableBodyHTML = 
        `<tr><td>Events with the highest percentaje of asistencia</td> <td>Events with the lowest percentaje of asistencia</td> <td>Events with the highest capacity</td></tr>
        <tr><td>${eventoMayorAsistencia.name}</td> <td>${eventoMenorAsistencia.name}</td> <td>${eventoMayorCapacidad.name}</td>
        <tr><td>Percentage: ${eventAttendance(eventoMayorAsistencia)}%</td> <td>Percentage: ${eventAttendance(eventoMenorAsistencia)}% </td> <td>Capacity: ${eventoMayorCapacidad.capacity}</td></tr>`
    container.innerHTML = tableBodyHTML;
}

 
function addSecondTable(upcomingEvents) {
    let container = document.getElementById("segundaTabla");
    listaCategoriasUpcoming(upcomingEvents)
    tableBodyHTML = ""
    listUpcomingCategories.forEach(element => {
        let eventosFiltradosFuturo = upcomingEvents.filter(event => event.category === element);
        let gananciaCategoria = getCategoryRevenue(eventosFiltradosFuturo);
        let asistenciaCategoria = getCategoryAttendance(eventosFiltradosFuturo);
        tableBodyHTML +=  `<tr><td>${element}</td> <td>${gananciaCategoria}</td> <td>${asistenciaCategoria}</td></tr>`
    container.innerHTML = tableBodyHTML;
              
    });
}

function addThirdTable(pastEvents) {
    let container = document.getElementById("terceraTabla");
    let gananciaCategoria = ""
    let asistenciaCategoria = ""
    listaCategoriasPast(pastEvents)
    listPastCategories.forEach(element => {
        let eventosFiltradosPasado = pastEvents.filter(event => event.category === element);
        gananciaCategoria = getCategoryRevenue(eventosFiltradosPasado);
        asistenciaCategoria = getCategoryAttendance(eventosFiltradosPasado);
        tableBodyHTML +=  `<tr><td>${element}</td> <td>${gananciaCategoria}</td> <td>${asistenciaCategoria}</td></tr>`
    container.innerHTML = tableBodyHTML;           
    });
}

function pushearPastEvents (data){
    for(let event of data.events){
        let currentDate = new Date(data.currentDate);
        let eventDate = new Date(event.date);
        if (eventDate < currentDate) {
            pastEvents.push(event)
            
        }
    }
}

function listaCategoriasPast(pastEvents){
    
    for (evento of pastEvents) {
        if (!listPastCategories.includes(evento.category)){
            listPastCategories.push(evento.category)
        }
    }

}


function pushearUpcomingEvents (data){
    for(let event of data.events){
        let currentDate = new Date(data.currentDate);
        let eventDate = new Date(event.date);
        if (eventDate > currentDate) {
            upcomingEvents.push(event)
        }
    }
}

function listaCategoriasUpcoming(upcomingEvents){
    for (evento of upcomingEvents) {
        if (!listUpcomingCategories.includes(evento.category)){
            listUpcomingCategories.push(evento.category)
        }
    }
}