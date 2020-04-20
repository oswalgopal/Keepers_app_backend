const mongoose = require('mongoose');
const server = 'mongodb://localhost:27017/';
const database = 'Keepers_App';

class Database {
    constructor() {
            this.connect();
        }
        /***
         * function to establish connection with mongodb
         */
    connect() {
        mongoose.connect(server + database).then(res => {
            console.log(res);
        }).catch(error => {
            console.error(error);
        })
    }
}