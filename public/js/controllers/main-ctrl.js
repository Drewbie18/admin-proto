(function () {
    var mainController = function ($scope, $http, $log) {
        $scope.tagline = 'Main page';
    };

    mainController.$inject = ['$scope', '$http', '$log'];
    angular.module('hi5-admin-app').controller('main-ctrl', mainController);
}());
