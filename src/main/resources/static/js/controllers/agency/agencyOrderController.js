(function () {
    "use strict";

    angular.module('photoX').controller('agencyOrderCtrl', agencyOrderCtrl);

    agencyOrderCtrl.$inject = ['$scope', '$rootScope', 'commons', '$mdDialog', '_', 'ProductsService', 'ResourcesService', '$timeout', 'localize', 'APP_URL', '$mdToast', '$stateParams'];

    function agencyOrderCtrl($scope, $rootScope, commons, $mdDialog, _, ProductsService, ResourcesService, OrdersService, $timeout, localize, APP_URL, $mdToast, $stateParams) {
        function getfilesize(size) {
            var string;
            if (size >= 100000000000) {
                size = size / 100000000000;
                string = "TB";
            } else if (size >= 100000000) {
                size = size / 100000000;
                string = "GB";
            } else if (size >= 100000) {
                size = size / 100000;
                string = "MB";
            } else if (size >= 100) {
                size = size / 100;
                string = "KB";
            } else {
                size = size * 10;
                string = "b";
            }
            return (Math.round(size) / 10) + string;
        };

        var callbacks = {
            //this method doesn't use JavaScript resize of the thumbnails (they get resized onto the server)
            //$scope.dropZoneOptions.createImageThumbnails: false
            //$scope.dropZoneOptions.autoProcessQueue: true,
            onNoThumbnailProduced: function (file) {
                $scope.$apply(function () {
                    $scope.picsCounter--;
                });
                //commons.log("NO[ThumbnailProduced] " + $scope.picsCounter + " remaining...");
                if (file.width && file.height) {
                    file.fileSize = getfilesize(file.size) + " (" + file.width + " x " + file.height + ")";
                } else {
                    file.fileSize = getfilesize(file.size);
                }
                $scope.pendingAddFiles.push(file);
                if ($scope.picsCounter == 0) {
                    $scope.closeLoadingDialog();
                    $scope.$apply(function () {
                        angular.forEach($scope.pendingAddFiles, function (pendingFile) {
                            //commons.log(pendingFile);
                            $scope.files.push(pendingFile);
                        });
                        if ($scope.files.length > $scope.numberOfCollages) {
                            $scope.numberOfCollages = $scope.files.length;
                            $scope.calculateTotalPrice();
                        }
                        $scope.pendingAddFiles = [];
                    });
                }
            },
            //this method use JavaScript (a lot slower) resize of the thumbnails (they get resized onto the server)
            //dropzone options should have
            //$scope.dropZoneOptions.createImageThumbnails: true
            //$scope.dropZoneOptions.autoProcessQueue: false,
            //--------------------------------------------------------
            //CURRENTLY DISABLED - Java produces better results faster
            //--------------------------------------------------------
            onThumbnailProduced: function (file) {
                $scope.$apply(function () {
                    $scope.picsCounter--;
                    $scope.progressValue = (100 / picsCounter) - 1;
                });
                commons.log("onThumbnailProduced " + $scope.picsCounter + " remaining...");
                file.fileSize = getfilesize(file.size) + " (" + file.width + " x " + file.height + ")";
                $scope.pendingAddFiles.push(file);
                if ($scope.picsCounter == 0) {
                    $scope.closeLoadingDialog();
                    $scope.$apply(function () {
                        angular.forEach($scope.pendingAddFiles, function (pendingFile) {
                            $scope.files.push(pendingFile);
                        });
                        if ($scope.files.length > $scope.numberOfCollages) {
                            $scope.numberOfCollages = $scope.files.length;
                            $scope.calculateTotalPrice();
                        }
                        $scope.pendingAddFiles = [];
                    });
                }
            },
            onUploadProgress: function (file) {
                //commons.log("Progress : " + file.upload.progress);
            },
            //logic for setting thumbnail
            onUploadComplete: function (file) {
                commons.log("Uploaded " + file.status);
                $scope.$apply(function () {
                    if (file.status === "success") {
                        //to hide progress bar
                        file.upload.progress = 0;
                        //disabled
                        //$scope.files = _.without($scope.files, file);
                    }
                });
            },
            onAllUploadsComplete: function () {
                commons.log("onAllUploadsComplete");
                if (!$scope.uploadNotificationShown) {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Ok')
                            .position("bottom left right")
                            .hideDelay(3000)
                    );
                    $scope.uploadNotificationShown = true;
                }
            },
            onDrop: function (ev) {
                $scope.dropZoneOptions.additionalBlob = new Blob([angular.toJson(prepareCommandToBeSaved())], {type: "application/json"});
                $scope.dropZoneOptions.additionalBlobName = "resource";
                $scope.uploadNotificationShown = false;
                $mdDialog.show({
                    controller: function LoadingDialogController(scope, $mdDialog) {
                        $scope.closeLoadingDialog = function () {
                            $mdDialog.hide();
                        }
                    },
                    scope: $scope,
                    preserveScope: true,
                    templateUrl: 'loadingDialog.html'
                });
            },
            onError: function (file, error) {
                commons.log("Error : " + error + " on " + file.name);
            },
            onFileAdded: function (file) {
                $scope.picsCounter++;
                //commons.log("1 File added "+$scope.picsCounter);
            }
        };

        function fakeSelections() {
            var product = _.findWhere($scope.products, {productId: 84});
            $scope.selectedProduct = product;
            $scope.selectors[1] = _.findWhere(product.groupedSelectors, {selectorSequence: 1});
            $scope.selectors[2] = _.findWhere(product.groupedSelectors, {selectorSequence: 2});
            $scope.selectors[3] = _.findWhere(product.groupedSelectors, {selectorSequence: 3});

            $scope.selectedSelectors[1] = _.findWhere($scope.selectors[1].selectors, {materialId: 3});
            $scope.numberOfCollages = $scope.selectors[1].requiredQuantity;
            $scope.selectedSelectors[2] = _.findWhere($scope.selectors[2].selectors, {materialId: 9});
            $scope.selectedSelectors[3] = _.findWhere($scope.selectors[3].selectors, {materialId: 12});

            $scope.calculateTotalPrice();
        };

        function prepareCommandToBeSaved() {
            var result = {
                orderId: $scope.orderId ? $scope.orderId : 0,
                selectedProductId: $scope.selectedProduct.id,
                selectedSelectorsIds: [
                    {
                        materialId: $scope.selectedSelectors[1].materialId,
                        selectorSequence: 1
                    },
                    {
                        materialId: $scope.selectedSelectors[2].materialId,
                        selectorSequence: 2
                    },
                    {
                        materialId: $scope.selectedSelectors[3].materialId,
                        selectorSequence: 3
                    }
                ]
            };
            return result;
        }

        $scope.setCurrency = function (newValue) {
            $scope.priceCurrency = newValue;
            if (newValue == "EUR") {
                $scope.currencyMultiplier = 1;
            } else if (newValue == "RON") {
                $scope.currencyMultiplier = $rootScope.serverSettings.applicationEuro;
            }
            if ($scope.priceIsDisplayed) {
                $scope.calculateTotalPrice();
            }
        };

        $scope.init = function () {
            $scope.selectedIndex = 0;
            ProductsService.getAlbumProducts().then(function (serverResponse) {
                serverResponse.forEach(function (product) {
                    product.extraData = angular.fromJson(product.extraData);
                });
                $scope.products = serverResponse;
                fakeSelections();
            });
            $scope.files = [];
            $scope.selectedSelectors = [];
            $scope.selectors = [];
            $scope.priceIsDisplayed = false;
            $scope.numberOfCollages = 1;
            $scope.setCurrency("RON");
            $scope.dropZoneOptions = {
                url: APP_URL + "/testResourceUpload/" + $scope.orderId,
                method: "rest",
                parallelUploads: 3,
                maxFilesize: 25000,
                maxFiles: 3000,
                thumbnailWidth: 1024,
                addRemoveLinks: true,
                autoProcessQueue: true,
                willCreateThumbnailElements: false,
                createImageThumbnails: false
            };
            $scope.picsCounter = 0;
            $scope.pendingAddFiles = [];
            $scope.uploadNotificationShown = false;
            if ($stateParams.orderId){
                $scope.orderId = $stateParams.orderId;
            }
            //assign the $scope variable to data attribute callbacks within the html form to gather the file object information
            $scope.callbacks = callbacks;

        };

        $scope.setSelectedProduct = function (product) {
            $scope.selectedProduct = product;
            $scope.selectors[1] = _.findWhere(product.groupedSelectors, {selectorSequence: 1});
            $scope.selectors[2] = _.findWhere(product.groupedSelectors, {selectorSequence: 2});
            $scope.selectors[3] = _.findWhere(product.groupedSelectors, {selectorSequence: 3});
            $scope.selectedSelectors = [];
            $scope.selectedIndex++;
            $scope.calculateTotalPrice();
        };

        $scope.setFirstSelector = function (selector) {
            $scope.selectedSelectors[1] = selector;
            $scope.numberOfCollages = $scope.selectors[1].requiredQuantity;
            //commons.log($scope.numberOfCollages + " hartii");//colaje
            $scope.selectedIndex++;
            $scope.calculateTotalPrice();
        };

        $scope.setSecondSelector = function (selector) {
            $scope.selectedSelectors[2] = selector;
            //commons.log($scope.selectors[2].requiredQuantity + " faceoff");
            $scope.selectedIndex++;
            $scope.calculateTotalPrice();
        };

        $scope.setThirdSelector = function (selector) {
            $scope.selectedSelectors[3] = selector;
            //commons.log($scope.selectors[1].requiredQuantity + " coperta");
            $scope.selectedIndex++;
            $scope.calculateTotalPrice();
        };

        $scope.calculateTotalPrice = function (numberOfCollages) {
            if (numberOfCollages) {
                $scope.numberOfCollages = numberOfCollages;
            }
            if (!$scope.selectedSelectors[1] || !$scope.selectedSelectors[2] || !$scope.selectedSelectors[3]) {
                $scope.priceIsDisplayed = false;
                return;
            }
            if (!$scope.priceIsDisplayed) {
                $timeout(function () {
                    $scope.selectedIndex = 4;
                });
                $scope.priceIsDisplayed = true;
            }
            $scope.price = $scope.currencyMultiplier * (
                    $scope.selectedProduct.totalBasePrice +
                    ($scope.numberOfCollages * $scope.selectedSelectors[1].pricePerUnit) +
                    ($scope.selectors[2].requiredQuantity * $scope.selectedSelectors[2].pricePerUnit) +
                    ($scope.selectors[3].requiredQuantity * $scope.selectedSelectors[3].pricePerUnit)
                );
            //TODO : create order at this point, so we can send order id with the uploaded files
            OrdersService.registerOrUpdateOrder(prepareCommandToBeSaved()).then(function (serverResponse) {
                if (!$scope.orderId) {
                    commons.log("Order registered #"+serverResponse.id);
                    $scope.orderId = serverResponse.id;
                }else{
                    commons.log("update order");
                }
            });
        };
                $scope.removeFileFromDropzone = function (ev, file) {
            var confirm = $mdDialog.confirm()
                .parent(angular.element(document.body))
                .title(localize.getLocalizedString('_DeleteQuestion_', 'Fisier', ''))
                .ariaLabel('Delete')
                .ok(localize.getLocalizedString('_Yes_'))
                .cancel(localize.getLocalizedString('_No_')).
                targetEvent(ev);
            $mdDialog.show(confirm).then(function () {
                ResourcesService.removeUpload(file).then(function (serverResponse) {
                    //this the directive method
                    $scope.dropzoneRemoveFile(file);
                    $scope.files = _.without($scope.files, file);
                });
            }, function () {
                //commons.log("NOT Removing");
            });
        };

        $scope.launchCommand = function () {

        };

        $scope.init();
    }

    angular.module('photoX').controller('DialogController', DialogController);

    DialogController.$inject = ['$scope', '$mdDialog'];

    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }

}).call(this);