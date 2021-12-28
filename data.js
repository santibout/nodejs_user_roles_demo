const ROLE = {
    ADMIN: 'admin',
    BASIC: 'basic'
};

module.exports = {
    ROLE,
    users: [
        { id: 1, name: 'Samuel J. Santibout', role: ROLE.ADMIN },
        { id: 2, name: 'Sarah J. Santibout', role: ROLE.BASIC },
        { id: 3, name: 'Talia S. Santibout', role: ROLE.BASIC },
    ],
    projects: [
        { id: 1,  name: "Samuel's Project", userId: 1 },
        { id: 2,  name: "Sarah's Project", userId: 2 },
        { id: 3,  name: "Talia's Project", userId: 3 },
    ]
}