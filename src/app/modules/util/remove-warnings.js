export const removeWarnings = ()=>setTimeout(()=>{
    document.getElementById('webpack-dev-server-client-overlay')?.remove();
    console.clear();
},800)