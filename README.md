# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory,

To install the project run **npm install** then,

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your bowser.

There are three users:

**Admin**
email: admin@entnt.in \
password: admin123

Access for admin: Ships Management (Add, update, delete ships), Component Management(Add, update, delete components), Jobs Management(Add, update, delete components), Dashboard

**Inspector**
email: inspector@entnt.in \
password: inspect123

Access for Inspector: Ships Management (View only), Component Management(Add, update, delete components), Jobs Management(Add, update, delete components), Dashboard

**Engineer**
email: engineer@entnt.in \
password: engine123

Access for Engineer: Ships Management (View only), Component Management(View only), Component Management(View only), Jobs Management(View only), Dashboard

I am maintaining AuthContext for managing users, ComponentsContext for managing the components data, ShipsContext for managing ships data, JobsContext for managing the jobs data, and NotificationContext for managing notifications from anywhere in the app.
