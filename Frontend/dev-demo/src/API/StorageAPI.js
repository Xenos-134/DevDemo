
/**
 * @description Class used to store and retrieve data from local storage
 */
export default class StorageAPI {
    static get(key) {
        localStorage.getItem(key)
    }

    static set(key, object) {
        localStorage.setItem(key, object);
    }
}