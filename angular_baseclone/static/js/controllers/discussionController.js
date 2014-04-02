function discussionController($scope, $http, $routeParams, $resource) {
    // Here we'll use $routeParams to get the id from the URL and then append it
    // to our $http.get URL
    var projectId = $routeParams.projectId;
    var discussionId = $routeParams.discussionId;

    var messageApi = $resource('/proxy/projects/'+ projectId +'/messages/' + discussionId + '.json', {
        // parameter defaults
        id: '@id'
    }, {
        update: {method: 'PUT', params: {id: '@id'}}
    });

    $scope.discussion = messageApi.get({id:discussionId});
    console.log($scope.discussion);

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

}