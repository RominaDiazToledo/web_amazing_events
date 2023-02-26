let htmlEvents ="";
for (let event of data.events) {
    htmlEvents = `<div class="cards">
    <div class="card">
    <img src="${event.image}" class="rounded float-start card-img-top" alt="evento"></img>
    <div class="card-body" >
    <h5 class="card-title">${event.name}</h5>
    <p>${event.description}</p>
    <p>Precio $${event.price}</p><button type="button" class="btn     btn-primary">More details...</button>
    </div>
    </div>
    </div>` 
   document.querySelector('.card').innerHTML += htmlEvents;
}
