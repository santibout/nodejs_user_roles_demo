const express = require('express');
const app = express();

const { users, ROLE } = require('./data');
const { authUser, authRole } = require('./basicAuth');
const projectRouter = require('./routes/projects');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    next();
})
app.use(setUser);

app.use('/projects', projectRouter);

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/dashboard', authUser, (req, res) => {
    res.send('Dashboard Page');
});

app.get('/admin', authRole(ROLE.ADMIN), (req, res) => {
    res.send('Admin Page');
});

function setUser(req, res, next) {
    let { userId } = req.body;
    if (userId) {
        req.user = users.find(user => user.id === userId);
    };
    next();
};

app.listen(3001, () => console.log('roles server running on port 3001'));