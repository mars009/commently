import Ember from 'ember';

const { Route, inject } = Ember;

// Login Route
export default Route.extend({
    // Session Service from Embers 'Simple-Auth' plugin
    session: inject.service(),
    // We inject our currentUser service
    currentUser: inject.service(),
    actions: {
        login(email, password) {
            // We get the session service
            this.get('session')
                // And ask it to authenticate passing in a key to tell which authenticator to use 
                .authenticate('authenticator:oauth2', email, password)
                .then(() => {
                    // If we are able to authenticate we use current-user service to return the user info
                    return this.get('currentUser').loadUserInfo();
                });
        }
    },
    model() {
        return {
            email: '',
            password: ''
        };
    }
});