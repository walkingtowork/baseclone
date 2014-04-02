baseclone.factory('Comments', function($resource) {
    return $resource('/proxy/projects/:pID/messages/:dID/comments.json',
                // If your back-end uses a port number such as :8000, when writing the
                // URl you must escape the colon character, since it is used here to
                // reference named placeholders
                    // Example:
                    // http://www.example.com\\:8000/api/project/:id/comments.json
                {
                // Parameter defaults
                    // Examples:
                    // pID: @projectId, -> @ is used if value is taken from data
                    // dID: '1'
                }, {
                // Actions
                // $resource automatically generates some methods for us:
                    // Comments.query -> HTTP GET that expects an array
                    // Comments.get   -> HTTP GET that expects a single object
                    // Comments.save  -> HTTP POST
                    // Comments.delete-> HTTP DELETE

                // Custom actions can also be written here
                // action: {method:'HTTP_VERB', params:?, isArray:?, headers:?}
                    // Example:
                    // update: {method: 'PUT'}
                    // By default, $resource doesn't generate HTTP PUT, so you must
                    // create these methods manually if your back-end requires them
            });
});