(function () {
    var clientsService = function ($http, $log) {

        var factory = {};

        factory.get = function () {
            return $http.get('/api/clients');
        };

        factory.create = function (clientData) {
            return $http.post('/api/clients', clientData);
        };

        factory.delete = function (id) {
            return $http.delete('/api/clients/' + id);
        };

        return factory;
    };

    clientsService.$inject = ['$http', '$log'];

    angular.module('hi5-admin-app').factory('clientsService', clientsService);
}());