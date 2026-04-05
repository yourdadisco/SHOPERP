import { useState } from "react";
import { Search, Filter, Download, Plus } from "lucide-react";
import Toast from "../components/Toast";
import Modal from "../components/Modal";

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Wireless Noise Cancelling Headphones', sku: 'WH-1000XM4-BLK', price: '$348.00', stock: 124, shop: 'Shopify US', status: '上架中' },
  { id: 2, name: 'Mechanical Gaming Keyboard', sku: 'K70-RGB-PRO', price: '$159.99', stock: 45, shop: 'Shopify US', status: '上架中' },
  { id: 3, name: 'Ergonomic Office Chair', sku: 'ERGO-CHAIR-01', price: '$299.00', stock: 5, shop: 'Shopify UK', status: '库存预警' },
  { id: 4, name: '4K Ultra HD Monitor', sku: 'MON-27-4K', price: '$450.00', stock: 0, shop: 'Shopify AU', status: '已下架' },
];

export default function Product() {
  const [selected, setSelected] = useState<number[]>([]);
  const [toast, setToast] = useState<{ message: string, type: "success" | "error" } | null>(null);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const toggleSelectAll = () => {
    if (selected.length === products.length) {
      setSelected([]);
    } else {
      setSelected(products.map(p => p.id));
    }
  };

  const toggleSelect = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(itemId => itemId !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleAction = (action: string) => {
    if (action === 'sync') {
      setToast({ message: "正在同步商品数据...", type: "success" });
    } else if (action === 'export') {
      setToast({ message: "商品数据导出中...", type: "success" });
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newProduct = {
      id: Date.now(),
      name: formData.get("name") as string,
      sku: formData.get("sku") as string,
      price: `$${formData.get("price")}`,
      stock: parseInt(formData.get("stock") as string, 10),
      shop: 'Shopify US',
      status: '上架中'
    };
    setProducts([newProduct, ...products]);
    setIsAddModalOpen(false);
    setToast({ message: "商品创建成功！", type: "success" });
  };

  return (
    <div className="space-y-6 relative">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">商品管理</h1>
        <div className="flex gap-3">
          <button onClick={() => handleAction('export')} className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Download className="w-4 h-4" />
            导入/导出
          </button>
          <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" />
            新建商品
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-wrap gap-4 bg-gray-50">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="搜索 SKU、商品名称..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
          <select className="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg text-sm outline-none">
            <option>全部店铺</option>
            <option>Shopify US</option>
          </select>
          <select className="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg text-sm outline-none">
            <option>状态: 全部</option>
            <option>上架中</option>
            <option>已下架</option>
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
                  checked={products.length > 0 && selected.length === products.length}
                  onChange={toggleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                />
              </th>
              <th className="px-6 py-3 font-medium">商品信息</th>
              <th className="px-6 py-3 font-medium">SKU</th>
              <th className="px-6 py-3 font-medium">售价</th>
              <th className="px-6 py-3 font-medium">可用库存</th>
              <th className="px-6 py-3 font-medium">所属店铺</th>
              <th className="px-6 py-3 font-medium">状态</th>
              <th className="px-6 py-3 font-medium text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className={`hover:bg-gray-50 transition-colors ${selected.includes(product.id) ? 'bg-blue-50/50' : ''}`}>
                <td className="px-6 py-4">
                  <input 
                    type="checkbox" 
                    checked={selected.includes(product.id)}
                    onChange={() => toggleSelect(product.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-md flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-gray-900 line-clamp-1" title={product.name}>{product.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Color: Default</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-xs">{product.sku}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{product.price}</td>
                <td className="px-6 py-4">
                  <span className={product.stock <= 5 ? "text-red-600 font-medium" : ""}>{product.stock}</span>
                </td>
                <td className="px-6 py-4">{product.shop}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    product.status === '上架中' ? 'bg-emerald-100 text-emerald-800' :
                    product.status === '已下架' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button onClick={() => setToast({ message: `编辑商品: ${product.sku}`, type: "success" })} className="text-blue-600 hover:text-blue-800 font-medium">编辑</button>
                  <button onClick={() => handleAction('sync')} className="text-gray-500 hover:text-gray-700 font-medium">同步</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500 bg-gray-50">
          <div>已选择 {selected.length} 项</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded bg-white disabled:opacity-50">上一页</button>
            <button className="px-3 py-1 border border-gray-300 rounded bg-white">下一页</button>
          </div>
        </div>
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="新建商品">
        <form onSubmit={handleAddProduct} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">商品名称</label>
            <input required name="name" type="text" placeholder="输入商品名称" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
            <input required name="sku" type="text" placeholder="输入商品 SKU" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">售价 (USD)</label>
              <input required name="price" type="number" step="0.01" placeholder="0.00" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">初始库存</label>
              <input required name="stock" type="number" placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              取消
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              保存商品
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
