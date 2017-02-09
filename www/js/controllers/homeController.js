myApp.controller('homeController', ['$scope', '$interval', '$filter', '$ionicSideMenuDelegate',
    '$ionicPopup', '$ionicLoading', '$location', '$ionicHistory', 'localStorageService', '$timeout', '$state', '$cordovaGeolocation','$http',

    function ($scope, $interval, $filter, $ionicSideMenuDelegate, $ionicPopup, $ionicLoading, $location, $ionicHistory, localStorageService, $timeout, $state, $cordovaGeolocation,$http) {
        $scope.user = localStorageService.get('authorizationData');
        $scope.exitApp = function () {

            var confirmPopup = $ionicPopup.confirm({
                title: 'Confirm exit application',
                template: '<div class="text-center">Are you sure you want to exit?</div>'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    console.log('You are sure');
                    ionic.Platform.ready(function () {
                        // will execute when device is ready, or immediately if the device is already ready.
                    });

                    var deviceInformation = ionic.Platform.device();
                    var isWebView = ionic.Platform.isWebView();
                    var isIPad = ionic.Platform.isIPad();
                    var isIOS = ionic.Platform.isIOS();
                    var isAndroid = ionic.Platform.isAndroid();
                    var isWindowsPhone = ionic.Platform.isWindowsPhone();
                    var currentPlatform = ionic.Platform.platform();
                    var currentPlatformVersion = ionic.Platform.version();

                    ionic.Platform.exitApp(); // stops the app
                } else {
                    console.log('You are not sure');
                }
            });
        }
        $scope.checkIn = function () {
            var Data1 = {
                email: $scope.user.email,
                dateTimeIn: new Date(),
                user:$scope.user
                // dateTimeOut: Data1.dateTimeOut
            };
            // $http.post(serviceBase + '/api/checkins', Data1).success(function (response) {
            //     alert(Data1);
            // }
            $http.post(serviceBase + '/api/checkins', Data1).success(function (response) {


                alert('success');

            }).error(function (err) {
                alert(err);
            })


            // var posOptions = {
            //     timeout: 10000,
            //     enableHighAccuracy: true
            // };
            // var lat = "12";
            // var lng = "12";
            // $ionicLoading.show({
            //     noBackdrop: false,
            //     template: '<p><ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner></p>',
            // });


            // $cordovaGeolocation
            //     .getCurrentPosition(posOptions)
            //     .then(function (position) {

            //         lat = position.coords.latitude;
            //         lng = position.coords.longitude;

            //         //alert("Got position: " + lat + ", " + lng);
            //         // alert(position.coords.latitude);
            //         // alert(position.coords.longitude);

            //         authService.login().then(function (response) {
            //             var chkInData = {
            //                 Email: "",
            //                 LocationIn: lat + "," + lng,
            //             };
            //             checkInService.checkIn(chkInData).then(function (response) {
            //                 //$cordovaDialogs.beep(1);
            //                 $location.path("/views/employeeDetail");
            //                 $ionicLoading.hide();
            //             }, function (response) {
            //                 var errors = [];
            //                 if (response.data.ModelState) {
            //                     for (var key in response.data.ModelState) {
            //                         for (var i = 0; i < response.data.ModelState[key].length; i++) {
            //                             errors.push(response.data.ModelState[key][i]);
            //                         }
            //                     }
            //                 } else {
            //                     errors.push(response.data.Message);
            //                 }
            //                 $scope.message = "Failed to register user due to:" + errors.join(' ');
            //             });


            //         },
            //             function (response) {
            //                 var errors = [];
            //                 if (response.data.ModelState) {
            //                     for (var key in response.data.ModelState) {
            //                         for (var i = 0; i < response.data.ModelState[key].length; i++) {
            //                             errors.push(response.data.ModelState[key][i]);
            //                         }
            //                     }
            //                 } else {
            //                     errors.push(response.data.Message);
            //                 }
            //                 $scope.message = "Failed to register user due to:" + errors.join(' ');
            //             }); 
            //     }, function (err) { 
            //         alert(JSON.stringify(err));
            //         // if (error.code == PositionError.PERMISSION_DENIED) {
            //         //     alert("Permission denied. check setting");
            //         // } else if (error.code == PositionError.POSITION_UNAVAILABLE) {
            //         //     alert("Cannot get position. May be problem with network or can't get a satellite fix.");
            //         // } else if (error.code == PositionError.TIMEOUT) {
            //         //     alert("Geolocation is timed out.");
            //         // } else {
            //         //     alert(error.message);
            //         // }
            //     });


        }
        $scope.logout = function () {
            $ionicLoading.show({ template: 'Logging out....' });
            localStorageService.set('authorizationData');
            $timeout(function () {
                $ionicLoading.hide();

                $ionicHistory.clearCache();
                $ionicHistory.clearHistory();
                $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
                console.log(JSON.stringify(localStorageService));
                $scope.user = localStorageService.get('authorizationData');
                console.log($scope.user);
                $state.go('logIn');
            }, 30);
        }
    }
])
    // Register the 'myCurrentTime' directive factory method.
    // We inject $interval and dateFilter service since the factory method is DI.
    .directive('myCurrentTime', ['$interval', 'dateFilter',
        function ($interval, dateFilter) {
            // return the directive link function. (compile function not needed)
            return function (scope, element, attrs) {
                var format; // date format

                // used to update the UI
                function updateTime() {
                    element.text(dateFilter(new Date(), format));
                }

                // watch the expression, and update the UI on change.
                scope.$watch(attrs.myCurrentTime, function () {
                    format = 'hh:mm a';
                    updateTime();
                });
                stopTime = $interval(updateTime, 1000);

                // listen on DOM destroy (removal) event, and cancel the next UI update
                // to prevent updating time after the DOM element was removed.
                element.on('$destroy', function () {
                    $interval.cancel(stopTime);
                });
            }

        }
    ])
    .directive('myCurrentTime2', ['$interval', 'dateFilter',
        function ($interval, dateFilter) {
            // return the directive link function. (compile function not needed)
            return function (scope, element, attrs) {
                var format2; // date format

                // used to update the UI
                function updateTime() {
                    element.text(dateFilter(new Date(), format2));
                }

                // watch the expression, and update the UI on change.
                scope.$watch(attrs.myCurrentTime, function () {
                    format2 = ' dd MMMM yyyy';
                    updateTime();
                });
                stopTime = $interval(updateTime, 1000);

                // listen on DOM destroy (removal) event, and cancel the next UI update
                // to prevent updating time after the DOM element was removed.
                element.on('$destroy', function () {
                    $interval.cancel(stopTime);
                });
            }

        }
    ]);
