import { getProducts, getProductById, getProductsByCategory } from "./getProducts";
import { getStorageProductById, getStorageProducts} from "./productStorage";

/* Templates */
import { cardsContainerTemplate } from "./templates/cardsContainerTemplate";
import { regularCardTemplate } from "./templates/regularCardTemplate";
import { cardDetailTemplate } from "./templates/cardDetailTemplate";
import {cartCardTemplate} from "./templates/cartCardTemplate";

/* Helpers */
import { counter } from "../helpers/counter";
import { isValidElement } from "../helpers/isValidElement";
import { categoryOptions } from "../../constans";

// Modal Bootstrap
import {Modal} from 'bootstrap'
import { emptyCart } from "./templates/emptyCart";


const isValidBtn = (fn)=> ({element,nodeName,classes})=>{     
    if(isValidElement(element,nodeName,classes)){
        return fn(element)
    }
    return null;
}

// Cargar detalle del producto.
const showProductDetail = isValidBtn(async (element)=>{
    const id = element?.dataset?.id;
    return async(modal)=>{    
        try {
            const product = await getProductById(id);
            const localProduct = getStorageProductById(id);
            const localAmount = localProduct?localProduct.amount:product.amount;
            const productDetailTemplate = cardDetailTemplate(product);
            const containerOfRelatedProducts = cardsContainerTemplate({
                title:"Productos relacionados",
                data: (await getProductsByCategory(product.category)).filter(p => p.name != product.name),
                cardComponent:regularCardTemplate,
                localData:getStorageProducts()
            }).replace(/data-bs-toggle="modal" data-bs-target="#detailModal"/g, '');
            
            modal.innerHTML = productDetailTemplate + containerOfRelatedProducts;
            return counter(localAmount);
        } catch (error) {
            console.error("Error loading product details:", error);
        }
    }
}) 

// Cargar Productos por categoria.
export const loadProductsByCategory = async(container)=>{
    try {        
        container = container.querySelector('.cards__container')
        const products = await getProducts();
        const storedProducts = getStorageProducts();
        container.innerHTML = Object.entries(products).map(([category, data])=>{
            const card = categoryOptions[category];
            return cardsContainerTemplate({
                title:card.title,
                cardComponent:card.component,
                data,
                localData:storedProducts
            })
        }).join('');        
        return (modal)=>async e=>(await showProductDetail({
            element:e.target,
            nodeName:'BUTTON',
            classes: ['card__show']
        }))?.(modal);
    } catch (error) {
        console.error("Error loading products:", error);
        return null;
    }    
}

// Cargar productos al carrito
export const loadCartCards = (cartContainers)=>async(localProducts= new Map())=>{
    const keys = Array.from(localProducts.keys()).filter(id => id);
    let html = '';
    if(!keys.length){
        html+= emptyCart();
    }else{
        const products = await Promise.all(keys.map(id => getProductById(id)));
        products.forEach(product => {
            const localProduct = localProducts.get(product.id);      
            html+= cartCardTemplate(product, localProduct)
        });
    }
    cartContainers.forEach(element => element.innerHTML = html);
}

//actualizar la cantidad y el total
export const loadQuantityAndTotal =(cartAmount,cartTotal)=>async(localProducts = new Map())=>{
    localProducts = Array.from(localProducts).filter(([id]) =>id);
    const products = await Promise.all(localProducts.map(([id]) => getProductById(id)));

    let totalAmount = 0;
    let peyment = 0;

    localProducts.forEach(([id,{amount:localAmount}])=>{
        let {price, discount } = products.find(p => p.id == id);
        discount = price * (discount/100);
        peyment     += localAmount * (price - discount);
        totalAmount += localAmount;
    });        

    cartAmount.forEach(element => element.textContent = totalAmount);
    cartTotal.forEach(element => element.textContent = `$${peyment.toFixed(2)}`);
}


export const updateLocation = (locationNames,locationForm) => (storageName, modalId)=>{
    console.log(storageName,modalId);
    const newLocation = localStorage.getItem(storageName);
    if(!newLocation){
        const modal = new Modal(document.getElementById(modalId));
        modal.show();        
    }
    locationNames.forEach(element => element.textContent = newLocation);
    locationForm.location.value = newLocation;
}