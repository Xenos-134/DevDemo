/**
 * @description Class for brand entity
 */
export default class Model {
    /**
     * @param {id} - Unique model id
     * @param {name} - Model name
     */
    constructor(id, name, brand_id) {
        this.id = id;
        this.name = name;
        this.brand_id = brand_id;
    }
    
}