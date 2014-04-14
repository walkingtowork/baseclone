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
        // If the form is not valid then return
        var startDate = $scope.event.starts_at_date.toISOString().split("T")[0];
        if($scope.event.all_day) {
            var endDate = $scope.event.ends_at_date.toISOString().split("T")[0];
            // If this is an all day event, make sure the end date is after the start date
            $scope.eventForm.ends_at_date.$setValidity('after', endDate >= startDate);
        }

        if(!$scope.eventForm.$valid) return false;

        $scope.editing = false;

        $scope.calendarEvent.summary = $scope.event.summary;
        $scope.calendarEvent.description = $scope.event.description;

        // If this event is 'all day' then just record start and end dates
        if($scope.event.all_day) {
            $scope.calendarEvent.starts_at = startDate;
            $scope.calendarEvent.ends_at = $scope.event.ends_at_date.toISOString().split("T")[0];
        } else { // If this event is not 'all day', record the date and time for it's start
            var startTime = $scope.event.starts_at_time.getHours() + ":" + $scope.event.starts_at_time.getMinutes() + ":00.000-07:00";
            $scope.calendarEvent.starts_at = startDate + "T" + startTime;
        }

        $scope.calendarEvent.all_day = $scope.event.all_day;

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