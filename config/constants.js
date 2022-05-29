"use strict"

const CONSTANTS = {
    SERVICE_NAME: 'tourlight',
    PORT: 8081,
    DBinfo: {
        DatabaseURL: `mongodb+srv://tourlight:SfveXHIu4n5CVOrb@tourlight.cpr8g.mongodb.net/tourlight?retryWrites=true&w=majority`,
        Databases: {
            Tourlight: `tourlight`
        }
    },
    Databases: {
        Collections: {
            Posts: `posts`,
            Users: `users`,
            Locations: `locations`
        }
    }
}

module.exports = CONSTANTS;