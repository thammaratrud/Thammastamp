'use strict';
myApp.controller('loginController', ['$scope', '$location', 'authService', 'ngAuthSettings', 'localStorageService', '$ionicLoading', function ($scope, $location, authService, ngAuthSettings, localStorageService, $ionicLoading) {

    $scope.loginData = {
        username: "",
        password: "",
        useRefreshTokens: false
    };

    $scope.message = "";

    $scope.login = function () {
        $ionicLoading.show({
            noBackdrop: false,
            template: '<p><ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>Please Wait</p>',
        });

        authService.login($scope.loginData).then(function (response) {

            $location.path('/views/home');
            alert('Please turn on location before checkin or checkout')
            $ionicLoading.hide();

        },
            function (err) {
                $scope.message = err.error_description;
                $ionicLoading.hide();

            });

    };



    // $scope.authExternalProvider = function (provider) {

    //     var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';

    //     var externalProviderUrl = ngAuthSettings.apiServiceBaseUri + "api/Account/ExternalLogin?provider=" + provider
    //                                                                 + "&response_type=token&client_id=" + ngAuthSettings.clientId
    //                                                                 + "&redirect_uri=" + redirectUri;
    //     window.$windowScope = $scope;

    //     var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
    // };

    // $scope.authCompletedCB = function (fragment) {

    //     $scope.$apply(function () {

    //         if (fragment.haslocalaccount == 'False') {

    //             authService.logOut();

    //             authService.externalAuthData = {
    //                 provider: fragment.provider,
    //                 userName: fragment.external_user_name,
    //                 externalAccessToken: fragment.external_access_token
    //             };

    //             $location.path('/associate');

    //         }
    //         else {
    //             //Obtain access token and redirect to orders
    //             var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
    //             authService.obtainAccessToken(externalData).then(function (response) {

    //                 $location.path('/orders');

    //             },
    //          function (err) {
    //              $scope.message = err.error_description;
    //          });
    //         }

    //     });
    // }
}]);
