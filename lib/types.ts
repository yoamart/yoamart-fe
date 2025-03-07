export interface Product {
    _id: string;
    name: string;
    categoryId: CategorySp; // Reference to Category type
    image: string[];
    price: number;
    quantity: number;
    description: string;
    topSelling: number;
    isFeatured: boolean;
    isHot: boolean;
    discount: number;
    inStock: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    phone?: string;
}

export interface CategorySp {
    _id: string;
    name: string;

}



export interface Category {
    _id: string;
    name: string;
    image: string;
    price: number;
    categoryId: CategorySp;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    phone?: string;

    description?: string; // Optional description since it can be empty
}



export type CartItem = {
    _id: string;
    name: string;
    categoryId: CategorySp; // Reference to Category type
    image: string[];
    price: number;
    quantity: number;
    description: string;
    topSelling: number;
    featured: "yes" | "no";
    isFeatured: boolean;
    isHot: boolean;
    discount: number;
    inStock: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    cartQuantity: number;
};

export interface CartType {
    cartItems: CartItem[]; // An array of CartItems
    cartTotalQuantity: number; // Total number of items in the cart
    cartTotalAmount: number; // Total amount of the cart
}



// types.ts
export interface UserData {
    userId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: string;
}

export interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    userData: UserData | null;
}

export interface RootState {
    auth: AuthState; // Add other slices here as needed
}

export interface favoriteItems {
    favoriteItems: Product[];
}

export interface FavoritesState {
    favorites: favoriteItems;
}


type OrderItem = {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string[];
    quantity: number;
    _id: string;
};

type Order = {
    userId: string;
    address: string;
    email: string;
    name: string;
    cart: OrderItem[];
    total: number;
    subTotal: number;
    shippingFee: number;
    mobile: string;
    note: string;
    orderStatus: string;
    isPaid: string;
    orderNumber: string;
    orderDate: string; // ISO string format
    _id: string;
    createdAt: string; // ISO string format
    updatedAt: string; // ISO string format
    __v: number;
};


type ApiResponse = {
    message: string;
    orderId: string;
    order: Order;
};

export interface Driver {
    _id: string;
    name: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    image: string;
    price: number;
    categoryId: CategorySp;
    quantity: number;
    description?: string;
}

export type { Order, OrderItem, ApiResponse };