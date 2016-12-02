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
                'key'  : 'mintDate',
                'type' : 'text',
                'title': 'Minting Date'
            },
            {
                'key'  : 'mintedAmount',
                'type' : 'text',
                'title': 'Amount Minted'
            },
            /*{
                'key'  : 'currentOwner',
                'type' : 'text',
                'title': 'Owner'
            },
            {
                'key'  : 'history',
                'type' : 'text',
                'title': 'History'
            },*/
            {
                "key"     : "state",
                'type'    : 'select',
                "title"   : "State",
                'titleMap': [
                    { value: "NEW"       , name: "New"        },
                    { value: "CONFIRMED" , name: "Confirmed"  },
                    { value: "ACTIVE"    , name: "Active"     },
                    { value: "INACTIVE"  , name: "Inactive"   },
                    { value: "IN_TRANSIT", name: "In transit" },
                    { value: "REVOKED"   , name: "Revoked"    }
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