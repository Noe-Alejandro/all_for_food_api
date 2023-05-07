class GetUserResponse {
    id;
    username;
    email;
    icon;
    description;
    createdAt;
    modifiedAt;
    status;
    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.icon = user.icon;
        this.description = user.description;
        this.createdAt = user.createdAt;
        this.modifiedAt = user.modifiedAt;
        this.status = user.status;
    }
}

function MapListUser(users) {
    const mappedList = [];
    users.forEach(user => {
        mappedList.push(new GetUserResponse(user));
    });
    return mappedList;
}

module.exports = { GetUserResponse, MapListUser };