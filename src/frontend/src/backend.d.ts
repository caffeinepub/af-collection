import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    name: string;
    description: string;
    category: Category;
    price: string;
}
export interface Review {
    customerName: string;
    reviewText: string;
}
export enum Category {
    watches = "watches",
    caps = "caps",
    sunglasses = "sunglasses",
    clothes = "clothes"
}
export interface backendInterface {
    getAllProducts(): Promise<Array<Product>>;
    getAllReviews(): Promise<Array<Review>>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    initializeStore(): Promise<void>;
}
