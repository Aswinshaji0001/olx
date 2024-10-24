const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
console.log(id);
async function getBooking() {
    const res=await fetch(`http://localhost:3000/api/getbook/${id}`);
    const bookings=await res.json();
    str=``;
    bookings.map((booking)=>{
            str+=`
            <tr>
                    <td><img src="${booking.product.images[0]}" alt="${booking.product.pname}" class="product-image"></td>
                    <td>${booking.product.pname}</td>
                    <td>${booking.buyer.username}</td>
                    <td>${booking.buyer.phone}</td>
                    <td>${booking.product.category}</td>
                    <td>
                        <button class="button" onclick="acceptBooking('${booking._id}')">Accept</button>
                        <button class="buttons" onclick="deleteBooking('${booking._id}')">Decline</button>
                    </td>
                </tr>
            `
    })
    
    document.getElementById("tbody").innerHTML=str;
}
getBooking();

async function deleteBooking(_id) {
    console.log(_id);
    
    fetch(`http://localhost:3000/api/deletebook`,{
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({_id})
      }).then(async(res)=>{
            const result=await res.json();
            if(res.status==201){
                alert(result.msg);
            }else{
                alert("error");
            }
        }). catch ((error)=>{
            console.log(error);
            
        })
}Delete