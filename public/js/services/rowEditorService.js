(function () {
    var rowEditorService = function ($rootScope, $modal) {

        var factory = {};
        factory.editRow = function (grid, row) {
            $modal.open({
                templateUrl: '/views/edit-modal.html',
                controller: ['$modalInstance', 'ClientSchema', 'grid', 'row', 'clientsCtrl', rowEditController],
                controllerAs: 'vm',
                resolve: {
                    grid: function () {
                        return grid;
                    },
                    row: function () {
                        return row;
                    },
                    clientsCtrl: function () {
                        return $rootScope.clientsCtrl;
                    }
                }
            });
        };

        factory.setClientsCtrl = function(ctrl) {
            $rootScope.clientsCtrl = ctrl;
        };

        return factory;
    };

    rowEditorService.$inject = ['$rootScope', '$modal'];

    angular.module('hi5-admin-app').factory('rowEditorService', rowEditorService);




    var rowEditController = function ($modalInstance, ClientSchema, grid, row, clientsCtrl) {
        var vm = this;
        
        vm.schema = ClientSchema;
        vm.entity = angular.copy(row.entity);
        vm.clientsCtrl = clientsCtrl;
        vm.form = [
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
            /*{
                'key'  : 'registrationDate',
                'type' : 'text',
                'title': 'Registration Date'
            },*/
            {
                'key'  : 'companyName',
                'type' : 'text',
                'title': 'Company Name'
            },
            {
                'key'  : 'siteUrl',
                'type' : 'text',
                'title': 'Site URL'
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

        vm.grid = grid;
        vm.row = row;
        vm.save = function () {
            // Copy row values over
            row.entity = angular.extend(row.entity, vm.entity);
            $modalInstance.close(row.entity);
            clientsCtrl.dbSaveRow(row.entity);
        }
    };

    angular.module('hi5-admin-app').controller('row-edit-ctrl', rowEditController);

}());