var request = require('request'), express = require('express'), app = express();
app.get('/', function(req,res){
	request('https://health.data.ny.gov/api/views/cnih-y5dw/rows.json', function (error,response,body) {
	  if (!error && response.statusCode == 200) {
	    var h, json = JSON.parse(body);
	    res.send(json.data.filter(function(elem){
	    	if(elem[20]){ 
	    		console.log(elem);
	    		return elem[20].trim() == '12953'; 
	    	} else { return false }
	    }))
	  }
	})
});
app.listen(process.env.PORT || 3000);