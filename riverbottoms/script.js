var map, infoWindow, userMarker, bridge;

// show directions from user's location
function showDirections(directionsService, directionsDisplay, currentPos) {
	var dest = new google.maps.LatLng(45.599447, -93.635583);
	
	var request = {
		origin: currentPos,
		destination: dest,
		travelMode: google.maps.TravelMode.DRIVING
	};
  
	directionsService.route(request, function(result, status) {
		if (status == 'OK') {
			directionsDisplay.setDirections(result);
		}
	});
}

document.getElementById('directions_btn').addEventListener('click', showDirections);

// initialize the map
function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 45.598284,
            lng: -93.637643
        },
        zoom: 16,
        mapTypeId: 'hybrid',
        scaleControl: true,
        mapTypeControl: false
    });
	
	directionsDisplay.setMap(map);
	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var currentPos = {
			  lat: position.coords.latitude,
			  lng: position.coords.longitude
			};
			
			document.getElementById('directions_btn').style.display = 'block';
			document.getElementById('directions_btn').addEventListener('click', function() {
				showDirections(directionsService, directionsDisplay, currentPos);
			});
		}, function() {
			handleLocationError(true, markerme);
		});
    } else {
		// Browser doesn't support Geolocation
		window.alert('Geolocation is not supported');
    }

    infoWindow = new google.maps.InfoWindow;

    setUserPosition();
    dropBreadcrumb();

    setInterval(function () {
        setUserPosition();
    }, 10000);

    setInterval(function () {
        dropBreadcrumb();
    }, 30000);

    var propertyCoords = [
            // northeast
        {
            lat: 45.60023204541853,
            lng: -93.6355266601002
    	},
            // southeast
        {
            lat: 45.5965574726782,
            lng: -93.63567686380502
    	},
            // southwest
        {
            lat: 45.596425161049446,
            lng: -93.64065504373718
    	},
            // northwest
        {
            lat: 45.60007534613013,
            lng: -93.64054775537687
    	}
    ];

    var propertyOutline = new google.maps.Polygon({
        map: map,
        paths: propertyCoords,
        strokeColor: '#ffffff',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#ffffff',
        fillOpacity: 0.05
    });

    var twoTrackRoadCoords = [
        {
            lat: 45.599682,
            lng: -93.636275
        }, {
            lat: 45.599814,
            lng: -93.636555
        }, {
            lat: 45.600031,
            lng: -93.636971
        }, {
            lat: 45.600074,
            lng: -93.637167
        }, {
            lat: 45.600093,
            lng: -93.637340
        }, {
            lat: 45.600066,
            lng: -93.637635
        }, {
            lat: 45.599999,
            lng: -93.637909
        }, {
            lat: 45.599643,
            lng: -93.638421
        }, {
            lat: 45.599422,
            lng: -93.638785
        }, {
            lat: 45.599330,
            lng: -93.638860
        }
    ];

    var twoTrackRoadSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: .75,
        strokeColor: '#ffd547',
        scale: 4
    };

    var twoTrackRoadPath = new google.maps.Polyline({
        map: map,
        path: twoTrackRoadCoords,
        icons: [{
            icon: twoTrackRoadSymbol,
            offset: '0',
            repeat: '20px'
            }],
        strokeOpacity: 0
    });
	
    var bridgeCoords = [
	    {
		    lat: 45.597086,
		    lng: -93.638329
	    }, {
		    lat: 45.597013,
		    lng: -93.638323
	    }
    ];
	    
    var bridgeSymbol = {
	    path: 'M -1,0 1,0',
	    strokeColor: '#ef8a0e',
	    strokeOpacity: 1,
	    strokeWeight: 3
	  };
	
    var bridgeIcon = {
	path: 'M20 81 c0 -22 -5 -41 -12 -43 -9 -3 -7 -10 6 -24 14 -13 21 -15 24 -6 5 17 159 17 164 0 3 -9 10 -7 24 6 13 14 15 21 6 24 -7 2 -12 21 -12 43 0 21 -4 39 -10 39 -5 0 -10 -4 -10 -8 0 -13 -47 -32 -80 -32 -33 0 -80 19 -80 32 0 4 -4 8 -10 8 -5 0 -10 -18 -10 -39z m48 -19 c-5 -27 -28 -26 -28 2 0 19 4 24 15 19 9 -3 15 -12 13 -21z m132 3 c0 -28 -17 -34 -27 -9 -3 9 0 20 8 25 19 12 19 12 19 -16z m-100 -10 c0 -8 -4 -15 -10 -15 -5 0 -10 7 -10 15 0 8 5 15 10 15 6 0 10 -7 10 -15z m26 -12 c-10 -10 -19 5 -10 18 6 11 8 11 12 0 2 -7 1 -15 -2 -18z m34 12 c0 -8 -4 -15 -10 -15 -5 0 -10 7 -10 15 0 8 5 15 10 15 6 0 10 -7 10 -15z',
	fillColor: '#ef8a0e',
        fillOpacity: 1,
        scale: 0.1,
	anchor: new google.maps.Point( 200,0 )
    }
	    
    bridge = new google.maps.Polyline({
	map: map,
	path: bridgeCoords,
	icons: [{
	    icon: bridgeIcon,
	    repeat: 0
	}],
	strokeOpacity: 0
    });

    var treeStands = [
        {
            // north central woods
            pos: {
                lat: 45.599802,
                lng: -93.638951
            },
            title: 'Stand 1'
        },
        {
            // northwest river, dry side
            pos: {
                lat: 45.599261,
                lng: -93.639854
            },
            title: 'Stand 2'
        },
        {
            // south-central river, dry side (ladder)
            pos: {
                lat: 45.597295,
                lng: -93.637415
            },
            title: 'Stand 3'
        },
        {
            // southwest river, wet side (south meadow)
            pos: {
                lat: 45.596714,
                lng: -93.639099
            },
            title: 'Stand 4'
        },
        {
            // northwest river, wet side
            pos: {
                lat: 45.598722,
                lng: -93.640116
            },
            title: 'Stand 5'
        }
    ];

    treeStands.forEach(function (i) {
        stand = new google.maps.Marker({
            position: i.pos,
            map: map,
            icon: 'images/tree-stand-icon-blue.png',
            title: i.title
        });
    });

    var cameras = [
        {
            // north-central woods
            pos: {
                lat: 45.599588,
                lng: -93.639768
            }
        }, {
            // northwest woods
            pos: {
                lat: 45.598567,
                lng: -93.640062
            }
        }, {
            // southwest meadow
            pos: {
                lat: 45.596820,
                lng: -93.639388
            }
        }, {
            // south-central river
            pos: {
                lat: 45.597254,
                lng: -93.637563
            }
        }
    ];

//     cameras.forEach(function (i) {
//         stand = new google.maps.Marker({
//             position: i.pos,
//             map: map,
//             icon: 'images/camera-icon-green.png'
//         });
//     });
	
	google.maps.event.addListener(map, 'zoom_changed', function() {
		let zoom = map.getZoom();
		
		// remove the 
		bridge.setMap(null);
				
		if (zoom < 18) {
			bridge = new google.maps.Polyline({
				map: map,
				path: bridgeCoords,
				icons: [{
				    icon: bridgeIcon,
				    repeat: 0
				}],
				strokeOpacity: 0
			    });
		} else {
			bridge = new google.maps.Polyline({
				map: map,
				path: bridgeCoords,
				icons: [{
				    icon: bridgeSymbol,
				    offset: '0',
				    repeat: '5px'
				    }],
				strokeOpacity: 0
			    });
		}
		
		bridge.setMap(map);
	});
}

function setUserPosition() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            if (userMarker) {
                userMarker.setMap(null);
            }

            setTimeout(function () {
                userMarker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    icon: 'images/bowhunter-icon-orange.png'
                });
            }, 150);

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function dropBreadcrumb() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var crumb = new google.maps.Marker({
                position: pos,
                map: map,
                icon: 'images/track-dot-blue.png'
            });

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

jQuery(function($) {
    $('.feature-btn.toggleable').click(function() {
        $('.feature-btn.toggleable').toggle();
    });
    
    $('#return_btn').click(function() {
        location.reload();
    });
});
