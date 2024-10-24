const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const value = localStorage.getItem("Auth");
const id=urlParams.get("id");
let product;
console.log(id);
async function getProductDetails() {
    const res=await fetch(`http://localhost:3000/api/getproductdetails/${id}`);
     product=await res.json();
    const res2=await fetch(`http://localhost:3000/api/getuser/${product.sellerId}`);
    const user=await res2.json();
    console.log(product);
        document.getElementById("pname").innerText=product.pname;
        document.getElementById("category").innerText=product.category;
        document.getElementById("img").src=product.images[0];
        document.getElementById("description").innerText=product.description;
        document.getElementById("price").innerText=`₹${product.price}/-`;
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

async function book(){
    const currentDate = new Date();
    const date=String(currentDate.getDate()).padStart(2, '0')+"-"+String(currentDate.getMonth() + 1).padStart(2, '0')+"-"+currentDate.getFullYear();
    console.log(product);
        fetch("http://localhost:3000/api/setbook",{
            method:"POST",
            headers:{"Content-Type":"application/json","Authorization" : `Bearer ${value}`},
            body:JSON.stringify({product,date})  
            }).then(async (res)=>{
            const result= await res.json();
            if(res.status==201){
                alert(result.msg)
            }
            else if (res.status==403){
                alert(result.msg)
            }
            else{
                alert(result.msg)
            }
            
        }).catch((error)=>{
            console.log(error);
            
        });
}