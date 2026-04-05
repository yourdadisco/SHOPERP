import { useState } from "react";
import { Search, Filter, Printer, Truck } from "lucide-react";
import Toast from "../components/Toast";

const TABS = ['全部订单', '待审核', '待发货', '已发货', '已完成', '异常订单'];

const INITIAL_ORDERS = [
  { id: 1, orderNo: '#US-10014', time: '2026-04-05 10:23', shop: 'Shopify US', buyer: 'John Doe', location: 'US, California', product: 'Wireless Noise Cancelling...', qty: 1, amount: '$348.00', warehouse: 'US West Warehouse', logistics: 'USPS Priority', status: '待发货' },
  { id: 2, orderNo: '#UK-20089', time: '2026-04-05 09:15', shop: 'Shopify UK', buyer: 'Emma Smith', location: 'UK, London', product: 'Mechanical Keyboard Pro', qty: 2, amount: '$258.00', warehouse: 'UK Central Warehouse', logistics: 'Royal Mail', status: '待审核' },
  { id: 3, orderNo: '#US-10012', time: '2026-04-04 16:40', shop: 'Shopify US', buyer: 'Michael Johnson', location: 'US, New York', product: 'Ergonomic Mouse', qty: 1, amount: '$89.00', warehouse: 'US East Warehouse', logistics: 'FedEx Ground', status: '已发货' },
];

export default function Order() {
  const [activeTab, setActiveTab] = useState('全部订单');
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const [toast, setToast] = useState<{ message: string, type: "success" | "error" } | null>(null);
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  const filteredOrders = activeTab === '全部订单' ? orders : orders.filter(o => o.status === activeTab);

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(o => o.id));
    }
  };

  const toggleSelect = (id: number) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter(orderId => orderId !== id));
    } else {
      setSelectedOrders([...selectedOrders, id]);
    }
  };

  const handleBatchAction = (action: string) => {
    if (selectedOrders.length === 0) {
      setToast({ message: "请先选择订单", type: "error" });
      return;
    }
    
    if (action === 'ship') {
      setOrders(orders.map(o => selectedOrders.includes(o.id) ? { ...o, status: '已发货' } : o));
      setToast({ message: `成功发货 ${selectedOrders.length} 个订单！`, type: "success" });
    } else if (action === 'print') {
      setToast({ message: `正在打印 ${selectedOrders.length} 个订单面单...`, type: "success" });
    }
    setSelectedOrders([]);
  };

  return (
    <div className="space-y-6 relative">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">订单履约</h1>
        <div className="flex gap-3">
          <button onClick={() => handleBatchAction('print')} className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Printer className="w-4 h-4" />
            批量打单
          </button>
          <button onClick={() => handleBatchAction('ship')} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Truck className="w-4 h-4" />
            批量发货
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-4 overflow-x-auto">
          {TABS.map((tab) => {
            const count = orders.filter(o => o.status === tab).length;
            return (
              <button 
                key={tab} 
                onClick={() => { setActiveTab(tab); setSelectedOrders([]); }}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab} {tab !== '全部订单' && count > 0 && <span className={`ml-1 py-0.5 px-2 rounded-full text-xs ${activeTab === tab ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{count}</span>}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-b border-gray-200 flex flex-wrap gap-4 bg-gray-50">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="搜索订单号、买家姓名、邮箱..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
          <select className="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg text-sm outline-none">
            <option>下单时间: 近7天</option>
            <option>近30天</option>
          </select>
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium">
            <Filter className="w-4 h-4" />
            更多筛选
          </button>
        </div>
        
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-medium w-12">
                <input 
                  type="checkbox" 
                  checked={filteredOrders.length > 0 && selectedOrders.length === filteredOrders.length}
                  onChange={toggleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                />
              </th>
              <th className="px-6 py-3 font-medium">订单号/时间</th>
              <th className="px-6 py-3 font-medium">买家信息</th>
              <th className="px-6 py-3 font-medium">商品明细</th>
              <th className="px-6 py-3 font-medium">实付金额</th>
              <th className="px-6 py-3 font-medium">物流/仓库</th>
              <th className="px-6 py-3 font-medium">状态</th>
              <th className="px-6 py-3 font-medium text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                  暂无订单数据
                </td>
              </tr>
            ) : filteredOrders.map((order) => (
              <tr key={order.id} className={`hover:bg-gray-50 transition-colors ${selectedOrders.includes(order.id) ? 'bg-blue-50/50' : ''}`}>
                <td className="px-6 py-4 align-top">
                  <input 
                    type="checkbox" 
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => toggleSelect(order.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1" 
                  />
                </td>
                <td className="px-6 py-4 align-top">
                  <p className="font-medium text-blue-600 cursor-pointer hover:underline">{order.orderNo}</p>
                  <p className="text-xs text-gray-500 mt-1">{order.time}</p>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded border border-gray-200">{order.shop}</span>
                </td>
                <td className="px-6 py-4 align-top">
                  <p className="font-medium text-gray-900">{order.buyer}</p>
                  <p className="text-xs text-gray-500 mt-1">{order.location}</p>
                </td>
                <td className="px-6 py-4 align-top">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded flex-shrink-0"></div>
                    <div>
                      <p className="text-gray-900 line-clamp-1" title={order.product}>{order.product}</p>
                      <p className="text-xs text-gray-500">x{order.qty}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 align-top font-medium text-gray-900">{order.amount}</td>
                <td className="px-6 py-4 align-top">
                  <p className="text-gray-900">{order.warehouse}</p>
                  <p className="text-xs text-gray-500 mt-1">{order.logistics}</p>
                </td>
                <td className="px-6 py-4 align-top">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    order.status === '待发货' ? 'bg-amber-100 text-amber-800' : 
                    order.status === '待审核' ? 'bg-purple-100 text-purple-800' :
                    order.status === '已发货' ? 'bg-blue-100 text-blue-800' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 align-top text-right space-x-3">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">详情</button>
                  {order.status === '待发货' && (
                    <button 
                      onClick={() => {
                        setOrders(orders.map(o => o.id === order.id ? { ...o, status: '已发货' } : o));
                        setToast({ message: "订单已发货", type: "success" });
                      }}
                      className="text-gray-500 hover:text-gray-700 font-medium"
                    >
                      发货
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
