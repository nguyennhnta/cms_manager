// types.ts
export type Product = {
    id: number;
    name: string;
    status: string;
    description: string;
    price: number;
    quantity: number;
    created_at: string;
  }
  
  export type ProductsList = {
    current_page: string;
    data: Product[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    link: any[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
  }
  