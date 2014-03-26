var aWin = Ti.UI.createWindow({
	center : '0%',
	height : '35%',
	width : '35%',
	backgroundColor : '#fff',
	borderRadius : '7%'
});

var close = Ti.UI.createLabel({
	top : '3%',
	left : '3%',
	text : 'Close',
		font : {
		fontStyle : 'Helvetica',
		fontSize : '18dp'
	},
	color : '#0000CD'
});

close.addEventListener('click', function(){
	aWin.close();
});

var infoLBL = Ti.UI.createLabel({
	center : '0%',
	left : '10%',
	right : '10%',
	text : '32-Bit Weather was inspired by a many other weather apps. It shows the current weather where you are, as well as the humidity and 7-Day forecast. I hope you enjoy it!',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '22dp'
	},
	color : '#000'
});

aWin.add(close, infoLBL);
aWin.open();