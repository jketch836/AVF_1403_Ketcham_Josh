var dataB = Ti.Database.open('GeoDB');
dataB.execute('CREATE TABLE IF NOT EXISTS location(id INTEGER PRIMARY KEY, name TEXT, population TEXT, longitude INTEGER, latitude INTEGER, distance TEXT, county TEXT, state TEXT)');

//Window Start
var pWin = Ti.UI.createWindow({
	title : 'Photos',
	backgroundColor : '#fff'
});
exports.pWin = pWin;
//Window End

//the Scroll View for
var characterScroll = Ti.UI.createScrollView({
	layout : 'vertical',
	height : '100%',
	width : '100%',
	showVerticalScrollIndicator : true
});

geoListTemplate = {
	properties : {
		top : '20%',
		height : '75dp'
	},
	childTemplates : [{
		type : "Ti.UI.View",
		bindId : 'theMapView',
		properties : {
			width : '20%',
			height : '20%',
			left : '5%',
			top : '0%'
		}
	}, {
		type : "Ti.UI.Label",
		bindId : 'name',
		properties : {
			color : "black",
			font : {
				fontSize : '18%',
				fontFamily : "Arial",
				fontWeight : "bold"
			},
			left : '15%',
			top : '20%'
		}
	}, {
		type : "Ti.UI.Label",
		bindId : 'county',
		properties : {
			color : "black",
			font : {
				fontSize : '16%',
				fontFamily : "Arial"
			},
			left : '15%',
			top : '60%'
		}
	}, {
		type : "Ti.UI.Label",
		bindId : 'us',
		properties : {
			color : "black",
			font : {
				fontSize : '16%',
				fontFamily : "Arial"
			},
			right : '10%',
			top : '20%'
		}
	},{
		type : "Ti.UI.Label",
		bindId : 'population',
		properties : {
			color : "black",
			font : {
				fontSize : '16%',
				fontFamily : "Arial"
			},
			right : '10%',
			top : '60%'
		}
	}]
};

var secList = Ti.UI.createListSection({
});
var infoListView = Ti.UI.createListView({
	templates : {
		'defaultTemplate' : geoListTemplate
	},
	defaultItemTemplate : 'defaultTemplate'
});

//Main Code
infoListView.sections = [secList];
characterScroll.add(infoListView);
mapWin.add(characterScroll);
mapWin.open();