export const counter = (initialValue = 1) =>{
    let count = initialValue;
    return {
        count: ()=>count,
        increment: ()=>++count,
        decrement: ()=>count -1 >= 1?--count: count,
        reset: ()=>count = initialValue
    }
}