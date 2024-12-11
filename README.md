# Getting Started with Queue App


### DataBase
## Cloud Firestore
Create project in Firebase Console
Go to Cloud Firestore
Give collection name "users"
Add document { name: string, age: number }

In server folder create js file called secretVariables.js and inside should look like the below.

```javascript
const keysFirebase = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id",
    measurementId: "your-measurement-id"
};

export { keysFirebase };
```






## Backend
### In the project directory, go to server folder
#### `npm install`
#### `npm run dev`

## Frontend
### In the project directory, go to client folder
#### `npm install`
#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.



