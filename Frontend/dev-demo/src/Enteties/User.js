
/**
 * @description Class for User entity
 */
export default class User {
    /**
     * @param {id} - Unique asset id
     * @param {name} - Username
     * @param {email} - User email
     * @param {roleID} - Id of user role
     */
    constructor(id, price, phone_id, owner_user_id) {
        this.id = id;
        this.price = price;
        this.phone_id = phone_id;
        this.owner_user_id = owner_user_id;
    }
}