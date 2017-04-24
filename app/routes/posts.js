import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
    // Define the queryParams
    queryParams: {
        search: {
            as: 's', // Setting the alias for the queryParam in the route to 's'
            replace: true // Setting to true so we don't add a new history state everytime someone enters a key
        }    
    },

    actions: {
        // Parent route can handle the '_refreshRoute' event/action triggered by its children
        _refreshRoute() {
            // Refresh the contents (this is available in the Route obj)
            this.refresh();
        }
    },
    
    // Plucking the 'search' value out of the params obj
    model({ search }) {
        // If search does have a value
        if (search) {
            return this.store.query('post', { search });
        } else {
            // fetch all of the routes
            return this.store.findAll('post');
        }
        
    }
});