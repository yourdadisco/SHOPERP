import { useState } from "react";
import { Plus, RefreshCw, MoreVertical } from "lucide-react";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

export default function Shop() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: "success" | "error" } | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [shops, setShops] = useState([
    { name: 'Shopify US Main', domain: 'us-main.myshopify.com', region: '北美', currency: 'USD', status: 'active', time: '10分钟前' },
    { name: 'Shopify UK Store', domain: 'uk-store.myshopify.com', region: '欧洲', currency: 'GBP', status: 'active', time: '1小时前' },
    { name: 'Shopify AU', domain: 'au-shop.myshopify.com', region: '亚太', currency: 'AUD', status: 'expired', time: '2天前' },
  ]);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setToast({ message: "同步成功！已拉取最新订单和商品。", type: "success" });
    }, 1500);
  };

  const handleAddShop = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newShop = {
      name: formData.get("name") as string,
      domain: formData.get("domain") as string,
      region: formData.get("region") as string,
      currency: 'USD',
      status: 'active',
      time: '刚刚'
    };
    setShops([newShop, ...shops]);
    setIsModalOpen(false);
    setToast({ message: "店铺授权成功！", type: "success" });
  };

  return (
    <div className="space-y-6 relative">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">店铺管理</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          添加授权
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div className="flex gap-4">
            <select className="bg-white border border-gray-300 text-gray-700 py-1.5 px-3 rounded-md text-sm outline-none">
              <option>全部状态</option>
              <option>已授权</option>
              <option>已过期</option>
            </select>
            <select className="bg-white border border-gray-300 text-gray-700 py-1.5 px-3 rounded-md text-sm outline-none">
              <option>全部区域</option>
              <option>北美</option>
              <option>欧洲</option>
            </select>
          </div>
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? '同步中...' : '手动同步'}
          </button>
        </div>
        
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-medium">店铺名称</th>
              <th className="px-6 py-3 font-medium">Shopify 域名</th>
              <th className="px-6 py-3 font-medium">区域</th>
              <th className="px-6 py-3 font-medium">货币</th>
              <th className="px-6 py-3 font-medium">状态</th>
              <th className="px-6 py-3 font-medium">最后同步时间</th>
              <th className="px-6 py-3 font-medium text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {shops.map((shop, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{shop.name}</td>
                <td className="px-6 py-4">{shop.domain}</td>
                <td className="px-6 py-4">{shop.region}</td>
                <td className="px-6 py-4">{shop.currency}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    shop.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {shop.status === 'active' ? '已授权' : '已过期'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{shop.time}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="添加 Shopify 店铺授权">
        <form onSubmit={handleAddShop} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">店铺名称</label>
            <input required name="name" type="text" placeholder="例如：Shopify US Main" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shopify 域名</label>
            <input required name="domain" type="text" placeholder="例如：my-store.myshopify.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">所属区域</label>
            <select name="region" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="北美">北美 (North America)</option>
              <option value="欧洲">欧洲 (Europe)</option>
              <option value="英国">英国 (UK)</option>
              <option value="亚太">亚太 (Asia Pacific)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Admin API Access Token</label>
            <input required type="password" placeholder="shpat_..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              取消
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              确认授权
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
