export interface Task {
    id: number;
    value: string;
    completed: boolean;
}

export type FilterCategory = 'all' | 'active' | 'completed'