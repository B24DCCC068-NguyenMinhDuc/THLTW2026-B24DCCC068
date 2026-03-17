export interface Staff {
    id: number;
    name: string;
    maxCustomerPerDay: number;
    workingHours: string;
}

export interface Service {
    id: number;
    name: string;
    price: number;
    duration: number;
}

export interface Appointment {
    id: number;
    date: string;
    time: string;
    staff: string;
    customer: string;
    service: string;
    status: "pending" | "confirmed" | "done" | "cancel";
}

export interface Review {
    id: number;
    date: string;
    time: string;
    staff: string;
    customer: string;
    service: string;
    feedback?: string;
}