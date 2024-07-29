import { offerCardTemplate } from './modules/product/templates/offerCardTemplate';
import { regularCardTemplate } from './modules/product/templates/regularCardTemplate';
import { isValidElement } from './modules/helpers/isValidElement';

const nodeBtn = 'BUTTON';
const nodeIcon = 'I';

export const baseURL = "http://localhost:8000/products";

export const storageName = 'user-product'

export const cardPatterns = {
    visa: /^4\d{2,3}/,
    masterCard: /^5[1-5]\d{1,2}|^2[2-7]\d{1,2}/,
    americanExpress: /^3[4|7]\d{1,2}/,
    discover: /^6[0|5]\d{1,2}|^64[4-9]|^65|^622[1-9]\d{1,3}|^6221[2-9]\d{0,2}|^622[2-8]\d{0,2}|^6229[0-2]\d{0,1}/
};

export const categoryOptions = {
    'offer':{
        title : 'Ofertas',
        component: offerCardTemplate
    },
    'popular':{
        title : 'Los más populares',
        component: regularCardTemplate
    }
}

export const cardProductActions = (element)=>{
    
    switch (true) {
        case isValidElement(element,nodeBtn,['card__btn--plus']):
        case isValidElement(element,nodeIcon,['bi-plus-lg']) :
            return 'increment';
        case isValidElement(element,nodeBtn,['card__btn--less']):
        case isValidElement(element,nodeIcon,['bi-dash-lg']):
            return 'decrement'
        case isValidElement(element,nodeBtn,['card__remove']):
            return 'remove';
        case isValidElement(element,nodeBtn,['card__add']):
            return 'add'
    }
}

export const cardProductActionContainer = (element,className)=>{
    let targetElement = null;
    switch (true) {
        case isValidElement(element,nodeBtn,['card__btn--plus']):
        case isValidElement(element,nodeBtn,['card__btn--less']):
            targetElement = element.parentElement;
            break;
        case isValidElement(element,nodeIcon,['bi-plus-lg']) :
        case isValidElement(element,nodeIcon,['bi-dash-lg']):
            targetElement = element.parentElement.parentElement;
            break;
        default:
            return null;
    }    
    if(targetElement?.classList?.contains(className)){
        return targetElement;
    }
    return null;
}