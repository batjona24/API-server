import UserDatabase from "./userdb.js";

async function CredentialsValidation(username,password){
    const username_exists = await UserDatabase.raw(`select * from user where username='${username}'`);
    console.log(username_exists);
    const username_validation = username.length > 5 && username.length < 12 && username_exists.length == 0;
    console.log("the username: ", username_validation);
    const password_validation = password.length > 5 || password.length < 12 && password.match(/^(?=.[!?.:])(?=.*\d)/);
    console.log("the password: ", password_validation);
    if(!username_validation){
        throw new Error("The username is not valid!");
    }
    else if(!password_validation) {
        throw new Error("The password is not valid!");
    }
    else{
        return true;
    }
}

export default CredentialsValidation;