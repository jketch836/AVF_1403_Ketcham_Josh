//requiring JS files
var geo = require('geo_api_table');
var sav = require('sav');
var puff = require('cloud');

(function() {
	// load the Cloud Module
	var Cloud = require('ti.cloud');
	// set .debug property to 'true' as we are in Development mode
	Cloud.debug = true;
	var loginUser = function() {
		Cloud.Users.login({
			login : 'com.fullsail.demoApp',
			password : '12345'
		}, function(e) {
			// use .info method to view login info in the Console, if successful
			if (e.success) {
				var user = e.users[0];
				Ti.API.info('Success!\n' + 'ACS User ID: ' + user.id + '\n' + 'ACS App sessionId: ' + Cloud.sessionId + '\n' + 'ACS App Username: ' + user.username);
			} else {
				alert((e.error && e.message) || JSON.stringify(e));
			}
		});
	};
	// loginUser ends
	loginUser();
	// now your app is ready to access ACS network and data services
})();

//Create Window
var mainWin = Ti.UI.createWindow({
	title : "Main Window",
	backgroundColor : '#7D9EC0'
});

//view start
var titleView = Ti.UI.createView({
	borderRadius : '10%',
	center : '0%',
	height : '40%',
	width : '60%',
	backgroundColor : '#fff'
});

var titleLabel = Ti.UI.createLabel({
	text : "NYTIMES GEO",
	font : {
		fontStyle : 'Helvetica',
		fontSize : 36
	}
});

var enterBTN = Ti.UI.createButton({
	title : 'ENTER',
	bottom : '10%',
	center : '0%',
	font : {
		fontStyle : 'Helvetica',
		fontSize : 22
	}
});

enterBTN.addEventListener('click', function() {

	// created tab group
	var theTabs = Ti.UI.createTabGroup();

	// created favorite tab
	var mTab = Ti.UI.createTab({
		title : 'Places',
		window : geo.mapWin
	});

	// created favorite tab
	var savTab = Ti.UI.createTab({
		title : 'Local',
		window : sav.favWin
	});

	// created favorite tab
	var cTab = Ti.UI.createTab({
		title : 'Cloud',
		window : puff.cloudWin
	});

	//Tabs Main Code
	theTabs.addTab(mTab);
	theTabs.addTab(savTab);
	theTabs.addTab(cTab);
	theTabs.open();
});
titleView.add(titleLabel, enterBTN);
//view end

//Window Main Code
mainWin.add(titleView);
mainWin.open(); 