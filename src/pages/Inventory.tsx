import { Search, Filter, ArrowRightLeft, ClipboardCheck } from "lucide-react";

export default function Inventory() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">库存仓储中心</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <ArrowRightLeft className="w-4 h-4" />
            库存调拨
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <ClipboardCheck className="w-4 h-4" />
            新建盘点
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200 px-4">
          {['总库存', '库存明细', '入库记录', '出库记录', '多仓管理'].map((tab, i) => (
            <button key={tab} className={`px-4 py-3 text-sm font-medium border-b-2 ${i === 0 ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="p-4 border-b border-gray-200 flex flex-wrap gap-4 bg-gray-50">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="搜索 SKU、商品名称..." className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
          </div>
          <select className="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg text-sm outline-none">
            <option>全部仓库</option>
            <option>美西一仓</option>
            <option>欧洲中心仓</option>
          </select>
        </div>
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-medium">SKU / 商品</th>
              <th className="px-6 py-3 font-medium">仓库</th>
              <th className="px-6 py-3 font-medium">可用库存</th>
              <th className="px-6 py-3 font-medium">占用库存</th>
              <th className="px-6 py-3 font-medium">在途库存</th>
              <th className="px-6 py-3 font-medium">库位</th>
              <th className="px-6 py-3 font-medium text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[1, 2, 3].map((i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-mono text-xs font-medium text-gray-900">WH-1000XM4-BLK</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">Wireless Noise Cancelling Headphones</p>
                </td>
                <td className="px-6 py-4">美西一仓</td>
                <td className="px-6 py-4 font-medium text-emerald-600">1,245</td>
                <td className="px-6 py-4 text-amber-600">342</td>
                <td className="px-6 py-4 text-blue-600">500</td>
                <td className="px-6 py-4 text-gray-500">A-12-0{i}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">明细</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
