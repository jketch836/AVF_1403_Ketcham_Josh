var mWin = Ti.UI.createWindow({
	//height : '100%',
	//width : '100%',
	backgroundColor : '#fff',
	layout: 'vertical'
});

var sampleLabel = Ti.UI.createLabel({
	top : '3%',
	left : '1%',
	text : "Simple Mobile App Demo",
	font: {fontSize: 24, fontFamily: "Helvetica", fontWeight: "bold"},
	color: "#000"
});

var image = Ti.UI.createImageView({
	bottom : '9%',
	right : '5%',
	height : '10%',
	width : '10%',
	image : 'IMG_0180.jpg'
});

var nameLabel = Ti.UI.createLabel({
	bottom : '5%',
	right : '5%',
	text : "Josh Ketcham",
	font: {fontSize: 20, fontFamily: "Helvetica", fontWeight: "bold"},
	color: "#000"
});

var courseLabel = Ti.UI.createLabel({
	bottom : '2%',
	right : '5%',
	text : "AVF 1402",
	font: {fontSize: 18, fontFamily: "Helvetica", fontWeight: "bold"},
	color: "#000"
});


mWin.add(sampleLabel, image, nameLabel, courseLabel);
// mWin.add();
// mWin.add();
// mWin.add();
mWin.open();