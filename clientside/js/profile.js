const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
console.log(id);
async function getUser() {
    const res=await fetch(`http://localhost:3000/api/getuser/${id}`);
    const user=await res.json();
    console.log(user);
    if(user.data.profile)
        document.getElementById("profile").src=user.data.profile;
    document.getElementById("username").textContent=user.data.username;
    document.getElementById("email").textContent=user.data.email;
    document.getElementById("place").textContent=user.data.place;
    document.getElementById("address").textContent=user.data.address;
    document.getElementById("pincode").textContent=user.data.pincode;
    document.getElementById("phone").textContent=user.data.phone;
    document.getElementById("edit").innerHTML=`<button ><a href="../pages/edit.html?id=${user.data._id}">Edit Profile</a></button>`
    document.getElementById("signout").innerHTML=`<button onclick="logout()">Sign Out</button>`
    document.getElementById("book").innerHTML=`<a href="./booking.html?id=${user.data._id}">BOOKINGS (${user.data1})</a>`
    document.getElementById("orders").innerHTML=`<a href="./orders.html?id=${user.data._id}">MY ORDERS</a>`
}
getUser();

async function getSProducts() {

    const res=await fetch(`http://localhost:3000/api/getsproduct/${id}`);
    const products = await res.json();
    
    str=``;
    products.map((product)=>{
        console.log(product.sellerId);
        str+=`
         <div class="prods">
            <a href="../pages/product.html?id=${product._id}">
           
                <img src="${product.images[0]}" alt="">
          
            <div class="content">
                <h3>${product.pname}</h3>
                <h1>Rs ${product.price}</h1>
                <h4>${product.category}</h4>
            </div>
            </a>
        </div>`
   
    })

document.getElementById("products").innerHTML=str;
    
}
getSProducts();

function logout(){
    localStorage.removeItem("Auth");
    window.location.href="../pages/signin.html"
}


document.getElementById("filter").addEventListener('keyup',async(e)=>{
    try {
        const res=await fetch(`http://localhost:3000/api/getsproduct/${id}`);
        const products=await res.json();
        console.log(products);
        str=``;
        products.filter((i)=>i.pname.toLowerCase().includes(e.target.value.toLowerCase())).map((product)=>{
            str+=`
                 <div class="prods">
                    <a href="../pages/product.html?id=${product._id}">
                   
                        <img src="${product.images[0]}" alt="">
                  
                    <div class="content">
                        <h3>${product.pname}</h3>
                        <h1>Rs ${product.price}</h1>
                        <h4>${product.description}</h4>
                    </div>
                    </a>
                </div>`
        });
        document.getElementById("products").innerHTML=str;

        } catch (error) {
            console.log(error);
        }
});


document.getElementById("category").addEventListener('click',async(e)=>{
    try {
        const res=await fetch(`http://localhost:3000/api/getsproduct/${id}`);
        const products=await res.json();
        console.log(products);
        str=``;
        products.filter((i)=>i.category.toLowerCase().includes(e.target.value.toLowerCase())).map((product)=>{
            str+=`
                 <div class="prods">
                    <a href="../pages/product.html?id=${product._id}">
                   
                        <img src="${product.images[0]}" alt="">
                  
                    <div class="content">
                        <h3>${product.pname}</h3>
                        <h1>Rs ${product.price}</h1>
                        <h4>${product.description}</h4>
                    </div>
                    </a>
                </div>`
        });
        document.getElementById("products").innerHTML=str;

        } catch (error) {
            console.log(error);
        }
});

async function deleteAccount() {
    const res=await fetch(`http://localhost:3000/api/deleteac/${id}`,{
        method:"POST",
        headers:{"Content-Type":"application/json"}
    });
    const result=await res.json();
    if(res.status==201){
        localStorage.setItem("id",`${result._id}`);
        window.location.href="../pages/deleteac.html";
    }else{
        alert(result.msg)
    }
}