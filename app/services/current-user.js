import Ember from 'ember';

const { Service, inject } = Ember;

export default Ember.Service.extend({
  // We inject the store into our service
  store: inject.service(),
  loadUserInfo() {
    // We use the store to retrieve the currentUser by using 'peekRecord' or findRecord'
    // We use 'peek' to get the cached value, but if there is nothing in the cache then we use
    // 'find' to retrieve the record
    // NOTE: We are taking advantage of the fact that Ember.Data can fetch the current user
    // because the URL pattern comforms to the same way we retrieve /user/1 or /user/current
    return this.get('store').peekRecord('user', 'current') 
     || this.get('strore').findRecord('user', 'current');
  }
});
