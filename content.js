chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (key in changes) {
          var storageChange = changes[key];
          getFeedUrl();
          getNoArticles();
          console.log('Storage key "%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
                      key,
                      namespace,
                      storageChange.oldValue,
                      storageChange.newValue);
        }
});

getFeedUrl = function () {
      chrome.storage.sync.get("data", function(items) {
      if (items["data"]==="HR") {
        feedUrl = "https://www.zenefits.com/blog/feed?format=xml";
        blogTitle = "HR";
      } else if (items["data"]==="ENG") {
        feedUrl = "https://engineering.zenefits.com/posts/feed/?format=xml";
        blogTitle = "Engineering";
      } else {
        feedUrl = "https://www.zenefits.com/blog/feed?format=xml";
        blogTitle = "HR";
      }
  });
}

getNoArticles = function () {
      chrome.storage.sync.get("num", function(items) {
      if (items["num"]==="3") {
        noArticles = 3;
      } else if (items["num"]==="5") {
        noArticles = 5;
      } else if (items["num"]==="6") {
        noArticles = 6;
      } else {
        noArticles = 4;
      }
  });
}

// Layout styles
var styleHeader = 'style="background-color: #F6921E; background: linear-gradient(to right, #F6921E 0%, #F3B25A 100%); font-family: Arial, sans-serif; min-height: 10px; width: 100%; color: #fff; padding: 5px 10px;"';
var styleArticle = 'style="font-size: 1.2em; font-family: Arial, sans-serif; color: #F2A640;"';
var styleFooter = 'style="background-color: #67BABE; font-family: Arial, sans-serif; min-height: 10px; width: 100%; color: #fff; padding: 5px 10px; text-align: center;"';

InboxSDK.load('1', 'sdk_wb123_3a44d17551').then(function(sdk){

	// the SDK has been loaded, now do something with it!
	sdk.Compose.registerComposeViewHandler(function(composeView){

		// a compose view has come into existence, do something with it!
		composeView.addButton({
			title: "ZeneBlog",
			iconUrl: 'https://d1y9tafah9vzej.cloudfront.net/a7bf563eb0d584db15f95e2dc076920514b9a401/static/marketing/images/logos/logo-zenefits-bird.png',
			onClick: function(event) {
				event.composeView.insertHTMLIntoBodyAtCursor(newDiv)
				.then
				$.ajax({
            type: 'GET',
            url: feedUrl,
            dataType: 'xml',
            success: function (xml) {
            	// top banner #F3B25A
            	$('#blogDiv').append('<div '+styleHeader+'>Latest from the Zenefits '+blogTitle+' Blog</div>');
                $(xml).find("item:lt("+noArticles+")").each(function () {
                    var title = $(this).find("title").text();
                    var description = $(this).find("description").text();
                    var shortDescription = description.substr(0, 250);
                    var link = $(this).find("link").text();
                    $('#blogDiv').append('<article><h3 '+styleArticle+'>'+title+'</h3><p>'+shortDescription+'... <a href="'+link+'">Read more</a></p>');
                });
                // below signup banner
                $('#blogDiv').append('<div '+styleFooter+'><a style="text-decoration: none; color: #fff;" href="https://www.zenefits.com/blog/">Subscribe to ZenFive Newsletter for more HR tips, tricks, and articles.</a></div>');
            }
        });
			},
		});
		var newDiv = document.createElement("div");
		newDiv.setAttribute("id", "blogDiv");
		// See what option is selected on the popup 
		getFeedUrl();
		getNoArticles();
	});
});


