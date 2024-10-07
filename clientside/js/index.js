const value = localStorage.getItem("Auth");
async function getProducts() {

      const res=await fetch("http://localhost:3000/api/getproducts",{headers:{
        "Authorization" : `Bearer ${value}`}})
        const result = await res.json();
    if(res.status==200){
            document.getElementById("profileImage").src=`${result.profile}`
            document.getElementById("img2").src=`${result.profile}`
            document.getElementById("link").innerHTML=`<a href="./pages/profile.html?id=${result.id}"><button>View or Edit Profile</button></a>`
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