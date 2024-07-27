/* Components */
import { offerCardComponent } from "../components/offer-card-component";
import { regularCardComponent } from "../components/regular-card-component";
// Util
import { loadProductDetail } from "../load-products";

export const baseURL = "http://localhost:8000/products";

export const cardContainerOptions = {
    'offer':{
        title : 'Ofertas',
        component: offerCardComponent
    },
    'popular':{
        title : 'Los más populares',
        component: regularCardComponent
    }
}

export const validateClickBtn = function(element, classToValidate,fn){
    const id = element?.dataset?.id;            
    if(
        element.nodeName !== 'BUTTON' ||
        !element?.classList?.contains(classToValidate) ||
        !id
    )
    {
        return null;
    }
    
    return fn.bind(null,id);
}

export const showDetail = function(...args){    
    return  validateClickBtn.bind(
        null,
        ...args,
        async (id,baseURL,container)=>
            (await loadProductDetail(baseURL,id))(container))();
}
    