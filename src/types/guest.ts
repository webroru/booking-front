export interface Guest {
    id: number | null;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    documentType: string;
    documentNumber: string;
    checkOutTime: string;
    checkOutDate: string;
    cityTaxExemption: number;
}
