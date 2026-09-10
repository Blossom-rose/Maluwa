import api from "../api";

export interface ContactMessage {
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  id?: string;
}

export const contactService = {
  async sendMessage(data: ContactMessage): Promise<ContactResponse> {
    try {
      const response = await api.post<ContactResponse>("/contact/messages", data);
      return response.data;
    } catch (error: any) {
      console.error("Error sending contact message:", error);
      throw error;
    }
  },
};
