/* Retorna la plantilla de una tarjeta regular. */
export const regularCardComponent = ({
    id,
    name,
    image,
    value,
    type,
    price
})=>{
    const totalPerUnit = (price/value).toFixed(1);
    return /* html */`
        <div class="card border-0 position-relative">
            <img src="${image}" class="card__img card-img-top my-2 mt-1 px-2" alt="lemon">
            <div class="card-body px-1 d-flex flex-column justify-content-between">
              <p class="card-text m-0 mt-2 fw-bold d-flex fs-6 mb-1">
                <strong class="card__total">$${price}</strong>                
              </p>
              <h5 class="card__name card-title fs-6 fw-normal mb-4">
                ${name}
              </h5>

              <em class="card__units text-black-50 mb-2 d-block fw-normal fst-normal">${value}${type} ($${totalPerUnit}${type})</em>
              <button class="card__show btn btn-lg btn-primary w-100 text-white fw-normal" data-id="${id}" data-bs-toggle="modal" data-bs-target="#detailModal">Agregar</button>
            </div>
          </div>
    `;
}