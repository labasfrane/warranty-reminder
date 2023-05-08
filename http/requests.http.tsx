import { BASE_URL } from "../constants/url.constants";
import HttpClient from "./generic.http";
import { Product } from "@prisma/client";

class HttpRequest extends HttpClient {
  constructor() {
    super(BASE_URL);
  }

  public async getProducts(): Promise<Product> {
    const response = await fetch(this.url("/api/getProducts"), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
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

  public async replaceProduct({ id, ...product }: Product): Promise<Product> {
    const body = product;
    const response = await fetch(this.url(`/api/product/update/${id}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return response.json();
  }
}

export default HttpRequest;
