import { BASE_URL } from "../constants/url.constants";
import HttpClient from "./generic.http";
import { Product } from "@prisma/client";

class HttpRequest extends HttpClient {
  constructor() {
    super(BASE_URL);
  }

  public async postProduct({ ...product }: Product): Promise<Product> {
    const body = product;
    const response = await fetch(this.url("/api/product"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return response.json();
  }

  public async deleteProduct(id: string | number): Promise<Object> {
    const response = await fetch(this.url(`/api/product/${id}`), {
      method: "DELETE",
    });

    return response;
  }
}

export default HttpRequest;
