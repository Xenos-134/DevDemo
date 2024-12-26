//Local imports
import Brand from "../Enteties/Brand";
import Model from "../Enteties/Model";
import Asset from "../Enteties/Asset";
import Phone from "../Enteties/Phone";

import axios from 'axios';



/**
 * @description Static class to retrieve data from backend
 */
export default class RequestAPI {
    static tempLocalStorage = {
        brands: [
            new Brand(1, "Samsung"),
            new Brand(2, "iPhone"),
            new Brand(3, "Nokia"),
        ],
        models: [
            new Model(1,"S22", 1),
            new Model(2, "15", 2),
            new Model(3, "3310", 3)
        ],
        phones: [
            new Phone(1, "Samsung Galaxy S22", 1, 1, null),
            new Phone(1, "iPhone 15", 2, 2, null),
            new Phone(1, "Nokia 3310", 3, 3, null)
        ],
        assets: [
            new Asset(1, 10, new Phone(1, "Samsung Galaxy S22", 1, 1, null), "Samsung Galaxy S22"),
            new Asset(2, 50, new Phone(1, "iPhone 15", 2, 2, null), "iPhone 15"),
            new Asset(3, 100, new Phone(1, "Nokia 3310", 3, 3, null), "Nokia 3310")
        ],

    }

    static ENDPOINT = "http://localhost:3001";
    static METHOD = {
        GET: 0,
        POST: 1,
        PUT: 2,
        DELETE: 3
    };

    static async fetch(method, url, data) {
        let response = null;
        switch(method) {
            case this.METHOD.GET:
                response = await axios.get(`${this.ENDPOINT}/${url}`);
                return response.data;
            case this.METHOD.POST:
                response = await axios.post(`${this.ENDPOINT}/${url}`, data);
                return response.data;
        }
    }

    static async getAssets() {
        try {
            let assetsArray = new Array();
            let data = await this.fetch(this.METHOD.GET, "assets", null);
            data.forEach( asset => {
                assetsArray.push(new Asset(
                    asset.id, 
                    asset.price,
                    new Phone(
                        asset.phone_id,
                        asset.phone_name,
                        asset.phone_model_id,
                        asset.brand_id,
                        asset.phone_image
                    ),
                    null,
                    asset.description,
                    asset.image
                ));
            });
            return assetsArray;
        } catch (e) {
            console.log(e);
            return new Array();
        }
    }

    static async getPhones() {
        try {
            let phoneArray = new Array();
            let data = await this.fetch(this.METHOD.GET, "phones", null);
            data.forEach(phone => {
                phoneArray.push(new Phone(
                    phone.id,
                    phone.name,
                    phone.model_id,
                    phone.brand_id,
                    phone.image
                ));
            });

            return phoneArray;
        } catch (e) {
            console.log(e);
            return new Array();
        }
    }

    static async getModels() {
        try {
            let modelArray = new Array();
            let data = await this.fetch(this.METHOD.GET, "models", null);
            data.forEach(model => {
                modelArray.push(new Model(
                    model.id,
                    model.name,
                    model.brand_id
                ));
            });

            return modelArray;
        } catch (e) {
            return new Array();
        }
    }

    static async getBrands() {
        try {
            let brandArray = new Array();
            let data = await this.fetch(this.METHOD.GET, "brands", null);
            data.forEach(brand => {
                brandArray.push(new Brand(
                    brand.id,
                    brand.name
                ));
            });

            return brandArray;
        } catch (e) {
            return new Array();
        }
    }

    static async postNewAsset(asset) {
        try {
            const data = new FormData() ;
            data.append('file', asset.image);
            data.append('asset', JSON.stringify(asset));
            let response = await this.fetch(this.METHOD.POST, "asset", data);

        } catch (e) {
            console.log(e);
        }
    }
}
