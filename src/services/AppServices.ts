import { httpClient } from "../api/axiosConfig";
import type BrandType from "../models/Brands";
import type CategoryType from "../models/Categories";
import type { ProductsType, AllProductsType } from "../models/Products";
import type CommentsResponseType from "../models/Comments";
import type ReviewSummaryType from "../models/ReviewSummary";

export default class Services {
  async getProducts(url: string): Promise<ProductsType[]> {
    try {
      const response = await httpClient.get(url);
      return response.data.data;
    } catch (error) {
      throw new Error(`Intern error server - Cannot get products: ${error}`);
    }
  }

  async getAllProducts(url: string): Promise<AllProductsType> {
    try {
      const response = await httpClient.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Intern error server - Cannot get products: ${error}`);
    }
  }

  async detailProduct(url: string) {
    try {
      const response = await httpClient.get(url);
      return response;
    } catch (error) {
      throw new Error(`Intern error server - Cannot get the product: ${error}`);
    }
  }

  async getCategory(url: string): Promise<CategoryType[]> {
    try {
      const response = await httpClient.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Intern error server - Cannot get categories: ${error}`);
    }
  }

  async getBrands(url: string): Promise<BrandType[]> {
    try {
      const response = await httpClient.get(url);
      return response.data.data;
    } catch (error) {
      throw new Error(`Intern error server - Cannot get categories: ${error}`);
    }
  }

  async getRelatedProducts(url: string) {
    try {
      const response = await httpClient.get(url);
      return response.data;
    } catch (error) {
      throw new Error(
        `Intern error server - Cannot get related products: ${error}`
      );
    }
  }

  async getComments(url: string): Promise<CommentsResponseType> {
    try {
      const response = await httpClient.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Intern error server - Cannot get comments: ${error}`);
    }
  }

  async getReviewSummary(url: string): Promise<ReviewSummaryType> {
    try {
      const response = await httpClient.get(url);
      return response.data;
    } catch (error) {
      throw new Error(
        `Intern error server - Cannot get review summary: ${error}`
      );
    }
  }
}
