
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

		var streetStr = $('#street').val();
		var cityStr = $('#city').val();
		var address = streetStr + ', ' + cityStr;
		
		$greeting.text('So, you want to live at ' + address + '?');
		
		var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + ' ';
		$body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    var ntyimesUrl = 'http://api.nytimes.com/svc/search/vs/articlesearch.json?q' + cityStr + '&sort=newest&api-key=82266bdb0232a2bd8cc59aa83f3a55e9:13:74850154';
    
    $.getJSON(nytimesURL, function (data){
    	// console.log(data);
    	
    	$nytHeaderElem.text('New York Times Articles About ' + cityStr);
    	
    	articles = data.response.docs;
    	for (var i=0; i<articles.length; i++){
    		var article = articles[i];
    		$nytElem.append('<li class="article">'+
    		'<a href="'+article.web_url+'">'+article.headline.main+
    				'</a>'+
    				'<p>' + article.snippet + '</p>'+'</li>');
    	};
    	
    });
    
    return false;
};

$('#form-container').submit(loadData);