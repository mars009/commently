// Created by doing 'ember g initializer geo'
export function initialize(app) {
  
  // Only add the 'geolocation' if we are not using 'FastBoot'
  if (typeof FastBoot === 'undefined') {
    // We get the geolocation api
    const geo = navigator.geolocation;
    // We defer our app readiness
    app.deferReadiness();

    geo.getCurrentPosition((pos) => {
      let pt = pos.coords;
      let loc = {
        lat: pt.latitude,
        lng: pt.longitude
      };

      // Add our new object to the app by using 'app.register('key', obj, {config})'
      // We set "instantiate:false" to prevent Ember from trying to instantiate this object
      // since this is not a factory. Anywhere in the App where we get a hold of the App's container
      // the same object will be available
      app.register('data:location', loc, {
        instantiate: false
      });

      // Finally we let our app continue
      app.advanceReadiness();
    }); 
  
  } else {
    console.log('not in browser land!');
  }
  
}

export default {
  name: 'geo',
  initialize
};
