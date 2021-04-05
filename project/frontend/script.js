const DOMAIN = "http://localhost:3000";
var currentUser = [];

function listOrder(){
    $.ajax({
        method: "GET",
        url: `${DOMAIN}/orders`
    }).done((resp)=>{
        const orderContainerEl = document.getElementById("order-container");
        orderContainerEl.innerHTML = "";

        resp.forEach(order => {
            const newListEL = document.createElement('li');
            newListEL.innerHTML = `Order:&nbsp;#${order.order_number}&nbsp;</br>
            <button class="col-sm-2 btn btn-primary" onclick="orderDetail(${order.id})">Detail</button>&nbsp;&nbsp;
            <button class="col-sm-2 btn btn-primary" onclick="deleteOrder(${order.id})">Delete Order</button><hr>`;
            const detailDivEL = document.createElement('div');
            detailDivEL.id = `order_${order.id}`;
            getUserName(detailDivEL, order.userId);
            getProductName(detailDivEL, order.productId);
            detailDivEL.innerHTML += `&nbsp;Quantity:&nbsp;${order.quantity}<br>&nbsp;Amount:&nbsp;${order.amount}<br>&nbsp;Ordered at:&nbsp;${order.ordered_at}`;
            detailDivEL.style.display = "none";
            newListEL.appendChild(detailDivEL);
            orderContainerEl.appendChild(newListEL);
        });
        document.getElementById("listOrder").style.display = "none";
    })
}

function getUserName(detailDivEL, id){
    $.ajax({
        method: "GET",
        url: `${DOMAIN}/users/${id}`
    }).done((resp)=>{
        detailDivEL.innerHTML += `<br>&nbsp;User Name:&nbsp;${resp[0].first_name} ${resp[0].last_name}<br>`;
    })
}

function getProductName(detailDivEL, id){
    $.ajax({
        method: "GET",
        url: `${DOMAIN}/products/${id}`
    }).done((resp)=>{
        detailDivEL.innerHTML += `&nbsp;Product Name:&nbsp;${resp[0].product_name}<hr>`; 
    })
}

function listProduct(){
    $.ajax({
        method: "GET",
        url: `${DOMAIN}/products`
    }).done((resp)=>{
        const prodContainerEl = document.getElementById("product-container");
        prodContainerEl.innerHTML = "";

        resp.forEach(product => {
            const newListEL = document.createElement('li');
            newListEL.innerHTML = `Product:&nbsp;#${product.sku_id}&nbsp;-&nbsp;${product.product_name}</br>
            <button class="col-sm-2 btn btn-primary" onclick="productDetail(${product.id})">Detail</button>&nbsp;&nbsp;
            <button class="col-sm-2 btn btn-primary" onclick="addToOrder(${currentUser.id}, ${product.id})">Add to Order</button><hr>`;
            const detailDivEL = document.createElement('div');
            detailDivEL.id = `pro_${product.id}`;
            detailDivEL.innerHTML = `&nbsp;Category:&nbsp;${product.category}</br>&nbsp;Expiry Date:&nbsp;${product.expiry_date}</br>&nbsp;Days before expired:&nbsp;${product.days_to_expire_from_today}<hr>`;
            detailDivEL.style.display = "none";
            newListEL.appendChild(detailDivEL);
            prodContainerEl.appendChild(newListEL);
        });
        document.getElementById("listProduct").style.display = "none";
    })
}

function productDetail(id){
    $.ajax({
        method: "GET",
        url: `${DOMAIN}/products`
    }).done((resp)=>{
        var x = document.getElementById(`pro_${id}`);
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    })
}

function deleteOrder(id){
    var r = confirm(`Confirm to delete order: ${id}?`);

    if (r == true) {
        $.ajax({
            method: "DELETE",
            url: `${DOMAIN}/orders/${id}`
        }).done((resp)=>{
            window.alert(`Order: ${resp.order_number} has benn deleted!`);
        })
    } 
}

function orderDetail(id){
    $.ajax({
        method: "GET",
        url: `${DOMAIN}/orders`
    }).done((resp)=>{
        var x = document.getElementById(`order_${id}`);
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    })
}

function addUser(){
    var email=$("input[name=email]").val();
    var fname=$("input[name=first_name]").val();
    var lname=$("input[name=last_name]").val();
    var pwd=$("input[name=pwd]").val();
    var pwdAgain=$("input[name=pwdAgain]").val();

    if(pwd != pwdAgain){
        window.alert("Please type in the same password");
    }else{
        var userObj = { first_name: fname, last_name: lname, email: email, password: pwd };
        $.ajax({
            method: "POST",
            url: `${DOMAIN}/users`,
            dataType: "json",
            data: userObj
        }).done((resp)=>{
            window.alert("New user registered, redirect to products");
            document.getElementById('registerForm').style.display = "none";
            var result="";
            result += "</br></br><label class='col-sm-2 col-form-label'>First Name</label><input type='text' name='first_name' value="+ userObj.first_name + "></br></br>";
            result += "<label class='col-sm-2 col-form-label'>Last Name</label><input type='text' name='last_name' value='"+ userObj.last_name + "'></br></br>";
            result += "<label class='col-sm-2 col-form-label'>Email Address</label><input type='text' name='email' value="+ userObj.email + "></br></br>";
            result +="</br><a class='mx-sm-3 mb-2 btn btn-primary' role='button' href='http://localhost:8080/products.html'>Go to Product</a>";
            $("#userForm").html(result);
        })
    }
}

function getUser(){
    var email=$("input[name=email]").val();
    console.log(email);
    
    if (email == null || email == "") {
        window.alert("Please enter your email to login");
        document.getElementById('loginEmail').value = '';
    }else{
        $.ajax({
            method: "GET",
            url: `${DOMAIN}/users/email/${email}`
        }).done((resp)=>{
            if(resp.length == 1){
                currentUser = resp[0];
                document.getElementById('currentUser').innerHTML = 
                `Hi, ${currentUser.first_name + " " + currentUser.last_name}, welcome to grocery store!
                </br><a class='mx-sm-3 mb-2 btn btn-primary' role='button' href='http://localhost:8080/products.html'>Go to Product</a>`;
                document.getElementById('loginForm').style.display = "none";

                $.ajax({
                    method: "POST",
                    url: `${DOMAIN}/login`,
                    dataType: "json",
                    data: currentUser
                }).done((resp)=>{
                    alert("User login successfully");
                });
                
            }else{
                window.alert("This emial is not registered, please register new user");
                window.location.href = 'http://localhost:8080/users.html';
            }
        });
    }
}

function addToOrder(currentUser, id){
    console.log(currentUser);
    console.log(id);
    var orderObj = { userId: 3, productId: id, quantity: 1 };
    $.ajax({
        method: "POST",
        url: `${DOMAIN}/orders`,
        dataType: "json",
        data: orderObj
    }).done((resp)=>{
        alert("Add 1pcs to Order");
    })
}