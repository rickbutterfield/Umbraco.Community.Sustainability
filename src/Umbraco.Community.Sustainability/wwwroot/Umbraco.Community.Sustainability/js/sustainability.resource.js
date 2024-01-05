(function () {
  'use strict';

  function sustainabilityResource($http, umbRequestHelper) {

    let apiUrl = "/umbraco/api/Sustainability/";
    let resource = {
      getData: getData,
      checkPage: checkPage,
      saveResult: saveResult
    };

    function getData(pageId) {
      return umbRequestHelper.resourcePromise(
        $http.get(`${apiUrl}GetPageData?pageId=${pageId}`),
        'Failed getting sustainability data'
      );
    };

    function checkPage(pageId) {
      return umbRequestHelper.resourcePromise(
        $http.get(`${apiUrl}CheckPage?pageId=${pageId}`),
        'Failed to run sustainability check'
      );
    };

    function saveResult(pageId, data) {
      return umbRequestHelper.resourcePromise(
        $http.post(`${apiUrl}SavePageData?pageId=${pageId}`, data),
        'Failed to save sustainability data'
      );
    };

    return resource;
  }

  angular.module('umbraco.resources').factory('Umbraco.Sustainability.Resources.SustainabilityResource', sustainabilityResource);

})();
