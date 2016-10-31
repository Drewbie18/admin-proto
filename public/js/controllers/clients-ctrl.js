(function () {
    var clientsController = function ($scope, $http, $log) {
        $scope.tagline = 'Clients page';
    };

    clientsController.$inject = ['$scope', '$http', '$log'];
    angular.module('hi5-admin-app').controller('clients-ctrl', clientsController);
}());
