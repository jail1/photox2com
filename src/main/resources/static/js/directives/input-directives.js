( function () {

    'use strict';

    function uniquenessChecker($http) {
        function link(scope, elem, attrs, ngModel) {
            var apiUrl = attrs.uniquenessChecker;

            function setAsLoading(bool) {
                ngModel.$setValidity('loading', !bool);
            }

            function setAsAvailable(bool) {
                ngModel.$setValidity('unavailable', bool);
            }

            ngModel.$parsers.push(function (value) {
                if (!value || value.length == 0) {
                    return;
                }
                setAsLoading(true);
                $http.post(apiUrl, value)
                    .success(function (data, status, headers, cfg) {
                        setAsLoading(false);
                        setAsAvailable(data.isUnique === "true");
                    })
                    .error(function (data, status, headers, cfg) {
                        setAsLoading(false);
                        setAsAvailable(false);
                    });
                return value;
            })
        }

        var directive = {
            require: 'ngModel',
            link: link
        }
        return directive;
    };

    uniquenessChecker.$inject = ['$http'];

    angular.module('input-directives', []).directive('uniquenessChecker', uniquenessChecker);

    //Usage : <input type="text" ng-model="number" required="required" numbers-only="numbers-only" />
    angular.module('input-directives').directive('numbersOnly', numbersOnly);

    function numbersOnly() {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function (inputValue) {
                    // this next if is necessary for when using ng-required on your input.
                    // In such cases, when a letter is typed first, this parser will be called
                    // again, and the 2nd time, the value will be undefined
                    if (inputValue == undefined) return ''
                    var transformedInput = inputValue.replace(/[^0-9]/g, '');
                    if (transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });
            }
        };
    }

    //Usage : <input type="text" ng-model="text" required="required" letters-only="letters-only" />
    angular.module('input-directives').directive('lettersOnly', lettersOnly);

    function lettersOnly() {
        return {
            require: 'ngModel',
            link: function ($scope, $element, $attrs, ngModelController) {
                var onlyLettersRegex = /^[a-zA-Z]*$/;

                ngModelController.$formatters.push(function (value) {
                    var isValid = typeof value === 'string'
                        && value.match(onlyLettersRegex);
                    ngModelController.$setValidity('lettersOnly', isValid);
                    return value;
                });

                ngModelController.$parsers.push(function (value) {
                    var isValid = typeof value === 'string'
                        && value.match(onlyLettersRegex);

                    ngModelController.$setValidity('lettersOnly', isValid);
                    return isValid ? value : undefined;
                });
            }
        };
    };

    function calculateArea() {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attrs, ctrl) {
                function validate(input) {
                    if (input) {
                        //console.log('validating');
                        var isValid = true;
                        if (isNaN(Number(input))) {
                            //console.log("is NAN");
                            if (input.indexOf('x') > 0) {
                                //console.log('has "x"');
                                var areaParts = input.split('x');
                                if (!isNaN(Number(areaParts[0]) && !isNaN(Number(areaParts[1])))) {
                                    //console.log('altering input');
                                    input = parseFloat(Number(areaParts[0])) * parseFloat(Number(areaParts[1]));
                                } else {
                                    //console.log('one of the parts is not a number');
                                    isValid = false;
                                }
                            } else {
                                //console.log('is not containing "x"');
                                isValid = false;
                            }
                        }
                        if (isValid) {
                            //console.log('is either a number or contains "x" -> '+input);
                        } else {
                            ctrl.$rollbackViewValue();
                            //console.log('INVALID');
                        }
                        ctrl.$setValidity('number', isValid);
                        return input;
                    }
                    //console.log('input undefined');
                    return input;
                }

                ctrl.$parsers.unshift(validate);
                ctrl.$formatters.unshift(validate)
            }
        };
    };

    angular.module('input-directives').directive('areaCalculator', calculateArea);

    angular.module('input-directives').directive('focusOn', focusOn);

    focusOn.$inject = ['$parse', '$timeout'];
    function focusOn($parse, $timeout) {
        return {
            link: function (scope, element, attrs) {
                var model = $parse(attrs.focusOn);
                var delay = 0;
                if (attrs.ngDataDelay) {
                    delay = parseInt(attrs.ngDataDelay);
                }
                var watcher = scope.$watch(model, function (value) {
                    if (value === true) {
                        $timeout(function () {
                            element[0].focus();
                        }, delay);
                    }
                });

                var unbindOnDestroy = [];
                var unbindDestroyListener = scope.$on('$destroy', function () {
                    unbindOnDestroy.forEach(function (unbind) {
                        unbind();
                    });
                });
                unbindOnDestroy.push(unbindDestroyListener);
                unbindOnDestroy.push(watcher);
            }
        }
    }

    angular.module('input-directives').directive('editInPlace', editInPlace);

    editInPlace.$inject = ['$mdDialog'];

    function editInPlace($mdDialog) {
        return {
            restrict: 'E',
            scope: {
                data: '=',
                fieldName: '=',
                field: '=',
                mainField: '=',
                hasEditAndDeleteButtons: '=',
                templateUrl: '=',
                selector: '=',
                edited: '&',
                removed: "&"
            },
            template: '<div ng-include="templateUrl"></div>',
            link: function ($scope, element, attrs) {
                var backupData;
                element.bind("keydown keypress", function (event) {
                        if (!$scope.mainField) {
                            if (event.which === 13) {
                                event.preventDefault();
                                $scope.$apply(function () {
                                    $scope.finishedEditing();
                                });
                            }
                        }
                    }
                );
                var keyUnbinder = function () {
                    element.unbind("keydown keypress");
                }

                var unbindOnDestroy = [];
                var unbindDestroyListener = $scope.$on('$destroy', function () {
                    unbindOnDestroy.forEach(function (unbind) {
                        unbind();
                    });
                });
                unbindOnDestroy.push(unbindDestroyListener);
                unbindOnDestroy.push(keyUnbinder);

                $scope.edit = function (fieldValue) {
                    backupData = angular.copy(fieldValue);
                    $scope.data.isEditing = true;
                };
                $scope.finishedEditing = function (isCancel) {
                    delete $scope.data.isEditing;
                    if (isCancel) {
                        $scope.data[$scope.field] = angular.copy(backupData);
                        return;
                    }
                    if (!$scope.mainField) {
                        //simple edit in place - only one field
                        var unchanged = false;
                        if ($scope.data[$scope.field] == backupData) {
                            unchanged = true;
                        }
                        if (!unchanged) {
                            $scope.edited($scope.data);
                        }
                    } else {
                        //no matter what, if it is a complex one (having main-field declared)
                        //we have to say it was edited
                        $scope.edited($scope.data);
                    }
                };
                $scope.delete = function (event, data) {
                    var itemTitle = $scope.mainField ? eval('$scope.data' + $scope.mainField) : $scope.data[$scope.field];
                    var confirm = $mdDialog.confirm()
                        .title('?terge?i ' + itemTitle + ' ?')
                        .ariaLabel('Delete')
                        .ok('Da')
                        .cancel('Nu').
                        targetEvent(event);
                    $mdDialog.show(confirm).then(function () {
                        $scope.removed(data);
                    }, function () {
                        //$log.log("NOT Removing");
                    });
                }
            }
        };
    }
}());