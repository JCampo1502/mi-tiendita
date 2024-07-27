/* Retorna la plantilla de una tarjeta para el sidebar.*/
export const miniCardComponent = ({
    id,
    name,
    image,
    amount,
    type,
    price,
    value,
    discount
})=>{
    discount = price * discount / 100;
    price = price - discount;
    const total = (amount * price).toFixed(1)
    return /* html */`
        <div class="card w-100 px-2 shadow-none border border-0 border-bottom rounded-0 d-flex flex-row" id="mini-${id}">
            <div class="card-body px-1 col-9 d-flex flex-wrap align-items-center">
                <div class="card__content col-8 d-flex flex-wrap align-items-center justify-content-start align-content-center">
                    <img src="${image}" class="card__img col-4" alt="card image">
                  <div class="card__detail ms-3">
                    <h5 class="card__name card-title col-8 fs-6 ps-2 fw-normal">
                        ${name}
                    </h5>
                    <strong class="card__price card-text col-8 ps-2">
                        $${total}
                    </strong>  
                  </div>    
                </div>
                <div class="card__actions col-4 d-flex align-items-center justify-content-evenly fw-bold fs-6">
                  <i class="bi bi-dash-lg"></i>
                  <strong class="card__unit">${value}${type}</strong>
                  <i class="bi bi-plus-lg"></i>
                </div>
              </div>
            </div>
    `;
}