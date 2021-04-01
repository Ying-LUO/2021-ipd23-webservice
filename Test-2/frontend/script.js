const DOMAIN = "http://localhost:3000";


function getAuthors() {
    $.ajax({
        method: "GET",
        url: `${DOMAIN}/authors`
    }).done((resp)=>{
    const authsContainerEl = document.getElementById('author-list-container');
    
    // Add data from api to FE
    resp.forEach(author => {
        const newAuthorEl = document.createElement("div");
        newAuthorEl.className = "author-container";
        newAuthorEl.id = `author-${author.id}`;
        newAuthorEl.innerHTML =
            `
        <h3> ${author.name} </h1>
        <div> <b>Email:</b> ${author.email} </div>
        <div> <b>Writing Type:</b> ${author.writing_type} </div>

        `
        author.books.forEach(book => {

            newAuthorEl.innerHTML += `
            <div class="book-detail" id="book-${book.id}">
                <div> <b>Title:</b> ${book.title} </div>
                <div> <b>Subtitle:</b> ${book.subtitle} </div>
                <div> <b>Reviews:</b> ${book.reviews}/5 </div>

                <button onClick="getBookDetailByID(${book.id})" class="book-btn"> Book detail </button>
            </div>`

        })


        authsContainerEl.appendChild(newAuthorEl);
    })
})
}

function getBookDetailByID(id) {
    $.ajax({
        method: "GET",
        url: `${DOMAIN}/books`
    }).done((resp)=>{
        const authContainerEl = document.getElementById(`author - ${id} `);

        // Get more book details from api

        // Display book detail on html
        authContainerEl.innerHTML = "";

        resp.forEach(book => {
            const newDivEL = document.createElement('div');
            newDivEL.textContent = `${book.isdn_no}: ${book.title} - ${book.price} - ${book.publish_date}`
            heroContainerEl.appendChild(newDivEL);
        });
    })
}
