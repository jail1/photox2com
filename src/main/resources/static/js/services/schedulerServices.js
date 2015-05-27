(function () {
    "use strict";

    angular.module('photoX').service('schedulingServices', schedulingServices);

    schedulingServices.$inject = ['$http', '$q', '$rootScope', '$log', '$timeout', '_', '$mdToast', 'localize'];

    function schedulingServices($http, $q, $rootScope, $log, $timeout, _, $mdToast, localize) {

        function provideTestProductData() {
            
            var d = $q.defer();
            $timeout(function() {

                var testProducts = [

                    {
                        "productId": 1,
                        "totalBasePrice": 0.05640151499999999,
                        "name": "Fotografia 305 mm",
                        "description": "810x305mm",
                        "groupedSelectors": [
                            {
                                "requiredQuantity": 1,
                                "selectorSequence": 1,
                                "selectors": [
                                    {
                                        "name": "Edge E 305mm (mată)",
                                        "description": "Rolă, lungime 93 m, lățime 305 mm",
                                        "pricePerUnit": 1,
                                        "materialId": 14
                                    },
                                    {
                                        "name": "Edge F 305mm (lucioasă)",
                                        "description": "Rolă, lungime 93 m, lățime 305mm",
                                        "pricePerUnit": 1,
                                        "materialId": 15
                                    },
                                    {
                                        "name": "Royal N 305mm (mată)",
                                        "description": "Rolă, lungime 78m, lățime 305mm",
                                        "pricePerUnit": 1,
                                        "materialId": 16
                                    },
                                    {
                                        "name": "Royal F 305mm (lucioasă)",
                                        "description": "Rolă, lungime 78m, lățime 305mm",
                                        "pricePerUnit": 1,
                                        "materialId": 17
                                    },
                                    {
                                        "name": "Premier F 305mm (lucioasă)",
                                        "description": "Rolă, lungime 88m, lățime 305mm",
                                        "pricePerUnit": 1,
                                        "materialId": 18
                                    },
                                    {
                                        "name": "Metal 305mm",
                                        "description": "Rolă, lungime 28.2 m, lățiime 305 mm",
                                        "pricePerUnit": 4.47,
                                        "materialId": 3
                                    },
                                    {
                                        "name": "Premier Y 305mm (raster)",
                                        "description": "Rolă, lungime 88 m, lățime 305 mm",
                                        "pricePerUnit": 1.905,
                                        "materialId": 4
                                    },
                                    {
                                        "name": "Premier E 305 mm(mată)",
                                        "description": "Rolă, 88m lungime, 305mm lățime",
                                        "pricePerUnit": 1,
                                        "materialId": 72
                                    }
                                ],
                                "parentId": 3
                            }
                        ],
                        "extraData": "{\"width\":305,\"height\":810}",
                        "complex": false
                    },
                    {
                        "productId": 4,
                        "totalBasePrice": 9.81608515,
                        "name": "Album 40x30",
                        "description": "",
                        "groupedSelectors": [
                            {
                                "requiredQuantity": 2,
                                "selectorSequence": 2,
                                "selectors": [
                                    {
                                        "name": "Faceoff alb",
                                        "description": "",
                                        "pricePerUnit": 3,
                                        "materialId": 9
                                    },
                                    {
                                        "name": "Faceoff negru",
                                        "description": "",
                                        "pricePerUnit": 3,
                                        "materialId": 10
                                    }
                                ],
                                "parentId": 23
                            },
                            {
                                "requiredQuantity": 1,
                                "selectorSequence": 3,
                                "selectors": [
                                    {
                                        "name": "Copertă piele",
                                        "description": "",
                                        "pricePerUnit": 7,
                                        "materialId": 12
                                    },
                                    {
                                        "name": "Copertă carton",
                                        "description": "",
                                        "pricePerUnit": 5,
                                        "materialId": 13
                                    }
                                ],
                                "parentId": 22
                            },
                            {
                                "requiredQuantity": 10,
                                "selectorSequence": 1,
                                "selectors": [
                                    {
                                        "name": "Edge E 305mm (mată)",
                                        "description": "Rolă, lungime 93 m, lățime 305 mm",
                                        "pricePerUnit": 0.6,
                                        "materialId": 14
                                    },
                                    {
                                        "name": "Edge F 305mm (lucioasă)",
                                        "description": "Rolă, lungime 93 m, lățime 305mm",
                                        "pricePerUnit": 0.6,
                                        "materialId": 15
                                    },
                                    {
                                        "name": "Royal N 305mm (mată)",
                                        "description": "Rolă, lungime 78m, lățime 305mm",
                                        "pricePerUnit": 0.7,
                                        "materialId": 16
                                    },
                                    {
                                        "name": "Royal F 305mm (lucioasă)",
                                        "description": "Rolă, lungime 78m, lățime 305mm",
                                        "pricePerUnit": 0.7,
                                        "materialId": 17
                                    },
                                    {
                                        "name": "Premier F 305mm (lucioasă)",
                                        "description": "Rolă, lungime 88m, lățime 305mm",
                                        "pricePerUnit": 0.8,
                                        "materialId": 18
                                    },
                                    {
                                        "name": "Metal 305mm",
                                        "description": "Rolă, lungime 28.2 m, lățiime 305 mm",
                                        "pricePerUnit": 2.4,
                                        "materialId": 3
                                    },
                                    {
                                        "name": "Premier Y 305mm (raster)",
                                        "description": "Rolă, lungime 88 m, lățime 305 mm",
                                        "pricePerUnit": 0.8,
                                        "materialId": 4
                                    },
                                    {
                                        "name": "Premier E 305 mm(mată)",
                                        "description": "Rolă, 88m lungime, 305mm lățime",
                                        "pricePerUnit": 0.8,
                                        "materialId": 72
                                    }
                                ],
                                "parentId": 3
                            }
                        ],
                        "extraData": "{\"width\":810,\"height\":305}",
                        "complex": true
                    },
                    {
                        "productId": 14,
                        "totalBasePrice": 0.695547,
                        "name": "Produs simplu fara selector",
                        "description": "Produs simplu fara selector",
                        "extraData": "{\"width\":300,\"height\":300}",
                        "complex": false
                    },
                    {
                        "productId": 16,
                        "totalBasePrice": 0.021585765,
                        "name": "Fotografia 310x310",
                        "description": "810x305mm",
                        "groupedSelectors": [
                            {
                                "requiredQuantity": 1,
                                "selectorSequence": 1,
                                "selectors": [
                                    {
                                        "name": "Edge E 305mm (mată)",
                                        "description": "Rolă, lungime 93 m, lățime 305 mm",
                                        "pricePerUnit": 1,
                                        "materialId": 14
                                    },
                                    {
                                        "name": "Edge F 305mm (lucioasă)",
                                        "description": "Rolă, lungime 93 m, lățime 305mm",
                                        "pricePerUnit": 1,
                                        "materialId": 15
                                    },
                                    {
                                        "name": "Royal N 305mm (mată)",
                                        "description": "Rolă, lungime 78m, lățime 305mm",
                                        "pricePerUnit": 1,
                                        "materialId": 16
                                    },
                                    {
                                        "name": "Royal F 305mm (lucioasă)",
                                        "description": "Rolă, lungime 78m, lățime 305mm",
                                        "pricePerUnit": 1,
                                        "materialId": 17
                                    },
                                    {
                                        "name": "Premier F 305mm (lucioasă)",
                                        "description": "Rolă, lungime 88m, lățime 305mm",
                                        "pricePerUnit": 1,
                                        "materialId": 18
                                    },
                                    {
                                        "name": "Metal 305mm",
                                        "description": "Rolă, lungime 28.2 m, lățiime 305 mm",
                                        "pricePerUnit": 4.47,
                                        "materialId": 3
                                    },
                                    {
                                        "name": "Premier Y 305mm (raster)",
                                        "description": "Rolă, lungime 88 m, lățime 305 mm",
                                        "pricePerUnit": 1.905,
                                        "materialId": 4
                                    },
                                    {
                                        "name": "Premier E 305 mm(mată)",
                                        "description": "Rolă, 88m lungime, 305mm lățime",
                                        "pricePerUnit": 1,
                                        "materialId": 72
                                    }
                                ],
                                "parentId": 3
                            }
                        ],
                        "extraData": "{\"width\":305,\"height\":310}",
                        "complex": false
                    },
                    {
                        "productId": 24,
                        "totalBasePrice": 0.1587762,
                        "name": "Album 7.5x7.5",
                        "description": "",
                        "groupedSelectors": [
                            {
                                "requiredQuantity": 2,
                                "selectorSequence": 2,
                                "selectors": [
                                    {
                                        "name": "Faceoff alb",
                                        "description": "",
                                        "pricePerUnit": 3,
                                        "materialId": 9
                                    },
                                    {
                                        "name": "Faceoff negru",
                                        "description": "",
                                        "pricePerUnit": 3,
                                        "materialId": 10
                                    }
                                ],
                                "parentId": 23
                            },
                            {
                                "requiredQuantity": 1,
                                "selectorSequence": 3,
                                "selectors": [
                                    {
                                        "name": "Copertă piele",
                                        "description": "",
                                        "pricePerUnit": 7,
                                        "materialId": 12
                                    },
                                    {
                                        "name": "Copertă carton",
                                        "description": "",
                                        "pricePerUnit": 5,
                                        "materialId": 13
                                    }
                                ],
                                "parentId": 22
                            },
                            {
                                "requiredQuantity": 10,
                                "selectorSequence": 1,
                                "selectors": [
                                    {
                                        "name": "Edge E 305mm (mată)",
                                        "description": "Rolă, lungime 93 m, lățime 305 mm",
                                        "pricePerUnit": 0.6,
                                        "materialId": 14
                                    },
                                    {
                                        "name": "Edge F 305mm (lucioasă)",
                                        "description": "Rolă, lungime 93 m, lățime 305mm",
                                        "pricePerUnit": 0.6,
                                        "materialId": 15
                                    },
                                    {
                                        "name": "Royal N 305mm (mată)",
                                        "description": "Rolă, lungime 78m, lățime 305mm",
                                        "pricePerUnit": 0.7,
                                        "materialId": 16
                                    },
                                    {
                                        "name": "Royal F 305mm (lucioasă)",
                                        "description": "Rolă, lungime 78m, lățime 305mm",
                                        "pricePerUnit": 0.7,
                                        "materialId": 17
                                    },
                                    {
                                        "name": "Premier F 305mm (lucioasă)",
                                        "description": "Rolă, lungime 88m, lățime 305mm",
                                        "pricePerUnit": 0.8,
                                        "materialId": 18
                                    },
                                    {
                                        "name": "Metal 305mm",
                                        "description": "Rolă, lungime 28.2 m, lățiime 305 mm",
                                        "pricePerUnit": 2.4,
                                        "materialId": 3
                                    },
                                    {
                                        "name": "Premier Y 305mm (raster)",
                                        "description": "Rolă, lungime 88 m, lățime 305 mm",
                                        "pricePerUnit": 0.8,
                                        "materialId": 4
                                    },
                                    {
                                        "name": "Premier E 305 mm(mată)",
                                        "description": "Rolă, 88m lungime, 305mm lățime",
                                        "pricePerUnit": 0.8,
                                        "materialId": 72
                                    }
                                ],
                                "parentId": 3
                            }
                        ],
                        "extraData": "{\"width\":152,\"height\":76}",
                        "complex": true
                    },
                    {
                        "productId": 30,
                        "totalBasePrice": 0,
                        "name": "Album 10x7.5",
                        "description": "",
                        "groupedSelectors": [
                            {
                                "requiredQuantity": 2,
                                "selectorSequence": 2,
                                "selectors": [
                                    {
                                        "name": "Faceoff alb",
                                        "description": "",
                                        "pricePerUnit": 3,
                                        "materialId": 9
                                    },
                                    {
                                        "name": "Faceoff negru",
                                        "description": "",
                                        "pricePerUnit": 3,
                                        "materialId": 10
                                    }
                                ],
                                "parentId": 23
                            },
                            {
                                "requiredQuantity": 1,
                                "selectorSequence": 3,
                                "selectors": [
                                    {
                                        "name": "Copertă piele",
                                        "description": "",
                                        "pricePerUnit": 7,
                                        "materialId": 12
                                    },
                                    {
                                        "name": "Copertă carton",
                                        "description": "",
                                        "pricePerUnit": 5,
                                        "materialId": 13
                                    }
                                ],
                                "parentId": 22
                            },
                            {
                                "requiredQuantity": 10,
                                "selectorSequence": 1,
                                "selectors": [
                                    {
                                        "name": "Edge E 305mm (mată)",
                                        "description": "Rolă, lungime 93 m, lățime 305 mm",
                                        "pricePerUnit": 0.6,
                                        "materialId": 14
                                    },
                                    {
                                        "name": "Edge F 305mm (lucioasă)",
                                        "description": "Rolă, lungime 93 m, lățime 305mm",
                                        "pricePerUnit": 0.6,
                                        "materialId": 15
                                    },
                                    {
                                        "name": "Royal N 305mm (mată)",
                                        "description": "Rolă, lungime 78m, lățime 305mm",
                                        "pricePerUnit": 0.7,
                                        "materialId": 16
                                    },
                                    {
                                        "name": "Royal F 305mm (lucioasă)",
                                        "description": "Rolă, lungime 78m, lățime 305mm",
                                        "pricePerUnit": 0.7,
                                        "materialId": 17
                                    },
                                    {
                                        "name": "Premier F 305mm (lucioasă)",
                                        "description": "Rolă, lungime 88m, lățime 305mm",
                                        "pricePerUnit": 0.8,
                                        "materialId": 18
                                    },
                                    {
                                        "name": "Metal 305mm",
                                        "description": "Rolă, lungime 28.2 m, lățiime 305 mm",
                                        "pricePerUnit": 2.4,
                                        "materialId": 3
                                    },
                                    {
                                        "name": "Premier Y 305mm (raster)",
                                        "description": "Rolă, lungime 88 m, lățime 305 mm",
                                        "pricePerUnit": 0.8,
                                        "materialId": 4
                                    },
                                    {
                                        "name": "Premier E 305 mm(mată)",
                                        "description": "Rolă, 88m lungime, 305mm lățime",
                                        "pricePerUnit": 0.8,
                                        "materialId": 72
                                    }
                                ],
                                "parentId": 3
                            }
                        ],
                        "extraData": "{\"width\":76,\"height\":203}",
                        "complex": true
                    },
                ];

                d.resolve(testProducts);

            }, 1000);

            return d.promise;
        }

        function provideTestScheduleData() {
            var d = $q.defer();
            $timeout(function () {
                var currentYear = moment().year();
                var currentMonth = moment().month();
                var currentDay = moment().date();

                var testEvents = [
                    {
                        id: 1,
                        title: 'Popescu Costel',
                        product: 'Balet pe gheata',
                        type: 'warning',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 13, 10, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 13, 11, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 2,
                        title: 'Bogdan Dinu',
                        product: 'Terapie Yumeiho',
                        type: 'info',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 13, 17, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 13, 18, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 3,
                        title: 'Adina Dinu',
                        product: 'Terapie Yumeiho',
                        type: 'important',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 13, 10, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 13, 11, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 4,
                        title: 'Dudu Ionel',
                        product: 'Alergare usoara',
                        type: 'important',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 13, 10, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 13, 11, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 5,
                        title: 'Popescu Costel',
                        product: 'Balet pe gheata',
                        type: 'warning',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 13, 11, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 13, 12, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 6,
                        title: 'Bogdan Dinu',
                        product: 'Terapie Yumeiho',
                        type: 'info',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 13, 15, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 13, 16, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 7,
                        title: 'Adina Dinu',
                        product: 'Terapie Yumeiho',
                        type: 'important',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 13, 11, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 13, 12, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 8,
                        title: 'Dudu Ionel',
                        product: 'Alergare usoara',
                        type: 'important',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 13, 15, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 13, 16, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 9,
                        title: 'Popescu Costel',
                        product: 'Balet pe gheata',
                        type: 'warning',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 13, 10, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 13, 11, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 10,
                        title: 'Bogdan Dinu',
                        product: 'Terapie Yumeiho',
                        type: 'info',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 13, 17, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 13, 18, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 11,
                        title: 'Adina Dinu',
                        product: 'Terapie Yumeiho',
                        type: 'important',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 13, 10, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 13, 11, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 12,
                        title: 'Dudu Ionel',
                        product: 'Alergare usoara',
                        type: 'important',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 13, 10, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 13, 11, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 13,
                        title: 'Popescu Costel',
                        product: 'Balet pe gheata',
                        type: 'warning',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 13, 11, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 13, 12, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 14,
                        title: 'Bogdan Dinu',
                        product: 'Terapie Yumeiho',
                        type: 'info',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 13, 15, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 13, 16, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 15,
                        title: 'Adina Dinu',
                        product: 'Terapie Yumeiho',
                        type: 'important',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 13, 11, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 13, 12, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 16,
                        title: 'Dudu Ionel',
                        product: 'Alergare usoara',
                        type: 'important',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 13, 15, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 13, 16, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    //=======================
                    {
                        id: 17,
                        title: 'Popescu Costel',
                        product: 'Balet pe gheata',
                        type: 'warning',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 5, 10, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 5, 11, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 18,
                        title: 'Bogdan Dinu',
                        product: 'Terapie Yumeiho',
                        type: 'info',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 5, 17, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 5, 18, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 19,
                        title: 'Adina Dinu',
                        product: 'Terapie Yumeiho',
                        type: 'important',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 5, 10, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 5, 11, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 20,
                        title: 'Dudu Ionel',
                        product: 'Alergare usoara',
                        type: 'important',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 5, 10, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 5, 11, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    //=======================
                    {
                        id: 21,
                        title: 'Popescu Costel',
                        product: 'Balet pe gheata',
                        type: 'warning',
                        startsAt: new Date(currentYear, currentMonth, currentDay, 10, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay, 11, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 22,
                        title: 'Bogdan Dinu',
                        product: 'Terapie Yumeiho',
                        type: 'info',
                        startsAt: new Date(currentYear, currentMonth, currentDay, 17, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay, 18, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 23,
                        title: 'Adina Dinu',
                        product: 'Terapie Yumeiho',
                        type: 'important',
                        startsAt: new Date(currentYear, currentMonth, currentDay, 10, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay, 12, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 24,
                        title: 'Dudu Ionel',
                        product: 'Alergare usoara',
                        type: 'important',
                        startsAt: new Date(currentYear, currentMonth, currentDay, 10, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay, 12, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 25,
                        title: 'Popescu Costel',
                        product: 'Balet pe gheata',
                        type: 'warning',
                        startsAt: new Date(currentYear, currentMonth, currentDay, 11, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay, 13, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 26,
                        title: 'Bogdan Dinu',
                        product: 'Terapie Yumeiho',
                        type: 'info',
                        startsAt: new Date(currentYear, currentMonth, currentDay, 15, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay, 16, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 27,
                        title: 'Adina Dinu',
                        product: 'Terapie Yumeiho',
                        type: 'important',
                        startsAt: new Date(currentYear, currentMonth, currentDay, 11, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay, 12, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 28,
                        title: 'Dudu Ionel',
                        product: 'Alergare usoara',
                        type: 'important',
                        startsAt: new Date(currentYear, currentMonth, currentDay, 15, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay, 16, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    //=======================
                    {
                        id: 29,
                        title: 'Popescu Costel',
                        product: 'Balet pe gheata',
                        type: 'warning',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 1, 10, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 1, 11, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 30,
                        title: 'Bogdan Dinu',
                        product: 'Terapie Yumeiho',
                        type: 'info',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 1, 17, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 1, 18, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 31,
                        title: 'Adina Dinu',
                        product: 'Terapie Yumeiho',
                        type: 'important',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 1, 10, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 1, 11, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 32,
                        title: 'Dudu Ionel',
                        product: 'Alergare usoara',
                        type: 'important',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 1, 10, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 1, 11, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 33,
                        title: 'Popescu Costel',
                        product: 'Balet pe gheata',
                        type: 'warning',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 1, 11, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 1, 12, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 34,
                        title: 'Bogdan Dinu',
                        product: 'Terapie Yumeiho',
                        type: 'info',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 1, 15, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 1, 16, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 35,
                        title: 'Adina Dinu',
                        product: 'Terapie Yumeiho',
                        type: 'important',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 1, 11, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 1, 12, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    },
                    {
                        id: 36,
                        title: 'Dudu Ionel',
                        product: 'Alergare usoara',
                        type: 'important',
                        startsAt: new Date(currentYear, currentMonth, currentDay - 1, 15, 0),
                        endsAt: new Date(currentYear, currentMonth, currentDay - 1, 16, 0),
                        editable: true,
                        deletable: true,
                        incrementsBadgeTotal: true
                    }
                ];
                d.resolve(testEvents);
            }, 1000);
            return d.promise;
        }


        function displayToast(message, backgroundColor, icon, delay) {
            if (!delay) {
                delay = 6000;
            }
            $mdToast.show({
                controller: 'schedulerCalendarController',
                template: '<md-toast style="background-color: ' + backgroundColor + '">' +
                message + ' ' +
                (icon ? '<md-icon md-svg-icon="' + icon + '" style="color:white"></md-icon>' : '') + '</md-toast>',
                hideDelay: delay
            });
        };


        //start of fully done
        //calling this sets products, grouped prices by products and price tags
        var processProducts = function (response, productsResponse) {
            //we might have situations where products doesn't have a declared price,
            //that's why we need to check response against productsResponse
            var pricesGroupedByProducts = [];
            var pricesGroupsMap = [];
            var defferedPricesGroupedByProducts = $q.defer();
            defferedPricesGroupedByProducts.promise.then(function (result) {
                $rootScope.pricesGroupedByProducts = result;
            });

            var products = [];
            var deferredProducts = $q.defer();
            deferredProducts.promise.then(function (result) {
                $rootScope.products = result;
            });

            var priceTags = [];
            var priceTagsMap = [];
            var deferredPriceTags = $q.defer();
            deferredPriceTags.promise.then(function (result) {
                $rootScope.priceTags = result;
            });

            response.forEach(function (productPrice) {
                if (!pricesGroupsMap[productPrice.product.id]) {
                    products.push(productPrice.product);
                    var newGroup = {
                        product: productPrice.product,
                        prices: [{
                            id: productPrice.id,
                            price: productPrice.price,
                            tag: productPrice.priceTag
                        }]
                    };
                    productsResponse = _.reject(productsResponse, function (p) {
                        return productPrice.product.id === p.id;
                    });
                    pricesGroupedByProducts.push(newGroup);
                    pricesGroupsMap[productPrice.product.id] = newGroup;
                } else {
                    var existingGroup = pricesGroupsMap[productPrice.product.id];
                    var newPrice = {
                        id: productPrice.id,
                        price: productPrice.price,
                        tag: productPrice.priceTag
                    }
                    existingGroup.prices.push(newPrice);
                }
                if (!priceTagsMap[productPrice.priceTag.id]) {
                    priceTags.push(productPrice.priceTag);
                    priceTagsMap[productPrice.priceTag.id] = productPrice.priceTag;
                }

            });

            if (productsResponse.length > 0) {
                productsResponse.forEach(function (orphanProduct) {
                    products.push(orphanProduct);
                    pricesGroupedByProducts.push({product: orphanProduct, prices: []});
                });
                $log.error(productsResponse.length + " products without a price!");
            }
            deferredProducts.resolve(products);
            deferredPriceTags.resolve(priceTags);
            defferedPricesGroupedByProducts.resolve(pricesGroupedByProducts);
        }

        function getPersons() {
            var d = $q.defer();
            $http.get('/private/API/v1/getPersons').success(function (response) {
                if (_.has(response, 'errorMessage')) {
                    displayToast(response.errorMessage, 'red', 'alert', 6000);
                } else {
                    $rootScope.persons = response;
                    //$log.info($rootScope.persons.length + " persons read");
                    d.resolve();
                }
            }).error(function (rejection) {
                displayToast(rejection.message, 'red', 'alert', 6000);
            });
            return d.promise;
        }

        function getPersonsProducts() {
            var d = $q.defer();
            $http.get('/private/API/v1/getPersonsProducts').success(function (response) {
                if (_.has(response, 'errorMessage')) {
                    displayToast(response.errorMessage, 'red', 'alert', 6000);
                } else {
                    var personProductsMap = [];
                    $rootScope.persons.forEach(function (man) {
                        personProductsMap[man.id] = [];
                        $rootScope.products.forEach(function (product) {
                            personProductsMap[man.id][product.id] = false;//for all
                        })
                    });
                    $rootScope.persons.forEach(function (man) {
                        response.forEach(function (entry) {
                            if (entry.person.id == man.id) {
                                personProductsMap[man.id][entry.product.id] = true;//for true
                            }
                        })
                    });
                    $rootScope.personProductsMap = personProductsMap;
                    d.resolve();
                }
            }).error(function (rejection) {
                displayToast(rejection.message, 'red', 'alert', 6000);
            });
            return d.promise;
        }

        function getProductsPrices() {
            var d = $q.defer();
            $http.get('/private/API/v1/getProductsPrices').success(function (response) {
                if (_.has(response, 'errorMessage')) {
                    displayToast(response.errorMessage, 'red', 'alert', 6000);
                } else {
                    //cascading... to get all products as well
                    $http.get('/private/API/v1/getProducts').success(function (productsResponse) {
                        if (_.has(productsResponse, 'errorMessage')) {
                            $log.error("Error : " + productsResponse.errorMessage);
                            //d.resolve(productsResponse);
                        } else {
                            processProducts(response, productsResponse);
                            d.resolve(response);
                        }
                    }).error(function (productsRejection) {
                        displayToast(productsRejection, 'red', 'alert', 6000);
                    });
                }
            }).error(function (rejection) {
                displayToast(rejection.message, 'red', 'alert', 6000);
            });
            return d.promise;
        }

        function getClientsList() {
            var d = $q.defer();
            $http.get('/private/API/v1/getClientsList').success(function (response) {
                if (_.has(response, 'errorMessage')) {
                    displayToast(response.errorMessage, 'red', 'alert', 6000);
                } else {
                    $rootScope.clients = response;
                    d.resolve($rootScope.clients);
                }
            }).error(function (rejection) {
                displayToast(rejection.message, 'red', 'alert', 6000);
            });
            return d.promise;
        }

        function init() {
            var d = $q.defer();
            // getProductsPrices().then(function () {
            //     getPersons().then(function () {
            //         getPersonsProducts().then(function () {
            //             getClientsList().then(function (data) {
            //                 //TODO : replace this with get real events data
            //                 d.resolve(data);
            //             });
            //         });
            //     // });
            //     provideTestScheduleData().then(function(data) {
            //         d.resolve(data);
            //     });
            // });
        
        provideTestScheduleData().then(function(data) {
            d.resolve(data);
        });

            return d.promise;
        }

        function addOrUpdatePerson(person) {
            var d = $q.defer();
            var isUpdate = _.has(person, 'id') && person.id > 0;
            $http.post('/private/API/v1/addOrUpdatePerson', person).success(function (response) {
                if (_.has(response, 'errorMessage')) {
                    $log.error("Error : " + response.errorMessage);
                    displayToast(response.errorMessage, 'red', 'alert', 6000);
                } else {
                    if (isUpdate) {
                        var updatedPerson = _.findWhere($rootScope.persons, {id: person.id});
                        if (!updatedPerson) {
                            $log.error("FATAL ERROR : person #" + person.id + " not found");
                            displayToast('Eroare #EDT_PERS: informație inexistentă în memorie! Faceți refresh la pagină.', 'red', 'alert', 6000);
                        } else {
                            _.replaceInCollection($rootScope.persons, updatedPerson, response);
                            //$log.info("Person " + person.id + " updated");
                        }
                    } else {
                        $log.info("Person " + response.firstName + " " + response.lastName + " created");
                        var personProductsMap = [];
                        $rootScope.products.forEach(function (product) {
                            personProductsMap[product.id] = false;//for all
                        });
                        $rootScope.personProductsMap[response.id] = personProductsMap;
                        $rootScope.persons.push(response);
                    }
                    displayToast('Contul terapeutului a fost ' + (isUpdate ? 'actualizat' : 'creat'), 'limegreen', 'cloud-check', 6000);
                    d.resolve(response);
                }
            }).error(function (rejection) {
                displayToast(rejection.message, 'red', 'alert', 6000);
            });
            return d.promise;
        }

        function deletePerson(person) {
            var d = $q.defer();
            $http.get('/private/API/v1/deletePerson/' + person.id).success(function (response) {
                if (_.has(response, 'errorMessage')) {
                    displayToast(response.errorMessage, 'red', 'alert', 6000);
                } else {
                    $rootScope.persons = _.reject($rootScope.persons, function (item) {
                        return item.id == person.id;
                    });
                    delete $rootScope.personProductsMap[person.id];
                    //console.log($rootScope.personProductsMap);
                    displayToast('Contul a fost șters!', 'limegreen', 'cloud-check', 6000);
                    d.resolve(response);
                }
            }).error(function (rejection) {
                displayToast(rejection.message, 'red', 'alert', 6000);
            });
            return d.promise;
        }

        function addOrUpdateClient(client) {
            var d = $q.defer();
            var isUpdate = _.has(client, 'id') && client.id > 0;
            $http.post('/private/API/v1/addOrUpdateClient', client).success(function (response) {
                if (_.has(response, 'errorMessage')) {
                    displayToast(response.errorMessage, 'red', 'alert', 6000);
                } else {
                    if (isUpdate) {
                        var updatedClient = _.findWhere($rootScope.clients, {id: client.id});
                        if (!updatedClient) {
                            displayToast('Eroare #EDT_CLI: informație inexistentă în memorie! Faceți refresh la pagină.', 'red', 'alert', 6000);
                            $log.error("FATAL ERROR : client #" + client.id + " not found");
                        } else {
                            _.replaceInCollection($rootScope.clients, updatedClient, response);
                            $log.info("Client " + client.id + " updated");
                        }
                    } else {
                        $log.info("Client " + response.fullName + " created");
                        $rootScope.clients.push(response);
                    }
                    displayToast('Contul pacientului a fost ' + (isUpdate ? 'actualizat' : 'creat'), 'limegreen', 'cloud-check', 6000);
                    d.resolve(response);
                }
            }).error(function (rejection) {
                displayToast(rejection.message, 'red', 'alert', 6000);
            });
            return d.promise;
        }

        function deleteClient(client) {
            var d = $q.defer();
            $http.get('/private/API/v1/deleteClient/' + client.id).success(function (response) {
                if (_.has(response, 'errorMessage')) {
                    displayToast(response.errorMessage, 'red', 'alert', 6000);
                } else {
                    $rootScope.clients = _.reject($rootScope.clients, function (item) {
                        return item.id == client.id;
                    });
                    displayToast('Contul a fost șters!', 'limegreen', 'cloud-check', 6000);
                    d.resolve(response);
                }
            }).error(function (rejection) {
                displayToast(rejection.message, 'red', 'alert', 6000);
            });
            return d.promise;
        }

        function addPersonToProduct(productId, personId) {
            var d = $q.defer();
            $http.get('/private/API/v1/addPersonToProduct/' + productId + "/" + personId).success(function (response) {
                if (_.has(response, 'errorMessage')) {
                    displayToast(response.errorMessage, 'red', 'alert', 6000);
                } else {
                    $rootScope.personProductsMap[personId][productId] = !$rootScope.personProductsMap[personId][productId];
                    d.resolve(response);
                }
            }).error(function (rejection) {
                displayToast(rejection.message, 'red', 'alert', 6000);
            });
            return d.promise;
        }

        function deletePersonFromProduct(productId, personId) {
            var d = $q.defer();
            $http.get('/private/API/v1/deletePersonFromProduct/' + productId + "/" + personId).success(function (response) {
                if (_.has(response, 'errorMessage')) {
                    displayToast(response.errorMessage, 'red', 'alert', 6000);
                } else {
                    $rootScope.personProductsMap[personId][productId] = !$rootScope.personProductsMap[personId][productId];
                    d.resolve(response);
                }
            }).error(function (rejection) {
                displayToast(rejection.message, 'red', 'alert', 6000);
            });
            return d.promise;
        }

        function addOrUpdateProduct(product) {
            var d = $q.defer();
            var isUpdate = _.has(product, 'id') && product.id > 0;
            $http.post('/private/API/v1/addOrUpdateProduct', product).success(function (response) {
                if (_.has(response, 'errorMessage')) {
                    displayToast(response.errorMessage, 'red', 'alert', 6000);
                } else {
                    if (isUpdate) {
                        var updatedProduct = _.findWhere($rootScope.products, {id: product.id});
                        if (!updatedProduct) {
                            displayToast('Eroare #EDT_PROD: informație inexistentă în memorie! Faceți refresh la pagină.', 'red', 'alert', 6000);
                            $log.error("FATAL ERROR : product #" + product.id + " not found");
                        } else {
                            _.replaceInCollection($rootScope.products, updatedProduct, response);
                            $log.info("Product " + product.id + " updated");
                        }
                    } else {
                        $log.info("Product " + response.name + " created #"+response.id);
                        $rootScope.products.push(response);
                        $rootScope.persons.forEach(function (person) {
                            //$rootScope.personProductsMap[person.id] = [];
                            $rootScope.personProductsMap[person.id][response.id] = false;
                        });
                        //$log.info($rootScope.personProductsMap);
                        $rootScope.pricesGroupedByProducts.push({
                            product: response,
                            prices: []
                        });
                        $log.info($rootScope.pricesGroupedByProducts);
                    }
                    d.resolve(response);
                }
            }).error(function (rejection) {
                displayToast(rejection.message, 'red', 'alert', 6000);
            });
            return d.promise;
        }

        function deleteProduct(product) {
            var d = $q.defer();
            $http.get('/private/API/v1/deleteProduct/' + product.id).success(function (response) {
                if (_.has(response, 'errorMessage')) {
                    displayToast(response.errorMessage, 'red', 'alert', 6000);
                } else {
                    $rootScope.products = _.reject($rootScope.products, function (item) {
                        return item.id == product.id;
                    });
                    $rootScope.persons.forEach(function (person) {
                        delete $rootScope.personProductsMap[person.id][product.id];
                    });
                    $rootScope.pricesGroupedByProducts = _.reject($rootScope.pricesGroupedByProducts , function (group) {
                        return group.product.id == product.id;
                    });
                    $log.info($rootScope.personProductsMap);
                    $log.info($rootScope.pricesGroupedByProducts);
                    d.resolve(response);
                }
            }).error(function (rejection) {
                displayToast(rejection.message, 'red', 'alert', 6000);
            });
            return d.promise;
        }

        //end of fully done
        function addOrUpdatePriceTag(priceTag) {
            var d = $q.defer();
            var isUpdate = _.has(priceTag, 'id') && priceTag.id > 0;
            $http.post('/private/API/v1/addOrUpdatePriceTag', priceTag).success(function (response) {
                if (_.has(response, 'errorMessage')) {
                    displayToast(response.errorMessage, 'red', 'alert', 6000);
                } else {
                    if (isUpdate) {
                        var updatedPriceTag = _.findWhere($rootScope.priceTags, {id: priceTag.id});
                        if (!updatedPriceTag) {
                            $log.error("FATAL ERROR : priceTag #" + priceTag.id + " not found");
                        } else {
                            updatedPriceTag = response;
                            $log.info("Pricetag " + priceTag.id + " updated");
                        }
                    } else {
                        $log.info("PriceTag " + response.name + " created");
                        $rootScope.priceTags.push(response);
                    }
                    d.resolve(response);
                }
            }).error(function (rejection) {
                displayToast(rejection.message, 'red', 'alert', 6000);
            });
            return d.promise;
        }

        function deletePriceTag(priceTag) {
            var d = $q.defer();
            $http.get('/private/API/v1/deletePriceTag/' + priceTag.id).success(function (response) {
                if (_.has(response, 'errorMessage')) {
                    displayToast(response.errorMessage, 'red', 'alert', 6000);
                } else {
                    $rootScope.priceTags = _.reject($rootScope.priceTags, function (item) {
                        return item.id == priceTag.id;
                    });
                    d.resolve(response);
                }
            }).error(function (rejection) {
                displayToast(rejection.message, 'red', 'alert', 6000);
            });
            return d.promise;
        }

        function addOrUpdateProductPrice(productPrice) {
            var d = $q.defer();
            var isUpdate = _.has(productPrice, 'id') && productPrice.id > 0;
            $http.post('/private/API/v1/addOrUpdateProductPrice', productPrice).success(function (response) {
                if (_.has(response, 'errorMessage')) {
                    displayToast(response.errorMessage, 'red', 'alert', 6000);
                } else {
                    if (isUpdate) {
                        var updatedProductPrice = _.findWhere($rootScope.productsPrices, {id: productPrice.id});
                        if (!updatedProductPrice) {
                            $log.error("FATAL ERROR : productPrice #" + productPrice.id + " not found");
                        } else {
                            updatedProductPrice = response;
                            $log.info("productPrice " + productPrice.id + " updated");
                        }
                    } else {
                        $log.info("productPrice " + response.price + " RON " + response.duration + " minutes created");
                        $rootScope.productsPrices.push(response);
                    }
                    d.resolve(response);
                }
            }).error(function (rejection) {
                displayToast(rejection.message, 'red', 'alert', 6000);
            });
            return d.promise;
        }

        function deleteProductPrice(productPrice) {
            var d = $q.defer();
            $http.get('/private/API/v1/deleteProductPrice/' + productPrice.id).success(function (response) {
                if (_.has(response, 'errorMessage')) {
                    displayToast(response.errorMessage, 'red', 'alert', 6000);
                } else {
                    $rootScope.productsPrices = _.reject($rootScope.productsPrices, function (item) {
                        return item.id == productPrice.id;
                    });
                    d.resolve(response);
                }
            }).error(function (rejection) {
                displayToast(rejection.message, 'red', 'alert', 6000);
            });
            return d.promise;
        }


        function getCurrentReservations() {
            var d = $q.defer();
            $http.get('/private/API/v1/getCurrentReservations').success(function (response) {
                if (_.has(response, 'errorMessage')) {
                    displayToast(response.errorMessage, 'red', 'alert', 6000);
                } else {
                    $rootScope.reservations = response;
                    $log.info($rootScope.reservations.length + " reservations read");
                    d.resolve(response);
                }
            }).error(function (rejection) {
                displayToast(rejection.message, 'red', 'alert', 6000);
            });
            return d.promise;
        }

        function addOrUpdateReservation(reservation) {
            var d = $q.defer();
            var isUpdate = _.has(reservation, 'id') && reservation.id > 0;
            $http.post('/private/API/v1/addOrUpdateReservation', reservation).success(function (response) {
                if (_.has(response, 'errorMessage')) {
                    displayToast(response.errorMessage, 'red', 'alert', 6000);
                } else {
                    if (isUpdate) {
                        var updatedReservation = _.findWhere($rootScope.reservations, {id: reservation.id});
                        if (!updatedReservation) {
                            $log.error("FATAL ERROR : reservation #" + reservation.id + " not found");
                        } else {
                            updatedReservation = response;
                            $log.info("Reservation " + reservation.id + " updated");
                        }
                    } else {
                        $log.info("Reservation " + response.name + " created");
                        $rootScope.reservations.push(response);
                    }
                    d.resolve(response);
                }
            }).error(function (rejection) {
                displayToast(rejection.message, 'red', 'alert', 6000);
            });
            return d.promise;
        }

        //TODO : parameter array of reservations
        //NOT recommended to be used in update mode - use simple method above
        function addOrUpdateReservations(reservations) {
            var d = $q.defer();
            var isUpdate = false;
            angular.forEach(reservations, function (reservation) {
                if (reservation.id) {
                    if (!isUpdate) {
                        isUpdate = true;
                    }
                }
            });
            $http.post('/private/API/v1/addOrUpdateReservations', reservations).success(function (response) {
                if (_.has(response, 'errorMessage')) {
                    displayToast(response.errorMessage, 'red', 'alert', 6000);
                } else {
                    if (isUpdate) {
                        angular.forEach(reservations, function (reservation) {
                            var updatedReservation = _.findWhere($rootScope.reservations, {id: reservation.id});
                            if (!updatedReservation) {
                                $log.error("FATAL ERROR : reservation #" + reservation.id + " not found");
                            } else {
                                updatedReservation = _.findWhere(response, {id: reservation.id});
                                $log.info("Reservation " + reservation.id + " updated");
                            }
                        });
                    } else {
                        $log.info("-- " + response.length + " reservations created");
                        $rootScope.reservations.push(response);
                    }
                    d.resolve(response);
                }
            }).error(function (rejection) {
                displayToast(rejection.message, 'red', 'alert', 6000);
            });
            return d.promise;
        }

        function deleteReservation(reservation) {
            var d = $q.defer();
            $http.get('/private/API/v1/deleteReservation/' + reservation.id).success(function (response) {
                if (_.has(response, 'errorMessage')) {
                    displayToast(response.errorMessage, 'red', 'alert', 6000);
                } else {
                    $rootScope.reservations = _.reject($rootScope.reservations, function (item) {
                        return item.id == reservation.id;
                    });
                    d.resolve(response);
                }
            }).error(function (rejection) {
                displayToast(rejection.message, 'red', 'alert', 6000);
            });
            return d.promise;
        }

        var result = {
            getClientsList: getClientsList,
            addOrUpdateClient: addOrUpdateClient,
            deleteClient: deleteClient,
            getPersons: getPersons,
            addOrUpdatePerson: addOrUpdatePerson,
            deletePerson: deletePerson,
            getPersonsProducts: getPersonsProducts,
            addPersonToProduct: addPersonToProduct,
            deletePersonFromProduct: deletePersonFromProduct,
            addOrUpdatePriceTag: addOrUpdatePriceTag,
            deletePriceTag: deletePriceTag,
            getProductsPrices: getProductsPrices,
            addOrUpdateProductPrice: addOrUpdateProductPrice,
            deleteProductPrice: deleteProductPrice,
            addOrUpdateProduct: addOrUpdateProduct,
            deleteProduct: deleteProduct,
            getCurrentReservations: getCurrentReservations,
            addOrUpdateReservations: addOrUpdateReservations,
            addOrUpdateReservation: addOrUpdateReservation,
            deleteReservation: deleteReservation,
            displayToast: displayToast,
            provideTestScheduleData : provideTestScheduleData,
            provideTestProductData  : provideTestProductData,
            init: init
        };

        return result;
    }
}).call(this);