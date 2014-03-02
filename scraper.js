var http = require('http'),
    cheerio = require('cheerio'),
    fs = require('fs')

http.get('http://www2.usfirst.org/2013comp/Events/NYRO/matchresults.html', function(res) {
    var body = ''
    res.setEncoding('utf8')
    res.on('data', function(chunk) {
        body += chunk
    })
    res.on('end', function() {
        scrape(body)
    })
}).on('error', function (err) {
    throw err
})

function scrape(body) {
    var res = []
    var $ = cheerio.load(body)
    var cols = ['time', 'match', 'red1', 'red2', 'red3', 'blue1', 'blue2', 'blue3', 'red_score', 'blue_score']
    $('table').eq(2).find('tr').each(function(i, row) {
        var match = {}
        console.log(i)
        if(i < 3) {
            return;
        }
        $(row).find('td').each(function(ii, col) {
            match[cols[ii]] = $(col).text()
        })
        console.log(match)
        res.push(match)
    })

    fs.writeFile('results.json', JSON.stringify(res), function(err, data) {
        if(err) {
            throw err
        }

        console.log("Success!")
    })
}
