let containerEvents = document.querySelector(".container-events");
let htmlUpcomingEvent ="";
for (let event of data.events) {
let currentDate = new Date(data.currentDate);
let date = new Date(event.date);
if(date > currentDate){
    containerEvents.innerHTML += `<div class="card" style="width: 18rem;">
    <img src="${event.image}" class="card-img-top" alt="event">
    <div class="card-body" >
    <h5 class="card-title">${event.name}</h5>
    <p class="card-text">${event.description}</p>
    <p>Precio $${event.price}</p>
    <a href="./details.html"><button type="button" class="btn btn-primary">More details...</button></a>
    </div>
    </div>`
}
}