import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
// Using our math module
import {default as math, PI} from 'math';

const { Route, inject } = Ember;

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
    }
});