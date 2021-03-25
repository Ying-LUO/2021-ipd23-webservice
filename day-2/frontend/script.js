const DOMAIN = "localhost:3000";

function getAndDisplayAllHeroes(){
    $.ajax({
        method: "GET",
        url: `${DOMAIN}/superheros`
    }).done((resp)=>{
        const heroContainerEl = document.getElementById("hero-container");
        heroContainerEl.innerHTML = "";

        resp.forEach(hero => {
            const newDivEL = document.createElement('div');
            newDivEL.textContent = `${hero.id}: ${hero.name} - ${hero.age}`
            
            heroContainerEl.appendChild(newDivEL);
        });
    })
}