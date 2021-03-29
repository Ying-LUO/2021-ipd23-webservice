const DOMAIN = "localhost:3000";

function listProduct(){
    $.ajax({
        method: "GET",
        url: `${DOMAIN}/products`
    }).done((resp)=>{
        const heroContainerEl = document.getElementById("product-container");
        heroContainerEl.innerHTML = "";

        resp.forEach(product => {
            const newDivEL = document.createElement('div');
            newDivEL.textContent = `${product.sku_id}: ${product.product_name} - ${product.price} - ${product.expiry_date}`
            heroContainerEl.appendChild(newDivEL);
        });
    })
}