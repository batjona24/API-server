import knex from "knex";

const UserDatabase = knex({
    client: 'sqlite3',
    connection:{
        filename:'./UserDatabase.sqlite3',
    },
    useNullAsDefault: true,
});

export default UserDatabase;