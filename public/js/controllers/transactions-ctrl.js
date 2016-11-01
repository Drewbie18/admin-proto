(function () {
    var transactionsController = function ($scope, $http, $log, transactionsService) {
        $scope.tagline = 'Transactions page';
    };

    transactionsController.$inject = ['$scope', '$http', '$log'];
    angular.module('hi5-admin-app').controller('transactions-ctrl', transactionsController);
}());
