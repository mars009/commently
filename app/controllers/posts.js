import Ember from 'ember';

const { Controller, run: { debounce } } = Ember;

export default Controller.extend({

  actions: {
    searchUpdated(paramValue) {
      // We pass the target, method name and any args to the function
      // if it needs any, and lastly the amount of time to wait
      this.set('search', paramValue);
      
      // We use debounce so we don't trigger '_refreshRoute' too often
      debounce(this, '_refreshRoute', 300);
    }
  },

  // Tell parent route to refresh
  _refreshRoute() {
    console.log(this.get('search'));
    // Send the '_refreshRoute' event out so anyone up in the hierarchy catches it
    this.send('_refreshRoute');
  }

});
