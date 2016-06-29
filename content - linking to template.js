var feedUrl = 'https://www.zenefits.com/blog/feed?format=xml';
// var feedUrl = 'https://engineering.zenefits.com/posts/feed/?format=xml';

function templatePromise(){
	return Promise.resolve($.ajax({
		url : chrome.extension.getURL("blog.html"),
		type: 'GET'
	}));
}

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
                $(xml).find("item:lt(4)").each(function () {
                    var title = $(this).find("title").text();
                    var description = $(this).find("description").text();
                    var shortDescription = description.substr(0, 250);
                    var link = $(this).find("link").text();
                .then(function(results){
		  			var blogData = results[0].data[0];
                    var htmlText = results[1];
                    var template = _.template(htmlText);
					$("#blogDiv").append(html(template(blogData)));
                    });
                });
            }
        });
			},
		});
		var newDiv = document.createElement("div");
		newDiv.setAttribute("id", "blogDiv");
	
	});
});


