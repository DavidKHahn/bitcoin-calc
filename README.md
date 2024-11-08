# Running BTC Mining Calculator

(Note: Hi Matias,
The newer one has `import { calculateMining } from `./api/apiService`;` and also in package.json file: added `axios`. 
I was restructuring my folder structure from the basic template to use `src/` and this caused a small issue when pushing the final changes to the repository.)

### Requirements
* Must have compatible `node version, cocoapods` installed 

from the root directory run:

```
npm install                   

cd BitcoinMiningCalculator/
cd ios
pod install
cd ..

npx react-native start         # Start Metro bundler
npx react-native run-ios       # Run the app on iOS

or can run directly either ipad or iphone options with cmds below:

(IPAD)
npx react-native run-ios --simulator="iPad Pro (12.9-inch)"
(iPHONE X)
npx react-native run-ios --simulator="iPhone X"
```
![image](https://github.com/user-attachments/assets/bce00150-35ce-41e6-96d8-443220ad6994)
