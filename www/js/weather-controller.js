angular.module('weather', [])

.controller('WeatherCtrl', function($scope, $http) {
	$scope.getDay = function(seconds){
		var dayOfWeek = new Date(seconds*1000);
		var convertDayToNumber = ['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday','Friday','Saturday'];
		return convertDayToNumber[dayOfWeek.getDay()];
	}

	//http://api.openweathermap.org/data/2.5/weather?q=San-Antonio,us

	$http.get('http://api.openweathermap.org/data/2.5/forecast/daily?cnt=7&mode=json&q=San-Antonio,us&units=imperial')
		.success(function(data, status, headers, config) {
			$scope.weather = data.list;
			console.log(data.list);
  		})
  		.error(function(data, status, headers, config) {
  			$scope.weather = [];
  		});
})