import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Store, 
  Package, 
  ShoppingCart, 
  Warehouse, 
  Truck, 
  Headset, 
  CircleDollarSign, 
  BarChart3, 
  Settings,
  ShoppingBag
} from "lucide-react";
import { cn } from "../lib/utils";

const navItems = [
  { name: "首页概览", path: "/", icon: LayoutDashboard },
  { name: "店铺管理", path: "/shop", icon: Store },
  { name: "商品管理", path: "/product", icon: Package },
  { name: "订单管理", path: "/order", icon: ShoppingCart },
  { name: "库存管理", path: "/inventory", icon: Warehouse },
  { name: "采购管理", path: "/purchase", icon: ShoppingBag },
  { name: "物流管理", path: "/logistics", icon: Truck },
  { name: "售后客服", path: "/after-sale", icon: Headset },
  { name: "财务利润", path: "/finance", icon: CircleDollarSign },
  { name: "数据报表", path: "/report", icon: BarChart3 },
  { name: "系统设置", path: "/setting", icon: Settings },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-white font-bold text-xl">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Store className="w-5 h-5 text-white" />
          </div>
          <span>ShopERP Pro</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
                    isActive 
                      ? "bg-blue-600 text-white" 
                      : "hover:bg-slate-800 hover:text-white"
                  )
                }
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
