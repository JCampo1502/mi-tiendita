/* Retorna la plantilla de una tarjeta para el sidebar.*/
export const cartCardTemplate = ({
    id,
    name,
    image,
    amount,
    type,
    price,
    value,
    discount
},{amount:localAmount})=>{    
    discount = price / 100 * discount ;
    price = (localAmount * (price - discount)).toFixed(2);

    return /* html */`
        <div class="card w-100 px-2 shadow-none border border-0 border-bottom rounded-0 d-flex flex-row" id="mini-${id}">
            <div class="card-body px-1 col-9 d-flex flex-wrap align-items-center">
                <div class="card__content col-8 d-flex flex-wrap align-items-center justify-content-start align-content-center">
                  <img src="${image}" class="card__img col-4" alt="card image">
                  <div class="card__detail ms-3 col">
                    <h5 class="card__name card-title col-8 fs-6 ps-2 fw-normal">
                        ${name}
                    </h5>
                    <strong class="card__price card-text col-8 ps-2">
                        $${price}
                    </strong>  
                  </div>                      
                </div>
                <div class="card__actions col-4 d-flex align-items-center justify-content-evenly fw-bold fs-6" data-id="${id}">
                  <button type="button" class="card__btn card__btn--less btn border-0">
                      <i class="bi bi-dash-lg"></i>
                  </button>
                  <strong class="card__unit">
                      <span class="card__value" data-value="${value}">${value * (localAmount?localAmount:amount)}</span>${type}
                  </strong>
                  <button type="button" class="card__btn card__btn--plus btn border-0">
                      <i class="bi bi-plus-lg"></i>
                  </button>
                </div>
              </div>
            </div>
    `;
}