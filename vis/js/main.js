$(document).ready(init);

function init() {
    $.getJSON('../data/results.json', function (data) {
        var table = HTML.query('.match-info').tbody;
        data.forEach(function (match) {
            table.add('tr');
            for(var property in match) {
                table.tr.only(-1).add('td');
                table.tr.only(-1).td.only(-1).textContent = match[property]

            }
        })
    })
}
