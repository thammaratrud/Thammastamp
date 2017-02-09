'use strict';
myApp.controller('leaveController', ['$scope', 'leaveService', '$cordovaCalendar', '$filter',
    '$http', '$stateParams', '$location', '$ionicPopup', '$ionicActionSheet', '$timeout',

    function($scope, leaveService, $cordovaCalendar, $filter, $http, $stateParams,
        $location, $ionicPopup, $ionicActionSheet, $timeout) {

        var ID;
        var LeaveType;
        $scope.leaveHalf;
        $scope.loadLeaveData = function() {

            var leaveDatas = angular.fromJson($stateParams.getLeavesData);

            var setStartDate = leaveDatas.LeaveStartDateTime;
            var setEndDate = leaveDatas.LeaveEndDateTime;

            ID = leaveDatas.ID;
            LeaveType = String(leaveDatas.LeaveType);
            $scope.remark = leaveDatas.LeaveDetial;
            $scope.startDate = new Date(setStartDate);
            $scope.endDate = new Date(setEndDate);
            $scope.leaveHalf = leaveDatas.LeaveHalf;
            $scope.Days = leaveDatas.LeaveTime;

            if ($scope.leaveHalf) {
                //alert($scope.leaveHalf);
                $scope.toggles = true;
                $scope.data.active = true;
            }

        }

        $scope.startDate = new Date(), 'dd/MM/yyyy';
        $scope.endDate = new Date(), 'dd/MM/yyyy';
        $scope.diffDays = 1;

        $scope.data = {
            active: false
        }

        $scope.LeaveType = function() {
            $scope.LeaveType = LeaveType;
        }

        $scope.deleteLeaveList = function() {
            alert("test");
            location.path('/views/leaveList')
        }

        $scope.toggle = function() {

            $scope.data.active = !$scope.data.active;

        }

        $scope.gotoEmp = function() {

            $location.path('/views/employeeDetail');
        }

        $scope.dateLeave = function(startDate, endDate) {

            //var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

            $scope.diffDays = parseInt((endDate - startDate) / 86400000 + 1);

            if (endDate < startDate) {

                $scope.diffDays = "Please choose End Date";
            }

        }

        $scope.datas = function(startDate, endDate) {

            if ($scope.data.active) {
                $scope.diffDays = 0;
                return true;
            } else {

                $scope.diffDays = parseInt((endDate - startDate) / 86400000 + 1);

                if (endDate < startDate) {

                    $scope.diffDays = "Please choose End Date";
                }
                return false;
            }

        }


        $scope.sendLeave = function(LeaveType, remark, startDate, endDate, diffDays) {

            var halfDay;

            if ($scope.data.active) {
                halfDay = true;
            } else {
                halfDay = false;
            }

            var leaveData = {

                ID: ID,
                Email: "",
                LeaveType: parseInt(LeaveType),
                LeaveDetial: remark,
                LeaveStartDateTime: startDate,
                LeaveEndDateTime: endDate,
                LeaveHalf: halfDay,
                LeaveTime: diffDays,
                ApproveStatus: "W",
            };

            leaveService.createLeaves(leaveData).then(function(response) {
                //alert("Susscess");

                $ionicPopup.alert({
                    title: 'Success',
                    content: '<div class="text-center"><i class="ion-checkmark-circled" style="font-size: 50px; color: #66FF33; " ></i></div>',
                    buttons: [{
                        text: '<b>OK</b>',
                        type: 'button-positive',
                    }]
                }).then(function(res) {
                    console.log('Test Alert Box');
                });

            }, function(error) {
                alert(error.data.Message);
            });

        }
        $scope.remark = "";

        $scope.saveLeave = function(LeaveType, remark, startDate, endDate, diffDays) {

            var halfDay;

            if ($scope.data.active) {
                halfDay = true;
            } else {
                halfDay = false;
            }

            var leaveData = {

                ID: ID,
                Email: "",
                LeaveType: parseInt(LeaveType),
                LeaveDetial: remark,
                LeaveStartDateTime: startDate,
                LeaveEndDateTime: endDate,
                LeaveHalf: halfDay,
                LeaveTime: diffDays,
                ApproveStatus: "S",
            }

            leaveService.createLeaves(leaveData).then(function(response) {
                //alert("Susscess");

                $ionicPopup.alert({
                    title: 'Success',
                    content: '<div class="text-center"><i class="ion-checkmark-circled" style="font-size: 50px; color: #66FF33; " ></i></div>',
                    buttons: [{
                        text: '<b>OK</b>',
                        type: 'button-positive',
                    }]
                }).then(function(res) {
                    if (!res) {
                        $location.path('/views/leaveList');
                    }
                });

            }, function(error) {
                alert(error.data.Message);
            });

        }

        $scope.check = function(startDate) {

            var checkDate = new Date();
            if (startDate < checkDate) {
                return true;
            }
        }

        // $scope.showActionSheet = function(getLeavesData) {
        //     var getLeavesData = getLeavesData;
        //     // Show the action sheet
        //     var hideSheet = $ionicActionSheet.show({
        //         buttons: [
        //             { text: '<center><i class="ion-edit"> </i> Detail</center>' }
        //         ],
        //         destructiveText: '<center><i class="ion-trash-a"> </i> Delete</center>',
        //         titleText: '<center>Modify your leave</center>',
        //         // cancelText: 'Cancel',
        //         cancel: function() {
        //             // add cancel code..
        //         },
        //         buttonClicked: function(index) {

        //             getLeavesData;
        //             if (index === 0) {
        //                 $location.path('/views/leaveDraft/getLeavesData');
        //             }
        //         },
        //         destructiveButtonClicked: function() {
        //             alert("Delete");
        //         }
        //     });

        //     // For example's sake, hide the sheet after two seconds
        //     $timeout(function() {
        //         hideSheet();
        //     }, 3000);

        // };
        // leaveService.createLeaves().then(function(results) {

        //     $scope.createLeavesData = results.data;

        // }, function(error) {
        //     alert(error.data.message);
        // })

        // leaveService.updateLeavesData().then(function(results) {

        //     $scope.updateLeavesData = results.data;

        // }, function(error) {
        //     alert(error.data.message);
        // })

        // leaveService.approveLeavesData().then(function(results) {

        //     $scope.approveLeavesData = results.data;

        // }, function(error) {
        //     alert(error.data.message);
        // })

        // leaveService.rejectLeavesData().then(function(results) {

        //     $scope.rejectLeavesData = results.data;

        // }, function(error) {
        //     alert(error.data.message);
        // })

        leaveService.getLeavesByEmail().then(function(results) {

            $scope.getLeavesData = results.data;


        })


        // leaveService.deleteLeavesData().then(function(results) {

        //     $scope.deleteLeavesData = results.data;

        // }, function(error) {
        //     alert(error.data.message);
        // })

        // leaveService.getLeaveDraftsData().then(function(results) {

        //     $scope.getLeaveDraftsData = results.data;

        // }, function(error) {
        //     alert(error.data.message);
        // })

        // leaveService.createLeaveDraftsData().then(function(results) {

        //     $scope.createLeaveDraftsData = results.data;

        // }, function(error) {
        //     alert(error.data.message);
        // })

    }
]);
