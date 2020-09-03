const Sequelize     = require('sequelize');
const ldap = require("ldapjs");
const config = require("./../config/config.json").conectionActiveDirectory;

const loginActiveDirectory = async (username, password) => {
    //const { username, password } = data;
    const client = ldap.createClient({
        url: config.url
    });
    let dataReturn = {code: 204, message:""};
    return new Promise((resolve,reject) =>{
        username = `uid=${username},ou=usuarios,dc=fen.uchile.cl`;
        client.bind(username, password, async function(err, result) {
            if (err) {
                dataReturn.message = err.message;
                dataReturn.data = err;
                return reject(dataReturn);
            } else {
                dataReturn.code=200;
                dataReturn.message="success"
                dataReturn.data = result;
                return resolve(dataReturn);
            }
        });
    });
}

module.exports = { loginActiveDirectory };