(function () {
    var clientsService = function ($http, $log) {

        var factory = {};

        // C
        factory.create = function (clientData) {
            return $http.post('/api/clients', clientData);
        };

        // R
        factory.get = function () {
            return $http.get('/api/clients');
        };

        // U
        factory.update = function (clientData) {
            return $http.put('/api/clients/' + clientData._id, clientData);
        };

        // D
        factory.delete = function (id) {
            return $http.delete('/api/clients/' + id);
        };

        return factory;
    };

    clientsService.$inject = ['$http', '$log'];

    angular.module('hi5-admin-app').factory('clientsService', clientsService);
}());
