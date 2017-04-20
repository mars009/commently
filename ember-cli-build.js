/*jshint node:true*/
/* global require, module */
/**
 * This is the root of your 'asset-pipeline'
 */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
// Get an instance of the 'broccoli-filter'
var Filter = require('broccoli-filter');

module.exports = function(defaults) {
    // This is an Ember app in 'nodejs' terms so not in the context of a browser
    var app = new EmberApp(defaults, {
        // Add options here
    });

    // Here we start building our plugin with the following steps:
    // 1) Create a function that calls the Filter function (so your MyFilter's constructor)
    function MyFilter(inputNode) {
        Filter.call(this, inputNode);
    }

    // 2) Extend the Filter.prototype into your own plugin
    MyFilter.prototype = Object.create(Filter.prototype);

    // 3) Add a 'processString' method to your Filter's prototype
    // which will make the changes to the broccoli tree.
    // Note you must always return whatever you are doing + 'existingString'
    // so your modifications plus any previous work done by other plugins is retained!
    MyFilter.prototype.processString = function(existingString) {
        var prepend = `/**
         * vendor.js
         * (c) 2017 All Rights Reserved
         * generated at: ${(new Date()).toISOString()}
         */`
        return prepend + existingString;
    }

    // 4) Assign the extensions your filter is going to work with
    // and the targetExtension it will spit out on your Filter's prototype
    // So in this case it affects javascript files and emits a new javascript file
    MyFilter.prototype.extensions = ['js'];
    MyFilter.prototype.targetExtension = 'js';

    // 5) Now we wire up the plugin so that it operates on the "app tree"
    // before we ultimately return and write our content into the '/dist' folder
    // ~ This is done by "installing" the plugin into the asset pipeline
    // by 'returning' your filter and passing it the app tree so it can
    // operate and modify it, which translates to doing:  'new MyFilter(app.toTree())'
    // NOTE: 'app.toTree()' is the Broccoli tree of our application
    return new MyFilter(app.toTree());
};