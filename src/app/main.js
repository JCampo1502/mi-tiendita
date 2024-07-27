import '../styles/styles.scss';
import imageBannerUrl from '../assets/images/background.png';
import FamilyValuesShopping from '../assets/images/FamilyValuesShopping.png';
import HandsBuying from '../assets/images/HandsBuying.png';
import * as bootstrap from 'bootstrap';

document.querySelector(".empty__img").setAttribute("src", FamilyValuesShopping);
document.querySelector(".main__banner").setAttribute("src", imageBannerUrl);
document.querySelector("#HandsBuying").setAttribute("src", HandsBuying);


window.addEventListener('DOMContentLoaded',()=>{
    setTimeout(()=>{
        document.getElementById('webpack-dev-server-client-overlay')?.remove();
        console.clear();
    },800)
})