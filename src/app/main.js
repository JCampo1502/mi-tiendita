import '../styles/styles.scss';
import imageBannerUrl from '../assets/images/background.png';
import * as bootstrap from 'bootstrap';


document.querySelector(".main__banner").setAttribute("src", imageBannerUrl);



window.addEventListener('DOMContentLoaded',()=>{
    setTimeout(()=>{
        document.getElementById('webpack-dev-server-client-overlay')?.remove();
        console.clear();
    },800)
})