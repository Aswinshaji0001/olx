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
getProducts()