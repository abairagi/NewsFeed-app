'use strict';
var targetId = "mainContent";
var feedUrl = 'http://rss2json.com/api.json?rss_url=https://www.nasa.gov/rss/dyn/breaking_news.rss';

//self executing function to get data
(function(url){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.onload = function() {
		if (xhr.status === 200) {
			renderData(JSON.parse(xhr.responseText))
		}
		else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send();
})(feedUrl);

//for preparing html to be attached to main page
function renderData(data){
	var resultStr = '<ul class="list-container">';
	for(var i=0, l=data.items.length; i<l; i++){
		resultStr += '<li><div class="item-img"><img src="'+data.items[i].enclosure.link+'"></div>'+
					 '<div class="item-content"><h3>'+data.items[i].title+'</h3><p>'+data.items[i].description+'</p>'+
					 '<p class="text-gray"><small>'+data.items[i].pubDate+'</small></p>'
					 '</div></li>';
	}
	resultStr += "</ul>";
	
	document.getElementById(targetId).innerHTML = resultStr; //attaching to main div
}