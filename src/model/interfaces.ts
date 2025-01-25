export interface Task {
    id: number;
    value: string;
    completed: boolean;
}

export const enum FilterCategory {
    ALL = 'all',
    ACTIVE = 'active',
    COMPLETED = 'completed'
}