var request = require('request'), express = require('express'), app = express();
app.get('/', function(req,res){
	request('https://data.ny.gov/resource/6amx-2pbv.json', function (error,response,body) {
	  if (!error && response.statusCode == 200) {
	    var h, json = JSON.parse(body);
	    h = "<head>\n"
h += "<script src=\"https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js\"></script>"
h += "\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.9/c3.min.js\"></script>"
h += "\n</head>"
res.send(h);
	  }
	})
});
app.listen(process.env.PORT || 3000);