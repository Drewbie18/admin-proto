(function () {
    var tokensService = function ($http, $log) {

        var factory = {};

        // C
        factory.create = function (tokenData) {
            return $http.post('/api/tokens', tokenData);
        };

        // R
        factory.get = function () {
            return $http.get('/api/tokens');
        };

        // U
        factory.update = function (tokenData) {
            return $http.put('/api/tokens/' + tokenData._id, tokenData);
        };

        // D
        factory.delete = function (id) {
            return $http.delete('/api/tokens/' + id);
        };

        return factory;
    };

    tokensService.$inject = ['$http', '$log'];

    angular.module('hi5-admin-app').factory('tokensService', tokensService);
}());
