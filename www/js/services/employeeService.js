'use strict';
myApp.factory('employeeService', ['$http', 'ngAuthSettings', 'localStorageService', function($http, ngAuthSettings, localStorageService) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var employeeServiceFactory = {};

    var _getEmployeeByEmail = function() {
        // var authData = localStorageService.get('authorizationData');
        // if (authData) {

        // }
        // + authData.userName
        var deviceData = localStorageService.get('deviceData');
        var Email = deviceData.Email;

        return $http.get(serviceBase + 'api/EmployeeProfile?Email=' + Email).then(function(results) {
            return results;
        });
    };

    employeeServiceFactory.getEmployeeByEmail = _getEmployeeByEmail;

    return employeeServiceFactory;

}]);
