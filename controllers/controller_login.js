async function loginUser (req, res) {
    const { username, password } = req;

    //logika na overovanie spravnosti udajov

    //dummy udaje
    req.session.user = await {
        clientId: "91283091823908102983",
        clientUsername: "abs3nce",
    };

    res.json({ message: "logged in" });
};

module.exports = { loginUser };
