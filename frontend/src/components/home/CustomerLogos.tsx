
import { InfiniteMarquee } from '../ui/InfiniteMarquee';
import { 
  ShoppingBag, 
  Store, 
  Warehouse, 
  ShoppingCart, 
  Package,
  Truck,
  Building2,
  Coffee,
  Shirt,
  Smartphone
} from 'lucide-react';

const customerLogos = [
  { Icon: ShoppingBag, name: 'RetailMax' },
  { Icon: Store, name: 'MegaMart' },
  { Icon: Warehouse, name: 'DistributeCo' },
  { Icon: ShoppingCart, name: 'ShopSmart' },
  { Icon: Package, name: 'PackageHub' },
  { Icon: Truck, name: 'LogiRetail' },
  { Icon: Building2, name: 'Enterprise Goods' },
  { Icon: Coffee, name: 'CaféChain' },
  { Icon: Shirt, name: 'FashionFirst' },
  { Icon: Smartphone, name: 'TechRetail' },
];

export function CustomerLogos() {
  return (
    <section className="py-16 bg-slate-900 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-slate-500 uppercase tracking-wider mb-8">
          Trusted by leading retailers worldwide
        </p>
        
        <InfiniteMarquee speed={30} pauseOnHover>
          {customerLogos.map(({ Icon, name }) => (
            <div
              key={name}
              className="flex items-center gap-3 mx-8 px-6 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800 transition-all duration-300 group cursor-pointer"
            >
              <Icon className="w-6 h-6 text-slate-500 group-hover:text-blue-400 transition-colors" />
              <span className="text-slate-400 font-medium group-hover:text-white transition-colors whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </InfiniteMarquee>

        <div className="mt-8 flex justify-center gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-blue-500' : 'bg-slate-700'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomerLogos;