(function () {
    var usersController = function ($scope, $http, $log) {
        $scope.tagline = 'Users page';
    };

    usersController.$inject = ['$scope', '$http', '$log'];
    angular.module('hi5-admin-app').controller('users-ctrl', usersController);
}());
