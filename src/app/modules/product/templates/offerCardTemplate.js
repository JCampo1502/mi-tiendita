/* Retorna plantilla de la tarjeta en oferta.*/
export const offerCardTemplate = ({
    id,
    name,
    image,
    type,
    price,
    discount
},localProduct)=>{        
    const priceWithDiscount = (price -(price / 100 * discount )).toFixed(2);
    return /* html */`
    <div class="card border-0 position-relative">
        <span class="card__discount badge text-bg-secondary position-absolute rounded-pill py-2 text-secondary">
            ${discount}% dto.
        </span>
        <img src="${image}" class="card__img card-img-top pt-5" alt="offer card image">
        <div class="card-body px-1 d-flex flex-column justify-content-between">
            <p class="card-text m-0 mt-2 fw-bold d-flex fs-6 ">
                <strong class="card__total">
                    $${priceWithDiscount}/${type}
                </strong>
                <s class="card__price text-black-50 ms-2">
                    $${price}/${type}
                </s>
            </p>
            <h5 class="card__name card-title fs-6 fw-normal mb-5">
                ${name}
            </h5>
            <button class="card__show btn btn-lg ${localProduct?'btn-secondary':'btn-primary'} w-100 text-white fw-nor,al" data-id="${id}"  data-bs-toggle="modal" data-bs-target="#detailModal">${localProduct?'Ver Mas':'Agregar'}</button>
        </div>
    </div>
    `;
}