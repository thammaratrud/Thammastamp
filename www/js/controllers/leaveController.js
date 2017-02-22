'use strict';
myApp.controller('leaveController', ['$scope', 'leaveService', '$cordovaCalendar', '$filter',
    '$http', '$stateParams', '$location', '$ionicPopup', '$ionicActionSheet', '$timeout', 'localStorageService',

    function ($scope, leaveService, $cordovaCalendar, $filter, $http, $stateParams,
        $location, $ionicPopup, $ionicActionSheet, $timeout, localStorageService) {
        var user = localStorageService.get('authorizationData');
        var editleave = {};
        if ($stateParams.getLeavesData) {
            editleave = JSON.parse($stateParams.getLeavesData);
            $scope.leave = editleave;
        }
        // console.log(JSON.parse(editleave));
        $scope.readleave = function () {
            $http.get(serviceBase + '/api/leaves').success(function (response) {
                $scope.leave = response;
                console.log($scope.leave);
            }).error(function (err) {
                // alert();
                alert('save failed : ' + err);
            })
        }
        // $scope.startDate = new Date(), 'dd/MM/yyyy';
        // $scope.endDate = new Date(), 'dd/MM/yyyy';
        // $scope.diffDays = 1;
        // console.log($scope.startDate);

        // $scope.dateLeave1 = function (startDate, endDate) {

        //     //var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

        //     $scope.diffDays = parseInt((endDate - startDate) / 86400000 + 1);

        //     if (endDate < startDate) {

        //         $scope.diffDays = "Please choose End Date";
        //     }

        // }

        $scope.leave = $scope.leave ? $scope.leave : {};
        $scope.leave.leaveStartDateTime = $scope.leave.leaveStartDateTime ? new Date($scope.leave.leaveStartDateTime) : '';
        $scope.leave.leaveEndDateTime = $scope.leave.leaveEndDateTime ? new Date($scope.leave.leaveEndDateTime) : '';

        console.log($scope.leave);

        $scope.leave.leaveType = $scope.leave.leaveType || 'Sick';
        $scope.leave.email = user.username;
        $scope.toggle = function () {
            $scope.leave.leaveHalf = !$scope.leave.leaveHalf;
            console.log($scope.leave.leaveHalf);
        }

        $scope.dateLeave = function (startDate, endDate) {
            var dateObj = new Date();
            var dateStart = new Date(startDate);
            var dateEnd = new Date(endDate);
            var month = dateObj.getUTCMonth() + 1; //months from 1-12
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();
            var monthCheck = dateStart.getUTCMonth() + 1;
            var dayCheck = dateStart.getUTCDate() + 1;
            var yearCheck = dateStart.getUTCFullYear();
            if (startDate) {
                if (dayCheck > day && monthCheck >= month && yearCheck >= year) {
                    if (endDate) {
                        var monthCheckE = dateEnd.getUTCMonth() + 1;
                        var dayCheckE = dateEnd.getUTCDate() + 1;
                        var yearCheckE = dateEnd.getUTCFullYear();
                        if (dayCheckE > dayCheck && monthCheckE >= monthCheck && yearCheckE >= yearCheck) {
                            $scope.leave.leaveTime = parseInt((endDate - startDate) / 86400000 + 1);
                        } else {
                            $scope.leave.leaveEndDateTime = '';
                            alert('can not select End day.');
                        }
                    }
                } else {
                    $scope.leave.leaveStartDateTime = '';
                    alert('can not select Start day.');
                }

            }

            //var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds



        }



        $scope.saveLeave = function () {
            $scope.leave.leaveStatus = 'draft';
            // alert(JSON.stringify( $scope.leave));
            if ($scope.leave._id) {
                // $scope.leave.leaveStatus = 'wait approve';
                // alert('put '+JSON.stringify( $scope.leave));

                $http.put(serviceBase + '/api/leaves/' + editleave._id, $scope.leave).success(function (response) {
                    $scope.readleave();
                    $location.path('/views/leaveList');
                }).error(function (err) {
                    // alert();
                    alert('save failed : ' + err);
                })
            } else {
                // alert('post '+JSON.stringify( $scope.leave));

                // $scope.leave.leaveStatus = 'wait approve';
                $http.post(serviceBase + '/api/leaves', $scope.leave).success(function (response) {
                    $scope.readleave();
                    $location.path('/views/leaveList');
                }).error(function (err) {
                    // alert();
                    alert('save failed : ' + err);
                })
            }
        }
        $scope.sendLeave = function () {
            if ($scope.leave._id) {
                $scope.leave.leaveStatus = 'wait approve';
                $http.put(serviceBase + '/api/leaves/' + editleave._id, $scope.leave).success(function (response) {
                    $scope.readleave();
                    $location.path('/views/leaveList');
                }).error(function (err) {
                    // alert();
                    alert('save failed : ' + err);
                })
            } else {
                $scope.leave.leaveStatus = 'wait approve';
                $http.post(serviceBase + '/api/leaves', $scope.leave).success(function (response) {
                    $scope.readleave();
                    $location.path('/views/leaveList');
                }).error(function (err) {
                    // alert();
                    alert('save failed : ' + err);
                })
            }

        }
        $scope.Cancel = function () {
            $scope.leave = {};
        }

        $scope.Cancel2 = function () {
            $scope.leave.leaveStatus = 'cancel';
            $http.put(serviceBase + '/api/leaves/' + editleave._id, $scope.leave).success(function (response) {
                $scope.readleave();
                $location.path('/views/leaveList');
            }).error(function (err) {
                // alert();
                alert('save failed : ' + err);
            })
        }


    }
]);
