// src/utils/dateUtils.ts
import { format, differenceInDays, addDays, isBefore, isAfter, isSameDay } from 'date-fns';

export const formatDate = (date: Date, formatString: string = 'MMM do, yyyy'): string => {
  return format(date, formatString);
};

export const calculateNights = (checkIn: Date, checkOut: Date): number => {
  return differenceInDays(checkOut, checkIn);
};

export const getDateRange = (checkIn: Date, checkOut: Date): Date[] => {
  const dates: Date[] = [];
  let currentDate = new Date(checkIn);
  
  while (isBefore(currentDate, checkOut) || isSameDay(currentDate, checkOut)) {
    dates.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  
  return dates;
};

export const isDateInRange = (date: Date, startDate: Date, endDate: Date): boolean => {
  return (isAfter(date, startDate) || isSameDay(date, startDate)) && 
         (isBefore(date, endDate) || isSameDay(date, endDate));
};

export const getMinDate = (): string => {
  return format(new Date(), 'yyyy-MM-dd');
};

export const getMaxDate = (yearsAhead: number = 2): string => {
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + yearsAhead);
  return format(maxDate, 'yyyy-MM-dd');
};

export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday = 0, Saturday = 6
};

export const formatDateForInput = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const formatDateForDisplay = (date: Date): string => {
  return format(date, 'EEEE, MMMM do, yyyy');
};

// src/utils/formatters.ts
export const formatPrice = (price: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatPriceSimple = (price: number): string => {
  return `$${price.toLocaleString()}`;
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX for US numbers
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  
  // Format as +X (XXX) XXX-XXXX for international
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  
  // Return original if can't format
  return phone;
};

export const formatGuestCount = (count: number): string => {
  return `${count} guest${count !== 1 ? 's' : ''}`;
};

export const formatRoomSize = (size: number): string => {
  return `${size.toLocaleString()} sq ft`;
};

export const formatCapitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatTitleCase = (str: string): string => {
  return str.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const formatEmailMask = (email: string): string => {
  const [username, domain] = email.split('@');
  const maskedUsername = username.slice(0, 2) + '*'.repeat(username.length - 2);
  return `${maskedUsername}@${domain}`;
};