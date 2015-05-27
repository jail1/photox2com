(function () {
    "use strict";

    angular.module('photoX').controller('schedulerCalendarController', schedulerCalendarController);

    schedulerCalendarController.$inject = [
        '$scope', 
        '$rootScope', 
        '$log', 
        'moment', 
        'schedulingServices', 
        '$mdDialog', 
        '$mdSidenav', 
        '$state', 
        '$stateParams', 
        '$timeout',
        'localize'
    ];

    function schedulerCalendarController(
        $scope, 
        $rootScope, 
        $log, 
        moment, 
        schedulingServices, 
        $mdDialog,
        $mdSidenav, 
        $state, 
        $stateParams, 
        $timeout,
        localize) {
        $scope.getNumber = function (num) {
            return new Array(num);
        }
        /**
         * Table setup
         * TODO : remove id when you finish
         * TODO : add more columns like status and shit
         *
         * //read this
         * http://liamkaufman.com/blog/2013/05/13/understanding-angularjs-directives-part1-ng-repeat-and-compile/
         */
        $scope.tableHeaders = [
            {
                name: 'ID',
                field: 'id'
            },
            {
                name: 'Rezervare',
                field: 'startsAt'
            },
            {
                name: 'Pacient',
                field: 'title'
            },
            {
                name: 'Serviciu',
                field: 'product'
            }
        ];
        $scope.tableSortableFields = ['startsAt', 'product', 'title'];
        $scope.tableElementsPerPage = 10;

        $scope.tableRowClicked = function (event, row, type) {
            $log.log("Row clicked : " + type);
            $log.log(row);
            if (type == 'delete') {
                var confirm = $mdDialog.confirm()
                    .parent(angular.element(document.body))
                    .title("Ștergeți rezervarea ... ?")
                    .ariaLabel('Delete')
                    .ok("Da")
                    .cancel("Nu").
                    targetEvent(event);
                $mdDialog.show(confirm).then(function () {
                    $log.log("Removing");
                }, function () {
                    $log.log("NOT Removing");
                });
            }else{
                $mdSidenav('right').toggle();
                $scope.formTitle = "Editare rezervare";
            }
        }
        /**
         * End table setup
         */
        $scope.switchBetweenModes = function () {
            if ($state.current.name == 'calendar') {
                $state.go('list');
            } else {
                $state.go('calendar');
            }
        };
        $scope.openSettings = function () {
            $state.go('settings');
        };
        $scope.init = function () {
            $scope.$state = $state;
            $scope.calendarView = 'day';
            $scope.events = [];
            $scope.loading = true;
            $scope.formTitle = "Adăugare rezervare";
            schedulingServices.init().then(function (eventsData) {
                $scope.loading = false;
                $scope.events = eventsData;
                //$log.log($rootScope.personProductsMap);
                $timeout(function () {
                    $mdSidenav('right').toggle();
                    // $timeout(function () {
                    //     $mdSidenav('right').toggle();
                    // }, 1000);
                });
            });
        };
        $scope.openRightMenu = function () {
            $mdSidenav('right').toggle();
            $log.log("add or edit")
        };

        $scope.closeSideNavDueToCancel = function (reservation) {
            $mdSidenav('right').toggle();
            $log.log("cancel pressed");
        };


        $scope.eventClicked = function (calendarEvent) {
            $log.log("eventClicked - edit reservation", calendarEvent);
            $mdSidenav('right').toggle();
            $scope.formTitle = "Editare rezervare";
        };

        $scope.eventDrillDownClick = function () {
            $log.log("eventDrillDownClick - new reservation");
        }

        $scope.dateSelected = function (newValue, index) {
            $log.log("[" + index + "] -> " + newValue);
            $scope.reservationDates[index] = newValue;
        };
        /**
         * Clients autocomplete
         */
        $scope.selectedClient = null;
        $scope.searchClientText = null;
        function createFilterFor(query) {
            var lowerCaseQuery = angular.lowercase(query);
            //$log.log(query);
            return function filterFunction(client) {
                //$log.log(client.fullName.toLowerCase() + " vs "+lowerCaseQuery);
                return (client.fullName.toLowerCase().indexOf(lowerCaseQuery) === 0);
            }
        };

        $scope.selectedClientChange = function (item) {
            //$log.info('Item changed to ' + JSON.stringify(item));
            $scope.selectedClient = item;
        };
        $scope.searchClientTextChange = function (text) {
            //$log.info('Text changed to ' + text);
            $scope.searchClientText = text;
        };

        $scope.getClientMatches = function (query) {
            var results = query ? $rootScope.clients.filter(createFilterFor(query)) : [];
            return results;
        };

        $scope.selectedProductChanged = function (selectedProduct) {
            var wasFound = false;
            angular.forEach($rootScope.pricesGroupedByProducts, function (group) {
                if (!wasFound) {
                    if (group.product.id == selectedProduct.id) {
                        wasFound = true;
                        $scope.prices = group.prices;
                    }
                }
            });
            if (!wasFound) {
                $log.error("Ooops, group not found");
            } else {
                if ($scope.prices.length <= 0) {
                    schedulingServices.displayToast('Vă rugăm definiți prețuri pentru terapia selectată înainte să faceți rezervare', 'red', 'alert', 6000);
                } else {
                    $scope.reservationDates = new Array($scope.prices.length);
                }
            }
            var serviceProviders = [];
            angular.forEach($rootScope.persons, function (person) {
                if ($rootScope.personProductsMap[person.id][selectedProduct.id]) {
                    serviceProviders.push(person);
                }
            });
            if (serviceProviders.length <= 0) {
                schedulingServices.displayToast('Vă rugăm definiți terapeuți pentru terapia selectată înainte să faceți rezervare', 'red', 'alert', 6000);
            }
            $scope.serviceProviders = serviceProviders;
            if ($scope.serviceProviders.length == 1) {
                $scope.selectedPerson = $scope.serviceProviders[0];
            }
            $scope.selectedProduct = selectedProduct;
        };

        $scope.selectedPriceChanged = function (selectedPrice) {
            $scope.selectedPrice = selectedPrice;
        };

        $scope.selectedPersonChanged = function (selectedPerson) {
            $log.log("Selected person changed", selectedPerson);
            $scope.selectedPerson = selectedPerson;
        };

        $scope.makeReservationName = function (index) {
            var result = "";
            if ($scope.selectedPrice.tag.multiplier > 1) {
                if (index == 1) {
                    result = "Prima";
                } else {
                    result = "A " + index + "-a";
                }
                result += " ședință";
            }
            return result;
        }

        $scope.validateAndSaveData = function () {
            if (!$scope.selectedClient && !$scope.searchClientText) {
                schedulingServices.displayToast('Vă rugăm selectați sau introduceți un client!', 'red', 'alert', 6000);
                return;
            }
            if ($scope.selectedClient) {
                $log.log("Selected client", $scope.selectedClient);
            } else {
                $log.log("Define new client : " + $scope.searchClientText);
            }
            if (!$scope.selectedProduct) {
                schedulingServices.displayToast('Vă rugăm selectați terapia!', 'red', 'alert', 6000);
                return;
            }
            for (var i = 0; i < $scope.reservationDates.length; i++) {
                $log.log("Checking " + $scope.reservationDates[i]);
                if (!$scope.reservationDates[i]) {
                    schedulingServices.displayToast('Vă rugăm definiți toate datele ședințelor!', 'red', 'alert', 6000);
                    return;
                }
            }
            $mdSidenav('right').toggle();
            schedulingServices.displayToast('Informatia a fost salvata!', 'limegreen', 'cloud-check', 6000);
        };

        $scope.init();
    }
}).call(this);

