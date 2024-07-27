/* Crea la estructura base para las tarjetas, retornandola como html.*/
export const cardContainerComponent = ({
    title = null,
    data = [],
    cardComponent
}) =>{        
    let html = '';

    html+= /* html */ ` <section class="card__section">`;
    if(title){
        html+=/* html */
        `<h2 class="main__subtitle fw-bold fs-4 mt-2 mb-3">${title}</h2>`;
    }    
    html += /* html */`<article class="card__container">`
    
    data.forEach(card => html+= cardComponent(card));

    html+= /* html */`
            </article> 
        </section>
    `;
    
    return html;
}