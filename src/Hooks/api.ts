// RTK query is kinda ...
// so I'm gonna use my own
import { Config } from "@/Config"

const SERVER_URL = Config.API_URL;

export const http = {
    request: async function (method: string, baseURL: string, param: { [key: string]: any }, data: any) {
        try {    
            let URL = baseURL;
            if (param) {
                const keys = Object.keys(param).map(key => key.toString());
                const values = Object.values<any>(param).map(value => value.toString());
                URL += "?" + [...Array(keys.length).keys()].map(index => keys[index] + "=" + values[index]).join("&");
            }

            const response = await fetch(SERVER_URL + URL, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data ? JSON.stringify(data) : null
            });
    
            if (response.ok) {    
                const json = await response.json();
                return json;
            }
            
            const errorText = await response.text();
            throw new Error(errorText);
        } catch (error) {
            throw new Error(`HTTP ${method} Failed: ${error}`);
        }
    },
    get: async function (baseURL: string, param: { [key: string]: any }) {
        return this.request('GET', baseURL, param, null);
    },
    post: async function (baseURL: string, param: { [key: string]: any }, data: any) {
        return this.request('POST', baseURL, param, data);
    },
    put: async function (baseURL: string, param: { [key: string]: any }, data: any) {
        return this.request('PUT', baseURL, param, data);
    },
    patch: async function (baseURL: string, param: { [key: string]: any }, data: any) {
        return this.request('PATCH', baseURL, param, data);
    },
    delete: async function (baseURL: string, param: { [key: string]: any }, data: any) {
        return this.request('DELETE', baseURL, param, data);
    },
}
