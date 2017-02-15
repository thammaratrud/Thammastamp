'use strict';
myApp.controller('employeeController', ['$scope', 'employeeService', '$location', '$timeout',
    '$ionicLoading', '$templateCache', '$ionicPopup', '$filter', 'localStorageService',
    function ($scope, employeeService, $location, $timeout,
        $ionicLoading, $templateCache, $ionicPopup, $filter, localStorageService) {
            
        $scope.user = localStorageService.get('authorizationData');
        // console.log($scope.user);

       
                // $scope.startDates = new Date(), 'dd/MM/yyyy';

                // employeeService.getEmployeeByEmail().then(function(results) {
                //     //alert("Success");


                //     var employeeProfile = results.data;
                //     $scope.employeeData = employeeProfile.EmployeeData;
                //     $scope.currentChkIn = employeeProfile.CurrentChkIn;
                //     $scope.CheckIn = employeeProfile.CheckIn;

                // }, function(error) {
                //     alert(error.data.message);
                // });

                // leaveService.getLeavesByEmail().then(function(results) {

                //     $scope.getLeavesData = results.data;


                // });

                // $scope.chkDateInDay = function(LeaveStartDateTime) {

                //     var LeaveStartDateTime = new Date(LeaveStartDateTime);
                //     $scope.startDates;

                //     var resultsDatesInDay = parseInt((LeaveStartDateTime - $scope.startDates) / 86400000 + 1);

                //     if ((resultsDatesInDay) > 1) {
                //         return false;
                //     } else {
                //         return true;
                //     }
                // }

                // $scope.chkDateInMonth = function(monthDateTimeIn) {

                //     var monthDateTimeIn = new Date(monthDateTimeIn);
                //     $scope.startDates;

                //     var months;
                //     months = ($scope.startDates.getFullYear() - monthDateTimeIn.getFullYear()) * 12;
                //     months -= monthDateTimeIn.getMonth() + 1;
                //     months += $scope.startDates.getMonth() + 1;

                //     if (months != 0) {
                //         return true;
                //     }

                // }
                // $scope.showDetailLeave = function(e) {

                //     var LeaveType = e.LeaveType;
                //     var LeaveHalf = e.LeaveHalf;
                //     var LeaveStartDateTime = $filter('date')(e.LeaveStartDateTime, 'dd MMMM yyyy');
                //     var LeaveEndDateTime = $filter('date')(e.LeaveEndDateTime, 'dd MMMM yyyy');

                //     // {{leaveHalf == true ? "ครึ่งวัน" : Days}}
                //     if (LeaveHalf == true) {
                //         LeaveHalf = "ครึ่งวัน";
                //     } else {
                //         LeaveHalf = e.LeaveTime;
                //     }

                //     if (LeaveType == 1) {
                //         LeaveType = "Sick Leave"
                //     } else if (LeaveType == 2) {
                //         LeaveType = "Personal Leave"
                //     } else if (LeaveType == 3) {
                //         LeaveType = "Annual Leave"
                //     }

                //     $ionicPopup.alert({
                //         title: '<div class="alertDetail">Leave Detail</div>',
                //         content: '<div><b>Leave Type</b> :  &nbsp;&nbsp;' + LeaveType + '</div><br><div><b>Remark :  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>' + e.LeaveDetial + '</div><br><div><b>Start Date :&nbsp;&nbsp;&nbsp;&nbsp; </b>' + LeaveStartDateTime + '</div><br><div><b>End Date : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>' + LeaveEndDateTime + '</div><br><div><b>จำนวน&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>' + LeaveHalf + ' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>วัน</b></div>',
                //         cssClass: '',
                //         buttons: [{
                //             text: '<b>Close</b>',
                //             type: 'button-energized',
                //         }]
                //     })
                // }

                // $scope.Leaved = function(LeaveStartDateTime) {

                //     var months;
                //     var LeaveStartDateTime = new Date(LeaveStartDateTime);
                //     $scope.startDates;

                //     var resultsDatesInDay = parseInt((LeaveStartDateTime - $scope.startDates) / 86400000 + 1);

                //     if ((resultsDatesInDay) <= 1) {

                //         months = ($scope.startDates.getFullYear() - LeaveStartDateTime.getFullYear()) * 12;
                //         months -= LeaveStartDateTime.getMonth() + 1;
                //         months += $scope.startDates.getMonth() + 1;

                //         if (months == 0) {
                //             return true;
                //         } else {
                //             return false;
                //         }
                //     } else {
                //         return false;
                //     }



                // }

                // $scope.shareCard = function() {
                //     $timeout(function() {
                //         var imageLink;
                //         console.log('Calling from CapturePhoto');
                //         navigator.screenshot.save(function(error, res) {
                //             if (error) {
                //                 console.error(error);
                //             } else {
                //                 console.log('ok', res.filePath); //should be path/to/myScreenshot.jpg
                //                 //For android
                //                 imageLink = res.filePath;
                //                 window.plugins.socialsharing.share(null, null, 'file://' + imageLink, null);

                //                 //For iOS
                //                 //window.plugins.socialsharing.share(null, null, imageLink, null)
                //                 $location.path('/views/capture');

                //             }
                //         }, 'jpg', 50, 'myScreenShot');

                //     }, 300);



                // }


                // $scope.var = 1;
                // $scope.click = function(num) {
                //     $scope.var = num;
                // }



                // $scope.chkIn = [{
                //     chkInDate: "01 December 2015",
                //     chkInTime: "09:02 AM",
                //     chkOutTime: "07:28 PM"
                // }, {
                //     chkInDate: "02 December 2015",
                //     chkInTime: "08:44 AM",
                //     chkOutTime: "07:59 PM"
                // }, {
                //     chkInDate: "03 December 2015",
                //     chkInTime: "08:24 AM",
                //     chkOutTime: "07:38 PM"
                // }, {
                //     chkInDate: "04 December 2015",
                //     chkInTime: "09:32 AM",
                //     chkOutTime: ""
                // }]

                // $scope.leaved = [{
                //     leaveType: "Sick Leave",
                //     leaveStartDate: "01 December 2015",
                //     leaveDetail: "ท้องเสีย"
                // }, {
                //     leaveType: "Personal Leave",
                //     leaveStartDate: "24 December 2015",
                //     leaveDetail: "ไปทำใบขับขี่"
                // }]

                // $scope.request = [{
                //     leaveType: "Sick Leave",
                //     leaveStartDate: "15 December 2015",
                //     leaveDetail: "ไปพบแพทย์เพื่อ Follow Up",
                //     leaveStatus: "A"
                // }, {
                //     leaveType: "Personal Leave",
                //     leaveStartDate: "24 December 2015",
                //     leaveDetail: "ไปทำใบขับขี่",
                //     leaveStatus: "W"
                // }, {
                //     leaveType: "Personal Leave",
                //     leaveStartDate: "28 December 2015",
                //     leaveDetail: "ไปทำบัตรประชาชน",
                //     leaveStatus: "R"
                // }]


                // $scope.adjust = [{
                //     adjustDate: "07 December 2015",
                //     adjustDetail: "ลืมโทรศัพท์ไว้ที่บ้าน",
                //     adjustStatus: "R"
                // }, {
                //     adjustDate: "17 December 2015",
                //     adjustDetail: "on site @true",
                //     adjustStatus: "A"
                // }];

                // $scope.empData = [{
                //     ID: "01",
                //     Image: "",
                //     FirstName: "Nuttakrittra",
                //     LastName: "Phumsawai",
                //     JobTitle: "Programmer",
                //     OfficeAddress: "Cyber Advance System And Network Co.,Ltd<br>บริษัท ไซเบอร์ แอดวานซ์ ซิสเต็ม แอนด์ เน็ตเวิร์ก จำกัด<br>55/7 ม.11 ถ.วงแหวนลำลูกกา ต.บึงคำพร้อย<br>อ.ลำลูกกา จ.ปทุมธานี 12150 ",
                //     Tel: "0945506035",
                //     Facebook: "/tingtang.th",
                //     Line: "tingtang35",
                //     Email: "tingtang35@gmail.com",
                //     WorkTimes: "",
                //     Request: ""
                // }]


                // // Chart.js
                // $scope.dataSummary = [{
                //     value: 14,
                //     color: '#00DD00',
                //     label: 'Work'
                // }, {
                //     value: 3,
                //     color: '#FF9900',
                //     label: 'Leave'
                // }, {
                //     value: 13,
                //     color: '#BBBBBB',
                //     label: 'Day'
                // }];


                // // Chart.js Options
                // $scope.options = {

                //     // Sets the chart to be responsive
                //     responsive: true,

                //     //Boolean - Whether we should show a stroke on each segment
                //     segmentShowStroke: false,

                //     //String - The colour of each segment stroke
                //     segmentStrokeColor: '#FFFFFF',

                //     //Number - The width of each segment stroke
                //     segmentStrokeWidth: 0,

                //     //Number - The percentage of the chart that we cut out of the middle
                //     percentageInnerCutout: 50, // This is 0 for Pie charts

                //     //Number - Amount of animation steps
                //     animationSteps: 100,

                //     //String - Animation easing effect
                //     animationEasing: 'easeOutBounce',

                //     //Boolean - Whether we animate the rotation of the Doughnut
                //     animateRotate: true,

                //     //Boolean - Whether we animate scaling the Doughnut from the centre
                //     animateScale: true,

                //     //String - A legend template
                //     legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
                // }



            }
]);
