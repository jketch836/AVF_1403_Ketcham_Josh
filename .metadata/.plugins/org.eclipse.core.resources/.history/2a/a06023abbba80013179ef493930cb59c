var dataB = Ti.Database.open('GeoDB');
dataB.execute('CREATE TABLE IF NOT EXISTS location(id INTEGER PRIMARY KEY, name TEXT, population TEXT, longitude INTEGER, latitude INTEGER, distance TEXT, county TEXT, state TEXT)');

//Window Start
var pWin = Ti.UI.createWindow({
	title : 'Photos',
	backgroundColor : '#fff'
});
exports.pWin = pWin;
//Window End

var characterScroll = Ti.UI.createScrollView({
	layout : 'vertical',
	height : '100%',
	width : '100%',
	showVerticalScrollIndicator : true
});


flcikrListTemplate = {
	properties : {
		height : '30%'
	},
	childTemplates : [{
		type : "Ti.UI.View",
		bindId : 'theMapView',
		properties : {
			width : '20%',
			height : '20%',
			left : '1%',
			top : '0%'
		}
	}, {
		type : "Ti.UI.Label",
		bindId : 'title',
		properties : {
			color : "black",
			font : {
				fontSize : 18,
				fontFamily : "Arial",
				fontWeight : "bold"
			},
			left : 85,
			top : 5
		}
	}, {
		type : "Ti.UI.Label",
		bindId : 'title',
		properties : {
			color : "black",
			font : {
				fontSize : 18,
				fontFamily : "Arial",
				fontWeight : "bold"
			},
			left : 85,
			top : 5
		}
	}, {
		type : "Ti.UI.Label",
		bindId : 'dist',
		properties : {
			color : "grey",
			font : {
				fontSize : 14,
				fontFamily : "Arial"
			},
			right : 10,
			top : 10
		}
	}]
};

//API Object Info
var secList = Ti.UI.createListSection({
});
var picListView = Ti.UI.createListView({
	templates : {
		'defaultTemplate' : flcikrListTemplate
	},
	defaultItemTemplate : 'defaultTemplate'
});

picListView.sections = [secList];
characterScroll.add(picListView);
pWin.add(characterScroll);
pWin.open();
