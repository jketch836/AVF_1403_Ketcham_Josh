// //require api info
var geo = require('geo_api');

//create window
var win = Ti.UI.createWindow({
	title : 'NY Times Stories',
	backgroundColor : '#fff'
});

//Scroll View Start
var timesScroll = Ti.UI.createScrollView({
	layout : 'vertical',
	height : '94.5%',
	width : '100%',
	top : '4%',
	showVerticalScrollIndicator : true
});
//Scroll View End

//listview template start
timesTemplate = {
	properties : {
		top : '1%',
		height : '7%'
	},
	childTemplates : [{
		type : "Ti.UI.Label",
		bindId : 'name',
		properties : {
			color : "black",
			font : {
				fontSize : 16,
				fontFamily : "Arial"
			},
			left : '7%',
			top : '1%'
		}
	}, {
		type : "Ti.UI.Label",
		bindId : 'country',
		properties : {
			color : "black",
			font : {
				fontSize : 12,
				fontFamily : "Arial"
			},
			right : '10%',
			top : '1%'
		},
	}]
};
//listview template end

//listview start
var listview = Ti.UI.createListView({
	//	search: search,
	top : '0%',
	// height: '500dp',
	templates : {
		'defaultTemplate' : timesTemplate
	},
	defaultItemTemplate : 'defaultTemplate'
});
//listview end

//evt listener start
listview.addEventListener('itemclick', function(e) {




	//calling vraibles from geo_api start
// 
	// var name, issue, desc, isbn, cost, thumbnail1;
	//
	// name = e.section.itemIndex.name;
	// issue = a.rowData.issue;
	// desc = a.rowData.desc;
	// page = a.rowData.page;
	// cost = a.rowData.cost;
	// thumbnail1 = a.rowData.thumbnail1;
// 
	//calling vraibles from geo_api end
// 
	// //create window
	// var evtWin = Ti.UI.createWindow({
		// title : 'NY Times Location',
		// backgroundColor : '#fff'
	// });
// 
	// //back button start
	// var backView = Ti.UI.createView({
		// backgroundColor : "#333",
		// borderRadius : '3%',
		// height : '7%',
		// width : '20%',
		// top : '3%',
		// left : '0%',
		// file : 'app.js'
	// });
// 
	// var backLabel = Ti.UI.createLabel({
		// text : "Back",
		// font : {
			// fontSize : 16,
			// fontFamily : "Helvetica",
			// fontWeight : "bold"
		// },
		// color : "#fff",
		// center : 0,
		// file : 'app.js'
	// });
	// //back button end
// 
	// //city name start
	// var city = Ti.UI.createLabel({
		// text : name,
		// top : '20%',
		// font : {
			// fontSize : 16,
			// fontFamily : "Helvetica",
			// fontWeight : "bold"
		// },
		// color : "#000",
	// });
	// //city name end

	//evt Main Code
	backView.add(backLabel);
	// evtWin.add(backView, city);
	evtWin.open();
});
//evt listener end

//Main Code
timesScroll.add(listview);
win.add(timesScroll);
win.open();

