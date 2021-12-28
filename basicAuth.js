function authUser(req, res, next) {
    if (!req.user) {
        return res.status(403).send('You need to log in.');
    }
    next();
}

function authRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(401).send('You are unauthorized');
        };
        next();
    };
};

module.exports = { authUser, authRole }; 