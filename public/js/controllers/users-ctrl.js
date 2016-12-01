(function () {
    var usersController = function ($scope, $http, $log, usersService) {
        $scope.tagline = 'Users page';


        usersService.get()
            .success(function(data) {
                //vm.clientsGrid.data = data;
                console.log(data);
                //numRecords = data.length;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });


        
        
    };

    usersController.$inject = ['$scope', '$http', '$log', 'usersService'];
    angular.module('hi5-admin-app').controller('users-ctrl', usersController);
}());
