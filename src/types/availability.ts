// src/types/availability.ts
export interface RoomAvailability {
    roomId: number;
    roomName: string;
    unavailableDates: string[];
    blockedPeriods: BlockedPeriod[];
    maxOccupancy: number;
    minStayDays: number;
    maxStayDays: number;
  }
  
  export interface BlockedPeriod {
    startDate: string;
    endDate: string;
    reason: string;
  }
  
  export interface SeasonalPeriod {
    startDate: string;
    endDate: string;
    priceMultiplier: number;
    name: string;
  }
  
  export interface SpecialEvent {
    date: string;
    name: string;
    impact: 'low_demand' | 'moderate_demand' | 'high_demand';
    priceMultiplier: number;
  }
  
  export interface AvailabilityData {
    roomAvailability: { [roomId: string]: RoomAvailability };
    seasonalPricing: {
      highSeason: { periods: SeasonalPeriod[] };
      lowSeason: { periods: SeasonalPeriod[] };
    };
    specialEvents: SpecialEvent[];
    lastUpdated: string;
  }