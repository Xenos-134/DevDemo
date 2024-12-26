
/**
 * @description Class for asset entity
 */
export default class Asset {
    /**
     * @constructor
     * @param {String} id - Unique asset id
     * @param {Float} price - Asset price
     * @param {String} phone_number - Phone related to asset
     * @param {String} owner_user_id-  Id of owner
     * @param {String} description - Id of owner
     * @param {String} image - Id of owner
     */
    constructor(id, price, phone, owner_user_id, description, image) {
        this.id = id;
        this.price = price;
        this.phone = phone;
        this.owner_user_id = owner_user_id;
        this.description = description;
        this.image = image;
    }
}