import axios from "axios";
import { baseURL } from "../../constans";
import { groupByCategory } from "../helpers/groupByCategory";

const getRequest = async(url)=>{
    try {
        const data  = (await axios.get(url)).data
        return data;
    } catch (error) {
        console.error("Error: " + error);
        return [];
    }    
}

export const getProductById = (id)=>getRequest(`${baseURL}/${id}`);

export const getProductsByCategory = (category)=>getRequest(`${baseURL}?category=${category}`);

export const getProducts = async()=>groupByCategory(await getRequest(baseURL));
