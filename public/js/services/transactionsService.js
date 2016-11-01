(function () {
    var transactionsService = function ($http, $log) {

        var factory = {};

        factory.get = function () {
            return $http.get('/api/transactions');
        };

        factory.create = function (transactionData) {
            return $http.post('/api/transactions', transactionData);
        };

        factory.delete = function (id) {
            return $http.delete('/api/transactions/' + id);
        };

        return factory;
    };

    transactionsService.$inject = ['$http', '$log'];

    angular.module('hi5-admin-app').factory('transactionsService', transactionsService);
}());