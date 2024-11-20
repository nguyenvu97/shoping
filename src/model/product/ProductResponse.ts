export class ProductResponse {
    product_id: string;
    product_name: string;
    product_description: string;
    product_price: number;
    product_quantity: number;
    url: string;
    purchase_price: number;
    product_status: string;
    category_name: string;
    description: string;
    store_id: string;

    constructor(
        product_id: string,
        product_name: string,
        product_description: string,
        product_price: number,
        product_quantity: number,
        url: string,
        purchase_price: number,
        product_status: string,
        category_name: string,
        description: string,
        store_id: string
    ) {
        this.product_id = product_id;
        this.product_name = product_name;
        this.product_description = product_description;
        this.product_price = product_price;
        this.product_quantity = product_quantity;
        this.url = url;
        this.purchase_price = purchase_price;
        this.product_status = product_status;
        this.category_name = category_name;
        this.description = description;
        this.store_id = store_id;
    }
}
