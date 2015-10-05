//public controller
todoApp.controller('taskController', ['$scope', '$resource', '$http', function ($scope, $resource, $http) {
// scope is used to talk between view and controller
	var Todo = $resource('/api/tasklist')

	function getCurDate () {
		var longDate = new Date();
		return (longDate.getMonth()+1) + "/" + longDate.getDate() + "/" + longDate.getFullYear();
	};

	function resetList() {
		Todo.query(function (results) {
		$scope.tasklist = results;
		});
	};

	resetList();

	$scope.tasklist = [	];

	$scope.showAll = function () {
		resetList();
	}

	$scope.showActive = function () {
		$scope.tasklist = [];
		Todo.query(function (results) {
			for(var i = 0; i <= results.length; i++)
			{
				if(results[i].endDate == "")
				{
					$scope.tasklist.push(results[i]);
				}
			}
		});
	}

	$scope.showInactive = function () {
		$scope.tasklist = [];
			Todo.query(function (results) {
				for(var i = 0; i <= results.length; i++)
				{
					if(results[i].endDate != "")
					{
						$scope.tasklist.push(results[i]);
					}
				}
			});
	}

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
			resetList();
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
			resetList();
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
				resetList();
			});
	})};

}]);