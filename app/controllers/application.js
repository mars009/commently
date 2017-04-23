import Ember from 'ember';

const { Controller, inject } = Ember; 

// Created using 'ember g controller application'
export default Ember.Controller.extend({

  currentUser: inject.service(),

});
