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

    $scope.hasAttachment = function(filterData){
        // When writing your own function to be used by Angular's filter,
        // the argument it takes (in this case filterData, though you can call it whatever you want)
        // represents each object that is going through the filter.
        // So, in this example, you're doing an ngRepeat on topic in topics (in the view)
        // filterData is each topic, not the list of all topics being filtered
        // If the function returns true for that object, then it 'passes' the filter
        // If the function returns false for that object, then it does not pass the filter and will not
        // be iterated over.

        // If the checkbox is checked (when checked, it's value is true)
        if ($scope.attachmentBoolean) {
            // Only return topics that have attachments
            return filterData.attachments > 0;
        // else return true for all topics
        } else {
            return true
        }
    };

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