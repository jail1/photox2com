( function () {

    'use strict';

    angular.module('dropzone', []);

    angular.module('dropzone').directive('dropZone', dropZone);

    angular.module('dropzone').controller('dropZoneController', dropZoneController);

    dropZoneController.$inject = ['$scope', '$log', '$window', '$timeout', '$q', '$compile', '$templateCache'];

    function dropZoneController($scope, $log, $window, $timeout, $q, $compile, $templateCache) {
        var self = this,
            element,
            hiddenFileInput;

        function eventListener($event) {
            switch ($event.type) {
                case "dragstart":
                    self.callbacks.onDragStart($event);
                    break;
                case "dragenter":
                    self.noPropagation($event);
                    var efct;
                    try {
                        efct = $event.dataTransfer.effectAllowed;
                    } catch (_error) {
                        $log.error(_error);
                    }
                    $event.dataTransfer.dropEffect = 'move' === efct || 'linkMove' === efct ? 'move' : 'copy';
                    self.callbacks.onDragEnter($event);
                    break;
                case "dragover":
                    self.noPropagation($event);
                    self.callbacks.onDragOver($event);
                    break;
                case "dragleave":
                    self.callbacks.onDragLeave($event);
                    break;
                case "dragend":
                    self.callbacks.onDragEnd($event);
                    break;
                case "drop":
                    self.noPropagation($event);
                    processDataTransfer($event);
                    self.callbacks.onDrop($event);
                    break;
                case "click":
                    return self.hiddenFileInput.click();
                    break;
            }
        };

        function setupEventListeners() {
            self.element.bind('dragstart dragenter dragover dragleave drop dragend click', eventListener);
        };

        function setupHiddenFileInput() {
            self.hiddenFileInput = document.createElement("input");
            self.hiddenFileInput.setAttribute("id", "hidden-drop-zone");
            self.hiddenFileInput.setAttribute("type", "file");
            self.hiddenFileInput.setAttribute("multiple", "multiple");
            if (self.defaultOptions.acceptedFiles != null) {
                self.hiddenFileInput.setAttribute("accept", self.defaultOptions.acceptedFiles);
            }
            self.hiddenFileInput.style.visibility = "hidden";
            self.hiddenFileInput.style.position = "absolute";
            self.hiddenFileInput.style.top = "0";
            self.hiddenFileInput.style.left = "0";
            self.hiddenFileInput.style.height = "0";
            self.hiddenFileInput.style.width = "0";
            document.body.appendChild(self.hiddenFileInput);
            self.hiddenFileInput.addEventListener("change", function () {
                var files = self.hiddenFileInput.files;
                if (files.length) {
                    self.callbacks.onDrop();
                    handleFiles(files);
                }
            });
        };

        /**
         *
         * @param callback {string}, takes the string and change to array to place multiple calls
         * @param data {*}, data to pass
         */
        function doCallback(callback, data) {
            // Executes the callbacks defined in the controller
            // while safely failing if callback is not defined.
            try {
                callbacks[callback].call(this, data)
            } catch (e) {
                // Callback not defined in the controller.
            }
        }

        this.init = function (element) {
            self.element = element;
            setupHiddenFileInput();
            setupEventListeners();
        };

        this.noPropagation = function ($event) {
            $event.preventDefault();
            if ($event && $event.stopPropagation) {
                $event.stopPropagation();
            } else {
                $log.log("$window.event.cancelBubble = true;");
                $window.event.cancelBubble = true;
            }
        };

        this.noop = function () {
        };

        this.defaultOptions = {
            url: null,
            method: "simulate",
            parallelUploads: 2,
            maxFilesize: 250, //Mib
            createImageThumbnails: true,
            additionalBlob : null,
            additionalBlobName : null,
            thumbnailWidth: 50,
            thumbnailHeight: 50,
            maxFiles: 3,
            acceptedFiles: null,
            autoProcessQueue: true,
            addRemoveLinks: false,
            willCreateThumbnailElements: true,
            accept: function (file, done) {
                return done();
            },
            resize: function (file) {
                var info, srcRatio, trgRatio;
                info = {
                    srcX: 0,
                    srcY: 0,
                    srcWidth: file.width,
                    srcHeight: file.height
                };
                srcRatio = file.width / file.height;
                trgRatio = self.defaultOptions.thumbnailWidth / self.defaultOptions.thumbnailHeight;
                if (file.height < self.defaultOptions.thumbnailHeight || file.width < self.defaultOptions.thumbnailWidth) {
                    info.trgHeight = info.srcHeight;
                    info.trgWidth = info.srcWidth;
                } else {
                    if (srcRatio > trgRatio) {
                        info.srcHeight = file.height;
                        info.srcWidth = info.srcHeight * trgRatio;
                    } else {
                        info.srcWidth = file.width;
                        info.srcHeight = info.srcWidth / trgRatio;
                    }
                }
                info.srcX = (file.width - info.srcWidth) / 2;
                info.srcY = (file.height - info.srcHeight) / 2;
                return info;
            }
        };

        var files = [];

        this.callbacks = {
            askQuestionThenRemoveFile: function (ev, file, callback) {
            },
            onError: function (file, message) {
            },
            onDragStart: function ($event) {
            },
            onDragEnter: function ($event) {
            },
            onDragOver: function ($event) {
            },
            onDragLeave: function ($event) {
            },
            onDragEnd: function ($event) {
            },
            onDrop: function ($event) {
            },
            onThumbnailProduced: function (file) {
            },
            onFileAdded: function (file) {
            },
            onUploadProgress: function (file) {
            },
            onUploadComplete: function (file) {
            },
            onAllUploadsComplete: function () {
            }
        };

        $scope.ERRORS = {
            MAX_FILES_EXCEEDED: 1,
            MAX_FILE_SIZE_EXCEEDED: 2,
            INVALID_FILE_TYPE: 3
        };

        $scope.STATUS = {
            ADDED: "added",
            QUEUED: "queued",
            ACCEPTED: "queued",
            UPLOADING: "uploading",
            PROCESSING: "uploading",
            CANCELED: "canceled",
            ERROR: "error",
            SUCCESS: "success"
        };

        function removeFile(file) {
            for (var i = 0; i < files.length; i++) {
                if (files[i].timeStamp == file.timeStamp) {
                    files.splice(i, 1);
                }
            }
        }

        function removeThumbnailElement(file) {
            if (file.previewElement != null) {
                file.previewElement.remove();
                removeFile(file);
            }
        };

        function createThumbnailElementAndScope(file) {
            var localScope = $scope.$new(true);
            if (self.defaultOptions.addRemoveLinks) {
                localScope.hasRemoveLink = true;
                localScope.onRemoveFileClicked = function (e) {
                    self.noPropagation(e);
                    if (!self.callbacks.askQuestionThenRemoveFile) {
                        throw Error("You forgot to mount file removal callback - 'askQuestionThenRemoveFile($event, file, yesCallback)' must be a function")
                    }
                    self.callbacks.askQuestionThenRemoveFile(e, file, removeThumbnailElement);
                };
            }
            file.previewElement = $compile($templateCache.get($scope.previewTemplate))(localScope);
            localScope.$apply(function () {
                localScope.ready = false;
                localScope.thumbnailWidth = self.defaultOptions.thumbnailWidth;
                localScope.thumbnailHeight = self.defaultOptions.thumbnailHeight;
            });
            self.element.append(file.previewElement);
        };

        function updateThumbnailElement(file) {
            var previewElement = angular.element(file.previewElement);
            previewElement.scope().$apply(function () {
                previewElement.scope().fileAlt = file.name;
                previewElement.scope().thumbnail = file.thumbnail;
                previewElement.scope().ready = true;
            });
        };

        function getAcceptedFiles() {
            var file, _i, _results;
            _results = [];
            for (_i = 0; _i < files.length; _i++) {
                file = files[_i];
                if (file.accepted) {
                    _results.push(file);
                }
            }
            return _results;
        };

        function handleFiles(files) {
            var file, _results;
            _results = [];
            for (var i = 0; i < files.length; i++) {
                file = files[i];
                if (file.type.match('^image/')) {
                    _results.push(addFile(file));
                }
            }
            return _results;
        };
        function processDataTransfer($event) {
            var items = $event.dataTransfer.items;
            var files = $event.dataTransfer.files;
            if (items && items.length) {
                for (var i = 0, item; item = items[i]; ++i) {
                    // Skip this one if we didn't get a file.
                    if (item.kind != 'file') {
                        continue;
                    }
                    var entry = item.webkitGetAsEntry();
                    if (entry.isDirectory) {
                        addDirectory(entry, processDirectoryEntity);
                    } else {
                        if (entry.isFile && files[i].type.match('^image/')) {
                            addFile(item.getAsFile());
                        } else {
                            //$log.error("Not an image");
                        }
                    }
                }
            } else {
                //Firefox
                for (var i = 0; i < files.length; i++) {
                    if (files[i].type.match('^image/')) {
                        addFile(files[i]);
                    }
                }
            }
        };
        function processSingleConvertedEntity(convertedEntry) {
            if (convertedEntry.type.match('^image/')) {
                addFile(convertedEntry);
            }
        }

        function processSingleEntity(entry) {
            entry.file(processSingleConvertedEntity, function (error) {
                $log.error("Error", error);
            });
        }

        function processDirectoryEntity(entries) {
            entries.forEach(processSingleEntity);
        }

        function addDirectory(dirEntry, callback) {
            var dirReader = dirEntry.createReader();
            var entries = [];
            // Call the reader.readEntries() until no more results are returned.
            var readEntries = function () {
                dirReader.readEntries(function (results) {
                    if (!results.length) {
                        callback(entries);
                    } else {
                        entries = entries.concat(Array.prototype.slice.call(results || [], 0));
                        readEntries();
                    }
                }, function (error) {
                    $log.error(error);
                });
            };
            readEntries(); // Start reading dirs.
        };

        function addFile(file) {
            /**
             * Check if the file meets the options
             */
            if (self.defaultOptions.maxFiles && getAcceptedFiles().length >= self.defaultOptions.maxFiles) {
                file.status = $scope.STATUS.ERROR;
                self.callbacks.onError(file, $scope.ERRORS.MAX_FILES_EXCEEDED);
                console.error("Max files exceeded");
                return;
            } else if (file.size > self.defaultOptions.maxFilesize * 1024 * 1024) {
                self.callbacks.onError(file, $scope.ERRORS.MAX_FILE_SIZE_EXCEEDED);
                console.error("Max file size exceeded");
                return;
            } else if (!isValidFile(file, self.defaultOptions.acceptedFiles)) {
                self.callbacks.onError(file, $scope.ERRORS.INVALID_FILE_TYPE);
                console.error("Invalid file type");
                return;
            }
            file.upload = {
                progress: 0,
                total: file.size,
                bytesSent: 0
            };
            file.timeStamp = Math.round((new Date()).getTime() / 1000);
            files.push(file);
            file.status = $scope.STATUS.ADDED;
            if (self.defaultOptions.willCreateThumbnailElements) {
                createThumbnailElementAndScope(file);
            } else {
                self.callbacks.onFileAdded(file);
            }
            //check if file size was not rejected
            if (self.defaultOptions.createImageThumbnails && file.type.match(/image.*/)) {
                getBase64Images(file);
            } else {
                self.callbacks.onNoThumbnailProduced(file);
            }
            return _enqueueFile(file)
        };

        function _enqueueFile(file) {
            file.accepted = true;
            if (file.status === $scope.STATUS.ADDED) {
                file.status = $scope.STATUS.QUEUED;
                if (self.defaultOptions.autoProcessQueue) {
                    return setTimeout((function () {
                        return processQueue();
                    }), 1);
                }
            } else {
                throw new Error("This file can't be queued because it has already been processed or was rejected.");
            }
        };
        /**
         * Checks if file is valide from acceptedFiles {string}
         * @param file {object}
         * @param acceptedFiles {string}
         * @returns {boolean}
         */
        function isValidFile(file, acceptedFiles) {
            var baseMimeType, mimeType, validType, _i, _len;
            if (!acceptedFiles) {
                return true;
            }
            acceptedFiles = acceptedFiles.split(",");
            mimeType = file.type;
            baseMimeType = mimeType.replace(/\/.*$/, "");
            for (_i = 0, _len = acceptedFiles.length; _i < _len; _i++) {
                validType = acceptedFiles[_i];
                validType = validType.trim();
                if (validType.charAt(0) === ".") {
                    if (file.name.indexOf(validType, file.name.length - validType.length) !== -1) {
                        return true;
                    }
                } else if (/\/\*$/.test(validType)) {
                    if (baseMimeType === validType.replace(/\/.*$/, "")) {
                        return true;
                    }
                } else {
                    if (mimeType === validType) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**
         * Creates the originalImage and thumbnail base64 images, and appends key to file object
         * @param file {object}
         */
        function getBase64Images(file) {
            if (!self.originalCanvas) {
                //$log.log("Creating original canvas and setting up processing queue");
                self.originalCanvas = document.createElement("canvas");
                self.originalSize = self.originalCanvas.getContext("2d");
                self.scaledCanvas = document.createElement("canvas");
                self.queuedProcessing = [];
                var startedOperation = new Date();
            }
            if (self.processInProgress) {
                //$log.log("[x] Pending " + file.name);
                self.queuedProcessing.push(file);
                return;
            }
            self.currentFile = file;
            //$log.log("[0] Processing " + self.currentFile.name);
            self.theFileReader = new FileReader();
            self.theFileReader.onload = function () {
                //$log.log("[1] File reader finished loading " + self.currentFile.name);
                var originalImage = new Image();
                originalImage.onload = function () {
                    //$log.log("[2] Original image loaded " + self.currentFile.name);
                    self.currentFile.width = originalImage.width;
                    self.currentFile.height = originalImage.height;
                    self.originalCanvas.width = originalImage.width;
                    self.originalCanvas.height = originalImage.height;
                    self.originalSize.drawImage(originalImage, 0, 0);
                    self.scaledCanvas.width = self.defaultOptions.thumbnailWidth;
                    self.scaledCanvas.height = originalImage.height * self.defaultOptions.thumbnailWidth / originalImage.width;
                    $window.pica.resizeCanvas(self.originalCanvas, self.scaledCanvas, {
                        quality: 3,
                        unsharpAmount: 60,
                        unsharpThreshold: 10,
                        transferable: true
                    }, function (error) {
                        if (error) {
                            $log.log("Error", error);
                            return;
                        }
                        //$log.log("[3] Worked finished " + self.scaledCanvas.width + " x " + self.scaledCanvas.height + " from " + self.originalCanvas.width + " x " + self.originalCanvas.height);
                        self.currentFile.thumbnail = self.scaledCanvas.toDataURL("image/png");
                        self.currentFile.filesize = getfilesize(self.currentFile.size);
                        if (self.defaultOptions.willCreateThumbnailElements) {
                            updateThumbnailElement(self.currentFile);
                        } else {
                            self.callbacks.onThumbnailProduced(self.currentFile);
                        }
                        if (self.queuedProcessing.length > 0) {
                            self.currentFile = self.queuedProcessing.shift();
                            //$log.log("[0] Processing (from pending) " + self.currentFile.name);
                            self.theFileReader.readAsDataURL(self.currentFile);
                        } else {
                            delete self.processInProgress;
                            delete self.originalCanvas;
                            delete self.originalSize;
                            delete self.scaledCanvas;
                            delete self.queuedProcessing;
                            delete self.currentFile;
                            var time = new Date();
                            $log.log("[END] Process NO longer in progress. Operations took " + (time - startedOperation).toFixed(2));
                        }
                    });
                }
                return originalImage.src = self.theFileReader.result;
            };
            self.processInProgress = true;
            return self.theFileReader.readAsDataURL(file);
        };
        /**
         * Converst image from kb to string format
         * @param size in kib
         * @returns {string}
         */
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

        function uploadFile(file) {
            // $log.log("Uploading " + file.name);
            var fd = new FormData();
            fd.append("file", file);
            if (self.defaultOptions.additionalBlob && self.defaultOptions.additionalBlobName) {
                fd.append(self.defaultOptions.additionalBlobName, self.defaultOptions.additionalBlob);
            }
            file.status = $scope.STATUS.UPLOADING;
            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    if (file) {
                        file.upload.progress = Math.round(evt.loaded * 100 / evt.total);
                        $scope.$apply(function () {
                            self.callbacks.onUploadProgress(file);
                        });
                    } else {
                        console.error("File is undefined ???");
                    }
                } else {
                    console.error('unable to compute');
                }
            }, false);
            xhr.addEventListener("load", function (evt) {
                //check if it's an error (have to parse response)
                var failedParse = false;
                try {
                    var response = JSON.parse(evt.target.response);
                } catch (e) {
                    failedParse = true;
                }
                if (!failedParse && _.has(response, 'errorMessage')) {
                    console.error('Error', response.errorMessage);
                    return;
                }
                if (file) {
                    file.status = $scope.STATUS.SUCCESS;
                    if (!self.defaultOptions.createImageThumbnails) {
                        console.log(evt);
                        file.thumbnail = "data:image/*;base64," + evt.target.response;
                    }
                    self.callbacks.onUploadComplete(file);
                    processQueue();
                } else {
                    console.error("File is undefined ???");
                }
            }, false);
            xhr.addEventListener("error", function (evt) {
                console.error("Failed", evt);
                file.status = $scope.STATUS.ERROR;
            }, false);
            xhr.addEventListener("abort", function (evt) {
                console.error("Canceled", evt);
                file.status = $scope.STATUS.CANCELED;
            }, false);
            xhr.open("POST", self.defaultOptions.url);
            xhr.send(fd);
        };

        function getNoOfUploadsInProgress() {
            var file, _i, counter = 0;
            for (_i = 0; _i < files.length; _i++) {
                file = files[_i];
                if (file.status === $scope.STATUS.UPLOADING) {
                    counter++;
                }
            }
            return counter;
        };

        function getNoOfQueuedFiles() {
            var file, _i, counter = 0;
            for (_i = 0; _i < files.length; _i++) {
                file = files[_i];
                if (file.status === $scope.STATUS.QUEUED) {
                    counter++;
                }
            }
            return counter;
        };

        function processQueue() {
            var _c = getNoOfUploadsInProgress();
            //$log.log("Queue status " + _c + " " + getNoOfQueuedFiles());
            //this should not ever happen
            if (_c >= self.defaultOptions.parallelUploads) {
                //$log.log("Still processing ??? ");
                return;
            }
            //if finished
            if (getNoOfQueuedFiles() == 0) {
                //$log.log("ALL uploads are complete (no queued files) ");
                //for (_i = 0; _i < files.length; _i++) {
                    //$log.log(files[_i]);
                //}
                self.callbacks.onAllUploadsComplete();
                return;
            }
            var file, _i;
            var queuedFiles = [];
            for (_i = 0; _i < files.length; _i++) {
                file = files[_i];
                if (file.status === $scope.STATUS.QUEUED) {
                    queuedFiles.push(file);
                }
            }
            _c = self.defaultOptions.parallelUploads - _c;
            while (_c > 0) {
                //$log.log("Queue " + _c);
                uploadFile(queuedFiles.shift());
                _c--;
            }
        };
        //exposed to an application controller, so it can remove files if needed
        $scope.fileRemoveRequest = function (file) {
            if (file) {
                removeFile(file);
            }
        };
        $scope.startUploadRequest = function () {
            console.log("Start processing queue");
            processQueue();
        };
    }

    function dropZone() {
        return {
            link: function (scope, element, attr, ctrl) {
                element.addClass("dz-clickable");
                Object.keys(scope.options).forEach(function (key) {
                    ctrl.defaultOptions[key] = scope.options[key];
                });
                Object.keys(scope.callbacks).forEach(function (key) {
                    ctrl.callbacks[key] = scope.callbacks[key];
                });
                ctrl.init(element);
            },
            controller: 'dropZoneController',
            scope: {
                callbacks: "=",
                options: "=",
                previewTemplate: "=",
                fileRemoveRequest: "=",
                startUploadRequest: "="
            }
        };
    }
}());