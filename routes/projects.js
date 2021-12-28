const express = require('express');
const { authUser } = require('../basicAuth');
const router = express.Router({ mergeParams: true });
const { projects } = require('../data');
const { canViewProject, scopedProjects, canDeleteProject } = require('../permissions/project');

router.get('/', authUser, (req, res) => {
    res.json(scopedProjects(req.user, projects));
});

router.get('/:projectId', setProject, authUser, authGetProject, (req, res) => {
    res.json(req.project);
});

router.delete('/:projectId', authUser, setProject, authCanDelete, (req, res) => {
    res.status(200).send(`user: ${req.user.name} deleted project: ${req.project.name}`);
});

function authCanDelete(req, res, next) {
    const canDelete = canDeleteProject(req.user, req.project);
    if(!canDelete) {
        return res.status(401).send('You are unauthorized to delete this project');
    };
    next();
};

function setProject(req, res, next) {
    const projectId = parseInt(req.params.projectId);
    req.project = projects.find(project => project.id === projectId);
    if (req.project === null) {
        res.status(404).send("Project not found");
    };
    next();
};

function authGetProject(req, res, next) {
    if (!canViewProject(req.user, req.project)) {
        return res.status(401).send('You are not authorized.');
    };
    next();
}

module.exports = router;