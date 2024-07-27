/* Retorna el texto html con el contenido del detalle */
export const cardDetailComponent = ({
    id,
    name,
    image,
    amount,
    type,
    price,
    value,
    discount,
    taqs = []
})=>{
    discount = price / 100 * discount ;
    price = (amount * (price - discount)).toFixed(2)
    let selectElement = '';
    if (taqs.includes('food')) {
        selectElement = /* html */`
            <div class=" border-1 py-1 mb-1 px-0 col-12">
                <label for="ripeness" class="form-label fw-bold">
                    Selecciona la madurez que deseas
                </label>
                <select class="form-select" id="ripeness">
                    <option value="0">Por elegir</option>
                    <option value="Maduro">Maduro (Para hoy)</option>
                    <option value="Normal">Normal (3-5 días)</option>
                    <option value="Verde">Verde 7 días</option>
                </select> 
            </div> 
        `;
    }

    return /* html */`
        <div class="detail__card d-lg-flex justify-content-between px-3 pb-4">
            <img src="${image}" class="card__img card-img-top my-2 card__img--detail" alt="imagen producto">
            <div class="card__detail col-lg-5 align-items-start d-lg-flex flex-column justify-content-center">
                <h3 class="mb-2">                
                    <strong class="card__name fw-bolder d-block my-2 fs-2">
                        ${name}
                    </strong>
                    <span class="ms-2">
                        $${price}/${amount>1?amount:''}${type}
                    </span>
                </h3>
                <small class="mt-4 d-block fs-6 fst-normal fw-light">
                    Precios con IVA incluido
                </small>
                <p class="lh-sm mt-2 fs-6">
                    Peso aproximado por pieza, puede variar de acuerdo al peso real.
                </p>
                <form class="flex-wrap d-flex align-items-center justify-content-between pt-4 col-12"> 
                    ${selectElement}
                    <div class="card__actions col-5 d-flex align-items-center justify-content-between px-3 fw-bold fs-6 shadow-sm my-1 py-3">
                        <button type="button" class="card__btn card__btn--less btn border-0">
                            <i class="bi bi-dash-lg"></i>
                        </button>
                        <strong class="card__unit">
                            ${value}${type}
                        </strong>
                        <button type="button" class="card__btn card__btn--plus btn border-0">
                            <i class="bi bi-plus-lg"></i>
                        </button>
                    </div>
                    <button data-id="${id}" class="card__add btn btn-primary col-6 text-white" type="button">
                        Agregar
                    </button>
                </form>                
            </div>
        </div>
    `;
}