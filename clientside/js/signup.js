let profile;
document.getElementById("signup").addEventListener("submit",async(e)=>{
    e.preventDefault();
    const username=document.getElementById("username").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const cpassword=document.getElementById("cpassword").value;
    const place = document.getElementById("place").value;
    const address = document.getElementById("address").value;
    const pincode = document.getElementById("pincode").value;
    const phone = document.getElementById("phone").value;
    console.log(username,email,password,cpassword,place,address,pincode,phone);
    fetch("http://localhost:3000/api/signup",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username,email,password,cpassword,place,address,pincode,phone,profile})
    }).then((res)=>{
        console.log(res);
        if(res.status==201){
            alert("success")
            console.log(res);  
            window.location.href="../pages/signin.html"
        }
        else if (res.status==404){
            alert("error")
        }
        else{
            alert("error")
        }
        
    }).catch((error)=>{
        console.log(error);
        
    });
})

document.getElementById("profile").addEventListener('change',async(e)=>{
    console.log(document.getElementById("profile").files[0]);
    profile = await convertTBase64(document.getElementById("profile").files[0])
    document.getElementById("proimg").src=profile
    console.log(profile);
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