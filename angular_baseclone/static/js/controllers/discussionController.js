function discussionController($scope, $http, $routeParams, $resource, Comments) {
    // Here we'll use $routeParams to get the id from the URL and then append it
    // to our $http.get URL
    var projectId = $routeParams.projectId;
    var discussionId = $routeParams.discussionId;

    var messageApi = $resource('/proxy/projects/'+ projectId +'/messages/' + discussionId + '.json', {
        // Parameter defaults
    }, {
        // Actions
        update: {method: 'PUT'}
    });

    $scope.discussion = messageApi.get({id:discussionId});
    console.log($scope.discussion);

    $scope.alerts = [];
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.deleteMessage = function(){
        messageApi.delete({id:discussionId}, function(){
            $scope.alerts.push({type: 'success', msg: 'This message has been deleted'})
        });
    };

    $scope.subject = '';
    $scope.content = '';

    $scope.editing = false;
    $scope.edit = function() {
        $scope.editing = true;
    };

    $scope.saveChanges = function() {
        $scope.editing = false;

        $scope.discussion.subject = $scope.subject;
        $scope.discussion.content = $scope.content;
        messageApi.update({id:discussionId}, $scope.discussion);
    };

    $scope.commentText = '';
    $scope.addComment = function() {
        // Calling our Comments resource
        Comments.save({ pID:projectId, dID:discussionId }, {'content':$scope.commentText}, function(response) {
            // Pushing the callback response into $scope.discussion so that it updates the page
            $scope.discussion.comments.push(response)
        });
    };
}