errormessage=document.getElementById("p_error");
function sendLoginData() {
    // Get username and password values from input fields
    let username = document.getElementById("inpt_username").value;
    let password = document.getElementById("inpt_password").value;

    //console.log("Usr: "+username+"  Pwd: "+password);

    // Create an XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // Define the request method, URL, and set asynchronous to true
    xhr.open("POST", "php/login.php", true);

    // Set the request header to send data as JSON
    xhr.setRequestHeader("Content-Type", "application/json");

    // Set the callback function to handle the response
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Handle the response from the server

            console.log(xhr.responseText);

            let response=JSON.parse(xhr.response);

            //If credentials validated 
            if (response.success===true){
                //console.log(response.role);
                if (response.role===1)
                    window.location.href="user_portal.php";
                    //console.log(response.role);
                else if(response.role===2)
                    //console.log(response.role);
                    window.location.href="manager_portal.php";
                else 
                    window.location.href="admin_portal.php";


            }
            else{
                
                errormessage.innerHTML=response.message;
                errormessage.style.visibility="visible";

            }
        }
    };

    // Create a JSON object with the username and password
    let data = {
        username: username,
        password: password
    };

    // Convert the JSON object to a string and send it in the request body
    xhr.send(JSON.stringify(data));


}

document.getElementById("btn_login").addEventListener("click",sendLoginData);
