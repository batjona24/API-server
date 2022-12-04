import UserDatabase from "./userdb.js";

async function CredentialsValidation(username,password){
    const username_exists = await UserDatabase.raw(`select * from user where username='${username}'`);
    if(5<username.length<12 && username_exists.length == 0){
        if(5<password.length<12 && password.match(/^(?=.[!?.:])(?=.*\d)/)){
            return true;
        }
        else{
            throw new Error ('Password must be between 5-12 characters and contain at least one digit and at least one symbol !?.:');
        }
    }
    return false;  
}
export default CredentialsValidation;