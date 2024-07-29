import { getCardType } from "../../helpers/getCardType";
import defaultCard from './../../../../assets/images/CVC Card.svg'
const cards = {...getCardType() , defaultCard};
export const creditFormTemplate = ()=>{
    return /* html */`
    <form class="pay d-flex flex-column mt-3 " autocomplete="off">
        <div class="mb-3">
            <label for="email" class="form-label">
                Correo Electrónico
            </label>
            <input type="email" class="form-control shadow-sm" id="creditCardEmail" placeholder="name@example.com" required>
        </div>
        <div class="mb-3">
            <em class="fst-normal">Información de la tarjeta</em>
            <div class="border rounded shadow-sm p-1 bg-white">
                <div class="input-group border-bottom">
                    <input type="text" class="form-control rounded-0 border-0 " placeholder="1234 1234 1234 1234" id="creditCardNumber" required>
                    <span class="card__types input-group-text border-0 rounded-0 bg-white gap-1" required>
                        <img src="${cards.visa}" class="card__icon card__icon--visa" alt="tarjeta visa" />
                        <img src="${cards.masterCard}" class="card__icon card__icon--group" alt="tarjeta group" />
                        <img src="${cards.americanExpress}" class="card__icon card__icon--american" alt="tarjeta american" />
                        <img src="${cards.discover}" class="card__icon card__icon--discover" alt="tarjeta discover" />
                    </span>                
                </div>
                <div class="input-group d-flex ">
                    <input type="text" class="form-control border-0 rounded-0 " placeholder="MM / YY" id="card-year" required>
                    <div class="input-group-text col-7 p-0 border-0 ">
                        <div class="input-group border-0 border-start">
                            <input type="text" class="form-control border-0 rounded-0" placeholder="CVC" id="creditCardCVC"  pattern="^\d{3,4}$"
                            title="Porfavor ingresar un CVC valido." required>
                            <span class="input-group-text bg-white border-0 rounded-0" >
                                <img src="${cards.defaultCard}" class="card__icon card__icon--defaultCard" alt="tarjeta defaultCard" />
                            </span>                
                        </div>    
                    </div>                
                </div>
            </div>
        </div>
        <div class="mb-3">
            <label for="creditCardOwner" class="form-label">
                Nombre de la tarjeta
            </label>
            <input type="text" class="form-control shadow-sm" id="card-name" required>
        </div>
        <button class="pay__submit btn btn-primary text-white mt-3" type="submit">
            Pagar 
            <strong class="fw-normal cart__total">
                $227.48
            </strong>
        </button>
    </form>`;
}
    