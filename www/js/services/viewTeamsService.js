'use strict';
myApp.factory('viewTeamsService', ['$http', 'ngAuthSettings', 'localStorageService', function($http, ngAuthSettings, localStorageService) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var viewTeamsServiceFactory = {};

    var _getviewTeam = function() {
        // var authData = localStorageService.get('authorizationData');
        // if (authData) {
           
        // }
        // + authData.userName
        return $http.get(serviceBase + '/api/checkins').then(function(results) {
                return results;
            });
    };

    viewTeamsServiceFactory.getviewTeam = _getviewTeam;

    return viewTeamsServiceFactory;

}]);
