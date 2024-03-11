
/************************************
******       ONLOAD           *******
************************************/


window.onload = function () {
    // Your JavaScript function here
    getAccTypes();
    getContacts();
    getPolicies();
    getFacilities();
    getCities();
    toggleContactFields();
    toggleCustomFields();
};




/************************************
******     TOGGLE FIELDS      *******
************************************/




document.getElementById("accTypeSelect").addEventListener("change", toggleCustomFields);
function toggleCustomFields() {
    let accTypeSelect = document.getElementById("accTypeSelect");
    let customAccFields = document.getElementById("customAccFields");
    let customAccDescription = document.getElementById("customAccDescription");

    if (accTypeSelect.value === "addAccType") {
        customAccFields.style.display = "block";
        customAccDescription.disabled = false;
    } else {
        customAccFields.style.display = "none";
        customAccDescription.disabled = true;
    }
}






document.getElementById("contactPersonSelect").addEventListener("change", toggleContactFields);
function toggleContactFields() {

    let contactPersonSelect = document.getElementById("contactPersonSelect");
    let customContactFields = document.getElementById("customContactFields");

    if (contactPersonSelect.value === 'addCP')
        customContactFields.style.display = "block";
    else
        customContactFields.style.display = "none";
}








/*************************************************
******  ACC & CONTACT TYPES GET&INSERT     *******
**************************************************/



//Get accommodation types
accTypesSelect = document.getElementById("accTypeSelect");
function getAccTypes() {




    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/manager/getAccTypes.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Handle the response from the server




            // Add options to the <select> element

            // Function to add an option to the <select> element
            console.log(xhr.responseText);

            let response = JSON.parse(xhr.response);


            accTypesSelect.innerHTML = "";
            for (let row of response)
                addOption(row.DESCRIPTION, row.CODE, accTypeSelect);
            addOption("Add Type", "addAccType", accTypeSelect);



        }
    };
    xhr.send();

}


//Get contacts
contactSelect = document.getElementById("contactPersonSelect");
function getContacts() {



    ajax("GET", "php/manager/getContacts.php", null, function (jsonResponse) {
        console.log(jsonResponse);

        let response = JSON.parse(jsonResponse);



        contactPersonSelect.innerHTML = "";
        for (let row of response)
            addOption(row.FNAME + " " + row.LNAME + " " + row.PHONE, row.CONTACT_ID, contactSelect);
        addOption("Add Contact", "addCP", contactSelect);

        let lastOption = contactSelect.options[contactSelect.options.length - 2];
        contactSelect.value = lastOption.value;
    })



}



//Insert acc type
document.getElementById("btn_addAccType").addEventListener("click", insertAccType);
function insertAccType() {

    let accDescription = document.getElementById("customAccDescription").value;




    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/manager/insertAccType.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Handle the response from the server


            let response = JSON.parse(xhr.responseText);
            if (response.success) {
                getAccTypes();

            }


        }
    };


    let data = {
        description: accDescription
    };

    console.log(data.description);

    xhr.send(JSON.stringify(data));



}


//
//
////Insert contact
//document.getElementById("btn_addContact").addEventListener("click", insertContact);
//function insertContact() {
//
//    let contact = {
//        fn: document.getElementById("firstName").value,
//        ln: document.getElementById("lastName").value,
//        phone: document.getElementById("phone").value
//    }
//
//
//
//    //ajax("POST","php/manager/insertContact.php",contact,function(response){
//    //
//    //});
//
//
//    let xhr = new XMLHttpRequest();
//    xhr.open("POST", "php/manager/insertContact.php", true);
//    xhr.setRequestHeader("Content-Type", "application/json");
//    xhr.onreadystatechange = function () {
//        if (xhr.readyState === 4 && xhr.status === 200) {
//            // Handle the response from the server
//
//
//            let response = JSON.parse(xhr.responseText);
//            if (response.success) {
//                getContacts();
//            }
//
//
//        }
//    };
//
//
//    xhr.send(JSON.stringify(contact));
//
//
//
//}



function addOption(text, value, selectElement) {
    // Create a new <option> element

    let option = document.createElement("option");

    // Set the text and value of the option
    option.text = text;
    option.value = value;



    // Append the option to the <select> element
    selectElement.appendChild(option);





}


selectCity = document.getElementById("selectCity");
function getCities() {


    ajax("POST", "php/manager/getCitiesAll.php", null, function (response) {
        console.log(response);
        selectCity.innerHTML = "";
        for (let row of JSON.parse(response)) {
            addOption(row.CITY_NAME, row.CITY_ID, selectCity);
        }
    });
}


function getPolicies() {


    ajax("GET", "php/manager/getPolicies.php", null, function (response) {
        //console.log(JSON.parse(response));



        termsForm = document.getElementById("selectPolicies");
        termsForm.innerHTML = "";

        for (let row of JSON.parse(response))
            addCheckboxWithLabel(row.DESCRIPTION, row.CODE, termsForm);

    });

}



function getFacilities() {


    ajax("GET", "php/manager/getFacilities.php", null, function (response) {
        //console.log(JSON.parse(response));



        termsForm = document.getElementById("selectFacilities");
        termsForm.innerHTML = "";

        for (let row of JSON.parse(response))
            addCheckboxWithLabel(row.DESCRIPTION, row.CODE, termsForm);

    });

}




function addCheckboxWithLabel(labelText, value, parentElement) {
    // Create a new <label> element
    let label = document.createElement("label");

    // Set the label text
    label.textContent = labelText;

    // Create a new <input> element with type "checkbox"
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // Set the value of the checkbox
    checkbox.value = value;

    // Append the checkbox to the label
    label.appendChild(checkbox);

    // Append the label to the specified parent element
    parentElement.appendChild(label);

    // You can optionally add more customization here
}





/*************************************************
******         INSERT ACCOMMODATION        *******
**************************************************/
document.getElementById("btn_insertAcc").addEventListener("click", insertAccomodation);
function insertAccomodation() {



    let divFacilities = document.getElementById("selectFacilities");
    let checkboxes = divFacilities.querySelectorAll('input[type="checkbox"]');

    let facilities = "";
    for (let checkbox of checkboxes) {
        if (checkbox.checked)
            facilities += checkbox.value + ",";

    }
    facilities = facilities.substring(0, facilities.length - 1);



    let divPolicies = document.getElementById("selectPolicies");
    let checkboxesP = divPolicies.querySelectorAll('input[type="checkbox"]');

    let policies = "";
    for (let checkbox of checkboxesP) {
        if (checkbox.checked)
            policies += checkbox.value + ",";

    }
    policies = policies.substring(0, policies.length - 1);







    let accommodation = {
        name: document.getElementById("accommodationName").value,
        lat: document.getElementById("latitude").value,
        lon: document.getElementById("longitude").value,
        address: document.getElementById("address").value,
        city : selectCity.options[selectCity.selectedIndex].value,
        facilities : facilities,
        policies : policies,
        contactID: contactSelect.options[contactSelect.selectedIndex].value,
        accType: accTypesSelect.options[accTypeSelect.selectedIndex].value
    }
    if (accommodation.contactID==="addCP"){
        let contactInfo={
            fn : document.getElementById("firstName").value,
            ln : document.getElementById("lastName").value,
            phone : document.getElementById("phone").value,
        }
        ajax("POST","php/manager/insertContact.php",contactInfo,function(response){
            console.log(JSON.parse(response));
            accommodation.contactID=JSON.parse(response)[0].CONTACT_ID;

            ajax("POST","php/manager/insertAccommodation.php",accommodation,function(jsonResponse){
        
                let response = JSON.parse(jsonResponse);
                if (response.success)
                    createSuccessPage();
                else{
                    alert("Error inserting accommodation");
                    console.log(jsonResponse);
                }
            })

        });
    }
    else{
        ajax("POST","php/manager/insertAccommodation.php",accommodation,function(jsonResponse){
        
            let response = JSON.parse(jsonResponse);
            if (response.success)
                createSuccessPage();
            else{
                alert("Error inserting accommodation");
                console.log(jsonResponse);
            }
        })
    }







}


//Dialogs

document.getElementById("btn_Facilities").addEventListener("click", openDialogFacilities);
function openDialogFacilities() {
    console.log(234234);
    document.getElementById("overlayFacilities").style.display = "flex";
}



document.getElementById("btn_closeFacilities").addEventListener("click", closeDialogFacilities);
function closeDialogFacilities() {
    document.getElementById("overlayFacilities").style.display = "none";
}




document.getElementById("btn_Policies").addEventListener("click", openDialogPolicies);
function openDialogPolicies() {
    document.getElementById("overlayPolicies").style.display = "flex";
}



document.getElementById("btn_closePolicies").addEventListener("click", closeDialogPolicies);
function closeDialogPolicies() {
    document.getElementById("overlayPolicies").style.display = "none";
}









function createSuccessPage() {
    let content = document.getElementById("containerContent");
    content.innerHTML = "";
    let h1 = document.createElement("h1");
    let textNode = document.createTextNode("Accommodation created Successfully");
    h1.appendChild(textNode);
    content.appendChild(h1);


    let buttonIns = document.createElement("button");
    buttonIns.type = "button";
    buttonIns.id = "btn_insertAcc";
    buttonIns.textContent = "Insert another Accomodation";

    let buttonView = document.createElement("button");
    buttonView.type = "button";
    buttonView.id = "btn_viewAcc";
    buttonView.textContent = "View Accommodations";


    content.appendChild(buttonIns);
    content.appendChild(buttonView);

    buttonIns.addEventListener("click", function () {
        window.location.href = "manager_registeracc.php"
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











