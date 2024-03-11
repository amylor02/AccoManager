
/************************************
******       ONLOAD           *******
************************************/


window.onload = function() {
    // Your JavaScript function here
    getAccs();
    getRoomTypes();
    getRoomTitles();
    getPriceCategory();
    getTerms();
    getCancellation();
    getPrepayment();
    getAmenities();
};



/************************************
******     TOGGLE FIELDS      *******
************************************/


document.getElementById("roomTypeSelect").addEventListener("change", toggleCustomFields);
function toggleCustomFields() {
    let roomTypeSelect = document.getElementById("roomTypeSelect");
    let customRoomTypeFields = document.getElementById("customRoomTypeFields");
    let customRoomName = document.getElementById("customRoomName");
    let customRoomTypeNotes = document.getElementById("customRoomTypeNotes");

    if (roomTypeSelect.value === "addRoomType") {
        customRoomTypeFields.style.display = "block";
        customRoomName.disabled = false;
        customRoomTypeNotes.disabled = false;
    } else {
        customRoomTypeFields.style.display = "none";
        customRoomName.disabled = true;
        customRoomTypeNotes.disabled = true;
    }


}



document.getElementById("priceCategorySelect").addEventListener("change",togglePriceCategoryFields)
function togglePriceCategoryFields(){
    
    let priceCategorySelect=document.getElementById("priceCategorySelect");
    let customPriceCategoryFields=document.getElementById("customPriceCategoryFields");
    let customPriceCategory=document.getElementById("customPriceCategory");

    
    if (priceCategorySelect.value === "addPC"){
        customPriceCategoryFields.style.display = "block";
        customPriceCategory.disabled=false;
        
    }
    else{
        customPriceCategoryFields.style.display="none";
        customPriceCategory.disabled=true;
    }
}







/*************************************************
******  ACC & CONTACT TYPES GET&INSERT     *******
**************************************************/



//Get accommodation types
accSelect=document.getElementById("accSelect");
function getAccs(){




    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/manager/getAccs.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Handle the response from the server


            

            // Add options to the <select> element

            // Function to add an option to the <select> element
            console.log(xhr.responseText);

            let response=JSON.parse(xhr.response);


            accSelect.innerHTML="";
            for (let row of response)
                addOption(row.NAME+":  "+row.ADDRESS,row.ACC_ID,accSelect);


        }
    };
    xhr.send();
  
}


roomTypeSelect=document.getElementById("roomTypeSelect");
accSelect.addEventListener("change",getRoomTypes);
function getRoomTypes(){




    let data={
        accID : accSelect.options[accSelect.selectedIndex].value
    }
    ajax("POST","php/manager/getRoomTypes.php",data,function(response){
            // Handle the response from the server

            console.log(response);

            let jsonResponse=JSON.parse(response);

            roomTypeSelect.innerHTML="";
            for (let row of jsonResponse)
                addOption(row.TITLE+":  "+row.NOTES,row.CODE,roomTypeSelect);
            addOption("Add Room Type","addRoomType",roomTypeSelect);
            toggleCustomFields();
    
    });
  
}



roomTitleSelect=document.getElementById("customRoomName");
function getRoomTitles(){




    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/getRoomTitles.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Handle the response from the server


            

            // Add options to the <select> element

            // Function to add an option to the <select> element
            console.log(xhr.responseText);

            let response=JSON.parse(xhr.response);


            roomTitleSelect.innerHTML="";
            for (let row of response)
                addOption(row.TITLE,"",roomTitleSelect);


        }
    };
    xhr.send();
  
}



pcSelect=document.getElementById("priceCategorySelect");
function getPriceCategory(){




    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/manager/getPriceCategories.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Handle the response from the server


            

            // Add options to the <select> element

            // Function to add an option to the <select> element
            console.log(xhr.responseText);

            let response=JSON.parse(xhr.response);


            pcSelect.innerHTML="";
            for (let row of response)
                addOption(row.DESCRIPTION,row.CODE,pcSelect);
            addOption("Add Price Category","addPC",pcSelect);
            togglePriceCategoryFields();


        }
    };
    xhr.send();
  
}



function getAmenities(){
    ajax("GET", "php/manager/getAmenities.php", null, function (response) {
        //console.log(JSON.parse(response));

        termsForm = document.getElementById("selectAmenities");
        termsForm.innerHTML = "";

        for (let row of JSON.parse(response))
            addCheckboxWithLabel(row.DESCRIPTION, row.CODE, termsForm);

    });
}


function getTerms(){

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/manager/getTerms.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Handle the response from the server


            

            // Add options to the <select> element

            // Function to add an option to the <select> element
            console.log(xhr.responseText);

            let response=JSON.parse(xhr.response);

            
            termsForm=document.getElementById("selectTerms");
            termsForm.innerHTML="";

            for (let row of response)
                addCheckboxWithLabel(row.DESCRIPTION,row.CODE,termsForm);
            let button=document.createElement("button");
            button.id="btn_closeTerms";
            button.type="button";
            button.innerHTML="Close";
            button.addEventListener("click",closeDialog);
            termsForm.appendChild(button);




        }
    };
    xhr.send(); 
}


let cancelSelect = document.getElementById("cancelSelect");
let overwriteSelect = document.getElementById("overwriteSelect");
overwriteSelect.addEventListener("change",()=>{
    if (overwriteSelect.options[overwriteSelect.selectedIndex].value === "null"){
        document.getElementById("ow_startdate").disabled=true;
        document.getElementById("ow_enddate").disabled=true;
    }
    else{
        document.getElementById("ow_startdate").disabled=false;
        document.getElementById("ow_enddate").disabled=false;
    }
});


function getCancellation(){
    ajax("POST", "php/manager/getCancellationPolicies.php", null, function (response) {
        console.log(response);
        cancelSelect.innerHTML = "";
        overwriteSelect.innerHTML="";
        addOption("None","null",overwriteSelect);
        for (let row of JSON.parse(response)) {
            addOption("Prior "+row.MAX_DAYS_PRIOR+" Days. "+row.PENALTY+"% Penalty", row.ID, cancelSelect);
            addOption("Prior "+row.MAX_DAYS_PRIOR+" Days. "+row.PENALTY+"% Penalty", row.ID, overwriteSelect);
        }
    });

}

let prepaymentSelect = document.getElementById("prepaymentSelect");
function getPrepayment(){
    ajax("POST", "php/manager/getPrepaymentPolicies.php", null, function (response) {
        console.log(response);
        prepaymentSelect.innerHTML = "";
        for (let row of JSON.parse(response)) {
            addOption("Prior "+row.DAYS_PRIOR+" Days. "+row.AMOUNT+"% Amount", row.ID, prepaymentSelect);
        }
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


function addOption(text, value,selectElement) {
    // Create a new <option> element

    let option = document.createElement("option");

    // Set the text and value of the option
    option.text = text;
    option.value = value;



    // Append the option to the <select> element
    selectElement.appendChild(option);

    
    


}


//Insert Room Type
document.getElementById("btn_addRoomType").addEventListener("click",insertRoomType);
function insertRoomType(){


    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/manager/insertRoomType.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Handle the response from the server


            let response=JSON.parse(xhr.responseText);
            if(response.success){
                getRoomTypes();
            }


        }
    };



    let divAmenities = document.getElementById("selectAmenities");
    let checkboxes = divAmenities.querySelectorAll('input[type="checkbox"]');

    let amenities = "";
    for (let checkbox of checkboxes) {
        if (checkbox.checked)
            amenities += checkbox.value + ",";

    }
    amenities = amenities.substring(0, amenities.length - 1);

    let data={
        title : roomTitleSelect.options[roomTitleSelect.selectedIndex].text,
        notes : document.getElementById("customRoomTypeNotes").value,
        accid : accSelect.options[accSelect.selectedIndex].value,
        maxpersons : document.getElementById("customMaxPersons").value,
        subrooms : document.getElementById("customSubrooms").value,
        amenities : amenities
    };

    console.log(data);

    
    xhr.send(JSON.stringify(data));
    


}




//Insert Room Type
document.getElementById("btn_addPC").addEventListener("click",insertPriceCategory);
function insertPriceCategory(){


    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/manager/insertPriceCategory.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Handle the response from the server


            let response=JSON.parse(xhr.responseText);
            if(response.success){
                getPriceCategory();
            }


        }
    };


    let data={
        notes : document.getElementById("customPriceCategory").value,
    };

    
    xhr.send(JSON.stringify(data));
    


}







document.getElementById("btn_submitProduct").addEventListener("click",submitProduct);
function submitProduct(){
       
        let divTerms = document.getElementById("selectTerms");
        let checkboxes = divTerms.querySelectorAll('input[type="checkbox"]');
        
        let terms="";
        for (let checkbox of checkboxes){
            if (checkbox.checked)
                terms+=checkbox.value+",";
           
        }
        terms=terms.substring(0,terms.length-1);


        let data={
            roomtype : parseInt(roomTypeSelect.options[roomTypeSelect.selectedIndex].value),
            terms : terms,
            pc : parseInt(priceCategorySelect.options[priceCategorySelect.selectedIndex].value),
            date_start : document.getElementById("date_start").value,
            date_end : document.getElementById("date_end").value,
            ppd : parseFloat(document.getElementById("pricePerDay").value),
            stock : parseInt(document.getElementById("stock").value),
            cp : cancelSelect.options[cancelSelect.selectedIndex].value,
            pp : prepaymentSelect.options[prepaymentSelect.selectedIndex].value,
            ow : overwriteSelect.options[overwriteSelect.selectedIndex].value,
            ow_start : document.getElementById("ow_startdate").value,
            ow_end : document.getElementById("ow_enddate").value,
            min_stay : document.getElementById("minstay").value,
            max_stay : document.getElementById("maxstay").value

        }

        if (data.ow==="null"){
            data.ow=null;
            data.ow_start=null;
            data.ow_end=null;
        }
        console.log(data);



        ajax("POST","php/manager/insertProduct.php",data,function(jsonResponse){
            let response=JSON.parse(jsonResponse);
            if (response.success)
                createSuccessPage();
            else
                console.log(response);
        });

    

}









//Terms Dialog

document.getElementById("btn_selectTerms").addEventListener("click",openDialog);
function openDialog() {
    document.getElementById("overlay").style.display = "flex";
}



document.getElementById("btn_closeTerms").addEventListener("click",closeDialog);
function closeDialog() {
    document.getElementById("overlay").style.display = "none";
}



document.getElementById("btn_Amenities").addEventListener("click", openDialogAmenities);
function openDialogAmenities() {
    document.getElementById("overlayAmenities").style.display = "flex";
}



document.getElementById("btn_closeAmenities").addEventListener("click", closeDialogAmenities);
function closeDialogAmenities() {
    document.getElementById("overlayAmenities").style.display = "none";
}







function ajax(method,url,data,successCallback){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 && xhr.status === 200) {
            
            successCallback(xhr.responseText);

        }
    };

    if (method==="GET")
        xhr.send();
    else
        xhr.send(JSON.stringify(data));

}




function createSuccessPage() {
    let content = document.getElementById("content");
    content.innerHTML = "";
    let h1 = document.createElement("h1");
    let textNode = document.createTextNode("Product created Successfully");
    h1.appendChild(textNode);
    content.appendChild(h1);


    let buttonIns = document.createElement("button");
    buttonIns.type = "button";
    buttonIns.textContent = "Insert another Product";

    let buttonView = document.createElement("button");
    buttonView.type = "button";
    buttonView.textContent = "Back to Portal";


    content.appendChild(buttonIns);
    content.appendChild(buttonView);

    buttonIns.addEventListener("click", function () {
        window.location.href = "manager_registerproduct.php";
    });

    buttonView.addEventListener("click",function(){
        window.location.href = "manager_portal.php";
    });

}