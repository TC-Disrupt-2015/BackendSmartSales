/**
 * Created by manthanhd on 12/5/2015.
 */
module.exports = {
    oauth: {
        clientId: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET
    },
    db: {
        hostname: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        dbName: process.env.DB_NAME
    }
};