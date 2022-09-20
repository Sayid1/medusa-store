import {
  Product as MedusaProduct,
  ProductVariant,
  Region as MedusaRegion,
  ProductCollection as MedusaProductCollection,
} from "@medusajs/medusa"

export type Variant = Omit<ProductVariant, "beforeInsert">

export interface Product extends Omit<MedusaProduct, "variants"> {
  variants: Variant[]
}

export interface ProductCollection extends MedusaProductCollection {
  parent_id?: string
  thumbnail?: string
  items?: Array<ProductCollection>
}
export interface Region extends Omit<MedusaRegion, "beforeInsert"> {}

export type CalculatedVariant = ProductVariant & {
  calculated_price: number
  calculated_price_type: "sale" | "default"
  original_price: number
}
