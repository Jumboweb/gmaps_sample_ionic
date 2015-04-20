angular.module('app')

.controller('AppCtrl', function($scope, $state){
  'use strict';
  $scope.logout = function(){
    AuthSrv.logout().then(function(){
      $state.go('login');
    });
  };
})

.controller('TabsCtrl', function($scope){
  'use strict';
  var data = {};
  $scope.data = data;
})

.controller('HomeCtrl', function($scope){
  'use strict';
  var data = {}, fn = {}, ui = {};
  $scope.data = data;
  $scope.fn = fn;


})
.controller('MapCtrl', function($scope, $ionicLoading, $compile, $ionicPlatform, $cordovaGeolocation, $log, MapSrv, $cordovaDialogs) {

  var data = {}, fn = {};
  $scope.data = data;
  $scope.fn = fn;

  $scope.$on('$ionicView.enter', function() {
    geoloc();
  });

  function geoloc(){
    $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });
    $ionicPlatform.ready(function() {
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            initialize(position.coords.latitude,position.coords.longitude);
          }, function(err) {
            $cordovaDialogs.alert("Can't Geoloc, please enable the GPS", 'Warning')
            .then(function() {
              // callback success
            });
          })
          .finally(function(){
            $ionicLoading.hide();
          });
    });
  }


  function initialize(latitude,longitude) {
    var myLatlng = new google.maps.LatLng(latitude, longitude);

    var mapOptions = {
      center: myLatlng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

    //Marker + infowindow + angularjs compiled ng-click
    var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
    var compiled = $compile(contentString)($scope);

    var infowindow = new google.maps.InfoWindow({
      content: compiled[0]
    });

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });

    var circleOptions = {
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: myLatlng,
      radius: 1000
    };
    // Add the circle for this city to the map.
    cityCircle = new google.maps.Circle(circleOptions);

    $scope.map = map;
  }

  $scope.arroundMe = function(){
    $ionicLoading.show({
      template: 'Winter is coming'
    });
    MapSrv.getAll().then(function(coords){
      data.coords = coords;
      var bounds = new google.maps.LatLngBounds();
      angular.forEach(coords, function(value, key) {
        var latitude = value.latitude;
        var longitude = value.longitude;
        var myLatlng = new google.maps.LatLng(latitude, longitude);
        new google.maps.Marker({
          position: myLatlng,
          map: $scope.map,
          icon: "http://maps.google.com/mapfiles/ms/icons/green.png"
        });
        bounds.extend(new google.maps.LatLng(latitude, longitude));

      });
      $scope.map.fitBounds(bounds);
    })
    .finally(function(){
      $ionicLoading.hide();
    });
  }

  $scope.clickTest = function() {
    alert('Example of infowindow with ng-click')
  };

  $scope.retry = function(){
    geoloc();
  };

});
