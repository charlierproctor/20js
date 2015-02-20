app = require('express')(); app.get('/:z?', function(req,res){ var r=0;
require('request')('https://health.data.ny.gov/api/views/cnih-y5dw/rows.json', 
function (er,re,b) {res.send("<head>\n<style>html, body, #canv {height: \
100%;margin: 0px;padding: 0px}</style>\n<script src='https://maps.googleapis.co\
m/maps/api/js?v=3.exp'></script>\n<script>\nfunction i(){ \nvar opt={ zoom: 7, \
center: new google.maps.LatLng(43,-74)};\nvar map=new google.maps.Map(document\
.getElementById('canv'),opt);\n"+JSON.parse(b).data.filter(function(x){ 
if(x[20] && x[13]){return (req.params.z?(x[20].trim()===req.params.z):1)
&&(x[12]!=="0")}else {return false }}).map(function(x){return "var m"+(++r)+" = new google.maps\
.Marker({position: new google.maps.LatLng(" + x[34][1] + "," + x[34][2] + "),\
map: map,title: \""+ x[8].trim().replace(/"/g, '\\\"')+"\"});\n\
var i"+r+"=new google.maps.InfoWindow({content: \""+ x[11].replace(/"/g, '\\\"') +"\"});\n \
google.maps.event.addListener(m"+r+",'click',function(){i"+r+".open(map,m"+r+");});\n"
}).join(" ")+
"}google.maps.event.addDomListener(window,'load',i);</script>\n</head>\n<body>\
\n<div id=\'canv'></div>\n</body>"); }); });app.listen(process.env.PORT || 3000);