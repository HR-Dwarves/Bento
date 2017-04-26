# Bento

Bento is a modular productivity application utilizing a card-based dashboard of tools to optimize a user's workflow

![bento photo](https://firebasestorage.googleapis.com/v0/b/dashboardapp-3d3c7.appspot.com/o/splashPage%2Fallmods.png?alt=media&token=c244421c-6bef-443c-9b65-4d66321fe85e)

## Contributors
- Benson Ninh
- Joey Laguna
- Michael Tutt
- Tony Lopes

## Available Modules
- **List:** Simple list taking module for task management
- **Newsfeed:** Access the newest or most popular articles from 10 popular new sources
- **Sticky Note:** Quickly save down anything you'd like to remember later
- **Clock:** Keep track of various time zones with an easy to read clock
- **Focus:** State your focus for the day to remind yourself what you'd like to accomplish
- **Quote:** Stay motivated with inspirational quotes from influential people
- **Photo Per Day:** Take Bento's photo per day challenge and track yourself over time
- **Background Customizer:** Customize your Bento background using your favorite photo's url

## Technologies Utilized
- **Client:** React, Redux, Masonry (React Grid Layout)
- **Server:** Node.js, Express.js
- **Database / Authentication:** Firebase
- **Hosting:** Google Cloud Platform / Google App Engine
- **Deployment:** Webpack, CircleCI
- **Testing:** Mocha, Chai, Jest

## Planned Features
- [ ] Color customization of cards
- [ ] Confirm deletion of cards storing personalized information
- [ ] Add toggle system for cards only needed once
- [ ] Improved cross-browser styling


## Bento Development
If you'd like to work on improving Bento by adding your own productivity modules, we welcome you to make a pull request!

To run Bento in a development environment, please fork and clone the repo. Next, from the repo's root folder within your teminal run:
```
npm install
```
Once all of the dependencies are installed, run the command below within your terminal:
```
npm run dev
```
... and Bento will now be running at localhost:3000.

In order to be able to develop modules that require data persistence, we recommend creating a new project with Firebase and using your personal API keys / database so that you'll have access to your own Firebase project console.

To create a new project, visit the Firebase console (https://console.firebase.google.com/), login with your Google account, and navigate to 'CREATE NEW PROJECT'.

From the overview tab, click 'Add Firebase to your web app' and copy the applicable API key, authentication domain, database URL and storage bucket URL. Place the new keys in their respective locations within the client/base.js file (example below):

```
import firebase from 'firebase';

const config = {
  apiKey: '[YOUR API KEY]',
  authDomain: '[YOUR AUTH DOMAIN]',
  databaseURL: '[YOUR DATABASE URL]',
  storageBucket: '[YOUR STORAGE BUCKET URL]'
};

var firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
```
... and now you should be able to make changes to your Bento database within the 'Database' tab of your Firebase console.
(Keep in mind that within our production Firebase database we have security rules only authorizing users to make changes to a database key that corresponds with Firebase authentication user ID)

