import axios from "axios";
export const getProducts = async(url)=>{
    try {
        const data  = (await axios.get(url)).data
        return data;
    } catch (error) {
        console.error("Error: " + error);
        return [];
    }
};