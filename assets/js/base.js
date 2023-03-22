// Creando cards
function createCardEvent (eventoCard){
    const newCard= `<div class="card">
    <img src="${eventoCard.image}" class="card-img-top" alt="${eventoCard.name}">
    <div class="card-body">
    <h5 class="card-title">${eventoCard.name}</h5>
    <p class="card-text">${eventoCard.description}</p>
    <div class="fila-inferior-card">
        <p>Price:<br> ${eventoCard.price}</p>
        <a href="./details.html?id=${eventoCard._id}" class="btn btn-primary botonCard">Learn more</a>
    </div>
    </div>
    </div>`
    return newCard
}

// Lista categorias de checkbox
function addCategories(categoria) {
    const newCategory = `<div class="col-6 col-md-4 col-xl-2 form-check">
        <input class="form-check-input" type="checkbox" value="${categoria}" id="input-${categoria}">
        <label class="form-check-label" for="input${categoria}">
            ${categoria}
        </label>
    </div>`
    return newCategory
}

// Eventos filtrados por categoria

function applyCategoryFilter() {

    contenedorPrincipal.innerHTML = ""
    if (categoriasSeleccionadas.length == 0) {
        for (card of resultados)
            contenedorPrincipal.innerHTML += card
    }
    else {
        eventosFiltrados = data.events.filter (ev => categoriasSeleccionadas.includes (ev.category))
            for (let ef of eventosFiltrados){
                contenedorPrincipal.innerHTML += createCardEvent (ef)
            }
    }
}

// Eventos filtrados por palabras

function applyWordFilter(palabraBusqueda){
    contenedorPrincipal.innerHTML = ""
    let filtroBusqueda = data.events.filter (eventobusqueda => {    
        if(eventobusqueda.name.toLowerCase().includes (palabraBusqueda)|| eventobusqueda.description.toLowerCase().includes(palabraBusqueda)){
            return true;
        }
    }) 
    for(let eB of filtroBusqueda){
        contenedorPrincipal.innerHTML += createCardEvent (eB)
    }
}