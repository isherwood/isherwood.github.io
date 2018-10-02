var map, infoWindow, userMarker;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 45.598284,
            lng: -93.637643
        },
        zoom: 16,
        mapTypeId: 'hybrid',
        scaleControl: true,
        mapTypeControl: false
    });

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

    var treeStands = [
        {
            // southwest river, wet side (south meadow)
            pos: {
                lat: 45.596714,
                lng: -93.639099
            },
            title: '2'
        }, {
            // south-central river, dry side (ladder)
            pos: {
                lat: 45.597295,
                lng: -93.637415
            },
            title: '3'
        }, {
            // northwest river, dry side
            pos: {
                lat: 45.599261,
                lng: -93.639854
            },
            title: '4'
        }, {
            // north central woods
            pos: {
                lat: 45.599802,
                lng: -93.638951
            },
            title: '1'
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
