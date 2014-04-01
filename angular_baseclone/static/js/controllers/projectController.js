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

}