function send_json_request(method, formid, variable){
    var request_url = '/contacts'
    var data = $('#'+formid).serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    if(method == 'PUT' || method == 'DELETE')
        request_url = request_url + "/" + data[variable]

    var list = JSON.stringify(data);
    $.ajax({
        type: method,
        url: request_url,
        data: list,
        dataType: "json",
        contentType: "application/json"
    });
}

function find_contact(event){
    event.preventDefault();
    const id = document.getElementById('find_id').value;
    $.get("/contacts/"+id, function(data, status){
        let placeholder = document.querySelector('#find_data');
        let out = "";
        let contact = data['contact']
        out += `
            <tr>
                <td>${contact.id}</td>
                <td>${contact.name}</td>
                <td>${contact.phone}</td>
            </tr>
        `
        placeholder.innerHTML = out;
    });
}

$.get("/contacts", function(data, status){
    let placeholder = document.querySelector('#contacts');
    let out = "";
    for(let contact of data['contacts']){
        out += `
            <tr>
                <td>${contact.id}</td>
                <td>${contact.name}</td>
                <td>${contact.phone}</td>
            </tr>
        `
    }
    placeholder.innerHTML = out;
});