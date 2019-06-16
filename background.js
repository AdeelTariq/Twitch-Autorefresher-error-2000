let myBrowser = null;
try {
  myBrowser = browser;
} catch(e) {
  myBrowser = chrome;
}

myBrowser.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.text == "Please refresh") {
	ping("api.github.com", function(m){ if (m) chrome.tabs.reload(sender.tab.id); });
        //chrome.tabs.reload(sender.tab.id);
        sendResponse({ text: "You got it" });
    }
});

/* Wait for a ping from github api to only tigger refresh when online */
function ping(host, pong) {

  var http = new XMLHttpRequest();

  http.open("GET", "http://" + host, /*async*/true);
  http.onreadystatechange = function() {

    if (http.readyState == 4) {
      
	if (http.status == 200) {
	      if (pong != null) {
		pong(true);
	      }
	}
    }
  };
  try {
    http.send(null);
  } catch(exception) {
    // this is expected
  }
}
