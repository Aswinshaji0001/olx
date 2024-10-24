const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
console.log(id);
async function getProductDetails() {
    const res=await fetch(`http://localhost:3000/api/getproductdetails/${id}`);
    const product=await res.json();
    const res2=await fetch(`http://localhost:3000/api/getuser/${product.sellerId}`);
    const user=await res2.json();
    console.log(product);
        document.getElementById("pname").innerText=product.pname;
        document.getElementById("category").innerText=product.category;
        document.getElementById("img").src=product.images[0];
        document.getElementById("description").innerText=product.description;
        document.getElementById("price").innerText=`₹${product.price}/-`;
        document.getElementById("edit").innerHTML= `<a href="../pages/proedit.html?id=${product._id}">Edit</a>`
        document.getElementById("delete").innerHTML=`<button class="delete-btn" onclick="deleteProduct('${product._id}')">Delete</button>`
    product.images.map((img)=>{
        const data=document.createElement("img");
        data.src=img;
        data.setAttribute("onmouseover",`change("${img}")`);
        document.getElementById("smallimg").appendChild(data);
    })
    document.getElementById("username").innerText=user.data.username;
    document.getElementById("phone").innerText=user.data.phone;
    document.getElementById("email").innerText=user.data.email;
    document.getElementById("address").innerText=user.data.address;
    document.getElementById("place").innerText=user.data.place;
    document.getElementById("pincode").innerText=user.data.pincode;
}
getProductDetails();

function change(e){
    document.getElementById("img").src=e;
}

async function deleteProduct(id) {
    console.log(id);
    fetch(`http://localhost:3000/api/deleteproducts/${id}`,{
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
      }).then(async(res)=>{
            const result=await res.json();
            if(res.status==201){
                alert("deleted");
                window.location.href="../index.html";
            }else{
                alert("error");
            }
        }). catch ((error)=>{
            console.log(error);
            
        })
}

