export const groupByCategory = (products = [])=>products
.reduce((categorias,product) =>{
    const category = product.category;
    if(!categorias[category]){
        categorias[category] = []
    }
    categorias[category].push(product);
    return categorias;
},{})