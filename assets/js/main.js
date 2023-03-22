// Varibles de uso general

resultados = []
    const contenedorPrincipal = document.querySelector('#contenedorPrincipal')
    const listadoCategorias = []
    let htmlCategorias = ""
    const contenedorCategorias = document.querySelector(".contenedorCategorias")
    let categoriasSeleccionadas = [] 


// Se crea car por iteración de eventos

    for (evento of data.events) {
        resultados.push(crearCardParaEvento(evento))
        if (!listadoCategorias.includes(evento.category)){
            listadoCategorias.push(evento.category)
        }
    }
    for (let cardCreada of resultados){
        contenedorPrincipal.innerHTML += cardCreada;
    }
    for (let categoria of listadoCategorias){
        htmlCategorias += agregoCategorias(categoria)
    }
    contenedorCategorias.innerHTML = htmlCategorias

// Creo de filtro por palabra y categoría
    let casillasCheckbox = document.querySelectorAll('input[type=checkbox]')
    let busqueda = document.querySelectorAll('input[type=search]')
 
    casillasCheckbox.forEach(input => {
        input.addEventListener('change', (e) =>{
            const casilla = e.target;
            if (casilla.checked){
                categoriasSeleccionadas.push(casilla.value);  
            } else {
                categoriasSeleccionadas = categoriasSeleccionadas.filter(categoria => categoria != casilla.value)
            }
            aplicoFiltroCategoria()
        })
    })

    document.addEventListener('submit', (eb)=> {
        let palabraBusqueda = eb.target[0].value.toLowerCase();
        eb.preventDefault()
        aplicoFiltroPalabra(palabraBusqueda)
        console.log(eb)
        })



