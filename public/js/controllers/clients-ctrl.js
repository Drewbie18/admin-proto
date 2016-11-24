(function () {
    var clientsController = function (
        $scope,
        $http,
        $log,
        clientsService,
        $q,
        $interval,
        uiGridConstants,
        rowEditorService,
        rowAddService,
        $mdDialog
    ) {

        var vm = this;
        var dataChanges = 0;
        var numRecords = 0;
        $scope.vm = vm;
        clientsService.get()
            .success(function(data) {
                vm.clientsGrid.data = data;
                console.log(data);
                numRecords = data.length;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        vm.editRow = rowEditorService.editRow;
        vm.addRow  = rowAddService.addRow;

        $scope.showConfirm = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title      ('Are you sure you wish to remove this record?')
                .textContent('Removing client record'                      )
                .ariaLabel  ('Removing record'                             )
                .targetEvent(ev                                            )
                .ok         ('Remove'                                      )
                .cancel     ('Cancel'                                      );
            $mdDialog.show(confirm).then(function() {
                $scope.status = 'Actually removing record.';
                vm.removeRow();
            }, function() {
                $scope.status = 'Cancelled removing record.';
            });
        };
        
        vm.clientsGrid = {

            enableFiltering     : true,
            enableRowSelection  : true,
            showGridFooter      : true,
            multiSelect         : false,
            enableColumnResizing: true,

            columnDefs : [
                {
                    field          : '_id',
                    displayName    : 'ID',
                    resizable      : true,
                    cellTemplate   : 'views/edit-button.html',
                    enableCellEdit : false,
                    enableFiltering: true,
                    sort: {
                        direction: uiGridConstants.DESC,
                        ignoreSort: true,
                        priority: 0
                    }
                },
                {
                    field                   : 'state',
                    displayName             : 'State',
                    resizable               : true,
                    editableCellTemplate    : 'ui-grid/dropdownEditor',
                    cellFilter              : 'mapState',
                    editDropdownValueLabel  : 'state',
                    editDropdownOptionsArray: [
                        { id: "NEW"               , state: 'New'               },
                        { id: "PENDING_ACTIVATION", state: 'Pending Activation'},
                        { id: "ACTIVE"            , state: 'Active'            },
                        { id: "SUSPENDED"         , state: 'Suspended'         },
                        { id: "CLOSED"            , state: 'Closed'            }
                    ]
                },
                {
                    field          : 'lastName',
                    displayName    : 'Last Name',
                    resizable      : true,
                    enableFiltering: true
                },
                {
                    field          : 'firstName',
                    displayName    : 'First Name',
                    resizable      : true,
                    enableFiltering: true
                },
                {
                    field          : 'email',
                    displayName    : 'Email Address',
                    resizable      : true,
                    enableFiltering: true
                },
                {
                    field          : 'phone',
                    displayName    : 'Phone #',
                    resizable      : true,
                    enableFiltering: true
                },
                {
                    field          : 'companyName',
                    displayName    : 'Company Name',
                    resizable      : true,
                    enableFiltering: true
                },
                {
                    field          : 'siteUrl',
                    displayName    : 'Site URL',
                    resizable      : true,
                    enableFiltering: true
                },
                {
                    field          : 'registrationDate',
                    displayName    : 'Registration Date',
                    resizable      : true,
                    enableFiltering: true,
                    type           : 'date',
                    cellFilter     : 'date:"yyyy-MM-dd"'
                },
                {
                    field          : 'history',
                    displayName    : 'History',
                    resizable      : true,
                    enableFiltering: true
                },
                {
                    field          : 'tokens',
                    displayName    : 'Tokens',
                    resizable      : true,
                    enableFiltering: true
                }
            ]
        };

        rowAddService.setGrid(vm.clientsGrid);
        rowEditorService.setClientsCtrl(this);

        vm.removeRow = function() {
            vm.clientsGrid.data.forEach(function(item, index) {
                if (item._id == $scope.selRowId) {
                    vm.clientsGrid.data.splice(index, 1);
                    var idToDelete = item._id;
                    clientsService.delete(idToDelete)
                        .success(function(data) {
                            alert("Removing row worked!!!");
                        })
                        .error(function(data) {
                            alert("Removing row failed!!!");
                        });
                }
            });
        };

        vm.dbSaveRow = function(rowEntity) {
            clientsService.update(rowEntity)
                .success(function(data) {
                    alert("Saving row worked!!!");
                })
                .error(function(data) {
                    alert("Saving row failed!!!");
                });
        };

        vm.dbAddRow = function(data) {
            clientsService.create(data)
                .success(function(data) {
                    alert("Adding row worked!!!");
                })
                .error(function(data) {
                    alert("Adding row failed!!!");
                });
        };

        vm.clientsGrid.onRegisterApi = function(gridApi){
            //set gridApi on scope
            $scope.gridApi = gridApi;

            gridApi.grid.registerDataChangeCallback(function(data) {
                dataChanges++;
                if (dataChanges > 2) {
                    if (data.rows.length > numRecords) vm.dbAddRow(data.rows[data.rows.length-1].entity);
                    numRecords = data.rows.length;
                }
            });

            gridApi.selection.on.rowSelectionChanged($scope, function(row) {
                $scope.rowSelected = row.isSelected;
                if (row.isSelected) {
                    $scope.selRowId = row.entity._id;
                }
            });

            gridApi.rowEdit.on.saveRow($scope, vm.dbSaveRow);
        };

        $scope.rowSelected = false;
    };

    clientsController.$inject = [
        '$scope',
        '$http',
        '$log',
        'clientsService',
        '$q',
        '$interval',
        'uiGridConstants',
        'rowEditorService',
        'rowAddService',
        '$mdDialog'
    ];

    angular.module('hi5-admin-app').controller('clients-ctrl', clientsController)
        .filter('mapState', function() {
            var stateHash = {
                'NEW'               : 'New'               ,
                'PENDING_ACTIVATION': 'Pending Activation',
                'ACTIVE'            : 'Active'            ,
                'SUSPENDED'         : 'Suspended'         ,
                'CLOSED'            : 'Closed'
            };

            return function(input) {
                if (!input){
                    return '';
                } else {
                    return stateHash[input];
                }
            };
        });
}());
