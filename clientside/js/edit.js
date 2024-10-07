let profile;
const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");

async function getUser() {
    const res=await fetch(`http://localhost:3000/api/getuser/${id}`);
    const user=await res.json();
    profile=user.profile;
    document.getElementById("edituser").innerHTML=`
     <div class="form-group" >
                <label for="username">Username</label>
                <input type="text" id="username" name="username" value="${user.username}" >
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" value="${user.email}" >
            </div>
            <div class="form-group">
                <label for="place">place</label>
                <input type="text" id="place" name="place" value="${user.place}" >
            </div>
            <div class="form-group">
                <label for="address">Address</label>
                <input type="text" id="address" name="address" value="${user.address}" >
            </div>
            
            <div class="prf" >
                <img src="${user.profile}" class="prfimg" id="proimg" alt="">
            </div>
            
            <div class="form-group">
                <label for="profile">Profile</label>
                <input type="file" id="profile" onchange="pic()" name="profile">
            </div>
            <div class="form-group">
                <label for="pincode">pincode</label>
                <input type="text" id="pincode" name="pincode" value="${user.pincode}">
            </div>
            <div class="form-group">
                <label for="phone">phone</label>
                <input type="text" id="phone" name="phone" value="${user.phone}" >
            </div>
            <button type="submit" class="btn">Submit</button>
    `
}

getUser();

document.getElementById("edituser").addEventListener("submit",async(e)=>{
    e.preventDefault();
    try {
    const username=document.getElementById("username").value;
    const email=document.getElementById("email").value;
    const place=document.getElementById("place").value;
    const address=document.getElementById("address").value;
    const pincode=document.getElementById("pincode").value;
    const phone=document.getElementById("phone").value;
    const res=await fetch(`http://localhost:3000/api/edituser/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username,email,place,address,pincode,phone,profile})
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
async function pic() {
    console.log(document.getElementById("profile").files[0]);
    profile = await convertTBase64(document.getElementById("profile").files[0])
    console.log(profile)
    document.getElementById("proimg").src=profile
}

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