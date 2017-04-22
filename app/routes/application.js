import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
// Using our math module
import {default as math, PI} from 'math';

const { Route, inject, getOwner } = Ember;

export default Route.extend(ApplicationRouteMixin, {
    session: inject.service(),
    actions: {
        logout() {
            this.get('session').invalidate();
        }
    },
    beforeModel() {
        // Always do this._super(...arguments)
        this._super(...arguments);
        console.log(math, PI);
    },

    // setupController hook
    setupController(controller) {
        this._super(...arguments);

        // Add a new property 'loc' which contains the geolocation information we setupController
        // in our 'geo' initializer to this controller when its setup by the route.
        // This will be available directly in the top level template available to this route
        // NOTE: 'getOwner' is the same as 'Ember.getOwner'
        controller.set('loc', 
            // We get the container to which this route belongs
            getOwner(this)
                // And we call 'lookup' passing the container key so we get the object stored under that key
                // and making it available in the template.
                .lookup('data:location'));   
    }
});