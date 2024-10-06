const value = localStorage.getItem("Auth");
async function getProducts() {

      const res=await fetch("http://localhost:3000/api/getproducts",{headers:{
        "Authorization" : `Bearer ${value}`}})
    if(res.status==200){
        alert("hi")
    }
    else{
        alert("Error");
        window.location.href="../pages/signin.html"
    }
}
getProducts();
function profile() {
    document.getElementById("dropdown").innerHTML=`
    <div class="up">></div>
    <div class="down">
                <div class="image">
                    <img src="" alt="">
                </div>
                <div class="buttons">
                    <h3>Name</h3>
                    <button>View Profile</button>
                    <button>Logout</button>
                </div>
            </div>
    `;
}