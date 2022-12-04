class LocalStorage {

    static save(key,value) {
        let data = [];
        if(localStorage.getItem(key)){
            data = JSON.parse(localStorage.getItem(key));
        }
        data.push(value)
        localStorage.setItem(key, JSON.stringify(data));
    }

    //
    static get(key){
        return JSON.parse(localStorage.getItem(key));
    }

    //
    static update(key,data){
        localStorage.setItem(key, JSON.stringify(data));
    }
}

export default LocalStorage;