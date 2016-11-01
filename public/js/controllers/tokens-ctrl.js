(function () {
    var tokensController = function ($scope, $http, $log, tokensService) {
        $scope.tagline = 'Tokens page';
    };

    tokensController.$inject = ['$scope', '$http', '$log'];
    angular.module('hi5-admin-app').controller('tokens-ctrl', tokensController);
}());
