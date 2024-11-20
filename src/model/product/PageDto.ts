export class PageDto {
    sortBy : string;
    productName : string;
    category : string;
    pageNo : Number;
    pageSize : Number;
    constructor(
        sortBy: string = '',
        productName: string = '',
        category: string = '',
        pageNo: number = 0,
        pageSize: number = 0
    ) {
        this.sortBy = sortBy;
        this.productName = productName;
        this.category = category;
        this.pageNo = pageNo;
        this.pageSize = pageSize;
    }
}
