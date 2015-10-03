todoApp.controller('taskController', ['$scope', '$resource', function ($scope, $resource) {
// scope is used to talk between view and controller
	var Todo = $resource('/api/todos')

	$scope.tasklist = [
		{	name: "Walk the dog",
			//active: true,
			startDate: "10/1/2015",
			endDate: ""},
		{	name: "Get food for BBQ",
			//active: true,
			startDate: "10/3/2015",
			endDate: ""},
		{	name: "Wash the car",
			//active: false,
			startDate: "10/2/2015",
			endDate: "10/3/2015"}
	]
}]);