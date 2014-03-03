//Window Start
var win = Ti.UI.createWindow({
});
//Window End

//Search Bar Start
var searchbar = Ti.UI.createSearchBar({
	top : 0,
	hintText : 'Search',
	barColor : '#fff'
});
//Search Bar End

//Table Start
var comicTable = Titanium.UI.createTableView({
	search : searchbar,
	font : {
		fontStyle : 'Helvetica',
		fontSize : 14
	}
});
//export table to marvel_api
exports.comicTable = comicTable;
//Table End

//Main Code
win.add(comicTable);
win.open(); 