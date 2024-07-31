export interface ProductType {
    id : number,
    title : string,
    price : number,
    inventory : number
}

export interface ProductState {
    loading : boolean,
    products : ProductType[]
}