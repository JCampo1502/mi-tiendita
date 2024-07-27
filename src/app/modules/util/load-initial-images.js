import imageBannerUrl from './../../../assets/images/background.png';
import FamilyValuesShopping from './../../../assets/images/FamilyValuesShopping.png';
import HandsBuying from './../../../assets/images/HandsBuying.png';

export const loadInitialImages = ()=>{
    document.querySelector(".empty__img").setAttribute("src", FamilyValuesShopping);
    document.querySelector(".main__banner").setAttribute("src", imageBannerUrl);
    document.querySelector("#HandsBuying").setAttribute("src", HandsBuying);
}
