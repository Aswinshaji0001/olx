const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
let sellerId;
let images=[];
async function getProductDetails() {
    const res=await fetch(`http://localhost:3000/api/getproductdetails/${id}`);
    const product=await res.json();
    console.log(product);
    document.getElementById("pname").value=product.pname;
    document.getElementById("price").value=product.price;
    document.getElementById("category").value=product.category;
    document.getElementById("description").innerHTML=product.description;
    sellerId=product.sellerId;
    images=product.images;
    product.images.map((img)=>{
        const data=document.createElement("img");
        data.src=img;
        document.getElementById("proimg").appendChild(data);
    })
}
getProductDetails();

document.getElementById("content").addEventListener("submit",async(e)=>{
    e.preventDefault();
    try {
    const pname=document.getElementById("pname").value;
    const price=document.getElementById("price").value;
    const category=document.getElementById("category").value;
    const description=document.getElementById("description").value;
    const res=await fetch(`http://localhost:3000/api/editproduct/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({pname,price,category,description,sellerId,images})
    })
    if(res.status==201){
        alert("Updated")
        window.location.href="../index.html"
    }else{
        alert("error")
    }
    } catch (error) {
        console.log(error);
        
    }
})

document.getElementById("images").addEventListener('change',async(e)=>{
    const arr=Object.values(document.getElementById("images").files)
    document.getElementById("proimg").textContent="";
    images=[];
    console.log(images);
    arr.map(async(i)=>{
        images.push(await convertTBase64(i));
        console.log(images.length);
        const data=document.createElement("img");
        data.src = await convertTBase64(i);
        document.getElementById("proimg").appendChild(data);
    })
})

function convertTBase64(file){
    return new Promise((resolve,reject)=>{
        const fileReader=new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload=()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror=(error)=>{
            reject(error)
        }
    });
}