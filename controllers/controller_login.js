async function loginUser(req, res) {
    const { username, password } = req.body;

    //payload validation
    if (!username || !password) {
        res.status(401).json({
            message:
                "Unauthorized - Bad request parameters. You need to provide username and password.",
        });
    }

    //logika na overovanie spravnosti udajov

    //dummy udaje
    req.session.user = await {
        clientId: "91283091823908102983",
        clientUsername: "abs3nce",
    };

    res.json({ message: "logged in" });
}

module.exports = { loginUser };
