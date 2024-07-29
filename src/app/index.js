import { cardProductActionContainer, cardProductActions } from "./constans";
import { counter } from "./modules/helpers/counter";
import { getCardType } from "./modules/helpers/getCardType";
import { loadInitialImages } from "./modules/helpers/loadInitialImages";
import { updateValueOnCard } from "./modules/helpers/updateValueOnCard";
import { loadCartCards, loadProductsByCategory, updateLocation, loadQuantityAndTotal } from "./modules/product/Showproducts";
import { addProductStorageObserver, addProductToStorage, cleanUpStorage, getStorageProductById, getStorageProducts, removeStoreProductById } from "./modules/product/productStorage";
import { creditFormTemplate } from "./modules/product/templates/creditFormTemplate";
import {Modal} from 'bootstrap'

const main = document.querySelector(".main");
const detailModal = document.querySelector("#detail__modal");
const peymentModal = document.querySelector('#peymentModal');
const cleanBtn = document.querySelector('.pay__clear');
const locationForm = document.querySelector('.location__form');
const creditFormContainer = document.querySelector('.credit__form');
const cartContainers = document.querySelectorAll(".cart__container");
const cartAmount = document.querySelectorAll('.cart__amount');
const cartTotal = document.querySelectorAll('.cart__total');
const locationNames = document.querySelectorAll('.location__city');

const reloadCarts = loadCartCards(cartContainers);
const reloadQuantityAndTotal = loadQuantityAndTotal(cartAmount,cartTotal)
const reloadProducts =async ()=> await loadProductsByCategory(main);


const loadProducts = async()=>{
    const loadDetail = await reloadProducts();    
    
    return async(e)=>{        
        const newAmount =await loadDetail(detailModal)(e);
        await reloadProducts();
        if(newAmount){
            amount =newAmount
        }
    } 
}


const updateValueOnAValueCard = (element)=>{    
    updateValueOnCard(amount?.count(),element,'card__value');
}

const updateUserLocation = updateLocation(locationNames,locationForm).bind(null,'user-location','locationModal');

let amount = null

/* start actions */
window.addEventListener('DOMContentLoaded',async()=>{        
    const initialProductos = getStorageProducts();
    const loadDetail =await loadProducts();
    creditFormContainer.innerHTML = creditFormTemplate();
    
    loadInitialImages();    
    addProductStorageObserver(reloadQuantityAndTotal);
    addProductStorageObserver(reloadCarts);
    updateUserLocation();
    reloadQuantityAndTotal(initialProductos);
    reloadCarts(initialProductos);
    updateLocation(locationNames,locationForm)
    await reloadProducts();
    
    creditFormContainer.querySelector(`#creditCardNumber`).addEventListener('input', e=>{
        const value = e.target.value;
        const cardsContainer = creditFormContainer.querySelector('.card__types');        
        if(value.length < 3)return;
        const cards = Object.entries(getCardType(value));
        let html = '';
        for (const [cardType, url] of cards) {
            html+= /* html */`
                <img src="${url}" class="card__icon card__icon--${cardType}" alt="tarjeta ${cardType}" />
            `;
        }
        cardsContainer.innerHTML = html;
        
    })
    
    creditFormContainer.addEventListener('submit',async(e)=>{
        e.preventDefault();
        creditFormContainer.querySelector('form').reset();
        cleanUpStorage();
        await reloadProducts();
        const modal = new Modal(peymentModal);
        modal.show();        
    })

    main.addEventListener('click',async (e)=>{
        const element = e?.target;      
        const id = element?.dataset?.id ?? null;

        switch (cardProductActions(element)) {
            case 'increment':
                amount?.increment();
                updateValueOnAValueCard(detailModal);
                break;
            case 'decrement':
                amount?.decrement();
                updateValueOnAValueCard(detailModal);
                break;
            case 'remove':
                removeStoreProductById(id);
                amount.reset();                
                loadDetail(e)
                break;
            case 'add':
                const data = {amount:amount.count()}
                const select = detailModal.querySelector('#ripeness');

                if(select)data['ripeness'] = select.value;
                
                addProductToStorage({
                    id:element.dataset.id,
                    data
                })
                
                amount.reset();        
                loadDetail(e);
                break;
            default:
                loadDetail(e)
                break;
        }        
    });
    
    cartContainers.forEach(container => {
        container.addEventListener('click',(e)=>{
            const element = cardProductActionContainer(e.target,'card__actions');
            const id = element?.dataset?.id;
            const actionsContainer = container.querySelector(`[data-id="${id}"]`);
            if(!id)return;            
            const data = getStorageProductById(id);                            
            const action = cardProductActions(e.target);
            let amount = counter(data?.amount);            
            if(!amount || !action)return;            

            switch (action) {
                case 'increment':
                    amount.increment();
                    break;
                case 'decrement':
                    amount.decrement();                    
                    break;
            }

            addProductToStorage({id, data: {...data,amount: amount.count()}});
            updateValueOnCard(amount.count(),actionsContainer,'card__value');
        })
    });

    cleanBtn.addEventListener('click',async()=>{
        cleanUpStorage();
        await reloadProducts();
    })

    locationForm.addEventListener('submit', ()=>{
        const value = locationForm.location.value;
        localStorage.setItem('user-location',value);
    }) 

    window.addEventListener('storage', e=>{
        if(e.key === 'user-location'){
            updateUserLocation();
        }
    })
})

