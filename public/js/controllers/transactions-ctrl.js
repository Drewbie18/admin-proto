(function () {
    var transactionsController = function ($scope, $http, $log) {
        $scope.tagline = 'Transactions page';
    };

    transactionsController.$inject = ['$scope', '$http', '$log'];
    angular.module('hi5-admin-app').controller('transactions-ctrl', transactionsController);
}());
