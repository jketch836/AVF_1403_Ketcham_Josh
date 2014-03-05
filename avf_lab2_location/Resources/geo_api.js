var callGeo = function(){
	Ti.Geolocation.purpose = "Your location is needed to gather lat/long coords.";
	Ti.Geolocation.getCurrentPosition(function(e){
		var lat = e.coords.latitude;
		var lng = e.coords.longitude;
		var coordinateLabel = Ti.UI.createLabel({
			color: '#fff',
			text: 'Latitude: ' + lat + ', Longitude: ' + lng,
			height: Ti.UI.SIZE,
			textAlign: 'center',
			font: {
				fontSize: '20dp',
				fontWeight: 'bold'
			} 
		});
		myView.add(coordinateLabel);
	});
};
Ti.Geolocation.addEventListener('location', callGeo);