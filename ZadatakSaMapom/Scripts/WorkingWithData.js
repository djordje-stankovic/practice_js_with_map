var listFromDictionary;
var AllObjects;
var frontEndData;
var tableContent;
var typeForFilter = [];
var mymap;
var markers;
var markersForShowing;
var showHideId;
var cheked;
var stringSelect = ["Ends with", "Starts with", "Contains"];
var numberSelect = ["Less", "Greater", "Equals"];
var tableContentForClearFilter;
var numberThForEvent;

var longitude;
var latitude;

function setMarkerBasedOnCoordinates(x, y) {
    let X = parseFloat(x);
    let Y = parseFloat(y);
    L.marker([X, Y]).addTo(mymap);

}
function setOneMarker(Id) {
    var marker;
    for (var key in markersForShowing) {
        if (key == Id) {
            var a = markersForShowing[key][0];
            var b = markersForShowing[key][1];
            marker = L.marker([a, b]).addTo(mymap);
        }
        console.log(markersForShowing);
    }
    var contain = true;
    for (var mark in markers) {
        if (Id == mark) {
            contain = false;
        }
    }
    if (contain == false) {
        markers[Id] = marker;
    }
}

function showAllMarkerOnMap() {

}
// Fill table with same Vehicle and Clear filter form
function filterClear() {

    var $atributs = $("#atributs");
    $("#valueOfFilter").val("");
    $atributs.empty();
    fillTable(tableContent);
    clearPosibleSearch();

}

function clearPosibleSearch() {
    var $posibleSearch = $("#posibleSearch");
    $posibleSearch.empty();
    var selection = $('<option>Search For?</option>');
    $posibleSearch.append(selection);
    $("#valueOfFilter").val("");
}

//Fill input for cordinate from map
function fillCordinateFromMap(x, y) {
    //find input for fill
    $('input[name=X]').val(x);
    $('input[name=Y]').val(y);
}

//Add new Vehicle
function addNew(e) {
    e.preventDefault();
    let Id = tableContent.length + 1;
    let vehicle = {};
    let addForm = document.getElementById("addForm");
    let inputs = addForm.getElementsByTagName("input");
    console.log(addForm);
    console.log(inputs);
    vehicle["Id"] = Id;

    for (var i = 0; i < inputs.length; i++) {
        console.log(inputs[i]);
        let value = $(`input[name="${inputs[i].name}"]`).val();
        vehicle[`${inputs[i].name}`] = `${value}`;
    }
    console.log(vehicle);
    if (checkIfValuesIsValid() === true) {
        tableContent[tableContent.length] = vehicle;

        fillTable(tableContent);
        clearAddFormInputs();
        console.log(tableContent);
        getTypeOfAtributs(tableContent);
        removeMarkers();
        drawMarkers(tableContent);
        showAlert(true);

    } else {
        showAlert(false);
    } 
}
//Validation
function checkIfValuesIsValid() {
    let addForm = document.getElementById("addForm");
    let isValid = true;
    let inputs = addForm.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        let value = $(`input[name="${inputs[i].name}"]`).val();
        if (value == "") {
            isValid = false;
        }

    }
    return isValid;

}
//show alert and bloc them after 3 sec 
function showAlert(isGood) {
    if (isGood === true) {
        $("#success").removeClass("d-none");
        setTimeout(function () {
            removeAlert(true);
        }, 3000);
    } else {
        $("#eroor").removeClass("d-none");
        setTimeout(function () {
            removeAlert(false);
        }, 3000);
    

    }
}
//Show Alert based of success or erorr
function removeAlert(whatAlert) {
    if (whatAlert === true) {
        $("#success").addClass("d-none");
    } else {
        $("#eroor").addClass("d-none");
    }
}

function clearAddFormInputs() {
    let addForm = document.getElementById("addForm");
    let inputs = addForm.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        console.log(inputs[i]);
        let value = $(`input[name="${inputs[i].name}"]`).val("");

    }
}



// Making Add form 
function displayAddForm(tableContent) {
    var $addForm = $("#addForm");
    // Empty Form for add
    $addForm.empty();
    //loop cros all atribute and mane label and input
    for (let atribute in tableContent[0]) {
        if (atribute !== "Id") {
            var divForAtribute = $('<div class="form-group"></div>');
            var atributeForLabel = $('<label for=' + atribute + '>' + atribute + '</label>');
            var atributeForInput = $('<input class="form-control" name=' + atribute + ' id=' + typeForFilter[atribute] + ' placeholder= ' + atribute + '>');
            $addForm.append(divForAtribute);
            $addForm.append(atributeForLabel);
            $addForm.append(atributeForInput);
        }
    }
    var butonForAddForm = $('<button class="btn btn-primary" id="addButon">Add new</button>');
    $addForm.append(butonForAddForm);
}


function filterFunction() {

    var input, filter, table, tr, td, i, txtValue, searchFor, argument;
    input = document.getElementById("valueOfFilter");
    filter = input.value.toUpperCase();
    searchFor = $("#atributs").val();
    argument = $("#posibleSearch").val();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");
    console.log(searchFor);
    console.log(tr);
    if (argument == "Contain") {
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByClassName(searchFor)[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    if (argument == "Equals") {
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByClassName(searchFor)[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue == filter) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    if (argument == "Less") {
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByClassName(searchFor)[0];
            if (td) {
                txtValue = td.textContent;
                if (parseInt(txtValue) < parseInt(filter)) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    if (argument == "Greater") {
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByClassName(searchFor)[0];
            if (td) {
                txtValue = td.textContent;
                if (parseInt(txtValue) > parseInt(filter)) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    if (argument == "endWith") {
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByClassName(searchFor)[0];
            if (td) {
                txtValue = td.textContent;
                let lastWord = txtValue.split(" ");
                if (lastWord[lastWord.length - 1].endsWith(filter) === true) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    if (argument == "startWith") {
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByClassName(searchFor)[0];
            if (td) {
                txtValue = td.textContent;
                let fristWord = txtValue.split(" ");
                if (fristWord[0].startsWith(filter) === true) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}

//Show all markers
function drawMarkers(tableContent) {
    markersForShowing = {};
    markers = {};
    for (var c = 0; c < tableContent.length; c++) {
        var marker = L.marker([tableContent[c].X, tableContent[c].Y]).addTo(mymap);
        markers[tableContent[c].Id] = marker;
        markersForShowing[tableContent[c].Id] = [tableContent[c].X, tableContent[c].Y];
    }
    //Test
    console.log(markers);
    console.log(markersForShowing);


}
//Remove one marker from markers
function removeOneMarker(Id) {
    for (var key in markers) {
        if (key == Id) {
            mymap.removeLayer(markers[key]);
        }
    }
    //Test
    console.log(markers);
    console.log(markersForShowing);
 
}
//Remove all markers from markers
function removeMarkers() {
    for (var key in markers) {
        mymap.removeLayer(markers[key]);
    }
    //Test
    console.log(markers);
    console.log(markersForShowing);
}

// Showing marker based on check box
function showHide() {
    showHideId = this.name;
    getInput = document.getElementsByName("showHideId");
    //console.log(getInput);
    if ($('input[name=' + showHideId + ']').attr('checked')) {
        removeOneMarker(showHideId);
        $('input[name=' + showHideId + ']').attr('checked', false);
    }
    else {
        setOneMarker(showHideId);
        $('input[name=' + showHideId + ']').attr('checked', true);
    }
}
function getPosibleSearch() {
    var selection;
    var $searchFor = $("#posibleSearch");
    $searchFor.empty();
    var atributeForSearch;
    var atribut = $("#atributs").val();
    for (var key in typeForFilter) {
        if (atribut == key) {
            atributeForSearch = typeForFilter[key];
        }
    }
    if (atributeForSearch === "number") {
        for (var item in numberSelect) {
            selection = $('<option value=' + numberSelect[item] + '>' + numberSelect[item] + '</option>');
            $searchFor.append(selection);
        }
    }
    if (atributeForSearch === "string") {
        for (var item1 in stringSelect) {
            selection = $('<option value=' + stringSelect[item1] + '>' + stringSelect[item1] + '</option>');
            $searchFor.append(selection);
        }
    }
}

function getTypeOfAtributs(tableContent) {
    typeForFilter = [];
    for (key in tableContent[0]) {
        typeForFilter[key] = typeof (tableContent[0][key]);
    }
}

function showHideAllFromMap() {
    showHideAll = this.name;
    getInput = document.getElementsByName("showHideAll");
    if ($('input[name=' + showHideAll + ']').attr('checked')) {
        removeMarkers(tableContent);
        $('input[name=' + showHideAll + ']').attr('checked', false);
        checkUncheckAllComboBox(false);

        //Test
        console.log(markers);
        console.log(markersForShowing);
    }
    else {
        drawMarkers(tableContent);
        $('input[name=' + showHideAll + ']').attr('checked', true);
        checkUncheckAllComboBox(true);

        //Test
        console.log(markers);
        console.log(markersForShowing);
        

    }

}

//based on checkbox in th check or uncheck all checkbox
function checkUncheckAllComboBox(some) {
    let checkInput = document.getElementsByTagName("tr");
    if (some === true) {
        for (let i = 1; i < checkInput.length; i++) {
            if ($('input[name=' + i + ']').attr('checked')) {
                $('input[name=' + i + ']').attr('checked', false);
            }
            else {
                $('input[name=' + i + ']').attr('checked', true);
            }
        }
    }
    if (some === false) {
        for (let i = 1; i < checkInput.length; i++) {
            if ($('input[name=' + i + ']').attr('checked')) {
                $('input[name=' + i + ']').attr('checked', false);
            }
            else {
                $('input[name=' + i + ']').attr('checked', true);
            }
        }
    }
}

$(document).ready(function () {
    th = document.getElementsByTagName('th');
    numberThForEvent = th.length;
    for (var c = 0; c < th.length; c++) {
        th[c].addEventListener('click', item(c));
    }
    $("body").on("click", "#showHide", showHide);
    $("body").on("click", "#addButon", addNew);
    $("body").on("click", "#showHideAll", showHideAllFromMap);


    mymap = L.map('mapid').setView([44.56699093657141, 20.8355712890625], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);



    mymap.on('click', function (e) {


        lantituda = e.latlng.lat;
        longitude = e.latlng.lng;

        fillCordinateFromMap(lantituda, longitude);

    });

    getAllFromBase();
    displayAddForm(tableContent);

});

function getEventForTh() {
    th = document.getElementsByTagName('th');
    numberThForEvent = th.length;
    for (var c = 0; c < th.length; c++) {
        th[c].addEventListener('click', item(c));
    }
}
function fillTable(tableContent) {
    clearPosibleSearch();
    var $selected = $("#atributs");
    $selected.empty();
    var header = $("<tr></tr>");
    var $table = $("#table");
    $table.empty();
    for (var key in tableContent[0]) {
        var heade = $('<th id=' + key + '>' + key + '</th>');
        var selection;
        header.append(heade);

        selection = $('<option value=' + key + '>' + key + '</option>');
        $selected.append(selection);
    }
    let checkBoxForAll = $('<th><input type="checkbox" name=showAll id=showHideAll  checked="checked"  >All<br></th>');
    header.append(checkBoxForAll);
    $table.append(header);
    getEventForTh();
    for (var a in tableContent) {
        var row = $("<tr></tr>");
        var values = tableContent[a];
        for (var data in values) {
            var rowData = $('<td class= ' + data + '>' + values[data] + '</td>');
            row.append(rowData);
        }
        var del = $('<td><input type="checkbox" id=showHide name=' + tableContent[a].Id + '  checked="checked"  >show/hide<br></td>');
        row.append(del);
        $table.append(row);
    }
}

//get data from API
function getAllFromBase() {
    url = "http://localhost:52891/api/My/";
    $.getJSON(url, function (data, status) {
        frontEndData = data;
    }
    );
}

//Get data attributes for filter and Add form
function getAtribute(promeniva) {
    tableContent = [];
    for (var key in frontEndData) {
        if (key === promeniva) {
            tableContent = frontEndData[key];
        }
    }
    fillTable(tableContent);
    console.log(tableContent);
    getTypeOfAtributs(tableContent);
    removeMarkers();
    drawMarkers(tableContent);
    tableContentForClearFilter = promeniva;
    displayAddForm(tableContent);

}





//Making events for sort Table without last th where will be Show/Hide All
function item(c) {
    if (c !== numberThForEvent - 1) {
        return function () {
            sortTable(c);
        }
    }
    else {
        console.log(c);
    }

}
function sortTable(c) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("table");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < rows.length - 1; i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[c];
            y = rows[i + 1].getElementsByTagName("TD")[c];
            if (dir === "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}













