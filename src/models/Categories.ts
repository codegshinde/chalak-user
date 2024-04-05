import { Schema, model } from "mongoose";

interface CategoriesTypes {
  serviceId: string;
  charges: number;
}

const categoriesSchema = new Schema<CategoriesTypes>({
  serviceId: { type: String, required: true },
  charges: { type: Number, required: true },
});

const Category = model<CategoriesTypes>("categories", categoriesSchema);

export { CategoriesTypes, Category };

