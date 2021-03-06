(function () {
    var userRowAddService = function($rootScope, $modal) {

        var factory = {};

        factory.addRow = function() {
            $modal.open({
                templateUrl: '/views/user-add-modal.html',
                controller: ['$modalInstance', 'UserSchema', 'grid', 'gridApi', '$scope', userAddController],
                controllerAs: 'vm',
                resolve: {
                    grid: function () {
                        return $rootScope.grid;
                    },
                    gridApi: function () {
                        return $rootScope.gridApi;
                    }
                }
            });
        };

        factory.setGrid = function(grid, gridApi) {
            $rootScope.grid    = grid;
            $rootScope.gridApi = gridApi;
        };

        return factory;
    };

    userRowAddService.$inject = ['$rootScope', '$modal'];

    angular.module('hi5-admin-app').factory('userRowAddService', userRowAddService);

    var userAddController = function ($modalInstance, UserSchema, grid, gridApi, $scope) {
        var vm = this;

        vm.schema = UserSchema;
        vm.form = [
            {
                'key'  : 'name',
                'type' : 'text',
                'title': 'User Name'
            },
            {
                'key'  : 'firstName',
                'type' : 'text',
                'title': 'First Name'
            },
            {
                'key'  : 'lastName',
                'type' : 'text',
                'title': 'Last Name'
            },
            {
                'key'  : 'email',
                'type' : 'text',
                'title': 'Email Address'
            },
            {
                'key'  : 'phone',
                'type' : 'text',
                'title': 'Phone Number'
            },
            {
                'key'  : 'password',
                'type' : 'password',
                'title': 'Password'
            },
            {
                'key'  : 'registrationDate',
                'type' : 'text',
                'title': 'Registration Date'
            },
            {
                "key"     : "state",
                'type'    : 'select',
                "title"   : "State",
                'titleMap': [
                    { value: "NEW"               , name: "New"                },
                    { value: "PENDING_ACTIVATION", name: "Pending Activation" },
                    { value: "ACTIVE"            , name: "Active"             },
                    { value: "SUSPENDED"         , name: "Suspended"          },
                    { value: "CLOSED"            , name: "Closed"             }
                ]
            }
        ];
        vm.entity = {};
        vm.grid = grid;
        vm.gridApi = gridApi;
        vm.add = function (form) {
            $scope.$broadcast('schemaFormValidate');
            if (form.$valid) {
                //vm.grid.data.push(vm.entity);
                vm.gridApi.grid.callDbAddRow(vm.entity);
                $modalInstance.close();
            }
        }
    };

    angular.module('hi5-admin-app').controller('user-row-add-ctrl', userAddController);

}());