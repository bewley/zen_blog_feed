var zeneAuth = new OAuth2('zenefits', {
 	  client_id: '285v7veBSFGVviBfIeHPNigB0cv3p4jSdsD3j2oK',
	  client_secret: 'RTR8zIOFzVdlS12DXgE3qtuKuyTtMpcIQiXNLEoksx6bBFSa5hL2fzqYMKvYrUzZXWw0AZk3l1E1feOrsbTBFrXvuwjeswu6jBc1Gv6muTZN3pKCg7FU0KgMnuUKtRxK',
	  api_scope: 'read'
});


chrome.runtime.onConnect.addListener(function(port) {
	if(port.name === 'popup'){
		port.onMessage.addListener(function(msg) {
    		if(msg.method === 'authorize'){
    			zeneAuth.authorize(function(){
					if(zeneAuth.hasAccessToken()){
    					port.postMessage({status: "success"});
    					chrome.extension.getViews({type: "popup"})
    				}
    				else{
    					port.postMessage({status: "failure"});
    				}
    			});
    		}
  		});
	}
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.from === 'content' && request.method === 'getAccessToken'){
    	accessToken = zeneAuth.getAccessToken();
        sendResponse(accessToken);
        return true;
    }
    else
    	return false;
})
