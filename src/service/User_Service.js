import axios from "axios";

import Response from "@/model/user/Response.ts";
import {Customer_Decode} from "@/model/user/Customer.ts";
import Cookies from "js-cookie";

export default class UserService {
    static api = "http://localhost:1990/api/v1/user";

    static decodeToken() {
       var  token =  localStorage.getItem("token");
        const headers = {
            Authorization: `${token}`,  // Correct authorization header
        };

        return axios
            .get(`${UserService.api}/decode`, { headers })
            .then((response) => {
                const data = response.data;
                if (data && data.data) {
                    const customerDecode = new Customer_Decode(data.data.email,data.data.id,data.data.exp,data.data.iat);
                    const responseData = new Response(data.message, data.status_code, customerDecode);
                    return responseData;
                }else {
                    return null;
                }
            })
            .catch((error) => {
                throw new Error("Failed to decode token");
            });
    }
    static  logout(){
        var  token =  localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,  // Correct authorization header
        };
        axios.get('${UserService.api}/logout',{headers}).then((response) => {
        })
        localStorage.removeItem("token");

        Cookies.remove("refresh_token");


    }
}
