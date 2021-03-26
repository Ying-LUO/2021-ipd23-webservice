const DOMAIN = "http://localhost:3000";

function getAndDisplayAllHeroes() {
    $.ajax({
        method: "GET",
        url: `${DOMAIN}/superheros`
    }).done((resp) => {
        const heroContainerEl = document.getElementById("hero-container"); 
        heroContainerEl.innerHTML = "";

        resp.forEach(hero => {
            const newDivEl = document.createElement('div');
            newDivEl.textContent = `${hero.id}: ${hero.name} - ${hero.age}`

            heroContainerEl.appendChild(newDivEl);
        });  
    })
}