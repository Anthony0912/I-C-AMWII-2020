$(document).ready(function(){
    $.ajax({
        type: 'GET',
        data: {},
        url: 'https://api.openbrewerydb.org/breweries?per_page=10',
        dataType: 'json',
        success: function (data) {
            mostrarTabla('brewery', data);
        }
    });
});

function mostrarTabla(tableName, tableData) {
    if (tableData && tableName) {
        let table = $(`#${tableName}_table`);
        let rows = "";
        tableData.forEach(element => {
            let row = `<tr><td>${element.country}</td><td>${element.city}</td><td>${element.name}</td>`;
            row += `<td><a href="#info" class="btn btn-primary" onclick="findId(this)" data-id="${element.id}" data-entity="${tableName}">Ver</a></td>`;
            rows += row + '</tr>';
        });
        table.html(rows);
    }
}

function findId(element) {
    $.ajax({
        type: 'GET',
        data: {},
        url: 'https://api.openbrewerydb.org/breweries?per_page=10',
        dataType: 'json',
        success: function (data) {
            const object = $(element).data();
            let content = "";
            data.forEach(element => {
                if (element.id === object.id) {
                    content += `<p><span class="font-weight-bold">Name: </span>${element.name}</p><br>
                    <p><span class="font-weight-bold">Brewery type: </span>${element.brewery_type}</p><br>
                    <p><span class="font-weight-bold">Street: </span>${element.street}</p><br>
                    <p><span class="font-weight-bold">State: </span>${element.state}</p><br>
                    <p><span class="font-weight-bold">Postal code: </span>${element.postal_code}</p><br>
                    <p><span class="font-weight-bold">Country: </span>${element.country}</p><br>
                    <p><span class="font-weight-bold">Phone: </span>${element.phone}</p><br>
                    <p><span class="font-weight-bold">Website url: </span><a href="${element.website_url}">${element.website_url}</a></p><br>
                    <p><span class="font-weight-bold">Updated at: </span>${element.updated_at}</p><br>`;
                }
            });
            $("#contenido").html(content);
        }
    });
}