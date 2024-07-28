import { loadInitialImages } from "./modules/helpers/loadInitialImages";
import { Showproducts } from "./modules/product/Showproducts";
import { getProductById } from "./modules/product/getProducts";
import { addProductStorageObserver, getStorageProducts } from "./modules/product/productStorage";
import { cartCardTemplate } from "./modules/product/templates/cartCardTemplate";
import { emptyCart } from "./modules/product/templates/emptyCart";

const main = document.querySelector(".main");
const detailModal = document.querySelector("#detail__modal");
const cleanBtn = document.querySelector('.pay__clear');
const locationForm = document.querySelector('.location__form');
const cartContainers = document.querySelectorAll(".cart__container");
const cartAmount = document.querySelectorAll('.cart__amount');
const cartTotal = document.querySelectorAll('.cart__total');
const locationName = document.querySelectorAll('.location__city');



const loadTotalAccount = async(localProduct = new Map())=>{
    const products = await Promise.all(
        Array.from(localProduct.keys())
            .filter(id => id)
            .map(id => getProductById(id)
        )
    );
    let totalAmount = 0;
    let peyment = 0;
    
    for (const [key,{amount:localAmount}] of localProduct) {        
        if(!key)continue;

        let {price, discount } = products.find(p => p.id == key);
        discount = price * (discount/100);
        
        peyment     += localAmount * (price - discount);
        totalAmount += localAmount;            
    }        
    cartAmount.forEach(element => element.textContent = totalAmount);
    cartTotal.forEach(element => element.textContent = `$${peyment.toFixed(2)}`);
}

const loadCartCards = async(localProducts= new Map())=>{
    const keys = Array.from(localProducts.keys()).filter(id => id);
    let html = '';
    if(!keys.length){
        html+=emptyCart();
    }else{
        const products = await Promise.all(keys.map(id => getProductById(id)));
        products.forEach(product => {
            const localProduct = localProducts.get(product.id);
            html+= cartCardTemplate(product, localProduct)
        });
    }
    cartContainers.forEach(element => element.innerHTML = html);
}

/* start actions */
window.addEventListener('DOMContentLoaded',()=>{    
    const localProducts = getStorageProducts();
    loadInitialImages();
    loadTotalAccount(localProducts);
    loadCartCards(localProducts)
    Showproducts(main,detailModal,cleanBtn, cartContainers)

    addProductStorageObserver(loadTotalAccount);    
    addProductStorageObserver(loadCartCards);  
    locationForm.addEventListener('submit', ()=>{

    }) 
})

