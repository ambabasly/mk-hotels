export interface Room {
    id: number;
    name: string;
    price: number;
    currency: string;
    amenities: string[];
    images: string[];
    description: string;
    maxGuests: number;
    bedType: string;
    size: number;
    available: boolean;
  }
  
  export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    type: 'restaurant' | 'bar' | 'nightclub';
    image?: string;
  }
  
  export interface BookingData {
    checkIn: Date | null;
    checkOut: Date | null;
    roomId: number | null;
    guests: number;
    guestDetails: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
  }
  
  export interface ContactForm {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }