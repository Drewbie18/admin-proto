(function () {
    var tokenRowEditorService = function ($rootScope, $modal) {

        var factory = {};
        factory.editRow = function (grid, row) {
            $modal.open({
                templateUrl: '/views/token-edit-modal.html',
                controller: ['$modalInstance', 'TokenSchema', 'grid', 'row', 'tokensCtrl', tokenRowEditController],
                controllerAs: 'vm',
                resolve: {
                    grid: function () {
                        return grid;
                    },
                    row: function () {
                        return row;
                    },
                    clientsCtrl: function () {
                        return $rootScope.tokensCtrl;
                    }
                }
            });
        };

        factory.setTokensCtrl = function(ctrl) {
            $rootScope.tokensCtrl = ctrl;
        };

        return factory;
    };

    tokenRowEditorService.$inject = ['$rootScope', '$modal'];

    angular.module('hi5-admin-app').factory('tokenRowEditorService', tokenRowEditorService);




    var tokenRowEditController = function ($modalInstance, TokenSchema, grid, row, tokensCtrl) {
        var vm = this;
        
        vm.schema = TokenSchema;
        vm.entity = angular.copy(row.entity);
        vm.tokensCtrl = tokensCtrl;
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
            {
             'key'  : 'currentOwner',
             'type' : 'text',
             'title': 'Owner'
            },
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

        vm.grid = grid;
        vm.row = row;
        vm.save = function () {
            // Copy row values over
            row.entity = angular.extend(row.entity, vm.entity);
            $modalInstance.close(row.entity);
            tokensCtrl.dbSaveRow(row.entity);
        }
    };

    angular.module('hi5-admin-app').controller('token-row-edit-ctrl', tokenRowEditController);

}());