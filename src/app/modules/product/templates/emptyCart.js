import FamilyValuesShopping from './../../../../assets/images/FamilyValuesShopping.png'

export const emptyCart = ()=>{
    return /* html */`
    <div id="emptyCart" class="d-flex justify-content-center flex-wrap pb-4">
        <img class="empty__img mt-5" src="${FamilyValuesShopping}" alt="Family Values Shopping" style="width: 250px; height: 193px;">
        <p class="fs-3 text-center fw-bold py-2 col-12">
            Tu canasta está vacía
        </p>
        <button type="button" class="btn btn-primary text-white" data-bs-dismiss="offcanvas" aria-label="Close">
            Agregar productos
        </button> 
    </div>
    `;
}