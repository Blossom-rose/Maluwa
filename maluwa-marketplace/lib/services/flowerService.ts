import api from "../api";

export interface Flower {
  _id?: string;
  id?: string;
  photoName: string;
  countInStock: number;
  price: number;
  image?: string;
  dateCreated?: Date;
}

export const flowerService = {
  // Get all flowers
  async getAllFlowers(): Promise<Flower[]> {
    try {
      const response = await api.get("/photos");
      return response.data;
    } catch (error) {
      console.error("Error fetching flowers:", error);
      throw error;
    }
  },

  // Get a single flower by ID
  async getFlowerById(id: string): Promise<Flower> {
    try {
      const response = await api.get(`/photos/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching flower:", error);
      throw error;
    }
  },

  // Create a new flower
  async createFlower(flowerData: Flower): Promise<Flower> {
    try {
      const response = await api.post("/photos", flowerData);
      return response.data;
    } catch (error) {
      console.error("Error creating flower:", error);
      throw error;
    }
  },

  // Update a flower
  async updateFlower(id: string, flowerData: Partial<Flower>): Promise<Flower> {
    try {
      const response = await api.put(`/photos/${id}`, flowerData);
      return response.data.UpdatedPhoto;
    } catch (error) {
      console.error("Error updating flower:", error);
      throw error;
    }
  },

  // Delete a flower
  async deleteFlower(id: string): Promise<void> {
    try {
      await api.delete(`/photos/${id}`);
    } catch (error) {
      console.error("Error deleting flower:", error);
      throw error;
    }
  },
};
