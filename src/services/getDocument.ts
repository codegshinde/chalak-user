import { Document, Model, QueryOptions } from "mongoose";

// Define a generic type for the Mongoose document
export interface GetDocument<T extends Document> {
  (model: Model<T>, condition: Record<string, any>, options?: Partial<QueryOptions>): Promise<T | null | any>;
}

/**
 * Fetches a document from a Mongoose collection based on the provided model and conditions.
 *
 * @param model The Mongoose model representing the collection.
 * @param condition An object containing query conditions for the document. Keys should match the model's schema properties.
 * @param options [Optional] Additional Mongoose query options such as projections or sort order.
 * @returns Promise resolving to the found document or null if not found. Rejects on errors.
 */
export async function getDocument<T extends Document>(
  model: Model<T>,
  condition: Record<string, any>,
  options?: Partial<QueryOptions>
): Promise<T | null | any> {
  try {
    const document = await model.findOne(condition, options).lean().exec();
    return document;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Mongoose error: ${error.message}`);
      // Handle specific Mongoose errors here
    } else {
      console.error(`Unexpected error: ${error}`);
    }
    throw error;
  }
}
