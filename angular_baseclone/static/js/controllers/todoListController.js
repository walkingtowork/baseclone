function todoListController($scope, $http, $routeParams, $resource, Comments) {
    // Here we'll use $routeParams to get the id from the URL and then append it
    // to our $http.get URL
    var projectId = $routeParams.projectId;
    var todoListId = $routeParams.todoListId;

    var TodoList = $resource('/proxy/projects/'+ projectId +'/todolists/' + todoListId + '.json', {
        // Parameter defaults
    }, {
        // Actions
        update: {method: 'PUT'}
    });

    $scope.todoList = TodoList.get({id:todoListId});

    $scope.alerts = [];
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.deleteTodo = function(){
        TodoList.delete({id:todoListId}, function(){
            $scope.alerts.push({type: 'success', msg: 'This todo list has been deleted'})
        });
    };

    $scope.name = '';
    $scope.description = '';

    $scope.editing = false;
    $scope.edit = function() {
        $scope.editing = true;
    };

    $scope.saveChanges = function() {
        $scope.editing = false;

        $scope.todoList.name = $scope.name;
        $scope.todoList.description = $scope.description;
        TodoList.update({id:todoListId}, $scope.todoList);
    };

    $scope.commentText = '';
    $scope.addComment = function() {
        // Calling our Comments resource
        Comments.save({ pID:projectId, dID:todoListId }, {'content':$scope.commentText}, function(response) {
            // Pushing the callback response into $scope.discussion so that it updates the page
            $scope.todoList.comments.push(response)
        });
    };
}