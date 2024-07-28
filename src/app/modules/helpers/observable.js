export const observable = ()=>{
    const observers = [];
    return [
        (fn)=>{
            if(typeof fn === 'function'){                
                observers.push(fn)
            }
        },
        (data)=>observers.forEach(observer => observer(data))
    ];
}