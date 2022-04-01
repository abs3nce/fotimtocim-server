// controller pre prihlasovanie uzivatela do systemu
// stara sa o navracanie statusov, messagov a nie o fyzicku logiku loginu
const userLoginService = require("../services/service_authUserLogin");

async function loginUser(req, res) {
    const { username, password } = req.body;
    //payload validation
    if (!username || !password) {
        res.status(401).json({
            message:
                "Unauthorized - Bad request parameters. You need to provide both username and password.",
        });
    }

    try {
        const user = await userLoginService.authUserLogin(username, password);
        req.session.user = user;
        res.status(200).json({ message: "Logged in successfully" });
    } catch (err) {
        // v prod verzii nepouzivat console.log console.error pretoze blokuju thread nodejs
        // pouzit proper logging lib ako napr winston
        console.log(err);
        return res.status(401).json({ message: err });
    }
}

module.exports = { loginUser };
