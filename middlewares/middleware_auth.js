//middleware na kontrolu autenticity uzivatela
const authUser = (req, res, next) => {
    if (!req.session || !req.session.user) {
        // const err = new Error("invalid session");
        // err.statusCode = 401;
        // next(err);
        return res.status(401).json({ message: "You are not authorized to perform this action." });
    }
    next();
};

module.exports = authUser;
