window.onload = function () {
    getAccs(document.getElementById("incomeAccomType"));
    getAccs(document.getElementById("occupancyAccomType"));
    getAccs(document.getElementById("occupancyComparisonAccomType"));
    getAccs(document.getElementById("bookingCancellationAccomType"));


    getRoomTitles(document.getElementById("incomeRoomType"));
    getRoomTitles(document.getElementById("occupancyRoomType"));
    getRoomTitles(document.getElementById("bookingCancellationRoomType"));
    getRoomTitles(document.getElementById("bookingCancellationRoomType"));


    getCountries(document.getElementById("incomeCountry"));
    getCountries(document.getElementById("occupancyCountry"));
    getCountries(document.getElementById("occupancyComparisonCountry"));
    getCountries(document.getElementById("bookingCancellationCountry"));


    getAccomNames(document.getElementById("performance1AccomName"));
    getAccomNames(document.getElementById("performance2AccomName"));
    getAccomNames(document.getElementById("performance3AccomName"));






}


document.getElementById("incomeCountry").addEventListener("change", () => {
    getCities(document.getElementById("incomeCountry"), document.getElementById("incomeCity"));
});

document.getElementById("occupancyCountry").addEventListener("change", () => {
    getCities(document.getElementById("occupancyCountry"), document.getElementById("occupancyCity"));
});
document.getElementById("occupancyComparisonCountry").addEventListener("change", () => {
    getCities(document.getElementById("occupancyComparisonCountry"), document.getElementById("occupancyComparisonCity"));
});
document.getElementById("bookingCancellationCountry").addEventListener("change", () => {
    getCities(document.getElementById("bookingCancellationCountry"), document.getElementById("bookingCancellationCity"));
});


function getAccomNames(select) {
    ajax("GET", "php/getAccomNames.php", null, function (response) {
        console.log(response);
        select.innerHTML = "";
        for (let row of JSON.parse(response)) {
            addOption(row.NAME, row.ACC_ID, select);
        }
    });
}


function getCities(select, selectCity) {

    selCountry = select.options[select.selectedIndex].value;
    ajax("POST", "php/getCities.php", { country: selCountry }, function (response) {
        console.log(response);
        selectCity.innerHTML = "";
        addOption("NULL", "NULL", selectCity);
        addOption("GROUP", "GROUP", selectCity);
        for (let row of JSON.parse(response)) {
            addOption(row.CITY_NAME, row.CITY_NAME, selectCity);
        }
    });
}



document.getElementById("reportSelect").addEventListener("change", toggleFields);
function toggleFields() {



    // Hide all fields initially
    document.querySelectorAll('#fieldsContainer > div').forEach(fieldGroup => {
        fieldGroup.classList.add('hidden');
    });

    // Get the selected report value
    let selectedReport = document.getElementById('reportSelect').options[document.getElementById('reportSelect').selectedIndex].value;


    console.log(selectedReport);
    // Show fields based on the selected report

    if (selectedReport === "IR" || selectedReport === "AR" || selectedReport === "ART")
        sel = "min";
    else if (selectedReport === "OR" || selectedReport === "ROR" || selectedReport === "BTS" || selectedReport === "BCS")
        sel = "max"
    else
        sel = selectedReport;

    if (selectedReport !== 'null' && selectedReport !== 'AUDIT')
        document.getElementById(sel + 'Fields').classList.remove('hidden');


    if (selectedReport === "null" && selectedReport !== 'AUDIT')
        document.getElementById("btn_search").style.display = "none";
    else
        document.getElementById("btn_search").style.display = "block";


}



function getCountries(select) {
    ajax("GET", "php/getCountries.php", null, function (response) {
        console.log(response);
        select.innerHTML = "";
        addOption("NULL", "NULL", select);
        addOption("GROUP", "GROUP", select);
        for (let row of JSON.parse(response)) {
            addOption(row.COUNTRY_NAME, row.COUNTRY_NAME, select);
        }
    });
}




function getAccs(select) {
    ajax("GET", "php/admin/getAccTypes.php", null, function (response) {

        console.log(response);
        select.innerHTML = "";
        addOption("NULL", "NULL", select);
        addOption("GROUP", "GROUP", select);
        for (let row of JSON.parse(response)) {
            addOption(row.DESCRIPTION, row.CODE, select);
        }
    })

}



function getRoomTitles(select) {


    ajax("GET", "php/getRoomTitles.php", null, function (response) {
        console.log(response);
        select.innerHTML = "";
        addOption("NULL", "NULL", select);
        addOption("GROUP", "GROUP", select);
        for (let row of JSON.parse(response))
            addOption(row.TITLE, "", select);
    })


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



document.getElementById("btn_search").addEventListener("click", () => {

    let selectedReport = document.getElementById('reportSelect').options[document.getElementById('reportSelect').selectedIndex].value;
    if (selectedReport === "IR" || selectedReport === "AR" || selectedReport === "ART") {
        let data = {
            acctype: convertToNull("incomeAccomType"),
            roomtype: convertToNull("incomeRoomType"),
            country: convertToNull("incomeCountry"),
            city: convertToNull("incomeCity"),
            time: convertToNull("incomeTime"),
            startdate: document.getElementById("incomeStartDate").value,
            enddate: document.getElementById("incomeEndDate").value,
            sort: convertToNull("incomeSort")

        };
        if (data.enddate === "")
            data.enddate = null;
        if (data.startdate === "")
            data.startdate = null;

        console.log(data);

        if (selectedReport === 'IR')
            ajax("POST", "php/admin/getIR.php", data, function (response) {
                console.log(response);
                createTableFromObject(JSON.parse(response));
            });
        else if (selectedReport === 'AR')
            ajax("POST", "php/admin/getAR.php", data, function (response) {
                console.log(response);
                createTableFromObject(JSON.parse(response));
            });
        else if (selectedReport === 'ART')
            ajax("POST", "php/admin/getART.php", data, function (response) {
                console.log(response);
                createTableFromObject(JSON.parse(response));
            });
    }

    else if (selectedReport === "OR" || selectedReport === "ROR" || selectedReport === "BTS" || selectedReport === "BCS") {
        let data = {
            acctype: convertToNull("occupancyAccomType"),
            roomtype: convertToNull("occupancyRoomType"),
            country: convertToNull("occupancyCountry"),
            city: convertToNull("occupancyCity"),
            time: convertToNull("occupancyTime"),
            startdate: document.getElementById("occupancyStartDate").value,
            enddate: document.getElementById("occupancyEndDate").value,
        };
        if (data.enddate === "")
            data.enddate = null;
        if (data.startdate === "")
            data.startdate = null;

        console.log(data);
        if (selectedReport === 'OR')
            ajax("POST", "php/admin/getOR.php", data, function (response) {
                console.log(response);
                createTableFromObject(JSON.parse(response));
            });
        else if (selectedReport === 'ROR')
            ajax("POST", "php/admin/getROR.php", data, function (response) {
                console.log(response);
                createTableFromObject(JSON.parse(response));
            });
        else if (selectedReport === 'BTS')
            ajax("POST", "php/admin/getBTS.php", data, function (response) {
                console.log(response);
                createTableFromObject(JSON.parse(response));
            });
        else if (selectedReport === 'BCS')
            ajax("POST", "php/admin/getBCS.php", data, function (response) {
                console.log(response);
                createTableFromObject(JSON.parse(response));
            });
    }

    else if (selectedReport === "OCR") {
        let data = {
            acctype: convertToNull("occupancyComparisonAccomType"),
            country: convertToNull("occupancyComparisonCountry"),
            city: convertToNull("occupancyComparisonCity"),
            time: convertToNull("occupancyComparisonTime"),
            startdate: document.getElementById("occupancyComparisonStartDate").value,
            enddate: document.getElementById("occupancyComparisonEndDate").value,
        };
        if (data.enddate === "")
            data.enddate = null;
        if (data.startdate === "")
            data.startdate = null;

        console.log(data);
        ajax("POST", "php/admin/getOCR.php", data, function (response) {
            console.log(response);
            createTableFromObject(JSON.parse(response));
        });

    }
    else if (selectedReport === "BTRS") {
        let data = {
            time: convertToNull("trendsTime"),
            startdate: document.getElementById("trendsStartDate").value,
            enddate: document.getElementById("trendsEndDate").value,
        };
        if (data.enddate === "")
            data.enddate = null;
        if (data.startdate === "")
            data.startdate = null;

        console.log(data);
        ajax("POST", "php/admin/getBTRS.php", data, function (response) {
            console.log(response);
            createTableFromObject(JSON.parse(response));
        });
    }
    else if (selectedReport === "PR1") {
        let data = {
            accname: document.getElementById("performance1AccomName").options[document.getElementById("performance1AccomName").selectedIndex].value,
            startdate: document.getElementById("performance1StartDate").value,
            enddate: document.getElementById("performance1EndDate").value,
        };
        console.log("PR1 ACCOM: " + data.accname);
        if (data.enddate === "")
            data.enddate = null;
        if (data.startdate === "")
            data.startdate = null;

        console.log(data);
        ajax("POST", "php/admin/getPR1.php", data, function (response) {
            console.log(response);
            createTableFromObject(JSON.parse(response));
        });
    }
    else if (selectedReport === "PR2") {
        let data = {
            accname: document.getElementById("performance2AccomName").options[document.getElementById("performance2AccomName").selectedIndex].value,
            year: document.getElementById("performance2Year").value
        };

        console.log(data);
        ajax("POST", "php/admin/getPR2.php", data, function (response) {
            console.log(response);
            createTableFromObject(JSON.parse(response));
        });
    }
    else if (selectedReport === "PR3") {
        let data = {
            accname: document.getElementById("performance3AccomName").options[document.getElementById("performance3AccomName").selectedIndex].value,
            year: document.getElementById("performance3Year").value,
            amount: document.getElementById("performance3Amount").value
        };

        console.log(data);
        ajax("POST", "php/admin/getPR3.php", data, function (response) {
            console.log(response);
            createTableFromObject(JSON.parse(response));
        });
    }
    else if (selectedReport === 'AUDIT')
        ajax("GET", "php/admin/getAuditManager.php", null, function (response) {
            console.log(response);
            createTableFromObject(JSON.parse(response));
        });



    function convertToNull(elementId) {
        let element = document.getElementById(elementId);
        let selIndex = element.selectedIndex;
        let selectedValue = element.options[selIndex].value;
        return selectedValue.toUpperCase() === 'NULL' ? null : selectedValue;
    }
});



function createTableFromObject(data) {
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');

    if (!data.length){
        document.getElementById("results").innerHTML = "";
        alert("No results");
    }

    // Create table header row
    const keys = Object.keys(data[0]);
    for (const key of keys) {
        const headerCell = document.createElement('th');
        headerCell.textContent = key;
        headerCell.style.border = "1px solid black";
        headerCell.style.padding = "20px";
        headerRow.appendChild(headerCell);
    }
    table.appendChild(headerRow);

    // Create table data rows
    for (const obj of data) {
        const dataRow = document.createElement('tr');
        for (const key of keys) {
            const dataCell = document.createElement('td');
            dataCell.style.border = "1px solid black";
            if (key==="DATE"){
                dataCell.textContent = obj[key].date.substr(0,10);
            }
            else
                dataCell.textContent = obj[key];
            dataRow.style.border = "1px solid black";
            dataRow.appendChild(dataCell);
        }
        table.appendChild(dataRow);
    }
    table.style.border = "2px solid black";
    table.style.margin = "0 auto";

    document.getElementById("results").innerHTML = "";
    document.getElementById("results").appendChild(table);
    document.getElementById("section_results").style.display = "block";
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



