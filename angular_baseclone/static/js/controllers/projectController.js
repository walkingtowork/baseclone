function projectController($scope, $http, $routeParams, $resource) {
    // Here we'll use $routeParams to get the id from the URL and then append it
    // to our $http.get URL
    var projectId = $routeParams.id;

    $http.get('/proxy/projects/' + projectId + '.json').
        success(function(projectData){
            $scope.project = projectData;
        }).error(function(error) {
          console.log("didn't work");
          console.log(error);

    });

    $http.get('/proxy/projects/' + projectId + '/topics.json').
        success(function(topicData){
            console.log(topicData);
            $scope.topics = topicData;
        }).error(function(error) {
          console.log("didn't work");
    });

    var messageApi = $resource('/proxy/projects/'+ projectId +'/messages/:id.json', {
        // parameter defaults
        id: '@id'
    }, {
        update: {method: 'PUT', params: {id: '@id'}}
    });

    $scope.title = '';

    $scope.editing = false;
    $scope.edit = function() {
        $scope.editing = true;
    };

    $scope.saveChanges = function() {
        $scope.editing = false;

        var messageId = this.topic.topicable.id;
        var message = messageApi.get({id:messageId});
        message.content = $scope.title;
        messageApi.update({id:messageId}, message);
    };

}