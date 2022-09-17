# Js Physics

Physics is fun! 

[View the deployment](https://weston-bailey.github.io/js-physics/)

## Getting started

* fork and clone this repo
* cd into the directory and run `npm i` to download the required packages
* use `npm run start` to build and serve the the developement application 
* Navigate to `localhost:3000` to see the site
* use `npm run test-all` to run all tests in the `./tests` folder
* use `npm run deploy` to build a deployment and push to github pages

> `./src` contains dev code and the output of webpack can be found in `./dist`

---

## Sources

* [the nature of code](https://natureofcode.com/book/)
* [collisions/physics](https://spicyyoghurt.com/tutorials/html5-javascript-game-development/collision-detection-physics)
* [more collisions](https://www.jeffreythompson.org/collision-detection/table_of_contents.php)

#### The following scripts can be run from the `package.json`

`npm run start`

> builds the `src` directory to the `dist` directory and serves on `port 3000`

`npm run build` 

>  runs a production build of the `./src` directory to the `./dist` directory.

`npm run test < file name >` 

> runs any tests found in the file

`npm run test-all` 

> runs all tests found with the filenameing convention `fileName.test.extension`
