# Force Creator

This is a MERN Stack application developed for Full Sail Class WDV463-O.

## Description

This application allows a user to CRUD military units, adding them to a master list. The data format is made to match that from the [OE Data Integration Network](https://odin.tradoc.army.mil/DATEWORLD) so that I can add import/export functionality at a later date.

This application uses the [milsymbol](https://github.com/spatialillusions/milsymbol) library for dynamically displaying military unit symbols. A master list of SIDC can be found here: [https://spatialillusions.com/milsymbol/docs/milsymbol-2525c.html](https://spatialillusions.com/milsymbol/docs/milsymbol-2525c.html)

## Live Deployment

This application is currently hosted on heroku at [https://brownstevenfs-force-creator-db0f08c506e7.herokuapp.com/](https://brownstevenfs-force-creator-db0f08c506e7.herokuapp.com/).

The API is accessible from the application by appending /api_v1/units - [https://brownstevenfs-force-creator-db0f08c506e7.herokuapp.com/api_v1/units](https://brownstevenfs-force-creator-db0f08c506e7.herokuapp.com/api_v1/units)

## Local Development

To get started working with the code, you will need to update the .env.example files and remove the .example from the end of the filename. Besides that, it should be a pretty straightforward `npm install && npm run`. The package.json in the root directory can be used for ease of setup.

## React Native

To run a local version of the React Native Application, in the root directory, run:

```js
npm run react-native
```

## Other Notes

### Why are there devDependencies as Dependencies?

We can thank Heroku for that. Due to deployment issues, any devDependencies that are needed for the build process need to be set as Dependencies to avoid errors with Heroku.

## Contact

Steven Brown

Email: [smbrown1@student.fullsail.edu](mailto:smbrown1@student.fullsail.edu)
