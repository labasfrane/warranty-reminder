import { BASE_URL } from "../constants/url.constants";
import HttpClient from "./generic.http";
import { Product } from "@prisma/client";

class HttpRequest extends HttpClient {
  constructor() {
    super(BASE_URL);
  }

  public async getProducts(): Promise<Product> {
    const response = await fetch(this.url("/api/products"), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  }

  public async getProduct(id: string | number): Promise<Product> {
    const response = await fetch(this.url(`/api/products/${id}`), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  }

  public async createProduct({ ...product }: Product): Promise<Product> {
    const body = product;
    const response = await fetch(this.url("/api/products/create"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return response.json();
  }

  public async editProduct({ id, ...product }: Product): Promise<Product> {
    const body = product;
    const response = await fetch(this.url(`/api/products/${id}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return response.json();
  }

  public async deleteProduct(id: string | number): Promise<Object> {
    const response = await fetch(this.url(`/api/products/${id}`), {
      method: "DELETE",
    });

    return response;
  }
}

export default HttpRequest;
