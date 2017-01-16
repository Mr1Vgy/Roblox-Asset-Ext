// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
   
    var tab = tabs[0];

    
    var url = tab.url;

    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

function txt(nam, newt){
	document.getElementById(nam).textContent = newt;
}
 
var catLen = "https://www.roblox.com/catalog/".length;
var libLen = "https://www.roblox.com/library/".length;
var infoUrl = "https://api.roblox.com/Marketplace/ProductInfo?assetId=";
var test = "https://api.roblox.com/Marketplace/ProductInfo?assetId=1818";

function setNewUrl(url){
	//var iframe = document.getElementById("iff");
	//iframe.src = url;
	//txt("tx", "this is t: "+iframe.src.document.text)
} 


function getText(rep, toSearch, endRemove){
	var pos = (rep.search(toSearch));
	var end = pos;
	for (i = pos; i <= rep.length; i++){
		var ch = rep.charAt(i);
		if (ch == endRemove){
			end = i;
			break;
		}
	}
	return rep.substring(pos, end);
}


document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
	var notItem = "This is not a ROBLOX Asset";
	if (url.includes("roblox")){
		if (url.includes("/catalog/")|| url.includes("/library/") ){
			var lastSlash = 0;
			for (i = 0; i <= url.length; i++){
				var loc = url.charAt(i);
				if (loc == "/" && i >= libLen){
					lastSlash = i;
					break;
				}
			}
			if (url.includes("/catalog/")){
				chunk = url.substring(catLen, lastSlash);
			}
			else if (url.includes("/library/")){
				chunk = url.substring(libLen, lastSlash);
			}
			
			
			var xhr = new XMLHttpRequest();
			xhr.open("GET", infoUrl+chunk, false);
			xhr.send();
			var rep = xhr.responseText;
			//txt("tx", rep);
			
			//txt("test", );
			var priceG = getText(rep, "PriceInRobux", ",");
			var price = priceG.substring(14, priceG.length);
			txt("price", "Price: " + price + " Robux")
			
			
			var sales = getText(rep, "Sales", ",");
			var neww = sales.replace('"', "");
			var roe = neww.substring(6, neww.length);
			txt("sales", "Sales: "+roe);
			roe = Math.ceil(price*((roe/100)*70))
			txt("roEarned", "Robux earned: " + roe + " Robux");
			var nameG = getText(rep, "Name", ",")
			var name = nameG.substring(7, nameG.length);
			name = name.replace('"', "")
			txt("h3", "Item: " + name)
			
			
			//txt("tx", info)
			
			//txt("tx",$.get(test, function(data){alert("Data: " + data);}, "html"));
			//setNewUrl(infoUrl+chunk)
		}
		else{
			txt("h3", notItem);
		}
	}
	else{
		txt("h3", notItem);
	}
  });
});


