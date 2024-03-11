
/************************************
******       ONLOAD           *******
************************************/


window.onload = function () {
    // Your JavaScript function here
    getResults();
};



let urlParams = new URLSearchParams(window.location.search);

params={
    startDate : urlParams.get('startDate'),
    endDate : urlParams.get('endDate'),
    accid : urlParams.get('accid'),
    persons : urlParams.get('persons')
};  
if (params.persons==="")
    params.persons=null;

console.log(params);


function addTerms(data,element){
    for (term of data){
        let p=document.createElement("p");
        p.innerHTML=term.DESCRIPTION;
        element.appendChild(p);

    }
}


function addAmenities(data,element){
    for (amenity of data){
        let p=document.createElement("p");
        p.innerHTML=amenity.DESCRIPTION;
        element.appendChild(p);
    }
}

function getResults() {


    // Function to add rows to the table
    function addRowsToTable(data) {
        let tableBody = document.getElementById('productTableBody');
        let templateRow = document.getElementById('templateRow');
        

        let i=0;

        for (product of data) {
            // Clone the template row
            let newRow = templateRow.cloneNode(true);
            newRow.removeAttribute('id'); // Remove the id attribute to avoid duplication
            // Set data in the cloned row
            newRow.querySelector('.productName').textContent = product.ACCOM_NAME;
            newRow.querySelector('.roomtype').textContent = product.ROOM_TYPE+": "+product.NOTES;
            newRow.querySelector('.location').textContent = product.CITY + ", " + product.COUNTRY;
            newRow.querySelector('.price').textContent = product.FINAL_PRICE;
            newRow.querySelector('.availability').textContent = product.AVAILABILITY;
            newRow.querySelector('.quantity').id="inpt_quantity_"+i;
            newRow.querySelector('.btnBook').id="btn_book_"+i;

            getData = {
                startDate : params.startDate,
                endDate : params.endDate,
                roomType : product.ROOM_TYPE,
                accID : product.ACC_ID,
                terms : product.TERMS
            };

            //newRow.querySelector("terms").innerHTML="test";

            
            //Get terms
            let terms;
            ajax("POST","php/user/getAccTerms.php",getData,function(response){
                addTerms(JSON.parse(response),newRow.querySelector(".terms"));
            });

            //Get amenities
            let amenities;
            ajax("POST","php/user/getAccAmenities.php",getData,function(response){
                addAmenities(JSON.parse(response),newRow.querySelector(".amenities"));
            });
            
            
           



            // Append the new row to the table body
            tableBody.appendChild(newRow);
            attachEventListener(product,i);
            i++;

        }

        function attachEventListener(product,counter){
            document.getElementById("btn_book_"+counter).addEventListener("click",()=>{
                let data={
                    startDate : params.startDate,
                    endDate : params.endDate,
                    roomType : product.ROOM_TYPE,
                    accID : product.ACC_ID,
                    terms : product.TERMS,
                    city : product.CITY,
                    amount : document.getElementById("inpt_quantity_"+counter).value
                }

                console.log(data);

                ajax("POST","php/user/createBooking.php",data,function(response){
                    console.log(response);

                })

            });
        }

    }



    ajax("POST","php/user/getPackagesAcc.php",params,function(response){
        
        
        console.log(response);
        addRowsToTable(JSON.parse(response));
        templateRow.style.display = "none";
        document.getElementById("results").style.display="block";
    });



}


function createSuccessPage(){
    let content=document.getElementById("results");
    content.innerHTML="";
    let h1 = document.createElement("h1");
    let textNode = document.createTextNode("Booked Successfully");
    h1.appendChild(textNode);


    let buttonIns=document.createElement("button");
    buttonIns.type="button";
    buttonIns.id="btn_ViewBookings";
    buttonIns.textContent="View Bookings";

    let buttonView=document.createElement("button");
    buttonView.type="button";
    buttonView.id="btn_Portal";
    buttonView.textContent="Back to Portal";

    section = document.createElement("section");
    section.appendChild(h1);
    section.appendChild(buttonIns);
    section.appendChild(buttonView);
    content.appendChild(section);


    buttonIns.addEventListener("click",function(){
        window.location.href="user_bookings.php"
    });

    buttonView.addEventListener("click",function(){
        window.location.href="user_portal.php"
    });

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