import { getProducts } from "./get-products"
/* Components */
import { cardContainerComponent } from "./components/card-conteiner-component";
import { cardDetailComponent } from "./components/card-detail-component";
import { regularCardComponent } from "./components/regular-card-component";

/* Util */
import { groupByCategory } from "./util/group-by-category";


/* Devuelve una función que espera el elemento al que se agregarán las tarjetas. */
export const loadProducts = async(baseURL, options)=>{
    const products = groupByCategory(await getProducts(baseURL));
    return (element)=>{        
        for (const category in products) {
            const card = options[category];
            if (card) {                
                element.innerHTML += cardContainerComponent({
                    title:card.title,
                    cardComponent:card.component,
                    data:products[category]
                });
            }        
        }

    }
}

export const loadProductDetail = async(baseURL,id)=>{    
    const product = await getProducts(`${baseURL}/${id}`);
    const relatedProducts = (await getProducts(`${baseURL}?category=${product.category}`)).filter(p => p.name != product.name);
    return (element)=>{
        element.innerHTML = cardDetailComponent(product);
        element.innerHTML += cardContainerComponent({
            title:"Productos relacionados",
            data: relatedProducts,
            cardComponent:regularCardComponent
        }).replace(/data-bs-toggle="modal" data-bs-target="#detailModal"/g, '');
    }
}
