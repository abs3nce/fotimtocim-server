//middleware na kontrolu autenticity uzivatela
const authUser = (req, res, next) => {
    if (!req.session || !req.session.user.clientId) {
        // const err = new Error("invalid session");
        // err.statusCode = 401;
        // next(err);
        return res.status(401).json({ message: "ERROR, not authorized" });
    }
    next();
};

module.exports = authUser;
