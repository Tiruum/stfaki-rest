export class CreateWmEntryDto {

    id: number;
    status: "closed" | "passed" | "booked" | "empty";
    value: number;
    userId: number | null;
    wmId: number | null;
    time: string;
    date: string;
    
}
