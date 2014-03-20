// Ti.Gesture.orientation = Ti.UI.LANDSCAPE;
// require JS files
var data = require('data');

var wWin = Ti.UI.createWindow({
	title : "WeatherWindow",
	orientationModes : [Ti.UI.LANDSCAPE_RIGHT],
	backgroundColor : '#7D9EC0'
});

var viewbng = Ti.UI.createView({
	width : Ti.UI.FILL,
	height : Ti.UI.FILL,
	backgroundColor : "black",
	borderRadius : '15%'
});
viewbng.add(data.mainNight);


wWin.add(viewbng);
wWin.open(); 