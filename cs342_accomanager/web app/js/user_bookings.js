
/************************************
******       ONLOAD           *******
************************************/


window.onload = function () {
    // Your JavaScript function here
    ajax("GET","php/user/getBookings.php",null,function(response){
        getBookings(JSON.parse(response));
        console.log(JSON.parse(response));
    });
};



// Mock JSON data from the database
let jsonData = [
    { BOOKING_ID: 5,START_DATE: "2023-02-01",END_DATE: "2023-02-01",AMOUNT:1,CANCELLED:0,FINAL_PRICE:3503.00},
    { BOOKING_ID: 3,START_DATE: "2023-01-14",END_DATE: "2023-01-23",AMOUNT:2,CANCELLED:0,FINAL_PRICE:2503.00},
    { BOOKING_ID: 7,START_DATE: "2023-03-04",END_DATE: "2023-03-24",AMOUNT:2,CANCELLED:0,FINAL_PRICE:4235.00},
];



const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0];

console.log(formattedDate);
//Call function to getData stored procedure then getResults
function getBookings(data) {






    // Function to add rows to the table
    function addRowsToTable(data) {
        let tableBody = document.getElementById('bookingTableBody');
        let templateRow = document.getElementById('templateRow');

        for (const booking of data) {
            // Clone the template row
            let newRow = templateRow.cloneNode(true);
            newRow.removeAttribute('id'); // Remove the id attribute to avoid duplication

            // Set data in the cloned row
            newRow.querySelector('.bookingid').textContent = booking.BOOKING_ID;
            newRow.querySelector('.amount').textContent = booking.AMOUNT;
            newRow.querySelector('.startDate').textContent = booking.START_DATE.date.substr(0,10);
            newRow.querySelector('.endDate').textContent = booking.END_DATE.date.substr(0,10);



            if (booking.CANCELLED===0){
                cancel=document.createElement("button")
                cancel.type="button";
                cancel.id="btn_cancel_"+booking.BOOKING_ID;
                cancel.innerHTML="Cancel"
                cancel.addEventListener("click",()=>{
                    ajax("POST","php/user/cancelBooking.php",{id:booking.BOOKING_ID},function(jsonResponse){
                        let response = JSON.parse(jsonResponse);
                        if (response.success)
                            window.location.href="user_bookings.php";
                        else{
                            alert("Cant cancel this booking");
                            console.log(response);
                        }
                    });
                })
                newRow.querySelector('.cancelled').appendChild(cancel);
            }
            else
                newRow.querySelector('.cancelled').textContent = "Yes";

            newRow.querySelector('.pricePaid').textContent = booking.FINAL_PRICE;

            // Set ids for review and comments respectively for each booking
            newRow.querySelector(".inpt_review").id = "rating_" + booking.BOOKING_ID;
            newRow.querySelector(".inpt_comments").id = "comments_" + booking.BOOKING_ID;
            newRow.querySelector(".btn_Review").id = "btnReview_" + booking.BOOKING_ID;




            // Append the new row to the table body
            tableBody.appendChild(newRow);

            if (booking.CANCELLED===1 || formattedDate<booking.END_DATE.date.substr(0,10)){
                document.getElementById("rating_"+booking.BOOKING_ID).disabled=true;
                document.getElementById("comments_"+booking.BOOKING_ID).disabled=true;
                document.getElementById("btnReview_"+booking.BOOKING_ID).disabled=true;
                console.log("Booking "+booking.BOOKING_ID+" Cancelled");
            }



            // Attach an event listener using a function to capture the current booking
            attachEventListener(booking);
        }
    }

    // Function to attach event listener
    function attachEventListener(booking) {
        document.getElementById("btnReview_" + booking.BOOKING_ID).addEventListener('click', () => {
            let data = {
                rating: parseInt(document.getElementById("rating_" + booking.BOOKING_ID).value),
                notes: document.getElementById("comments_" + booking.BOOKING_ID).value,
                id: booking.BOOKING_ID
            };
            console.log(data);
            ajax("POST","php/user/insertReview.php",data,function(jsonResponse){
                let response = JSON.parse(jsonResponse);
                if (response.success)
                    alert("Successfully Reviewd");
                else{
                    alert("Cant Review this booking");
                    console.log(response);
                }
            });
        });
    }

    // Call the function with the JSON data
    addRowsToTable(data);
    templateRow.style.display = "none";
    document.getElementById("results").style.display = "block";
}







function ajax(method, url, data, successCallback) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            successCallback(xhr.responseText);

        }
    };

    if (method === "GET")
        xhr.send();
    else
        xhr.send(JSON.stringify(data));

}