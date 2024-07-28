import imageBannerUrl from './../../../assets/images/background.png';
import HandsBuying from './../../../assets/images/HandsBuying.png';

export const loadInitialImages = ()=>{    
    document.querySelector(".main__banner").setAttribute("src", imageBannerUrl);
    document.querySelector("#HandsBuying").setAttribute("src", HandsBuying);
}
