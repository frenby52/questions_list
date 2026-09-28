export interface Paginated<T> {
    data: T[];
    page: number;
    limit: number;
    total: number;
}

export interface User {
    id: string;
    username: string;
}

export interface Filters {
    search?: string;
    specializationId?: number | null;
    skills?: number[];
    keywords?: string[];
    complexity?: string[];
    rate?: number[];
    status?: string;
    page?: number;
}
