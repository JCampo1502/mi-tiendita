import { removeWarnings } from './modules/util/remove-warnings';
import { loadInitialImages } from './modules/util/load-initial-images';

/* Constants */
import { baseURL, showDetail, validateClickBtn } from './modules/util/constans';
import { cardContainerOptions } from './modules/util/constans';

/* Petitions */
import { loadProducts, loadProductDetail } from './modules/load-products';

const main = document.querySelector(".main");
const detailModalContainer = document.querySelector("#detailModal");
const detailModal = document.querySelector("#detail__modal");

/* start actions */
window.addEventListener('DOMContentLoaded',async ()=>{
    const loadDetail = (element)=>
        showDetail(element,'card__show')?.call(null,baseURL,detailModal)

    //removeWarnings();
    loadInitialImages();    
    (await loadProducts(baseURL, cardContainerOptions))(main);

    /* Events */
    main.addEventListener('click',(e)=>loadDetail(e.target));
    detailModalContainer.addEventListener('click',(e)=>{
        const element = e.target;
        validateClickBtn(element,'card__add',(id)=>{
            localStorage.getItem("")
        })();        
        loadDetail(element);
    });
})

