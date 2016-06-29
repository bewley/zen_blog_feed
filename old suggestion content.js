$(document).ready(function() {
    //feed to parse
    var feed = "https://www.zenefits.com/blog/feed?format=xml"; // also: https://engineering.zenefits.com/posts/feed/?format=xml
    
    $.ajax(feed, {
        accepts:{
            xml:"application/rss+xml"
        },
        dataType:"xml",
        success:function(data) {

        		var item = $(data).find('item:lt(4)');
		        $(item).each(function(index, value) {
		            var title = $(value).children('title').text();
		            var link = $(value).children('link').text();
		            var description = $(value).children('description').text();
		            $( "#blogDiv" ).append(title, link, description );
		        console.log("------------------------");
                console.log("title      : " + title);
                console.log("link       : " + link);
                console.log("description: " + description);
		        });

    //         //Credit: http://stackoverflow.com/questions/10943544/how-to-parse-an-rss-feed-using-javascript
    //         $(data).find("item:lt(4)").each(function () { // or "item" or whatever suits your feed
    //             var el = $(this),
    //             $title = el.find("title").text(),
    //             $link = el.find("link").text(),
    //             $description = el.find("description").text();

    //             // Append "RSS Title" to #someElement
				// $( "#blogDiv" ).append( $title, $link, $description );

    //             console.log("------------------------");
    //             console.log("title      : " + el.find("title").text());
    //             console.log("link       : " + el.find("link").text());
    //             console.log("description: " + el.find("description").text());
    //         });

        }   
    });
    
});

// fetch(chrome.extension.getURL("blog.html"))
// 			.then(function(response){
// 				return response.text();
// 			})
// 			.then(function(text){
// 				var el = document.createElement("div");
// 				el.innerHTML = text;
// 			});

 
// LOCAL_HOST = "https://ecd806e4.ngrok.io";
// EMPLOYEE_DATA_SERVICE_URL = LOCAL_HOST + "/external/employee/?email=";
// LOCATION_DATA_SERVICE_URL = LOCAL_HOST + "/external/location/";
// DEPARTMENT_DATA_SERVICE_URL = LOCAL_HOST + "/external/department/";

// function dataPromise(dataServiceUrl, accessToken){
// 	return Promise.resolve($.ajax({
// 			url: dataServiceUrl,
// 			cache: false,
// 			type: 'GET',
// 			dataType: 'json',
// 			headers: {'Authorization': 'Bearer ' + accessToken}
// 			})
// 		);
// }

// function sidebarPromise(){
// 	return Promise.resolve($.ajax({
// 		url : chrome.extension.getURL("sidebar.html"),
// 		type: 'GET'
// 	}));
// }

// function generateSideBar(threadView, sender){
// 	chrome.runtime.sendMessage({from: "content", method: "getAccessToken"}, function(response) {
// 		//when access toekn is retrieved, load employee data and sidebar.html
// 		accessToken = response;
// 		emailSplits = sender.emailAddress.split("@");
// 		if(emailSplits[emailSplits.length - 1] === 'zenefits.com'){
// 			employeeDataServiceUrl = EMPLOYEE_DATA_SERVICE_URL + encodeURIComponent(sender.emailAddress);
// 		  	Promise.all([dataPromise(employeeDataServiceUrl, accessToken), sidebarPromise()]).then(function(results){
// 		  		employee = results[0].data[0];
// 		  		locationDataServiceUrl = LOCATION_DATA_SERVICE_URL + encodeURIComponent(employee.location);
// 		  		departmentDataServiceUrl = DEPARTMENT_DATA_SERVICE_URL + encodeURIComponent(employee.department);
// 		  		return Promise.all(results.concat([ dataPromise(locationDataServiceUrl, accessToken), dataPromise(departmentDataServiceUrl, accessToken)]));
// 		  	})
// 		  	.then(function(results){
// 		  		var employeeData = results[0].data[0];
// 		  		var htmlText = results[1];
// 		  		var locationData = results[2];
// 		  		var departmentData = results[3];
// 		  		if(employeeData !== null && locationData !== null && departmentData !== null){
// 			  		employeeData.department = departmentData.name;
// 			  		employeeData.location = locationData.name;
// 			  		//parse dob
// 			  		var today = new Date();
// 			  		var dob = employeeData.dateOfBirth 
// 			  		var isBirthday = false;
// 			  		if(dob !== null){
// 			  			var yymmdd = dob.split('-');
// 			  			isBirthday = (parseInt(yymmdd[1]) == (today.getMonth() + 1) && parseInt(yymmdd[2]) == today.getDate());
// 			  		}
// 			  		employeeData.isBirthday = isBirthday;
// 			  		var template = _.template(htmlText);
// 					var el = $("#ZenePeopleSideBarDiv");
// 			  		el.html(template(employeeData));
// 			  		//show side bar content panel if there is data
// 			  		$('.inboxsdk__contentPanelContainer').show();
// 		  		}	
// 		  		else{
// 		  			//hide side bar content panel otherwise
// 		  			$('.inboxsdk__contentPanelContainer').hide();
// 		  		}
// 		  	});
// 		}
// 	});
// }

// //Load the SDK
// InboxSDK.load(1, 'sdk_wb123_3a44d17551').then(function(sdk) {

// 	sdk.Conversations.registerThreadViewHandler(function(threadView){
// 		messageViews = threadView.getMessageViews();
// 		messageView = messageViews[messageViews.length-1];
// 		var sender = messageView.getSender();
// 		var el = $('<div>', {id:"ZenePeopleSideBarDiv"});
// 		threadView.addSidebarContentPanel({
//  			title: 'Zenefits People',
//  			iconUrl: 'https://d1y9tafah9vzej.cloudfront.net/a7bf563eb0d584db15f95e2dc076920514b9a401/static/marketing/images/logos/logo-zenefits-bird.png',
//  			el: el.get(0),
// 		});
// 		$('.inboxsdk__contentPanelContainer').hide();
// 		generateSideBar(threadView, sender);
		
// 		threadView.on('contactHover', function(event){
// 			var sender = event.contact;
// 			threadView = event.threadView;
// 			generateSideBar(threadView, sender);
// 		});
// 	});
// });

