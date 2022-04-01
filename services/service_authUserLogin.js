// service pre prihlasovanie uzivatela do systemu
// stara sa o fyzicku logku prihlasovania >> porovnavanie
// zadanych udajov s tymy v DB

const userDAO = require("../dao/dao_fetchUserByUsername");
const bcrypt = require("bcrypt");

async function authUserLogin(username, password) {
    try {
        const user = await userDAO.fetchUserByUsername(username);
        //bcrypt.compare vzdy navracia resolved promise
        //ale pri match navrati true a pri neshode false
        const match = await bcrypt.compare(password, user.passwordHash);
        if (match) {
            return { _id: user._id, roles: user.roles };
        } else {
            return Promise.reject("Unauthorized - Wrong credentials.");
        }
    } catch (err) {
        return Promise.reject(`User not found`);
    }
}
module.exports = { authUserLogin };
