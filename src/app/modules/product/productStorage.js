import { storageName } from "../../constans";
import { observable } from "../helpers/observable";

const [addObserver, notifyObservers] = observable();

const getProducts = () => {
    const storedItems = localStorage.getItem(storageName);
    return storedItems? new Map(JSON.parse(storedItems)): new Map();    
}

const setProducts = (newItems = new Map())=>{
    newItems = JSON.stringify(Array.from(newItems.entries()));
    localStorage.setItem(storageName,newItems)
    notifyObservers(getProducts());
}

const initializeStorage = ()=>{
    if(!localStorage.getItem(storageName)){
        setProducts(new Map());
    }
}

initializeStorage();

export const addProductStorageObserver = (fn)=>addObserver(fn);
export const cleanUpStorage = ()=>setProducts(new Map());;
export const getStorageProducts = ()=>getProducts();
export const getStorageProductById = (id)=>getProducts().get(id);
export const addProductToStorage = ({id,data})=>{
    const products = getProducts();
    products.set(id,data);
    setProducts(products);
}
export const removeStoreProductById = (id)=>{
    const newProducts = getProducts();
    newProducts.delete(id);
    setProducts(newProducts);
}