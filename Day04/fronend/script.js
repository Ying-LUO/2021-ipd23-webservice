const DOMAIN = "https://dbappying.herokuapp.com";

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
function AddHeroes() {
    var result="";
    result += "name:<input type='text' name='name' value=''></br>";
    result += "age:<input type='text' name='age' value=''></br>";
    result += "image url:<input type='text' name='image_url' value=''></br>";
    result +="<button id='save' onclick='addHero()'>Add</button><button id='cancel'  onclick='cancelAdd()'>Cancel </button>";
    $("#heroForm").html(result);
}
function addHero() {
    var hName=$("input[name=name]").val();
    
    var hAge=parseInt($("input[name=age]").val());
    var hImage=$("input[name=image_url]").val();
   
    
  var heroObj = { name: hName, age: hAge, image_url: hImage };
  
   // var jsonString = JSON.stringify(heroObj);
    //alert(jsonString);
    $.ajax({
        method: "post",
        url: `${DOMAIN}/superheros`,
        dataType: "json",
        data: heroObj, // body of the request
    }).done((resp) => {
alert("done");
    });
}
function EditHeroes(){
    var result="";
    result += "</br>id:<input type='text' name='id' value=''></br>"; 
 
    result +="<button id='save' onclick='findHero()'>search</button>"
     $("#heroForm").html(result);
}
// finding hero to edit
function findHero(){
    var id=parseInt($("input[name=id]").val());
       $.ajax({
        method: "Get",
        url: `${DOMAIN}/superheros/${id}`,
         }).done((resp) => {

       var result="";
       resp.forEach(hero => {

       result += "</br></br><input type='text' name='id' value="+ hero.id + "></br></br>";
       result += "<input type='text' name='name' value='"+ hero.name + "'></br></br>";
       result += "<input type='text' name='age' value="+ hero.age + "></br></br>";
       result += "<input type='text' name='image_url' value="+ hero.image_url + "></br>";
       result +="</br><button id='save' onclick='edithero("+ hero.id + ")'>Save </button><button id='cancel'  onclick='cancelEdit()'>Cancel </button>";

      });
//$("#heroForm").show();
$("#heroForm").html(result);
});
    
}
function edithero(id){
    alert(id);
    var hName=$("input[name=name]").val();
    var hAge=parseInt($("input[name=age]").val());
    var hImage=$("input[name=image_url]").val();
    var heroObj = { name: hName, age: hAge, image_url: hImage };
    alert(heroObj);
    $.ajax({
        method: "put",
        url: `${DOMAIN}/superheros/${id}`,
        dataType: "json",
        data: heroObj,
    }).done((resp) => {
         alert("done");
    });
}