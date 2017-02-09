'use strict';
myApp.controller('introController', ['$scope', '$timeout', '$location', '$cordovaDevice', 'deviceAuthService',
    function($scope, $timeout, $location, $cordovaDevice, deviceAuthService) {


        $scope.platforms = "Android";
        $scope.device = "60a40bb7e2972603";

        $scope.introInit = function() {

            document.addEventListener("deviceready", function() {

                var platforms = $cordovaDevice.getPlatform();
                var device = $cordovaDevice.getUUID();

                deviceAuthService.getDeviceAuthService(device, platforms).then(function(results) {

                    if (results.data) {
                        //alert(results.data.Email + " || " + device + " || " + platforms);
                        $location.path('/views/home');

                    } else {
                        //alert(results.data + " || " + $scope.device + " || " + $scope.platforms);
                        $location.path('/views/register');

                    }

                }, function(response) {
                    var errors = [];
                    for (var key in response.data.Message) {
                        for (var i = 0; i < response.data.Message[key].length; i++) {
                            errors.push(response.data.Message[key][i]);
                        }
                    }
                    var message = "Failed to register user due to:" + errors.join(' ');
                    alert(message);
                });

            }, false);


            deviceAuthService.getDeviceAuthService($scope.device, $scope.platforms).then(function(results) {

                if (results.data) {

                    $location.path('/views/home');

                } else {

                    $location.path('/views/register');

                }

            }, function(response) {
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
                var message = "Failed to register user due to:" + errors.join(' ');
                alert(message);
            });

        }



    }
]);
