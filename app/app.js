// Need to set 'define' as a global to make it available for this challenge
/* global define:true */
import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

// Use 'define' (its a global) to define our 'math' challenge module
define('math', [], function() {
  return {
    // Setting 'math' as the default export
    default: {
      math: Math,
    },
    // And PI as an extra
    PI: Math.PI
  };
});

export default App;
