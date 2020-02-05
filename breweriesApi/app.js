$(document).ready(function(){
    getBreweries(10);
});

function getBreweries(limit) {
    $.ajax({
        type: 'GET',
        data: {},
        url: 'https://api.openbrewerydb.org/breweries?per_page=' + limit,
        dataType: 'json',
        success: function (data) {
            console.log(data.length);
            mostrarTabla('brewery', data);
        }
    });
}

function mostrarTabla(tableName, tableData) {
    let table = $(`#${tableName}_table`);
    let rows = "";
    if (!$.isEmptyObject(tableData) && tableName) {
        tableData.forEach(element => {
            let row = `<tr><td>${element.country}</td><td>${element.city}</td><td>${element.name}</td>`;
            row += `<td><a href="#info" class="btn btn-primary" onclick="findId(this)" data-id="${element.id}" data-entity="${tableName}">Ver</a></td>`;
            rows += row + '</tr>';
        });
    }else {
        let row =`<tr><td colspan=4>No hay datos que mostar</td>`;
        rows += row + '</tr>';
    }
    table.html(rows);  
}

function findId(element) {
    const object = $(element).data();
    $.ajax({
        type: 'GET',
        data: {},
        url: 'https://api.openbrewerydb.org/breweries/' + object.id,
        dataType: 'json',
        success: function (data) {
            showBrewery(data);
        }
    });
}

function showBrewery(data) {
    let content = "";
    content += `<p><span class="font-weight-bold">Name: </span>${data.name}</p><br>
    <p><span class="font-weight-bold">Brewery type: </span>${data.brewery_type}</p><br>
    <p><span class="font-weight-bold">Street: </span>${data.street}</p><br>
    <p><span class="font-weight-bold">State: </span>${data.state}</p><br>
    <p><span class="font-weight-bold">Postal code: </span>${data.postal_code}</p><br>
    <p><span class="font-weight-bold">Country: </span>${data.country}</p><br>
    <p><span class="font-weight-bold">Phone: </span>${data.phone}</p><br>
    <p><span class="font-weight-bold">Website url: </span><a href="${data.website_url}">${data.website_url}</a></p><br>
    <p><span class="font-weight-bold">Updated at: </span>${data.updated_at}</p><br>`;
    $("#contenido").html(content);
} 