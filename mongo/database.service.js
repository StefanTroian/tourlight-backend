const CONSTANTS = require('../config/constants');

async function authDatabases() {
    
    console.log(`Doing the database setup...`);
    try {
        let MongoClient = require('mongodb').MongoClient;
        let url = CONSTANTS.DBinfo.DatabaseURL;
        let db = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        global.DATABASE = db.db(CONSTANTS.DBinfo.Databases.Tourlight);

        // let posts = await global.DATABASE.collection(CONSTANTS.Databases.Collections.Posts).find({}).toArray();
        console.log(`Done doing the database setup`)
        
    } catch (error) {
        console.error(`Failed to init database.`)
    }

}

module.exports = {
    authDatabases
}