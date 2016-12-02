(function () {
    var usersController = function (
        $scope,
        $http,
        $log,
        usersService,
        $q,
        $interval,
        uiGridConstants,
        userRowEditorService,
        userRowAddService,
        $mdDialog
    ) {

        var vm = this;
        var initialDataLoadFinished = 0;
        var numRecords = 0;
        $scope.vm = vm;


        vm.editRow = userRowEditorService.editRow;
        vm.addRow  = userRowAddService.addRow;
        vm.data = {};

        $scope.showConfirm = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title      ('Are you sure you wish to remove this record?')
                .textContent('Removing user record'                      )
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

        vm.usersGrid = {

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

        vm.checkAndUpdateData = function(data) {
            if (data.errmsg != null) {
                console.log(data.errmsg);
            }
            else if (data.message != null) {
                console.log(data.message);
            }
            else {
                vm.data = data;
                vm.usersGrid.data = vm.data;
                //$scope.gridApi.grid.modifyRows(vm.data);
                console.log(data);
            }
        }

        vm.removeRow = function() {
            $scope.gridApi.grid.rows.forEach(function(item, index) {
                if (item.entity._id == $scope.selRowId) {
                    var idToDelete = item.entity._id;
                    usersService.delete(idToDelete)
                        .success(function(data) {
                            vm.checkAndUpdateData(data);
                        })
                        .error(function(data) {
                            console.log(data);
                        });
                }
            });
        };

        vm.dbSaveRow = function(rowEntity) {
            usersService.update(rowEntity)
                .success(function(data) {
                    vm.checkAndUpdateData(data);
                })
                .error(function(data) {
                    console.log(data);
                });
        };

        vm.dbAddRow = function(data) {
            usersService.create(data)
                .success(function(data) {
                    vm.checkAndUpdateData(data);
                })
                .error(function(data) {
                    console.log(data);
                });
        };

        vm.usersGrid.onRegisterApi = function(gridApi){
            //set gridApi on scope
            $scope.gridApi = gridApi;
            userRowAddService.setGrid(vm.usersGrid, gridApi);
            userRowEditorService.setUsersCtrl(vm);

            $scope.gridApi.grid.callDbAddRow = function(data) {
                vm.dbAddRow(data);
            };

            usersService.get()
                .success(function(data) {
                    vm.data = data;
                    vm.usersGrid.data = vm.data;
                    //$scope.gridApi.grid.modifyRows(vm.data);
                    console.log(data);
                    initialDataLoadFinished = 1;
                    numRecords = data.length;
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });

            gridApi.grid.registerDataChangeCallback(function(data) {
                if (initialDataLoadFinished) {
                    //if (data.rows.length > numRecords) vm.dbAddRow(data.rows[data.rows.length-1].entity);
                    numRecords = data.rows.length;
                    //vm.dbSaveRow(data.rows[$scope.selRowId].entity);
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

    usersController.$inject = [
        '$scope',
        '$http',
        '$log',
        'usersService',
        '$q',
        '$interval',
        'uiGridConstants',
        'userRowEditorService',
        'userRowAddService',
        '$mdDialog'
    ];

    angular.module('hi5-admin-app').controller('users-ctrl', usersController)
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
