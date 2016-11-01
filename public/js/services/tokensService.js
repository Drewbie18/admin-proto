(function () {
    var tokensService = function ($http, $log) {

        var factory = {};

        factory.get = function () {
            return $http.get('/api/tokens');
        };

        factory.create = function (clientData) {
            return $http.post('/api/tokens', tokenData);
        };

        factory.delete = function (id) {
            return $http.delete('/api/tokens/' + id);
        };

        return factory;
    };

    tokensService.$inject = ['$http', '$log'];

    angular.module('hi5-admin-app').factory('tokensService', tokensService);
}());