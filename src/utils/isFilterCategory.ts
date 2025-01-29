import { FilterCategory } from "@/model/interfaces";

export const isFilterCategory = (value: string): value is FilterCategory => {
    if (value === "all" || value === "active" || value === "completed") return true;
    return false;
};