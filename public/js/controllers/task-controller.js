//public controller
todoApp.controller('taskController', ['$scope', '$resource', function ($scope, $resource) {
// scope is used to talk between view and controller
	var Todo = $resource('/api/tasklist')

	function getCurDate () {
		var longDate = new Date();
		return (longDate.getMonth()+1) + "/" + longDate.getDate() + "/" + longDate.getFullYear();
	};

	Todo.query(function (results) {
		$scope.tasklist = results;
	});

	$scope.tasklist = [	];

	$scope.createTask = function () {
		//$scope.tasklist.push({ name: $scope.taskName, startDate: getCurDate(), endDate: "" });
		//$scope.taskName = "";
		var todo = new Todo();
		todo.name = $scope.taskName;
		todo.startDate = getCurDate();
		todo.endDate = "";
		todo.$save(function(result) {
			$scope.tasklist.push(result);
		});
		$scope.taskName = "";

	}
}]);