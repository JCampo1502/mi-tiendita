export const isValidElement = function(element, nodeName, classes) {
    const classList = element?.classList;
    if (
        !classList || 
        element.nodeName !== nodeName || 
        classes.every(c => !classList.contains(c))
    ){
        return false;
    }
    return true;
}