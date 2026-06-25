import React, { useState } from 'react';
import { 
  IceCream, 
  ShoppingCart, 
  BarChart2, 
  Users, 
  LogOut, 
  Plus, 
  Minus, 
  Download, 
  Package,
  AlertTriangle,
  Trash2,
  Store,
  FileText,
  PlusCircle,
  TrendingUp,
  Calendar,
  Layers
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { User, Format, Flavor, CartItem, Location, Product, Sale } from './types';
import { MOCK_USERS, MOCK_FORMATS, MOCK_FLAVORS, MOCK_PRODUCTS, MOCK_SALES } from './mockData';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Base Components ---
// ... (rest of the code remains the same)

const ReportsView = ({ sales, location }: { sales: Sale[], location: Location }) => {
  const [range, setRange] = useState<'day' | 'week' | 'month'>('day');

  const filteredSales = sales.filter(s => {
    const saleDate = new Date(s.timestamp);
    const now = new Date();
    if (s.location !== location) return false;
    
    if (range === 'day') return saleDate.toDateString() === now.toDateString();
    if (range === 'week') return (now.getTime() - saleDate.getTime()) < 7 * 24 * 60 * 60 * 1000;
    if (range === 'month') return saleDate.getMonth() === now.getMonth() && saleDate.getFullYear() === now.getFullYear();
    return true;
  });

  const totalRevenue = filteredSales.reduce((acc, s) => acc + s.total, 0);
  const avgTicket = filteredSales.length > 0 ? (totalRevenue / filteredSales.length).toFixed(0) : 0;
  
  const StatCard = ({ title, value, subtext, icon }: any) => (
    <Card className="relative overflow-hidden group border-luxury-border hover:border-gold/30 transition-all">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">{icon}</div>
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{title}</p>
      <h4 className="text-3xl font-black text-white px-1 tracking-tighter">${value}</h4>
      <p className="text-[10px] text-gold font-bold mt-1 px-1 uppercase tracking-tighter">{subtext}</p>
    </Card>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-luxury-dark/40 p-2 rounded-2xl border border-luxury-border w-fit mx-auto lg:mx-0">
        {(['day', 'week', 'month'] as const).map(r => (
          <button key={r} onClick={() => setRange(r)} className={cn("px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", range === r ? "bg-gold text-black shadow-lg" : "text-gray-500 hover:text-white")}>
            {r === 'day' ? 'Hoy' : r === 'week' ? 'Semana' : 'Mes'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Ingresos Totales" value={totalRevenue} subtext={`${filteredSales.length} Ventas cerradas`} icon={<TrendingUp className="w-12 h-12" />} />
        <StatCard title="Ticket Promedio" value={avgTicket} subtext="Promedio por orden" icon={<ShoppingCart className="w-12 h-12" />} />
        <StatCard title="Proyección Est." value={(totalRevenue * 1.1).toFixed(0)} subtext="+10% crecimiento est." icon={<TrendingUp className="w-12 h-12" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-8 flex items-center gap-3"><Layers className="w-4 h-4 text-gold" /> Distribución de Ventas</h3>
          <div className="space-y-6">
             <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase"><span className="text-gray-400">Helados Gourmet</span><span className="text-gold">75%</span></div>
                <div className="h-2 bg-luxury-black rounded-full overflow-hidden border border-luxury-border"><div className="h-full bg-gold w-3/4 shadow-[0_0_10px_rgba(212,175,55,0.4)]" /></div>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase"><span className="text-gray-400">Cafetería & Extras</span><span className="text-gold">25%</span></div>
                <div className="h-2 bg-luxury-black rounded-full overflow-hidden border border-luxury-border"><div className="h-full bg-gold w-1/4" /></div>
             </div>
          </div>
        </Card>
        <Card>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-8 flex items-center gap-3"><Calendar className="w-4 h-4 text-gold" /> Ventas Recientes</h3>
          <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredSales.slice(0, 5).map(s => (
              <div key={s.id} className="flex justify-between items-center p-3 rounded-lg bg-luxury-black/30 border border-luxury-border/50">
                <div>
                  <p className="text-xs font-bold text-white uppercase">{new Date(s.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  <p className="text-[10px] text-gray-500 uppercase">{s.user}</p>
                </div>
                <span className="font-mono text-sm text-gold">${s.total}</span>
              </div>
            ))}
            {filteredSales.length === 0 && <p className="text-center text-xs text-gray-600 py-8 italic uppercase tracking-widest">No hay registros en este periodo</p>}
          </div>
        </Card>
      </div>
    </div>
  );
};

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'gold', isSelected?: boolean }>(
  ({ className, variant = 'primary', isSelected, ...props }, ref) => {
    const variants = {
      primary: 'bg-luxury-gray text-white hover:bg-luxury-border border border-luxury-border',
      secondary: 'bg-luxury-dark text-gray-400 hover:text-gold hover:border-gold border border-luxury-border',
      outline: 'border border-gold text-gold hover:bg-gold hover:text-black',
      danger: 'bg-red-900/20 text-red-500 border border-red-900/50 hover:bg-red-900/40',
      gold: 'bg-gold text-black hover:bg-gold-light font-bold',
    };

    return (
      <button ref={ref} className={cn('px-4 py-2 rounded-lg font-medium transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed', variants[variant], isSelected && 'custom-ring shadow-[0_0_15px_rgba(212,175,55,0.3)]', className)} {...props} />
    );
  }
);

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn('bg-luxury-dark rounded-xl shadow-2xl border border-luxury-border p-6', className)}>{children}</div>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={cn("w-full px-4 py-2 bg-luxury-black border border-luxury-border rounded-lg focus:outline-none focus:border-gold text-white transition-colors", props.className)} />
);

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select {...props} className={cn("w-full px-4 py-2 bg-luxury-black border border-luxury-border rounded-lg focus:outline-none focus:border-gold text-white appearance-none cursor-pointer", props.className)} />
);

// --- Sub-Views (Moved outside to fix focus bug) ---

const LoginView = ({ loginData, setLoginData, handleLogin, error }: any) => (
  <div className="min-h-screen flex items-center justify-center bg-luxury-black p-4 relative overflow-hidden">
    <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/10 blur-[120px] rounded-full" />
    <Card className="w-full max-w-md border-gold/20 relative z-10 backdrop-blur-xl bg-luxury-dark/80">
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
          <IceCream className="w-10 h-10 text-black" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tighter text-white mb-2">CHOCORLATTE</h1>
        <p className="text-gold font-medium tracking-widest uppercase text-xs">Luxury Gelato & Coffee</p>
      </div>
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Usuario</label>
          <Input type="text" placeholder="admin" value={loginData.username} onChange={e => setLoginData({...loginData, username: e.target.value})} />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Contraseña</label>
          <Input type="password" placeholder="••••••" value={loginData.password} onChange={e => setLoginData({...loginData, password: e.target.value})} />
        </div>
        {error && <p className="text-red-500 text-xs font-medium text-center">{error}</p>}
        <Button variant="gold" type="submit" className="w-full h-14 mt-4 shadow-lg shadow-gold/20">ENTRAR AL SISTEMA</Button>
      </form>
    </Card>
  </div>
);

const POSView = ({ formats, flavors, products, selectedFormat, setSelectedFormat, selectedFlavors, handleFlavorSelect, addToCart, cart, setCart, finalizeSale, total }: any) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-10rem)]">
    <div className="lg:col-span-3 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
      <div>
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Formatos de Helado</h2>
        <div className="grid grid-cols-1 gap-3">
          {formats.map((f: Format) => (
            <Button key={f.id} variant="secondary" isSelected={selectedFormat?.id === f.id} onClick={() => setSelectedFormat(f)} className="h-20 justify-between px-4 text-left">
              <div>
                <div className="font-bold text-white uppercase text-sm tracking-tight">{f.name}</div>
                <div className="text-xs text-gold">Hasta {f.maxFlavors} sabores</div>
              </div>
              <span className="font-mono text-gold-light">${f.price}</span>
            </Button>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Productos en Stock</h2>
        <div className="grid grid-cols-1 gap-2">
          {products.map((p: Product) => (
            <button key={p.id} disabled={p.stock <= 0} onClick={() => addToCart(p)} className="group flex justify-between items-center p-3 rounded-lg border border-luxury-border hover:border-gold/50 transition-all bg-luxury-black/50 disabled:opacity-20">
              <div className="text-left">
                <p className="text-sm font-medium group-hover:text-gold transition-colors">{p.name}</p>
                <p className="text-[10px] text-gray-500 uppercase">{p.category} | Stock: {p.stock}</p>
              </div>
              <span className="text-xs font-bold text-gold">${p.price}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
    <div className="lg:col-span-5 bg-luxury-dark/40 border border-luxury-border p-6 rounded-2xl flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2"><IceCream className="w-5 h-5 text-gold" /> Sabores</h2>
          {selectedFormat && <p className="text-xs text-gold mt-1">Seleccionados: {selectedFlavors.length} / {selectedFormat.maxFlavors}</p>}
        </div>
        {!selectedFormat && <span className="text-[10px] bg-gold/10 text-gold border border-gold/20 px-3 py-1 rounded-full uppercase tracking-widest font-bold">Seleccione Formato</span>}
      </div>
      <div className="grid grid-cols-2 gap-3 overflow-y-auto flex-1 pr-2 custom-scrollbar">
        {flavors.map((s: Flavor) => {
          const isOutOfStock = s.stockPercentage === 0;
          return <Button key={s.id} variant="secondary" disabled={!selectedFormat || isOutOfStock} isSelected={selectedFlavors.includes(s.name)} onClick={() => handleFlavorSelect(s.name)} className={cn("h-16 text-[10px] font-bold uppercase tracking-tighter px-3 text-center", isOutOfStock ? "opacity-10 grayscale" : "hover:scale-[1.02]")}>{s.name}</Button>
        })}
      </div>
      <div className="mt-6 pt-6 border-t border-luxury-border">
        <Button variant="gold" className="w-full h-14" disabled={!selectedFormat || selectedFlavors.length === 0} onClick={() => addToCart()}>AGREGAR A LA COMANDA</Button>
      </div>
    </div>
    <div className="lg:col-span-4 flex flex-col h-full overflow-hidden">
      <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Orden Actual</h2>
      <Card className="flex-1 flex flex-col p-5 overflow-hidden border-gold/10">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {cart.length === 0 ? <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-4 opacity-50"><ShoppingCart className="w-12 h-12" /><p className="text-sm font-medium uppercase tracking-widest">Carrito Vacío</p></div> : cart.map((item: any) => (
            <div key={item.id} className="border-b border-luxury-border/50 pb-4 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white uppercase">{item.product ? item.product.name : item.format?.name}</h4>
                  {item.flavors && <p className="text-[10px] text-gold/80 italic mt-1">{item.flavors.join(' • ')}</p>}
                </div>
                <span className="font-mono text-sm text-gold">${item.price * item.quantity}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 bg-luxury-black/80 rounded-full px-3 py-1 border border-luxury-border">
                  <button onClick={() => setCart(cart.map((c: any) => c.id === item.id ? {...c, quantity: Math.max(1, c.quantity - 1)} : c))} className="text-gold hover:text-white"><Minus className="w-3 h-3"/></button>
                  <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                  <button onClick={() => setCart(cart.map((c: any) => c.id === item.id ? {...c, quantity: c.quantity + 1} : c))} className="text-gold hover:text-white"><Plus className="w-3 h-3"/></button>
                </div>
                <button onClick={() => setCart(cart.filter((c: any) => c.id !== item.id))} className="text-red-500/50 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-luxury-border mt-auto">
          <div className="flex justify-between items-center mb-6 px-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total</span>
            <span className="text-3xl font-black text-white tracking-tighter">${total}</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <Button variant="outline" className="h-14" onClick={() => alert('Excel Exportado')}><Download className="w-5 h-5" /></Button>
            <Button variant="gold" className="col-span-3 h-14" onClick={finalizeSale} disabled={cart.length === 0}>PROCESAR PAGO</Button>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const InventoryView = ({ flavors, setFlavors, location }: any) => {
  const [newFlavor, setNewFlavor] = useState({ name: '', stock: 100 });
  
  const handleCreateFlavor = (e: any) => {
    e.preventDefault();
    if (!newFlavor.name) return;
    setFlavors([{ id: Date.now().toString(), name: newFlavor.name, stockPercentage: newFlavor.stock }, ...flavors]);
    setNewFlavor({ name: '', stock: 100 });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-gold">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-gold">Crear Nuevo Sabor Gourmet</h3>
          <form className="space-y-4" onSubmit={handleCreateFlavor}>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase px-1">Nombre del Sabor</label>
              <Input placeholder="Ej: Crema de Avellanas Trufada" value={newFlavor.name} onChange={e => setNewFlavor({...newFlavor, name: e.target.value})} />
            </div>
            <div className="flex gap-3">
              <div className="flex-1 space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase px-1">Stock Inicial (%)</label>
                <Input type="number" value={newFlavor.stock} onChange={e => setNewFlavor({...newFlavor, stock: parseInt(e.target.value)})} />
              </div>
              <Button variant="gold" type="submit" className="self-end h-11"><PlusCircle className="w-4 h-4" /> CREAR</Button>
            </div>
          </form>
        </Card>
        <Card>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-400">Notificaciones Críticas</h3>
          <div className="space-y-3">
            {flavors.filter((f: any) => f.stockPercentage < 20).map((f: any) => (
              <div key={f.id} className="flex justify-between items-center p-3 bg-red-950/20 border border-red-900/30 rounded-lg">
                <div className="flex items-center gap-3 text-red-500"><AlertTriangle className="w-4 h-4" /><span className="text-xs font-bold uppercase">{f.name}</span></div>
                <span className="text-[10px] bg-red-500 text-white px-2 py-1 rounded font-black">{f.stockPercentage}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card>
        <div className="flex justify-between items-center mb-8"><h3 className="text-lg font-bold">Monitoreo de Stock</h3><span className="text-[10px] text-gray-500 uppercase px-3 py-1 border border-luxury-border rounded-full">{location}</span></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {flavors.map((f: any) => (
            <div key={f.id} className="space-y-2">
              <span className="text-[10px] font-black uppercase text-gray-400 truncate block">{f.name}</span>
              <div className="h-1.5 bg-luxury-black rounded-full overflow-hidden border border-luxury-border">
                <div className={cn("h-full transition-all duration-1000", f.stockPercentage > 50 ? 'bg-green-500' : f.stockPercentage > 20 ? 'bg-gold' : 'bg-red-600')} style={{ width: `${f.stockPercentage}%` }} />
              </div>
              <span className="text-[10px] text-right block text-gold-light">{f.stockPercentage}%</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const ProductManagementView = ({ extraProducts, setExtraProducts }: any) => {
  const [newProd, setNewProd] = useState({ name: '', price: 0, category: 'Cafetería', stock: 10 });

  const handleAdd = (e: any) => {
    e.preventDefault();
    if (!newProd.name) return;
    setExtraProducts([{ id: Date.now().toString(), ...newProd }, ...extraProducts]);
    setNewProd({ name: '', price: 0, category: 'Cafetería', stock: 10 });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Catálogo de Productos</h3>
          <div className="divide-y divide-luxury-border">
            {extraProducts.map((p: any) => (
              <div key={p.id} className="py-4 flex justify-between items-center">
                <div><h4 className="font-bold text-white text-sm">{p.name}</h4><span className="text-[10px] text-gold uppercase font-bold">{p.category} | Stock: {p.stock}</span></div>
                <div className="flex items-center gap-6"><span className="font-mono text-white">${p.price}</span><button onClick={() => setExtraProducts(extraProducts.filter((x: any) => x.id !== p.id))} className="text-red-500/30 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card>
        <h3 className="text-sm font-bold uppercase tracking-widest text-gold mb-6">Alta de Producto</h3>
        <form className="space-y-4" onSubmit={handleAdd}>
          <Input placeholder="Nombre" value={newProd.name} onChange={e => setNewProd({...newProd, name: e.target.value})} />
          <Select value={newProd.category} onChange={e => setNewProd({...newProd, category: e.target.value})}>
            <option value="Cafetería">Cafetería</option><option value="Pastelería">Pastelería</option><option value="Bebidas">Bebidas</option>
          </Select>
          <Input type="number" placeholder="Precio ($)" value={newProd.price || ''} onChange={e => setNewProd({...newProd, price: parseInt(e.target.value)})} />
          <Input type="number" placeholder="Stock Inicial" value={newProd.stock || ''} onChange={e => setNewProd({...newProd, stock: parseInt(e.target.value)})} />
          <Button variant="gold" type="submit" className="w-full">REGISTRAR EN VENTAS</Button>
        </form>
      </Card>
    </div>
  );
};

const UsersView = ({ users, setUsers }: any) => {
  const [newUser, setNewUser] = useState({ name: '', username: '', password: '', role: 'EMPLEADO' });

  const handleAddUser = (e: any) => {
    e.preventDefault();
    if (!newUser.name || !newUser.username) return;
    setUsers([...users, { id: Date.now().toString(), ...newUser }]);
    setNewUser({ name: '', username: '', password: '', role: 'EMPLEADO' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Staff Registrado</h3>
          <div className="grid grid-cols-1 gap-4">
            {users.map((u: any) => (
              <div key={u.id} className="p-4 rounded-xl border border-luxury-border flex justify-between items-center group hover:border-gold/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-black text-sm">{u.name[0]}</div>
                  <div><p className="text-sm font-bold">{u.name}</p><p className="text-[10px] text-gray-500 uppercase tracking-widest">{u.username}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cn("text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest", u.role === 'ADMIN' ? "bg-gold text-black" : "bg-luxury-gray text-gold border border-luxury-border")}>{u.role}</span>
                  <button onClick={() => setUsers(users.filter((x: any) => x.id !== u.id))} className="p-2 text-red-500/20 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card>
        <h3 className="text-sm font-bold uppercase tracking-widest text-gold mb-6">Nuevo Acceso</h3>
        <form className="space-y-4" onSubmit={handleAddUser}>
          <Input placeholder="Nombre Completo" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} />
          <Input placeholder="Usuario POS" value={newUser.username} onChange={e => setNewUser({...newUser, username: e.target.value})} />
          <Input type="password" placeholder="Contraseña" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} />
          <Select value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})}>
            <option value="ADMIN">ADMINISTRADOR</option><option value="EMPLEADO">EMPLEADO</option>
          </Select>
          <Button variant="gold" type="submit" className="w-full">CREAR PERFIL</Button>
        </form>
      </Card>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'pos' | 'inventory' | 'products' | 'users' | 'reports'>('pos');
  const [location, setLocation] = useState<Location>('Local A');
  const [flavors, setFlavors] = useState<Flavor[]>(MOCK_FLAVORS);
  const [extraProducts, setExtraProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [sales, setSales] = useState<Sale[]>(MOCK_SALES as any);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<Format | null>(null);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = MOCK_USERS.find(u => u.username === loginData.username && u.password === loginData.password);
    if (found) { setUser(found); setLoginError(''); } else { setLoginError('Error de acceso'); }
  };

  const handleFlavorSelect = (name: string) => {
    if (!selectedFormat) return;
    if (selectedFlavors.includes(name)) setSelectedFlavors(selectedFlavors.filter(f => f !== name));
    else if (selectedFlavors.length < selectedFormat.maxFlavors) setSelectedFlavors([...selectedFlavors, name]);
  };

  const addToCart = (product?: Product) => {
    const newItem = product ? { id: Math.random().toString(36).substring(7), product, quantity: 1, price: product.price } : { id: Math.random().toString(36).substring(7), format: selectedFormat, flavors: [...selectedFlavors], quantity: 1, price: selectedFormat!.price };
    setCart([...cart, newItem as any]);
    if (!product) { setSelectedFormat(null); setSelectedFlavors([]); }
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const finalizeSale = () => {
    const newSale = { id: Date.now().toString(), total, timestamp: new Date().toISOString(), user: user!.name, location, items: [...cart] };
    setSales([newSale as any, ...sales]);
    setCart([]);
    alert('Venta procesada con éxito');
  };

  if (!user) return <LoginView loginData={loginData} setLoginData={setLoginData} handleLogin={handleLogin} error={loginError} />;

  return (
    <div className="min-h-screen flex bg-luxury-black text-white font-sans overflow-hidden">
      <aside className="w-20 md:w-72 bg-luxury-dark flex flex-col p-6 border-r border-luxury-border">
        <div className="flex items-center gap-4 mb-16 px-1">
          <div className="bg-gold p-2.5 rounded-2xl shadow-lg"><IceCream className="w-7 h-7 text-black" /></div>
          <div className="hidden md:block"><h1 className="font-extrabold text-2xl tracking-tighter">CHOCORLATTE</h1><span className="text-[10px] text-gold font-bold uppercase tracking-widest">Luxury POS</span></div>
        </div>
        <nav className="flex-1 space-y-2">
          <NavItem active={view === 'pos'} onClick={() => setView('pos')} icon={<ShoppingCart />} label="Terminal de Ventas" />
          {user.role === 'ADMIN' && (
            <>
              <NavItem active={view === 'inventory'} onClick={() => setView('inventory')} icon={<BarChart2 />} label="Gestión de Sabores" />
              <NavItem active={view === 'products'} onClick={() => setView('products')} icon={<Package />} label="Catálogo & Stock" />
              <NavItem active={view === 'reports'} onClick={() => setView('reports')} icon={<TrendingUp />} label="Análisis & Reportes" />
              <NavItem active={view === 'users'} onClick={() => setView('users')} icon={<Users />} label="Staff" />
            </>
          )}
        </nav>
        <button onClick={() => setUser(null)} className="flex items-center gap-4 p-4 text-red-500/60 hover:text-red-500 uppercase text-[10px] font-black"><LogOut className="w-6 h-6" /><span className="hidden md:block">Cerrar Sesión</span></button>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div><div className="flex items-center gap-3 mb-1"><Store className="w-4 h-4 text-gold" /><span className="text-xl font-bold cursor-pointer hover:text-gold" onClick={() => setLocation(location === 'Local A' ? 'Local B' : 'Local A')}>{location}</span></div><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{new Intl.DateTimeFormat('es-AR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())}</p></div>
          <button onClick={() => setView('reports')} className="px-6 py-3 bg-luxury-gray hover:bg-gold hover:text-black rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3"><FileText className="w-4 h-4" /> Ver Reportes Detallados</button>
        </header>

        {view === 'pos' && <POSView formats={MOCK_FORMATS} flavors={flavors} products={extraProducts} selectedFormat={selectedFormat} setSelectedFormat={setSelectedFormat} selectedFlavors={selectedFlavors} handleFlavorSelect={handleFlavorSelect} addToCart={addToCart} cart={cart} setCart={setCart} finalizeSale={finalizeSale} total={total} />}
        {view === 'inventory' && <InventoryView flavors={flavors} setFlavors={setFlavors} location={location} />}
        {view === 'products' && <ProductManagementView extraProducts={extraProducts} setExtraProducts={setExtraProducts} />}
        {view === 'users' && <UsersView users={users} setUsers={setUsers} />}
        {view === 'reports' && <ReportsView sales={sales} location={location} />}
      </main>
    </div>
  );
}

function NavItem({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={cn("w-full flex items-center gap-4 p-4 rounded-2xl transition-all", active ? "bg-gold text-black shadow-lg shadow-gold/20" : "text-gray-500 hover:text-white hover:bg-white/5")}>
      {icon} <span className="text-xs font-black uppercase tracking-widest hidden md:block">{label}</span>
    </button>
  );
}
