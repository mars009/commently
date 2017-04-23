// Created using ember g instace-initializer request-info
export function initialize(app) {
  
  // The fastboot service can be grabbed within an initializer by looking for it in the container
  let fbService = app.lookup('service:fastboot')
  // Now we get a hold of the shoebox
  let shoebox = fbService.get('shoebox');
  // From there we get a reference to the store we want (we can lazily create it too later if it doesn't exist)
  let shoeboxStore = shoebox.retrieve('request-data');

  let userAgent = null;

  // If we are in fastboot, we want to get the request data and make it available under some key.
  // NOTE: Since we have the fbService available we can make the call below rather than 'this.get("fastboot.isFastBoot")'
  // which is how you usually do it in containers/routes
  if (fbService.get('isFastBoot')) {
    console.log('in fastboot')
    // So here we get the 'Headers' object from the fastboot service
    let headers = fbService.get('request.headers');
    userAgent = headers.get('user-agent');

    // Add the userAgent to the container using 'app.register(key, value)'
    // which will make it available for server-side rendering...so we still need to shoebox it
    app.register('data:request', {userAgent: userAgent}, {instantiate: false})

    // We lazily create the store and put it in the shoebox if it doesn't exist
    if (!shoeboxStore) {
      shoeboxStore = {};
      shoebox.put('request-data', shoeboxStore);
    }
    // Finally write your data into the store
    shoeboxStore.userAgent = userAgent;
  } else if (shoeboxStore){
    // Rendering on client, having been server with fastboot, so
    // we have the shoeboxStore available and can get the user agent
    // So all we want to do is apply the same registration using 'app.register'
    // so the user agent is available in the container
    userAgent = shoeboxStore.userAgent;
    
    console.log('shoeboxStore found!');
    console.log(userAgent);
    
    app.register('data:request', {
      userAgent: userAgent
      }, {
        instantiate: false // tell ember not to create an instance of this object
      });
  } else {
    // Do nothing. No user agent possible with static hosting
    console.log('Store not found....doing nothing')
  }

}

export default {
  name: 'request-info',
  initialize
};
