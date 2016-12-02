(function () {
    var usersService = function ($http, $log) {

        var factory = {};

        // C
        factory.create = function (userData) {
            return $http.post('/api/users', userData);
        };

        // R
        factory.get = function () {
            return $http.get('/api/users');
        };

        // U
        factory.update = function (userData) {
            return $http.put('/api/users/' + userData._id, userData);
        };

        // D
        factory.delete = function (id) {
            return $http.delete('/api/users/' + id);
        };

        return factory;
    };

    usersService.$inject = ['$http', '$log'];

    angular.module('hi5-admin-app').factory('usersService', usersService);
}());
