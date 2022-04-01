async function getUser (req, res) {
    res.json(req.session);
};

module.exports = { getUser };
