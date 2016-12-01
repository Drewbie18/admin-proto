(function () {
    var usersService = function ($http, $log) {

        var factory = {};

        factory.get = function () {
            return $http.get('/api/users');
        };

        factory.create = function (userData) {
            return $http.post('/api/users', userData);
        };

        factory.delete = function (id) {
            return $http.delete('/api/users/' + id);
        };

        return factory;
    };

    usersService.$inject = ['$http', '$log'];

    angular.module('hi5-admin-app').factory('usersService', usersService);
}());
