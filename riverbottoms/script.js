var map, infoWindow, userMarker;

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
            lat: 45.599615,
            lng: -93.636313
        }, {
            lat: 45.599962,
            lng: -93.636770
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
	path: 'M298.666667 597.333333v-131.84c-30.72-14.08-59.306667-31.146667-85.333334-51.2V597.333333h85.333334m-85.333334 170.666667H128v-85.333333H42.666667v-85.333334h85.333333V298.666667h85.333333v61.013333C290.133333 426.666667 395.52 469.333333 512 469.333333c116.48 0 221.866667-42.666667 298.666667-109.653333V298.666667h85.333333v298.666666h85.333333v85.333334h-85.333333v85.333333h-85.333333v-85.333333H213.333333v85.333333m512-302.506667V597.333333h85.333334V414.293333c-26.026667 20.053333-54.613333 37.12-85.333334 51.2M682.666667 597.333333v-114.346666c-27.306667 9.813333-55.893333 17.066667-85.333334 22.186666V597.333333h85.333334m-128 0v-87.04L512 512l-42.666667-1.706667V597.333333h85.333334m-128 0v-92.16c-29.44-5.12-58.026667-12.373333-85.333334-22.186666V597.333333h85.333334z',
	strokeColor: '#ef8a0e',
	strokeOpacity: 1
    }
	    
    var bridge = new google.maps.Polyline({
        map: map,
        path: bridgeCoords,
        icons: [{
            icon: bridgeSymbol,
            offset: '0',
            repeat: '5px'
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
		
		if (zoom < 20) {
			bridge.icons = [{
			    icon: bridgeIcon,
			    repeat: 0
		    	}];
		} else {
			bridge.icons = [{
			    icon: bridgeSymbol,
			    repeat: '5px'
			}];
		}
	}
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
