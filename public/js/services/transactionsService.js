(function () {
    var transactionsService = function ($http, $log) {

        var factory = {};

        // C
        factory.create = function (transactionData) {
            return $http.post('/api/transactions', transactionData);
        };

        // R
        factory.get = function () {
            return $http.get('/api/transactions');
        };

        // U
        factory.update = function (transactionData) {
            return $http.put('/api/transactions/' + transactionData._id, transactionData);
        };

        // D
        factory.delete = function (id) {
            return $http.delete('/api/transactions/' + id);
        };

        return factory;
    };

    transactionsService.$inject = ['$http', '$log'];

    angular.module('hi5-admin-app').factory('transactionsService', transactionsService);
}());
