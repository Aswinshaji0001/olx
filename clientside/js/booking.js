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
                        <button class="button" onclick="deleteBooking('${booking._id}')">Delete</button>
                    </td>
                </tr>
            `
    })
    
    document.getElementById("tbody").innerHTML=str;
}
getBooking();