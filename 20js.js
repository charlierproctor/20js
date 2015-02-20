var request = require('request'), express = require('express'), app = express();
app.get('/', function(req,res){
	request('https://data.ny.gov/resource/6amx-2pbv.json', function (error,response,body) {
	  if (!error && response.statusCode == 200) {
	    var h, json = JSON.parse(body);
		res.send(max(json));
	  }
	})
});
app.listen(process.env.PORT || 3000);

function max(json){ var max = 0;
	for (var i = 0; i < json.length; i++){ 
		if (json[i].aadt > max) { max = json[i]; }
	} return max;
}