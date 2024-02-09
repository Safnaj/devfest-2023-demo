# DevFest 2023 - Sri Lanka


![image](https://github.com/Safnaj/devfest-2023-demo/assets/37530024/2c476c77-adec-4723-80a5-0dc44c6915b3)


### 1. Create a new Firebase Project.

- Go to [Firebase Console](https://console.firebase.google.com) and create a new Firebase Project.
- Navigate to Remote Config and create a Boolean Flag Named `feature_enable_dark_mode`

### 2. Clone the Repository
- `git clone https://github.com/Safnaj/devfest-2023-demo.git`

### 3. Add Firebase Config values to `.env` file
- Inside the project folder create a file called `.env`
- Refer the `.env.example` and add the values as shown below 

```
REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID
REACT_APP_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
```

### 4. Set Default Config Values
- Go to `src/config/remoteConfig.js` and inside the `initRemoteConfig` add your flag and it's default value.

### 5. Define Flags in Constants
- Move to `src/constants/flags.js` and create a constant for your flag:
```
export const FEATURE_ENABLE_DARK_MODE = 'feature_enable_dark_mode';
```

### 6. Check flag value 
- Check your flag value using `isFeatureEnabled` function and write your logic <br/>
  Ex: `const isShowStatsEnabled = isFeatureEnabled(FEATURE_ENABLE_STATS);`



