import axios from 'axios'
import { TrueToastify } from './toastify'
import { WrongToastify } from './toastify'
export class ApiCall {
    constructor(url, apikey) {
        this.url = url
        this.apikey = apikey || null
    }

    async getData(path , params) {
        try {
            const res = await axios.get(this.url + path, {
                headers: {
                    apikey: this.apikey
                },
                params: params
            })
            if (res.status !== 200) throw new Error('Something went wrong')
            return res.data
        } catch (e) {
            WrongToastify()
            throw new Error(e.message)
        }
    }

    async postData(path, body) {
        try {
            const res = await axios.post(this.url + path, body)

            if (res.status !== 201) throw new Error('Something went wrong')
            TrueToastify()
            return res.data
        } catch (e) {
            WrongToastify()
            throw new Error(e.message)
        }
    }

    async patchData(path, body) {
        try {
            const res = await axios.patch(this.url + path, body)

            if (res.status !== 200) throw new Error('Something went wrong');
            return res.data
        } catch (e) {
            WrongToastify()
            throw new Error(e.message);
        }
    }  

    async deleteData(path) {
        try {
            const res = await axios.delete(this.url + path)
            TrueToastify()
            if (res.status !== 200) throw new Error('Something went wrong');
            return res.data
        } catch (e) {
            WrongToastify()
            throw new Error(e.message);
        }
    }  

}