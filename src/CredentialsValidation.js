import database from "./database.js";

async function CredentialsValidation(username,password){
    const username_exists = await database.raw(`select * from users where username='${username}'`);
    const username_validation = username.length > 5 && username.length < 12 && username_exists.length == 0;
    const password_validation = password.length > 5 || password.length < 12 && password.match(/^[ A-Za-z0-9_@./#&+-]*$/);
    
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