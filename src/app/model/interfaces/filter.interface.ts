export interface IFilterProducts
{
    categories?:string[]
    brands?:string[]
    age?:string[]
    filterText?:string,
    pageFrom:number,
    itemsCount:number
}