var request = require('request'), express = require('express'), app = express();
app.get('/', function(req,res){
	request('https://data.ny.gov/resource/6amx-2pbv.json?$order=aadt DESC', function (error,response,body) {
	  if (!error && response.statusCode == 200) {
	    var h, json = JSON.parse(body);
		res.send(json[0]);
	  }
	})
});
app.listen(process.env.PORT || 3000);