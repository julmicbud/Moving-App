function loadData() {

    /*
    The $ that shows up in variable names, like $body for example, is just a character like any other. In this case, it refers to the fact that the variable referenced by $body is a jQuery collection, not a DOM node.
    */
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


    // load streetview
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');


    // load nytimes
    // obviously, replace all the "X"s with your own API key
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=6c8e57991597a9eaefac86510963b66b:13:74704165';
    $.getJSON(nytimesUrl, function(data){

        $nytHeaderElem.text('New York Times Articles About ' + cityStr);

        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">'+
                '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
                '<p>' + article.snippet + '</p>'+
            '</li>');
        }

    }).error(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });


    // load wikipedia data
    var wikiURL = 'https://en.wikipedia.org/w/api.php?' +
      'action=opensearch&search=' + cityStr +
      '&format=json&callback=wikiCallback';
    var  wikiRequestTimeout = setTimeout(function() {
      $wikiElem.text("wikipedia have no response.");
    }, 8000);

    $.ajax({
      url: wikiURL,
      dataType: "jsonp",
      // jsonp: "callback",
      success: function (response) {
        var articleList = response[1];
        
        for (var i = 0; i < articleList.length; i++) {
          articleStr = articleList[i];
          var url = 'http://en.wikipedia.org/wiki/' + articleStr;
          $wikiElem.append('<li><a href="' + url + '">' +
                articleStr + '</a></li>');
        }
        clearTimeout(wikiRequestTimeout);
      }
    });
    return false;
}

$('#form-container').submit(loadData);