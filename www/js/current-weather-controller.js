angular.module('currentWeather', [])

.controller('CurrentWeatherCtrl', function($scope, $http) {

	$scope.getTime = function(seconds){
		var dayOfWeek = new Date(seconds*1000);
		return dayOfWeek.toLocaleTimeString();
	}

	$http.get('http://api.openweathermap.org/data/2.5/weather?q=San-Antonio,us&units=imperial')
		.success(function(data, status, headers, config) {
			$scope.detail = data;
			console.log(data);
  		})
  		.error(function(data, status, headers, config) {
  			$scope.detail = [];
  		});
})