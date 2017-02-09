'use strict';
myApp.factory('deviceAuthService', ['$http', 'ngAuthSettings', function($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var deviceAuthServiceFactory = {};

    var _getDeviceAuthService = function(deviceID, platforms) {
        // var authData = localStorageService.get('authorizationData');
        // if (authData) {

        // }
        // + authData.userName
        localStorageService.set('deviceData', {
            DeviceID: deviceID,
            Platforms: platforms
        });

        return $http.get(serviceBase + 'api/User/' + deviceID).then(function(results) {
            if (results.data) {
                localStorageService.set('deviceData', {
                    DeviceID: deviceID,
                    Platforms: platforms,
                    Email: results.data.Email
                });
            }

            return results;


        });
    };

    var _createDeviceAuthService = function(data) {
        // var authData = localStorageService.get('authorizationData');
        // if (authData) {

        // }
        // + authData.userName

        var deviceData = localStorageService.get('deviceData');

        deviceData.Email = data.email;
        data.DeviceID = deviceData.DeviceID;
        data.Platform = deviceData.Platforms;

        localStorageService.set('deviceData', deviceData);


        return $http.post(serviceBase + 'api/User/', data).then(function(results) {
            return results;
        });
    };
    deviceAuthServiceFactory.getDeviceAuthService = _getDeviceAuthService;

    deviceAuthServiceFactory.createDeviceAuthService = _createDeviceAuthService;

    return deviceAuthServiceFactory;

}]);
