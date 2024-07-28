import { getProducts, getProductById, getProductsByCategory } from "./getProducts";
import { addProductToStorage,addProductStorageObserver, getStorageProductById, getStorageProducts, removeStoreProductById, cleanUpStorage } from "./productStorage";

/* Templates */
import { cardsContainerTemplate } from "./templates/cardsContainerTemplate";
import { offerCardTemplate } from "./templates/offerCardTemplate";
import { regularCardTemplate } from "./templates/regularCardTemplate";
import { cardDetailTemplate } from "./templates/cardDetailTemplate";
/* Helpers */
import { counter } from "../helpers/counter";
import { isValidElement } from "../helpers/isValidElement";

const isValidBtn = (element,classes)=>isValidElement(element,'BUTTON',classes);

const updateValue = (element,className)=>{    
    const targetElement = element.querySelector(`.${className}`);
    const value = parseFloat(targetElement.dataset.value);
    targetElement.textContent = value * amount.count();;
}

let amount = null;

const options = {
    'offer':{
        title : 'Ofertas',
        component: offerCardTemplate
    },
    'popular':{
        title : 'Los más populares',
        component: regularCardTemplate
    }
}

// Cargar detalle del producto
const showDetail = async (element, modal)=>{
    const id = element?.dataset?.id;
    if(!isValidBtn(element,['card__show']) || !id) return;    
    await loadProductDetail(modal,id);
}

// Mostrar detalle del producto
const loadProductDetail = async(modal,id)=>{    
    try {
        const product = await getProductById(id);
        const localAmount = getStorageProductById(id);

        const relatedProducts = (
            await getProductsByCategory(product.category)
        ).filter(p => p.name != product.name);
        
        amount = counter(localAmount?localAmount.amount:product.amount);
        modal.innerHTML = cardDetailTemplate(product);
        modal.innerHTML += cardsContainerTemplate({
            title:"Productos relacionados",
            data: relatedProducts,
            cardComponent:regularCardTemplate,
            localData:getStorageProducts()
        }).replace(/data-bs-toggle="modal" data-bs-target="#detailModal"/g, '');
    } catch (error) {
        console.error("Error loading product details:", error);
    }
}

// Cargar productos en el contenedor
const loadProducts = async(container)=>{
    try {        
        const products = await getProducts();
        container.innerHTML = '';
        for (const category in products) {
            const card = options[category];
            if (card) {                
                container.innerHTML += cardsContainerTemplate({
                    title:card.title,
                    cardComponent:card.component,
                    data:products[category],
                    localData:getStorageProducts()
                });
            }        
        }
    } catch (error) {
        console.error("Error loading products:", error);
    }
    
}

const determineAction = (element)=>{
    switch (true) {
        case isValidBtn(element,['card__btn--plus']):
        case isValidElement(element,'I',['bi-plus-lg']) :
            return 'increment';
        case isValidBtn(element,['card__btn--less']):
        case isValidElement(element,'I',['bi-dash-lg']):
            return 'decrement'
        case isValidBtn(element,['card__remove']):
            return 'remove';
        case isValidBtn(element,['card__add']):
            return 'add'
    }
}

// Exportar la función principal para mostrar productos
export const Showproducts = (container, modal, cleanBtn, cartContainers)=>{
    loadProducts(container);

    cleanBtn.addEventListener('click',()=>{
        cleanUpStorage();
        loadProducts(container);
    })
    container.addEventListener('click',(e)=>{

        showDetail(e.target,modal)
    })

    cartContainers.forEach(container => container.addEventListener('click', async(e)=>{
        const element = e?.target;
        let targetElement = null;
        switch (true) {
            case isValidBtn(element,['card__btn--plus']):
            case isValidBtn(element,['card__btn--less']):
                targetElement = element.parentElement;
                break;
            case isValidElement(element,'I',['bi-plus-lg']) :
            case isValidElement(element,'I',['bi-dash-lg']):
                targetElement = element.parentElement.parentElement;
                break;
            default:
                return;
        }

        const id = targetElement?.dataset?.id;
        if(!id)return;        
        const data = getStorageProductById(id);                
        let amount = data.amount;        
        if(!amount)return;
        switch (true) {
            case isValidBtn(element,['card__btn--plus']):
            case isValidElement(element,'I',['bi-plus-lg']) :
                ++amount
                break;
            case isValidBtn(element,['card__btn--less']):
            case isValidElement(element,'I',['bi-dash-lg']):
                if(amount-1 >=1)--amount;
                break;
            default:
                return;
        }

        addProductToStorage({id, data: {...data,amount}})
    }));

    modal.addEventListener('click',async(e)=>{        
        const element = e?.target;      
        const id = element?.dataset?.id ?? null

        switch (determineAction(element)) {
            case 'increment':
                amount?.increment();
                updateValue(modal,'card__value');
                break;
            case 'decrement':
                amount?.decrement();
                updateValue(modal,'card__value');
                break;
            case 'remove':
                removeStoreProductById(id);
                amount.reset();            
                await showDetail(element,modal);
                loadProducts(container);
                break;
            case 'add':
                const data = {
                    amount:amount.count()
                }
                const select = modal.querySelector('#ripeness');

                if(select){
                    data['ripeness'] = select.value;
                }

                addProductToStorage({
                    id:element.dataset.id,
                    data
                })
                
                amount.reset();            
                await showDetail(element,modal);
                loadProducts(container);
                break;
            default:
                showDetail(element,modal);                
                break;
        }
    })
}
