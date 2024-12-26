
/**
 * @description Class for phone entity
 * @param {String} id - Unique phone id
 * @param {String} name - Phone name
 * @param {String} model_id - Model id
 * @param {String} brand_id - Brand id
 * @param {todo} image - Encoded image of phone
 */
export default class Phone {
    constructor(id, name, model_id, brand_id, image) {
        this.id = id;
        this.name = name;
        this.model_id = model_id;
        this.brand_id = brand_id;
        this.image = image;
    }
    
}