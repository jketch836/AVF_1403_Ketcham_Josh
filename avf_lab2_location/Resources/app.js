//require api and crud info
var geo = require('geo_api');
var box = require('storage');

// created tab group
var theTabs = Ti.UI.createTabGroup();

//create window1
var win1 = Ti.UI.createWindow({
	title : 'NY Times',
	backgroundColor : '#fff'
});

// created character tab
var timesTab = Ti.UI.createTab({
	title : 'NY Times Stories',
	window : win1
});

//Scroll View Start
var timesScroll1 = Ti.UI.createScrollView({
	layout : 'vertical',
	height : '100%',
	width : '100%',
	top : '0%',
	showVerticalScrollIndicator : true
});
//Scroll View End

//listview template start
timesTemplate1 = 
{
	properties : 
	{
		top : '1%',
		height : '7%'
	},
	childTemplates : 
	[
		{
			type : "Ti.UI.Label",
			bindId : 'name',
			properties : 
			{
				color : "black",
				font : 
				{
					fontSize : 13,
					fontFamily : "Arial"
				},
				left : '5%',
				top : '1%'
			}
		}, 
		{
			type : "Ti.UI.Label",
			bindId : 'countryAB',
			properties : 
			{
				color : "black",
				font : 
				{
					fontSize : 11,
					fontFamily : "Arial"
				},
				right : '10%',
				top : '1%'
			},
		},
		{
			type : "Ti.UI.Label",
			bindId : 'latitude',
			properties : 
			{
				color : "black",
				font : 
				{
					fontSize : 10,
					fontFamily : "Arial"
				},
				left : '25%',
				bottom : '1%'
			}
		}, 
		{
			type : "Ti.UI.Label",
			bindId : 'longitude',
			properties : 
			{
				color : "black",
				font : 
				{
					fontSize : 10,
					fontFamily : "Arial"
				},
				right : '25%',
				bottom : '1%'
			}
		}
	]
};
//listview template end

//listview start
var listview1 = Ti.UI.createListView({
	//	search: search,
	top : '0%',
	// height: '500dp',
	templates : {
		'defaultTemplate' : timesTemplate1
	},
	defaultItemTemplate : 'defaultTemplate'
});
//listview end

//listview evt listener start
listview1.addEventListener('itemclick', function() {
		var deleteDIA = Ti.UI.createAlertDialog({
			title : 'Save?',
			buttonNames : ['Save', 'Cancel']
		});
		deleteDIA.show();

		deleteDIA.addEventListener('click', function(a) {
			if (a.index === 0) {
				box.save(name, countryAB, latitude, longitude);
			}
		});
});
//listview evt listener end


//create window2
var win2 = Ti.UI.createWindow({
	title : 'Favorites',
	backgroundColor : '#fff'
});


// created favorite tab
var favTab = Ti.UI.createTab({
	title : 'Favorites',
	window : win2
});

//Scroll View Start
var timesScroll2 = Ti.UI.createScrollView({
	layout : 'vertical',
	height : '100%',
	width : '100%',
	top : '0%',
	showVerticalScrollIndicator : true
});
//Scroll View End

//listview template start
timesTemplate2 = 
{
	properties : 
	{
		top : '1%',
		height : '7%'
	},
	childTemplates : 
	[
		{
			type : "Ti.UI.Label",
			bindId : 'name',
			properties : 
			{
				color : "black",
				font : 
				{
					fontSize : 13,
					fontFamily : "Arial"
				},
				left : '5%',
				top : '1%'
			}
		}, 
		{
			type : "Ti.UI.Label",
			bindId : 'countryAB',
			properties : 
			{
				color : "black",
				font : 
				{
					fontSize : 11,
					fontFamily : "Arial"
				},
				right : '10%',
				top : '1%'
			},
		},
		{
			type : "Ti.UI.Label",
			bindId : 'latitude',
			properties : 
			{
				color : "black",
				font : 
				{
					fontSize : 10,
					fontFamily : "Arial"
				},
				left : '25%',
				bottom : '1%'
			}
		}, 
		{
			type : "Ti.UI.Label",
			bindId : 'longitude',
			properties : 
			{
				color : "black",
				font : 
				{
					fontSize : 10,
					fontFamily : "Arial"
				},
				right : '25%',
				bottom : '1%'
			}
		}
	]
};
//listview template end

//creating row for favories listview
var seclist2 = Ti.UI.createListSection({
});

//listview start
var listview2 = Ti.UI.createListView({
	//	search: search,
	top : '0%',
	// height: '500dp',
	templates : {
		'defaultTemplate' : timesTemplate2
	},
	defaultItemTemplate : 'defaultTemplate'
});
//listview end



//Main Code
seclist2.setItems(box.geoData);
listview2.sections = [seclist2];
timesScroll2.add(listview2);
timesScroll1.add(listview1);
win2.add(timesScroll2);
win1.add(timesScroll1);
theTabs.addTab(timesTab);
theTabs.addTab(favTab);
theTabs.open();