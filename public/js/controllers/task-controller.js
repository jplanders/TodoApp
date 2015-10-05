//public controller
todoApp.controller('taskController', ['$scope', '$resource', '$http', function ($scope, $resource, $http) {
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
		var todo = new Todo();
		todo.name = $scope.taskName.name;
		todo.startDate = getCurDate();
		todo.endDate = "";
		todo.$save(function(result) {
			$scope.tasklist.push(result);
		});
		$scope.taskName = "";
	}

	$scope.remove = function() {
		$http.delete('/todolist/' + $scope.taskName._id).success(function(response) {
			Todo.query(function (results) {
			$scope.tasklist = results;
			});
		});
		$scope.taskName = "";
	};

	$scope.edit = function(id) {
		$http.get('/todolist/' + id).success(function(response) {
			console.log(id);
			var todo = new Todo();
			todo = response;
			$scope.taskName = todo;
		});
	}

	$scope.updateTask = function() {
		console.log($scope.taskName._id)
		$http.put('/todolist/' + $scope.taskName._id, $scope.taskName).success(function(response) {
			Todo.query(function (results) {
			$scope.tasklist = results;
		});
		})
		$scope.taskName = "";
	};

	$scope.end = function(id) {
		$http.get('/todolist/' + id).success(function(response) {
			console.log(id);
			var todo = new Todo();
			todo = response;
			if(todo.endDate == "") {
				todo.endDate = getCurDate();
			}
			$http.put('/todolist/' + todo._id, todo).success(function(response) {
				Todo.query(function (results) {
				$scope.tasklist = results;
				});
			});
	})};

}]);