# Timber Properties 

## Description
![ScreenShot](./src/assets/timber-prop-logo.png)

This is the Client Side of a full (MERN) stack application I built where a rental property owner (and their staff) can host their various properties so that potential renters can review and reserve their properties.

## Tech Used

![logo](./src/assets/pics/icons8-json-web-token-48.png)
- JSON WebToken.
   - What is this? 
   - - In authentication, when the user successfully logs in using their credentials, a JSON Web Token will be returned.  In its compact form, JSON Web Tokens consist of three parts separated by dots (.), which are: Header, Payload and Signature...This application uses JWT for Authorization purposes.  To learn more you can check out the docs [here](https://jwt.io/introduction).

![logo](./src/assets/pics/dot_env.png)
- dotenv (to protect secret variables). 
    - What is this? 
    - - It's a npm that helps keep sensitive environment variables secure by allowing them to be stored in a .env file which can then be called upon throughout the application without actually being "part" of the code.  To learn more you can check out the docs [here](https://www.npmjs.com/package/dotenv).

![logo](./src/assets/pics/icons8-encrypt-50.png)
- bcryptjs
    - What is this?
    - - An npm package that is used to encrypt passwords so that they are not visible outside the initial payload sent in by the client (IE: They are encypted in the database as well as the server responses).  Feel free to see the docs [here](https://www.npmjs.com/package/bcryptjs).

![mongoose-logo](./src/assets/pics/icons8-mongoose-48.png)
- mongoose
    - What is this? 
    - - An Object modeler for node.js to be used in conjunction with a MongoDB database (which is what this application utilizes).  In short; it just makes working with MongoDB easier. Again, feel free to check out their docs [here](https://mongoosejs.com/docs/guide.html).

![mongodb-logo](./src/assets/pics/icons8-mongodb-48.png)
- MongoDB (Specifically Atlas)
    - What is this?
    - - MongoDB Atlas is a great tool that essentially hosts our data in the cloud.  I've used it for many projects and I find it very easy to work with; check out the docs [here](https://www.mongodb.com/docs/atlas/getting-started/).


## Deployed
Click [Here](https://timber-properties.netlify.app/) to see it. 





