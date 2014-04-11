function todoController($scope, $http, $routeParams, $resource, Comments, TodoList) {
    // Here we'll use $routeParams to get the id from the URL and then append it
    // to our $http.get URL
    var projectId = $routeParams.projectId;
    $scope.projectId = projectId;
    var todoId = $routeParams.todoId;

    var Todo = $resource('/proxy/projects/'+ projectId +'/todos/' + todoId + '.json', {
        // Parameter defaults
    }, {
        // Actions
        update: {method: 'PUT'}
    });

    $scope.todo = Todo.get({id:todoId});
    $scope.todo.$promise.then(function(){
        $scope.todoList = TodoList.get({ pID:projectId, dID:$scope.todo.todolist_id });
    });

    $scope.alerts = [];
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.deleteTodo = function(){
        Todo.delete({id:todoId}, function(){
            $scope.alerts.push({type: 'success', msg: 'This todo has been deleted'})
        });
    };

    $scope.content = '';

    $scope.editing = false;
    $scope.edit = function() {
        $scope.editing = true;
    };

    $scope.saveChanges = function() {
        $scope.editing = false;

        $scope.todo.content = $scope.content;
        Todo.update({id:todoId}, $scope.todo);
    };

    $scope.commentText = '';
    $scope.addComment = function() {
        // Calling our Comments resource
        Comments.save({ pID:projectId, dID:todoId }, {'content':$scope.commentText}, function(response) {
            // Pushing the callback response into $scope.discussion so that it updates the page
            $scope.todo.comments.push(response)
        });
    };
}