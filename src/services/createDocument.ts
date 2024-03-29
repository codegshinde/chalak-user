import { Document, Model, SaveOptions } from "mongoose";

export interface CreateDocument<T extends Document> {
  (model: Model<T>, data: Record<string, any>, options?: SaveOptions): Promise<T>;
}

/**
 * Creates a new document in a Mongoose collection based on the provided model and data.
 *
 * @param model The Mongoose model representing the collection.
 * @param data An object containing the data for the new document. Keys should match the model's schema properties.
 * @param options [Optional] Additional Mongoose save options.
 * @returns Promise resolving to the created document. Rejects on errors.
 */
export async function createDocument<T extends Document>(
  model: Model<T>,
  data: Record<string, any>,
  options?: SaveOptions
): Promise<T> {
  try {
    const document = new model(data);
    await document.save(options);
    return document;
  } catch (error) {
    throw error;
  }
}
