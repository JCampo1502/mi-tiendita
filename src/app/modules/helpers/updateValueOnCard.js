export const updateValueOnCard = (amount = 1, element = null, className = '')=>{
    const targetElement = element?.querySelector(`.${className}`);    
    const value = parseFloat(targetElement?.dataset?.value ?? 1);
    if(targetElement){
        targetElement.textContent = value * amount;
    }
}
