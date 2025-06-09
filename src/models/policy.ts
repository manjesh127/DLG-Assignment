export interface Product {
    id: string;
    name: string;
    category: string;
    description: string;
    basePrice: number;
    createdAt: string;
}


export interface Policy {
    id: string;
    productId: string;
    customerName: string;
    startDate: string;
    endDate: string;
    premium: number;
    status: 'active' | 'inactive' | 'cancelled';
    createdAt: string;
}
