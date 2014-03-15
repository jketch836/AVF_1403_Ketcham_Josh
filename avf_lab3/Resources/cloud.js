var Cloud = require('ti.cloud');
var cData = [];

//Window Start
var cloudWin = Ti.UI.createWindow({
	title : 'Cloud Store',
	backgroundColor : 'red'
});
exports.cloudWin = cloudWin;
//Window End

//Search Bar Start
var searchbar = Ti.UI.createSearchBar({
	top : 0,
	hintText : 'Search',
	barColor : '#fff'
});
//Search Bar End

//Table Start
var cloudTable = Ti.UI.createTableView({
	search : searchbar,
	font : {
		fontStyle : 'Helvetica',
		fontSize : 18
	}
});
//Table End

cloudTable.addEventListener("scrollend", function() {
	var nData = [];
		cloudTable.setData(nData);
	var id, name, longitude, latitude;
	//getting data from the cloud
	Cloud.Places.search({
	}, function(e) {
		if (e.success) {
			cloudTable.data = [];
			for (var i = 0; i < e.places.length; i++) {
				var place = e.places[i];
				id = place.id;
				name = place.name;
				lng = place.longitude;
				lat = place.latitude;

				var rows = Ti.UI.createTableViewRow({
					height : '5%',
					title : name,
					name : name,
					lat : lat,
					lng : lng,
					id : id
				});

				nData.push(rows);
			}
			cloudTable.data = nData;
		} else {
			alert('Error');
		}
	});
	cloudTable.setData(cData);
	alert("Cloud Storage has been Updated");
});

//timesTable evt listener start
cloudTable.addEventListener('click', function(a) {
	var sWin = Ti.UI.createWindow({
		height : '70%',
		width : '90%'
	});

	var id, name, longitude, latitude;

	id = a.rowData.id;
	name = a.rowData.name;
	longitude = a.rowData.lng;
	latitude = a.rowData.lng;

	console.log(name);

	///////////// views START /////////////
	var viewbng = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		backgroundColor : "black",
		borderRadius : '15%'
	});
	var views = Ti.UI.createView({
		backgroundColor : "#fff",
		width : '85%',
		height : '85%',
		borderRadius : '15%'
	});
	///////////// views END /////////////

	//delete button start
	var deleteBTN = Ti.UI.createButton({
		title : "DELETE",
		top : '2%',
		right : '7.5%',
		font : {
			fontSize : 20
		},
		color : "#FF0000"
	});

	deleteBTN.addEventListener('click', function() {
		var deleteDIA = Ti.UI.createAlertDialog({
			title : 'Delete Location?',
			buttonNames : ['Delete', 'Cancel']
		});
		deleteDIA.show();
		deleteDIA.addEventListener('click', function(a) {
			//delete from cloud loop
			if (a.index === 0) {
				Cloud.Places.remove({
					place_id : id
				}, function(a) {
					if (a.success) {
						alert(name + ' has been deleted from the Cloud');
						cloudTable.setData(cData);
						views.visible = false;
						viewbng.visible = false;
						sWin.close();
					} else if (a.error) {
						alert('error');
					}
				});
			} else {null;
			}

		});

	});
	//delete button end

	//cancel button start
	var cancelBTN = Ti.UI.createButton({
		title : 'CANCEL',
		top : '2%',
		left : '7.5%',
		font : {
			fontSize : 20,
			fontWeight : 'bold'
		},
		color : '#00CED1'
	});
	cancelBTN.addEventListener('click', function() {
		views.visible = false;
		viewbng.visible = false;
		sWin.close();
	});
	//cancel button end

	//Map views start
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
		regionFit : true,
		width : '100%'
	});
	//Map views end

	//Labels Begin
	var titleView = Ti.UI.createLabel({
		top : '0%',
		left : '0%',
		text : name,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '36%',
			fontWeight : 'bold'
		},
		color : '#fff'
	});

	var idLabel = Ti.UI.createLabel({
		top : '45%',
		left : '7%',
		text : 'ID: ' + id,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '25%'
		},
		color : '#fff'
	});
	//Labels End

	//View to hold all the labels
	var textView = Ti.UI.createView({
		top : '69.9%',
		height : Ti.UI.FILL,
		width : '100%',
		backgroundColor : '#000'
	});
	textView.add(titleView, idLabel);

	//EventListener Main Code
	views.add(mapview, textView);
	viewbng.add(views, cancelBTN, deleteBTN);
	sWin.add(viewbng);
	sWin.open();
});

cloudTable.setData(cData);
cloudWin.add(cloudTable);