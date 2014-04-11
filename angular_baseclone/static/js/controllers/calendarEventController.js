function calendarEventController($scope, $http, $routeParams, $resource, Comments) {
    // Here we'll use $routeParams to get the id from the URL and then append it
    // to our $http.get URL
    var projectId = $routeParams.projectId;
    var calendarId = $routeParams.calendarId;

    var CalendarEvent = $resource('/proxy/projects/'+ projectId +'/calendar_events/' + calendarId + '.json', {
        // Parameter defaults
    }, {
        // Actions
        update: {method: 'PUT'}
    });

    $scope.calendarEvent = CalendarEvent.get({id:calendarId});

    $scope.alerts = [];
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.deleteEvent = function(){
        messageApi.delete({id:calendarId}, function(){
            $scope.alerts.push({type: 'success', msg: 'This event has been deleted'})
        });
    };

    $scope.editing = false;
    $scope.edit = function() {
        $scope.editing = true;
    };

    $scope.saveChanges = function() {
        $scope.editing = false;

        $scope.calendarEvent.summary = $scope.summary;
        $scope.calendarEvent.description = $scope.description;
        CalendarEvent.update({id:calendarId}, $scope.calendarEvent);
    };

    $scope.commentText = '';
    $scope.addComment = function() {
        // Calling our Comments resource
        Comments.save({ pID:projectId, dID:calendarId }, {'content':$scope.commentText}, function(response) {
            // Pushing the callback response into $scope.discussion so that it updates the page
            $scope.calendarEvent.comments.push(response)
        });
    };
}