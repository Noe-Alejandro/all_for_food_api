/**
 * @class GetUserResponse : Clase que define la respuesta del Modelo de User para su uso en front
 */
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

/**
 * 
 * @param {*} users : Usuario(s) a mappear
 * @returns mappedList: Usuario(s) mappeado(s) para la implementación de front
 */
function MapListUser(users) {
    const mappedList = [];
    users.forEach(user => {
        mappedList.push(new GetUserResponse(user));
    });
    return mappedList;
}

module.exports = { GetUserResponse, MapListUser };