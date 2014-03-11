(function() { 
	// load the Cloud Module
	var Cloud = require('ti.cloud');
	// set .debug property to 'true' as we are in Development mode
	Cloud.debug = true;
	var loginUser = function(){
		Cloud.Users.login({
			login: 'com.fullsail.demoApp',
			password: '12345'
		}, function(e){
			// use .info method to view login info in the Console, if successful
			if (e.success){
				var user = e.users[0];
				Ti.API.info('Success!\n' + 
					'ACS User ID: ' + user.id + '\n' + 
					'ACS App sessionId: ' + Cloud.sessionId + '\n' + 
					'ACS App Username: ' + user.username);
			} else {
				alert((e.error && e.message) || JSON.stringify(e));
			}
		});
	}; // loginUser ends
	loginUser();
	// now your app is ready to access ACS network and data services
})();



//APP.JS
//requiring JS files
var map = require('RemoteData');
var fav = require('fav');

//Create Window
var mainWin = Ti.UI.createWindow({
	title : "Main Window"
});

//view start
var titleView = Ti.UI.createView({
	borderRadius : '5%',
	center : '0%',
	height : '40%',
	width : '60%',
	backgroundColor : '#fff'
});

var titleLabel = Ti.UI.createLabel({
	text : "Picture Power",
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
		title : 'Pictures',
		window : map.mapWin
	});

	// created favorite tab
	var favTab = Ti.UI.createTab({
		title : 'Stored',
		window : fav.favWin
	});
	
	//Tabs Main Code
	theTabs.addTab(mTab);
	theTabs.addTab(favTab);
	theTabs.open();
});
titleView.add(titleLabel, enterBTN);
//view end

//Window Main Code
mainWin.add(titleView);
mainWin.open();



//REMOTEDATA.JS
//window start
var mapWin = Ti.UI.createWindow({
	title : "Info"
});
exports.mapWin = mapWin;
//window end

//this View holds the map
var theMapView = Ti.UI.createView({
	top : '10%',
	height : '60%',
	width : '100%'
});

//Start GEOLOC and remotedata pull func
var runGeo = function() {
	//Start GEOLOC func
	Ti.Geolocation.purpose = "Your location is needed to find places near you.";

	Ti.Geolocation.getCurrentPosition(function(e) {
		if (Ti.Geolocation.locationServicesEnabled) {
		} else {
			alert("Location service is not enabled.");
		};
		if (e.error) {
			alert("Cannot get your location. Trying to connect...");
		} else {
			var lat = e.coords.latitude;
			var lng = e.coords.longitude;
			var url = "http://api.wikilocation.org/articles?lat=" + lat + "&lng=" + lng;
			console.log(url);
			var coordinateLabel = Ti.UI.createLabel({
				color : '#fff',
				// text : 'Latitude: ' + lat + ', Longitude: ' + lng,
				height : Ti.Platform.displayCaps.platformHEIGHT,
				textAlign : 'center',
				font : {
					fontSize : '20dp',
					fontWeight : 'bold'
				}
			});
		}
		// End GEOLOC func

		// Start remotedata pull
		var info = [];
		var remoteResponse = function() {
			// Response function code
			json = JSON.parse(this.responseText);
			var articlejson = json.articles;
			for (var i = 0; i < articlejson.length; i++) {
				title = articlejson[i].title;
				lat = articlejson[i].lat;
				lng = articlejson[i].lng;
				type = articlejson[i].type;
				dist = articlejson[i].distance;

				console.log(lat);
				console.log(lng);
				
				info.push({
					properties : {
						title : title,
						lat : lat,
						lng : lng,
						dist : dist,
						type : type
					},
					title : {
						text : title
					},
					lat : {
						text : lat
					},
					lng : {
						text : lng
					},
					dist : {
						text : dist
					},
					type : {
						text : type
					}
				});
			}
			var Map = require('ti.map');
			var view = Map.createAnnotation({
				latitude : lat,
				longitude : lng
			});
			var mapview = Map.createView({
				mapType : Map.NORMAL_TYPE,
				annotations : [view],
				region : {
					latitude : lat,
					longitude : lng,
					latitudeDelta : 0.1,
					longitudeDelta : 0.1
				},
				enableZoomControls : true,
				regionFit : true
			});

			theMapView.add(mapview);

			//pushing rows to table
			secList.setItems(info);
		};

		//if there is a problem pulling the data
		var remoteError = function(e) {
			Ti.API.debug("Status: " + this.status);
			Ti.API.debug("Text: " + this.responseText);
			Ti.API.debug("Error: " + e.error);
			alert("There is a problem connecting to the Internet");
		};

		//getting the data
		var xhr = Ti.Network.createHTTPClient({
			onload : remoteResponse,
			onerror : remoteError,
			timeout : 5000
		});
		mapWin.add(coordinateLabel);

		xhr.open("GET", url);
		xhr.send();
	});

};
// End remote data pull
// End GEOLOC and remotedata pull func

//Run GEOLOC and remotedata pull func
runGeo();

//the Scroll View for
var characterScroll = Ti.UI.createScrollView({
	layout : 'vertical',
	height : '100%',
	width : '100%',
	showVerticalScrollIndicator : true
});

flcikrListTemplate = {
	properties : {
		top : '20%',
		height : '20%'
	},
	childTemplates : [{
		type : "Ti.UI.View",
		bindId : 'theMapView',
		properties : {
			width : '100%',
			height : '100%',
			left : '10%',
			top : '0%'
		}
	}, {
		type : "Ti.UI.Label",
		bindId : 'title',
		properties : {
			color : "black",
			font : {
				fontSize : '18%',
				fontFamily : "Arial",
				fontWeight : "bold"
			},
			left : '8%',
			top : '25%'
		}
	}, {
		type : "Ti.UI.Label",
		bindId : 'type',
		properties : {
			color : "black",
			font : {
				fontSize : '16%',
				fontFamily : "Arial"
			},
			right : '20%',
			top : '25%'
		}
	}, {
		type : "Ti.UI.Label",
		bindId : 'dist',
		properties : {
			color : "grey",
			font : {
				fontSize : '16%',
				fontFamily : "Arial"
			},
			right : '3%',
			top : '25%'
		}
	}]
};

var secList = Ti.UI.createListSection({
});
var infoListView = Ti.UI.createListView({
	templates : {
		'defaultTemplate' : flcikrListTemplate
	},
	defaultItemTemplate : 'defaultTemplate'
});

//Main Code
infoListView.sections = [secList];
characterScroll.add(infoListView);
mapWin.add(characterScroll);
mapWin.open();



