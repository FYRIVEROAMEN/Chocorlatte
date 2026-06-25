import type { User, Format, Flavor, Product } from './types';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Tomás', username: 'admin', role: 'ADMIN', password: 'admin' },
  { id: '2', name: 'Juan', username: 'empleado', role: 'EMPLEADO', password: '123' },
];

export const MOCK_FORMATS: Format[] = [
  { id: 'f1', name: 'Cucurucho', price: 1500, maxFlavors: 2 },
  { id: 'f2', name: '1/4 KG', price: 3500, maxFlavors: 3 },
  { id: 'f3', name: '1/2 KG', price: 6500, maxFlavors: 3 },
  { id: 'f4', name: '1 KG', price: 12000, maxFlavors: 4 },
];

export const MOCK_FLAVORS: Flavor[] = [
  { id: 's1', name: 'Chocolate Chocorlatte (Gold)', stockPercentage: 80 },
  { id: 's2', name: 'Dulce de Leche Tentación', stockPercentage: 5 },
  { id: 's3', name: 'Vainilla Planifolia Madagascar', stockPercentage: 25 },
  { id: 's4', name: 'Frutilla a la Crema Gourmet', stockPercentage: 60 },
  { id: 's5', name: 'Limon de Sicilia (Sorbet)', stockPercentage: 45 },
  { id: 's6', name: 'Menta Granizada Belga', stockPercentage: 0 },
  { id: 's7', name: 'Sambayón Italiano Piamonte', stockPercentage: 70 },
  { id: 's8', name: 'Tramontana Real', stockPercentage: 35 },
  { id: 's9', name: 'Pistacho de Bronte', stockPercentage: 15 },
  { id: 's10', name: 'Mascarpone con Frutos Rojos', stockPercentage: 90 },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Espresso Black', price: 1200, category: 'Cafetería', stock: 50 },
  { id: 'p2', name: 'Cappuccino Chocorlatte', price: 1800, category: 'Cafetería', stock: 30 },
  { id: 'p3', name: 'Torta de Chocolate Belga', price: 4500, category: 'Pastelería', stock: 10 },
  { id: 'p4', name: 'Cheesecake de Maracuyá', price: 4200, category: 'Pastelería', stock: 15 },
  { id: 'p5', name: 'Agua Mineral Premium', price: 1000, category: 'Bebidas', stock: 100 },
];

export const MOCK_SALES: any[] = [
  { id: 's1', total: 15000, timestamp: new Date().toISOString(), location: 'Local A', user: 'Tomás' },
  { id: 's2', total: 8000, timestamp: new Date(Date.now() - 86400000).toISOString(), location: 'Local A', user: 'Juan' }, // Ayer
  { id: 's3', total: 25000, timestamp: new Date(Date.now() - 86400000 * 3).toISOString(), location: 'Local B', user: 'Tomás' }, // Hace 3 días
  { id: 's4', total: 45000, timestamp: new Date(Date.now() - 86400000 * 10).toISOString(), location: 'Local A', user: 'Juan' }, // Hace 10 días
];
