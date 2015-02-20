var request = require('request'), express = require('express'), app = express();
app.get('/:zip', function(req,res){
	request('https://health.data.ny.gov/api/views/cnih-y5dw/rows.json', function (error,response,body) {
	  if (!error && response.statusCode == 200) {
var start = "<head>\n<style>html, body, #map-canvas {height: 100%;margin: 0px;padding: 0px}</style>\n<script src='https://maps.googleapis.com/maps/api/js?v=3.exp'></script>\n<script>\nfunction initialize(){ \nvar mapOptions = { zoom: 7, center: new google.maps.LatLng(43, -74)}; \nvar map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);\n"
var end = "} \ngoogle.maps.event.addDomListener(window, 'load', initialize);\n</script>\n</head>\n<body>\n<div id='map-canvas'>\n</div>\n</body>"
	    res.send(start + JSON.parse(body).data
	    	.filter(function(elem){
	    		if(elem[20]){ 
	    			return elem[20].trim() == req.params.zip; 
	    		} else { 
	    			return false 
	    		}
	    	})
	    	.map(function(elem){
	    		return "var marker = new google.maps.Marker({position: new google.maps.LatLng(" + elem[34][1] + "," + elem[34][2] + "),map: map,title: \""+ elem[8].trim() + "\"});\n"
	    	}).join(" ")+end)
	  }
	})
});
app.listen(process.env.PORT || 3000);