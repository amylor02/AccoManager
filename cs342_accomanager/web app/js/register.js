document.getElementById("btn_Register").addEventListener("click",()=>{



    let data={
        fname : document.getElementById("inpt_name").value,
        mname : document.getElementById("select_mname").options[document.getElementById("select_mname").selectedIndex].value,
        lname : document.getElementById("inpt_lastname").value,
        bdate : document.getElementById("inpt_date").value,
        sex : document.getElementById("select_sex").options[document.getElementById("select_sex").selectedIndex].value,
        username : document.getElementById("inpt_username").value,
        email : document.getElementById("inpt_email").value,
        password : document.getElementById("inpt_password").value,
        role : document.getElementById("selectRole").options[document.getElementById("selectRole").selectedIndex].value
    }



    ajax("POST","php/register.php",data,function(jsonResponse){

        let response=JSON.parse(jsonResponse);
        if (response.success)
            createSuccessPage();
        else
            console.log(response);

    });


});




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


function createSuccessPage(){
    let content=document.getElementById("content");
    content.innerHTML="";
    let h1 = document.createElement("h1");
    let textNode = document.createTextNode("Registered Succesfully");
    h1.appendChild(textNode);


    let buttonIns=document.createElement("button");
    buttonIns.type="button";
    buttonIns.textContent="Go to Login";


    section = document.createElement("section");
    section.appendChild(h1);
    section.appendChild(buttonIns);
    content.appendChild(section);



    buttonIns.addEventListener("click",function(){
        window.location.href="index.html"
    });


}