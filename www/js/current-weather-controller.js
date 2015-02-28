angular.module('currentWeather', [])

.controller('CurrentWeatherCtrl', function($scope, $http) {

  console.log("HIT");

	$scope.getTime = function(seconds){
		var dayOfWeek = new Date(seconds*1000);
		return dayOfWeek.toLocaleTimeString();
	}

  var setWeatherDetail = function(lat, lon){
    $http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial')
      .success(function(data, status, headers, config) {
        $scope.detail = data;
      })
      .error(function(data, status, headers, config) {
        console.log('GET call failed');
        $scope.detail = [];
      });
  }  		
	navigator.geolocation.getCurrentPosition(onSuccess, onError);

  function onSuccess(position){
    console.log(position.coords.latitude, position.coords.longitude);
    setWeatherDetail(position.coords.latitude, position.coords.longitude);
  }

  function onError(error){
    console.log('code: ' + error.code + '\n' + 
                  'message: ' + error.message + '\n');
    setWeatherDetail(-98.49,29.42);
  }
})