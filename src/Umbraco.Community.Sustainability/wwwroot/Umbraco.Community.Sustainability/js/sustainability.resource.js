(function () {
    'use strict';

    function sustainabilityResource($http, umbRequestHelper) {

        var apiUrl = "/umbraco/api/Sustainability/CheckPage";

        var resource = {
            getData: getData,
        };

        return resource;

        function getData(pageId) {
            return umbRequestHelper.resourcePromise(
                $http.get(`${apiUrl}?pageId=${pageId}`),
                'Failed getting block preview markup'
            );
        };
    }

    angular.module('umbraco.resources').factory('Umbraco.Sustainability.Resources.SustainabilityResource', sustainabilityResource);

})();
