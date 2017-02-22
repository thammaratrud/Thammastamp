myApp.controller('viewTeamsController', ['$scope', '$cordovaGeolocation', 'viewTeamsService','$timeout','$window', function ($scope, $cordovaGeolocation, viewTeamsService, $timeout, $window) {
    var imgPathPrefix = '';
    var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(13.9339768, 100.7178051),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    $scope.markers = [];
    var viewTeams = [];
    var infoWindow = new google.maps.InfoWindow();
    $scope.readTeamView = function () {
        viewTeamsService.getviewTeam().then(function (results) {
            //alert("Success");
            // console.log(results);
            viewTeams = results.data;
            // console.log(viewTeams);
            for (i = 0; i < viewTeams.length; i++) {
                createMarker(viewTeams[i]);
            }
        }, function (error) {
            alert(error.data.message);
        });
        $timeout(function () {
            $window.location.reload(true)
        }, 20000);
    };
    $scope.readTeamView();



    //Data
    // var viewTeams = [{
    //     img: 'img/simson.png',
    //     FirstName: 'Sarayut',
    //     LastName: 'Kungsaranuwat',
    //     lat: 13.9338700,
    //     long: 100.7179009
    // }, {

    //     img: 'img/simson.png',
    //     FirstName: 'Sarayut2',
    //     LastName: 'Kungsaranuwat2',
    //     lat: 13.9359000,
    //     long: 100.7180000
    // }, {
    //     img: 'img/simson.png',
    //     FirstName: 'Sarayut3',
    //     LastName: 'Kungsaranuwat3',
    //     lat: 13.9400053,
    //     long: 100.7211000
    // }, {
    //     img: 'img/simson.png',
    //     FirstName: 'Sarayut4',
    //     LastName: 'Kungsaranuwat4',
    //     lat: 13.9290659,
    //     long: 100.7180381
    // }, {
    //     img: 'https://scontent.fbkk2-1.fna.fbcdn.net/hprofile-xpa1/v/t1.0-1/p50x50/12347757_10206676548065814_2098605460348825831_n.jpg?_nc_ad=z-m&oh=c0441b0bca9468d66be86358a14a362f&oe=573DA29D',
    //     FirstName: 'Sarayut5',
    //     LastName: 'Kungsaranuwat5',
    //     lat: 13.9345659,
    //     long: 100.7155331

    // }];






    var createMarker = function (info) {
        // console.log('info' + JSON.stringify(info.dateTimeIn));
        var dateObj = new Date();
        var dateOld = new Date(info.dateTimeIn);
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var monthCheck = dateOld.getUTCMonth() + 1;
        var dayCheck = dateOld.getUTCDate();
        var yearCheck = dateOld.getUTCFullYear();
        // newdate = year + "/" + month + "/" + day;
        if (day === dayCheck && month === monthCheck && year === yearCheck) {

            var pictureLabel = document.createElement("img");
            pictureLabel.src = info.user.profileImageURL;
            pictureLabel.width = 40;
            pictureLabel.height = 40;
            var marker = new MarkerWithLabel({
                position: new google.maps.LatLng(info.Lat, info.Long),


                map: $scope.map,
                icon: null,
                title: info.user.displayName,
                draggable: true,
                raiseOnDrag: true,
                labelContent: pictureLabel,
                labelAnchor: new google.maps.Point(20, 50),
                labelClass: "labels", // the CSS class for the label
                labelStyle: {
                    opacity: 0.90
                }
            });

            // alert(info.Lat);
            // alert(info.Long);


            google.maps.event.addListener(marker, 'mousedown', function () {
                infoWindow.setContent(marker.title);
                infoWindow.open($scope.map, marker);
            });

            $scope.markers.push(marker);
            console.log($scope.markers);
        }

        // var icon = info.img;
        // var marker = new google.maps.Marker({
        //     map: $scope.map,
        //     position: new google.maps.LatLng(info.lat, info.long),
        //     icon: icon,
        //     title: info.FirstName + " " + info.LastName
        // });

        // console.log(marker);
    }




}]);
