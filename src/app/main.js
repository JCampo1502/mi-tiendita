import '../styles/styles.scss';
import * as bootstrap from 'bootstrap';

window.addEventListener('DOMContentLoaded',()=>{
    setTimeout(()=>{
        document.getElementById('webpack-dev-server-client-overlay')?.remove();
    },800)
})