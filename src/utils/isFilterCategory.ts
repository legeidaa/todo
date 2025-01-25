import { FilterCategory } from "@/model/interfaces";

export const isFilterCategory = (value: string): value is FilterCategory => {
    if (value === "all" || value === "active" || "completed") return true;
    return false;
};