angular.module('weather', [])

.controller('WeatherCtrl', function($scope, $http, $ionicLoading) {

	$ionicLoading.show({
		template: 'Fetching data...'
	})


	$scope.getDay = function(seconds){
		var dayOfWeek = new Date(seconds*1000);
		var convertDayToNumber = ['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday','Friday','Saturday'];
		return convertDayToNumber[dayOfWeek.getDay()];
	}

  var setWeatherDetail = function(lat, lon){
    $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?cnt=7&mode=json&lat=' + lat + '&lon=' + lon + '&units=imperial')
		.success(function(data, status, headers, config) {
			$ionicLoading.hide();
			$scope.weather = data;
  		})
  		.error(function(data, status, headers, config) {
  			$ionicLoading.hide();
  			$scope.weather = [];
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