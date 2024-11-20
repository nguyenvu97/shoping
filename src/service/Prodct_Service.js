import axios from "axios";

import Response from "@/model/user/Response.ts";
import {PageDto} from "@/model/product/PageDto.ts";
import {ProductResponse} from "@/model/product/ProductResponse.ts";

export class Product_Service {
    static url_api = "http://localhost:1990/api/v1/product";

    static getAllProducts(pagedto) {
        if (!(pagedto instanceof PageDto)) {
            pagedto = new PageDto();
        }

        // Sử dụng return để đảm bảo Promise trả về dữ liệu
        return axios.post(`${Product_Service.url_api}/get_all`, pagedto)
            .then(response => {
                const data = response.data;
                if (data.status_code === 200) {
                    if (data && data.data) {
                        console.log("Fetched products:", data.data);
                        return data.data.map(product => {
                            return new ProductResponse(
                                product.product_id,
                                product.product_name,
                                product.product_description,
                                product.product_price,
                                product.product_quantity,
                                product.url,
                                product.purchase_price,
                                product.product_status,
                                product.category_name,
                                product.description,
                                product.store_id
                            );
                        });
                    } else {
                        return [];
                    }
                } else {
                    return [];
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                throw error; // Ném lỗi ra ngoài để catch ở nơi gọi
            });
    }
}
