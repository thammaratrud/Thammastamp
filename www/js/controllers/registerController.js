'use strict';
myApp.controller('registerController', ['$scope', '$location', '$timeout', 'authService', '$ionicPopup', '$http', '$cordovaDevice', function ($scope, $location, $timeout, authService, $ionicPopup, $http, $cordovaDevice) {

    $scope.savedSuccessfully = false;
    $scope.message = "";
    var device = $cordovaDevice.getUUID();
    // alert(device);

    $scope.registration = $scope.registration || {};

    $scope.signUp = function () {
        var data = {
            Email: $scope.registration.email,
            DeviceID: "",
            Platform: "",
        };
        $http.get(serviceBase + '/api/Employeeprofile/email/' + $scope.registration.email).then(function (response) {
            var firstname = response.data.firstname;
            var lastname = response.data.lastname;
            var emp = response.data.employees;
            var pass = device + '#TimeStamp';
            $scope.registration = {
                firstName: firstname,
                lastName: lastname,
                username: $scope.registration.email,
                email: $scope.registration.email,
                password: pass,
                Employeeprofile: emp
            };
            // alert(JSON.stringify($scope.registration));

            authService.saveRegistration($scope.registration).then(function (response) {

                $scope.savedSuccessfully = true;
                $scope.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
                startTimer();

            },
                function (response) {
                    var errors = [];
                    if (response.data.ModelState) {
                        for (var key in response.data.ModelState) {
                            for (var i = 0; i < response.data.ModelState[key].length; i++) {
                                errors.push(response.data.ModelState[key][i]);
                            }
                        }
                    } else {
                        errors.push(response.data.Message);
                    }
                    $scope.message = "Failed to register user due to:" + errors.join(' ');
                });

        },
            function (response) {
                alert('error : ' + JSON.stringify(response));
            });

    };

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/views/home');
        }, 2000);
    }

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


}]);