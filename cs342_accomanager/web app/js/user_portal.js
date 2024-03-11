
/************************************
******       ONLOAD           *******
************************************/


window.onload = function () {
    // Your JavaScript function here
    getRoomTitles();
};




roomTitleSelect = document.getElementById("roomType");
function getRoomTitles() {



    ajax("GET", "php/getRoomTitles.php", "", function (response) {
        console.log(response);

        let jsonResponse = JSON.parse(response);


        roomTitleSelect.innerHTML = "";
        for (let row of jsonResponse)
            addOption(row.TITLE, "", roomTitleSelect);
        addOption("Any", null, roomTitleSelect);
    });

}


function getCities() {

}


document.getElementById("btn_search").addEventListener("click", getResults);
function getResults() {


    // Function to add rows to the table
    function addRowsToTable(data) {
        let tableBody = document.getElementById('productTableBody');
        let templateRow = document.getElementById('templateRow');

        for (product of data) {
            // Clone the template row
            let newRow = templateRow.cloneNode(true);
            newRow.removeAttribute('id'); // Remove the id attribute to avoid duplication
            // Set data in the cloned row


            newRow.querySelector('.productName').textContent = product.DESCRIPTION + ": " + product.NAME;
            newRow.querySelector('.location').textContent = product.CITY + ", " + product.COUNTRY;
            newRow.querySelector('.price').textContent = product.MIN_PRICE;
            newRow.querySelector('.startdate').textContent = product.START_DATE.date.substr(0, 10);
            newRow.querySelector('.enddate').textContent = product.END_DATE.date.substr(0, 10);
            newRow.querySelector('.btn_ViewAcc').id = "btn_View_" + product.ACC_ID;



            tableBody.appendChild(newRow);
            attachEventListener(product);
        }

        function attachEventListener(product) {
            // Attach an event listener to the button (replace with your functionality)
            document.getElementById('btn_View_'+product.ACC_ID).addEventListener('click', () => {

                let startdate = product.START_DATE.date.substr(0,10);
                let enddate = product.END_DATE.date.substr(0,10);
                let accid = product.ACC_ID;
                let persons = document.getElementById("persons").value;

                console.log("user_viewaccpack.php?accid=" + accid + "&startDate=" + startdate + "&endDate=" + enddate+"&persons="+persons);

                window.location.href = "user_viewaccpack.php?accid=" + accid + "&startDate=" + startdate + "&endDate=" + enddate+"&persons="+persons;





            });
        }
    }


    /*
    ajax call to sciprt
    success function =
        addRowsToTable(jsonData);
        templateRow.style.display = "none";
        document.getElementById("results").style.display="block"; 

    else if empty result display empty message on results
    */


    // Call the function with the JSON data (MOCK DATA)
    let jsonData = [
        { name: 'Product 1', location: 'Location 1', price: '$19.99', accid: 5 },
        { name: 'Product 2', location: 'Location 2', price: '$29.99', accid: 6 },
        { name: 'Product 3', location: 'Location 3', price: '$39.99', accid: 7 },
    ];


    let data = {
        startdate: document.getElementById("startDate").value,
        enddate: document.getElementById("endDate").value,
    };

    if (document.getElementById("roomType").options[document.getElementById("roomType").selectedIndex].value === "null")
        data.roomtype = null;
    else
        data.roomtype = document.getElementById("roomType").options[document.getElementById("roomType").selectedIndex].textContent;

    if (document.getElementById("city").value === "")
        data.city = null
    else
        data.city = document.getElementById("city").value;

    if (document.getElementById("persons").value === "")
        data.persons = null;
    else
        data.persons = document.getElementById("persons").value;



    console.log(data);


    ajax("POST", "php/user/getMinPackages.php", data, function (response) {
        console.log(response);
        addRowsToTable(JSON.parse(response));
        templateRow.style.display = "none";
        document.getElementById("results").style.display = "block";

    });






}





function addOption(text, value, selectElement) {
    // Create a new <option> element

    let option = document.createElement("option");

    // Set the text and value of the option
    option.text = text;
    option.value = value;



    // Append the option to the <select> element
    selectElement.appendChild(option);



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