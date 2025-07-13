import type { Photo } from '@/interfaces/photo.ts';

export interface Booking {
    lastName: string;
    checkInDate: string;
    checkOutDate: string;
    phone: string;
    orderId: number | null;
    propertyName: string;
    room: number | null;
    unit: string | null;
    originalReferer: string;
    guestsAmount: number | null;
    passCode: string | null;
    debt: number | null;
    extraPerson: number | null;
    capacity: number | null;
    isRuleAccepted: boolean;
    checkIn: boolean;
    checkOut: boolean;
    paymentStatus: string;
    photos: Photo[];
    groupId: number | null;
    invoiceItems: string[];
    guests: string[];
}
