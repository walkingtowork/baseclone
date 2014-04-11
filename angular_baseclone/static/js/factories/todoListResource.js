baseclone.factory('TodoList', function($resource) {
    return $resource('/proxy/projects/:pID/todolists/:dID.json', {
        // Parameter defaults
    }, {
        // Actions
        update: {method: 'PUT'}
    });
});