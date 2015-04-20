angular.module('app')

// This is a dummy service to use in demo...
.factory('MapSrv', function($q, $timeout, Utils){
  'use strict';
  var coords = [
    {latitude: '48.591481', longitude: '2.244376'},
    {latitude: '48.588046', longitude: '2.239870'},
    {latitude: '48.590970', longitude: '2.235064'},
    {latitude: '48.594092', longitude: '2.234205'},
    {latitude: '48.597952', longitude: '2.239999'}
  ];

  var service = {
    getAll: function(){
      return asyncTmp(function(){
        return coords;
      });
    }
  };

  function asyncTmp(fn){
    var defer = $q.defer();
    $timeout(function(){
      defer.resolve(fn());
    }, 1000);
    return defer.promise;
  }

  return service;
});
