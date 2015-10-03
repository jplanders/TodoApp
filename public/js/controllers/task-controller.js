todoApp.controller('taskController', ['$scope', '$resource', function ($scope, $resource) {
// scope is used to talk between view and controller
	var Todo = $resource('/api/tasklist')

	function getCurDate () {
		var longDate = new Date();
		console.log(longDate);
		console.log(longDate.getMonth());
		console.log(longDate.getDay());
		console.log(longDate.getFullYear());
		return (longDate.getMonth()+1) + "/" + longDate.getDate() + "/" + longDate.getFullYear();
	};

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

	$scope.createTask = function () {
		//$scope.tasklist.push({ name: $scope.taskName, startDate: getCurDate(), endDate: "" });
		//$scope.taskName = "";
		var todo = new Todo();
		todo.name = $scope.taskName;
		todo.startDate = getCurDate();
		todo.endDate = "";
		todo.$save();
		$scope.taskName = "";

	}
}]);