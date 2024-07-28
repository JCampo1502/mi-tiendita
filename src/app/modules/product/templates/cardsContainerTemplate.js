/* Crea la estructura base para las tarjetas, retornandola como html.*/
export const cardsContainerTemplate = ({
    title = null,
    data = [],
    cardComponent,
    localData = new Map()
}) =>{        
    let html = '';

    html+= /* html */ ` <section class="card__section">`;
    if(title){
        html+=/* html */
        `<h2 class="main__subtitle fw-bold fs-4 mt-2 mb-3">${title}</h2>`;
    }    
    html += /* html */`<article class="card__container">`    
    data.forEach(card => {
        const localProduct =localData.get(card.id);
        html+= cardComponent(card,localProduct)
    });

    html+= /* html */`
            </article> 
        </section>
    `;
    
    return html;
}