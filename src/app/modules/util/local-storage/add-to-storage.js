export const addToStorage = (storageName,data)=>{
    let storage = [];
    const json = JSON.parse(localStorage.getItem(storageName));

    if(json)
    {
        storage = new Set(json);
        storage.add(data)
    }
    else
    {
        storage = new Set([data]);
    }

    if(storage.length != 0)
    {
        return
    }
    localStorage.setItem(storageName,Array.from(storage));
}