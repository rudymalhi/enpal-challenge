export type ProductName = "SolarPanels" | "Heatpumps";
export type Language = "German" | "English";
export type Rating = "Bronze" | "Silver" | "Gold";

export interface CalendarQueryRequest {
    date: string;
    products: ProductName[];
    language: Language;
    rating: Rating;
}
export interface AvailableSlot {
    available_count: number;
    start_date: string;
}
