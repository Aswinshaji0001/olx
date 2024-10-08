const value = localStorage.getItem("Auth");
async function getProducts() {

      const res=await fetch("http://localhost:3000/api/getproducts",{headers:{
        "Authorization" : `Bearer ${value}`}})
        const result = await res.json();
    if(res.status==200){
            document.getElementById("profileImage").src=`${result.profile}`
            document.getElementById("img2").src=`${result.profile}`
            document.getElementById("link").innerHTML=`<a href="./pages/profile.html?id=${result.id}"><button>View or Edit Profile</button></a>`
            document.getElementById("sell").innerHTML=`<a href="./pages/addprod.html?id=${result.id}"><button>+SELL</button></a>`
            str=``;
            console.log(result.products);
            
            result.products.map((product)=>{
                str+=`
                 <div class="prods">
                    <a href="./pages/product.html?id={product._id}">
                   
                        <img src="${product.images[0]}" alt="">
                  
                    <div class="content">
                        <h3>${product.pname}</h3>
                        <h1>Rs ${product.price}</h1>
                    </div>
                    </a>
                </div>`
           
            })
        
        document.getElementById("products").innerHTML=str;
            
    }
    else{
        alert("Error");
        window.location.href="../pages/signin.html"
    }
}
getProducts();
const profileImage = document.getElementById('profileImage');
const dropdownMenu = document.getElementById('dropdownMenu');

function dropdown(){
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

// Close dropdown if clicked outside
window.addEventListener('click', (event) => {
    if (!profileImage.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});

function logout(){
    localStorage.removeItem("Auth");
    window.location.href="../pages/signin.html"
}


    document.getElementById("filter").addEventListener('keyup',async(e)=>{
    try {
        const res=await fetch("http://localhost:3000/api/getproducts",{headers:{
            "Authorization" : `Bearer ${value}`}})
        const products=await res.json();
        console.log(products);
        str=``;
        products.products.filter((i)=>i.pname.toLowerCase().includes(e.target.value.toLowerCase())).map((product)=>{
            str+=`
                 <div class="prods">
                    <a href="./pages/product.html?id={product._id}">
                   
                        <img src="${product.images[0]}" alt="">
                  
                    <div class="content">
                        <h3>${product.pname}</h3>
                        <h1>Rs ${product.price}</h1>
                    </div>
                    </a>
                </div>`
        });
        document.getElementById("products").innerHTML=str;

        } catch (error) {
            console.log(error);
        }
});