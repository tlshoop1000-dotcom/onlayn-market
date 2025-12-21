
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: number;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'All' | 'Electronics' | 'Fashion' | 'Home' | 'Gadgets';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
