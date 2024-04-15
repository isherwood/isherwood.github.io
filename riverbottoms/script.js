var map, infoWindow, userMarker, bridge;

// show directions from user's location
function showDirections(directionsService, directionsDisplay, currentPos) {
    const dest = new google.maps.LatLng(45.599447, -93.635583);

    const request = {
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
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    let map = new google.maps.Map(document.getElementById('map'), {
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
            const currentPos = {
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

    setInterval(function() {
        setUserPosition();
    }, 10000);

    setInterval(function() {
        dropBreadcrumb();
    }, 30000);

    const propertyCoords = [
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
            lat: 45.600077,
            lng: -93.64045
        },
        // north central
        {
            lat: 45.60018,
            lng: -93.63715
        },
        // north notch
        {
            lat: 45.60018,
            lng: -93.63715
        }
    ];

    const propertyOutline = new google.maps.Polygon({
        map: map,
        paths: propertyCoords,
        strokeColor: '#ffffff',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#ffffff',
        fillOpacity: 0.05
    });

    const twoTrackCoords = [{
        lat: 45.599682,
        lng: -93.636275
    }, {
        lat: 45.599723,
        lng: -93.636395
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
    }];

    const twoTrackSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: .75,
        strokeColor: '#ffd547',
        scale: 4
    };

    const twoTrackPath = new google.maps.Polyline({
        map: map,
        path: twoTrackCoords,
        icons: [{
            icon: twoTrackSymbol,
            offset: '0',
            repeat: '20px'
        }],
        strokeOpacity: 0
    });

	const atvTrailCoords = [{
		lat: 45.599723,
		lng: -93.638441
	}, {
		lat: 45.599725,
		lng: -93.638483
	}, {
		lat: 45.599773,
		lng: -93.638647
	}, {
		lat: 45.599816,
		lng: -93.638719
	}, {
		lat: 45.599817,
		lng: -93.638773
	}, {
		lat: 45.599824,
		lng: -93.638798
	}, {
		lat: 45.599848,
		lng: -93.638814
	}, {
		lat: 45.599869,
		lng: -93.638841
	}, {
		lat: 45.599882,
		lng: -93.638895
	}, {
		lat: 45.599900,
		lng: -93.638923
	}, {
		lat: 45.599953,
		lng: -93.638937
	}, {
		lat: 45.600027,
		lng: -93.638936
	}, {
		lat: 45.600084,
		lng: -93.638996
	}, {
		lat: 45.600068,
		lng: -93.639053
	}, {
		lat: 45.600060,
		lng: -93.639155
	}, {
		lat: 45.600059,
		lng: -93.639224
	}, {
		lat: 45.600028,
		lng: -93.639317
	}, {
		lat: 45.600040,
		lng: -93.639371
	}, {
		lat: 45.600005,
		lng: -93.639446
	}, {
		lat: 45.600016,
		lng: -93.639580
	}, {
		lat: 45.600034,
		lng: -93.639623
	}, {
		lat: 45.600029,
		lng: -93.639694
	}, {
		lat: 45.600036,
		lng: -93.639769
	}, {
		lat: 45.600003,
		lng: -93.639840
	}, {
		lat: 45.600000,
		lng: -93.639871
	}, {
		lat: 45.599952,
		lng: -93.639997
	}, {
		lat: 45.599970,
		lng: -93.640083
	}, {
		lat: 45.599962,
		lng: -93.640185
	}, {
		lat: 45.599942,
		lng: -93.640234
	}, {
		lat: 45.599886,
		lng: -93.640298
	}, {
		lat: 45.599814,
		lng: -93.640427
	}, {
		lat: 45.599766,
		lng: -93.640460
	}, {
		lat: 45.599693,
		lng: -93.640463
	}, {
		lat: 45.599623,
		lng: -93.640454
	}, {
		lat: 45.599562,
		lng: -93.640465
	}, {
		lat: 45.599528,
		lng: -93.640485
	}, {
		lat: 45.599469,
		lng: -93.640460
	}, {
		lat: 45.599381,
		lng: -93.640507
	}, {
		lat: 45.599272,
		lng: -93.640541
	}, {
		lat: 45.599216,
		lng: -93.640520
	}, {
		lat: 45.599148,
		lng: -93.640561
	}, {
		lat: 45.599111,
		lng: -93.640537
	}, {
		lat: 45.599110,
		lng: -93.640476
	}, {
		lat: 45.599140,
		lng: -93.640391
	}, {
		lat: 45.599135,
		lng: -93.640341
	}, {
		lat: 45.599140,
		lng: -93.640245
	}, {
		lat: 45.599121,
		lng: -93.640119
	}, {
		lat: 45.599108,
		lng: -93.639989
	}, {
		lat: 45.599106,
		lng: -93.639785
	}, {
		lat: 45.599089,
		lng: -93.639679
	}, {
		lat: 45.599074,
		lng: -93.639558
	}, {
		lat: 45.599139,
		lng: -93.639502
	}, {
		lat: 45.599280,
		lng: -93.639349
	}, {
		lat: 45.599313,
		lng: -93.639267
	}, {
		lat: 45.599345,
		lng: -93.638958
	}];

    const atvTrailSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: .75,
        strokeColor: '#98958e',
        scale: 4
    };

    const atvTrailPath = new google.maps.Polyline({
        map: map,
        path: atvTrailCoords,
        icons: [{
            icon: atvTrailSymbol,
            offset: '0',
            repeat: '20px'
        }],
        strokeOpacity: 0
    });

    const bridgeCoords = [{
        lat: 45.597086,
        lng: -93.638329
    }, {
        lat: 45.597013,
        lng: -93.638323
    }];

    const bridgeSymbol = {
        path: 'M -1,0 1,0',
        strokeColor: '#ef8a0e',
        strokeOpacity: 1,
        strokeWeight: 3
    };

    const bridgeIcon = {
        path: 'M20 81 c0 -22 -5 -41 -12 -43 -9 -3 -7 -10 6 -24 14 -13 21 -15 24 -6 5 17 159 17 164 0 3 -9 10 -7 24 6 13 14 15 21 6 24 -7 2 -12 21 -12 43 0 21 -4 39 -10 39 -5 0 -10 -4 -10 -8 0 -13 -47 -32 -80 -32 -33 0 -80 19 -80 32 0 4 -4 8 -10 8 -5 0 -10 -18 -10 -39z m48 -19 c-5 -27 -28 -26 -28 2 0 19 4 24 15 19 9 -3 15 -12 13 -21z m132 3 c0 -28 -17 -34 -27 -9 -3 9 0 20 8 25 19 12 19 12 19 -16z m-100 -10 c0 -8 -4 -15 -10 -15 -5 0 -10 7 -10 15 0 8 5 15 10 15 6 0 10 -7 10 -15z m26 -12 c-10 -10 -19 5 -10 18 6 11 8 11 12 0 2 -7 1 -15 -2 -18z m34 12 c0 -8 -4 -15 -10 -15 -5 0 -10 7 -10 15 0 8 5 15 10 15 6 0 10 -7 10 -15z',
        fillColor: '#ef8a0e',
        fillOpacity: 1,
        scale: 0.1,
        anchor: new google.maps.Point(200, 0)
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

    const locations = [{
            title: 'Clint\'s Portable Stand',
            pos: {
                lat: 45.59926,
                lng: -93.63967
            },
            icon: 'images/tree-stand-blue.png'
        },{
            title: 'Old Man Stand',
            pos: {
                lat: 45.59993,
                lng: -93.63896
            },
            icon: 'images/tree-stand-blue.png'
        },
        {
            title: 'Deuce Platform Stand',
            pos: {
                lat: 45.59924,
                lng: -93.64014
            },
            icon: 'images/tree-stand-blue.png'
        },
        {
            title: 'Ladder Portable Stand',
            pos: {
                lat: 45.599613,
                lng: -93.637992
            },
            icon: 'images/tree-stand-blue.png'
        },
        {
            title: 'Penthouse Box Stand',
            pos: {
                lat: 45.597388,
                lng: -93.638744
            },
            icon: 'images/box-stand-blue.png'
        },
        {
            title: 'Five Spot Platform Stand',
            pos: {
                lat: 45.59691,
                lng: -93.63969
            },
            icon: 'images/tree-stand-blue.png'
        },
        {
            title: 'Shooting Bench',
            pos: {
                lat: 45.599116,
                lng: -93.636003
            },
            icon: 'images/sight-orange.png'
        },
        {
            title: '225 Yard Target',
            pos: {
                lat: 45.599370,
                lng: -93.638743
            },
            icon: 'images/target-orange.png'
        },
        {
            title: '300 Yard Target',
            pos: {
                lat: 45.59947,
                lng: -93.63951
            },
            icon: 'images/target-orange.png'
        },
        {
            title: 'Northwest Corner Trail Cam',
            pos: {
                lat: 45.599080,
                lng: -93.640517
            },
            icon: 'images/camera-green.png'
        }
    ];

    locations.forEach(function(i) {
        stand = new google.maps.Marker({
            position: i.pos,
            map: map,
            icon: {
				url: i.icon,
			    anchor: new google.maps.Point(0, 12)
			},
            title: i.title
        });
    });

    google.maps.event.addListener(map, 'zoom_changed', function() {
        const zoom = map.getZoom();

        // remove the bridge icon
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
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            if (userMarker) {
                userMarker.setMap(null);
            }

            setTimeout(function() {
                userMarker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    icon: 'images/bowhunter-orange.png'
                });
            }, 150);

        }, function() {
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
        navigator.geolocation.getCurrentPosition(function(position) {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            const crumb = new google.maps.Marker({
                position: pos,
                map: map,
                icon: 'images/track-dot-blue.png'
            });

        }, function() {
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
