document.body.onload = function() {
  chrome.storage.sync.get(["data","num"], function(items) {
    if (!chrome.runtime.error) {
      console.log(items);
      // document.getElementById("data").innerText = items.data;
      // document.getElementById("num").innerText = items.num;
      inner = "Current selection: " + items.data + " showing " + items.num + " articles";
      document.getElementById("select").innerText = inner;
      document.getElementById("step2").innerText = "Step 2: At the end of your email click the ZeneBird button in your compose editor to insert the last " + items.num + " articles!";
    }
  });
}

document.getElementById("set").onclick = function() {
  var d = document.getElementById("blogChoice").value;
  chrome.storage.sync.set({ "data" : d }, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
  var n = document.getElementById("noArticles").value;
  chrome.storage.sync.set({ "num" : n }, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
  });
  });
  window.close();
}