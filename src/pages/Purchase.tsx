import { Search, Filter, Plus, FileText } from "lucide-react";

export default function Purchase() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">采购供应链中心</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" />
            新建采购单
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200 px-4">
          {['采购单管理', '采购建议', '供应商管理', '在途跟踪'].map((tab, i) => (
            <button key={tab} className={`px-4 py-3 text-sm font-medium border-b-2 ${i === 0 ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="p-4 border-b border-gray-200 flex flex-wrap gap-4 bg-gray-50">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="搜索采购单号、供应商、SKU..." className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
          </div>
          <select className="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg text-sm outline-none">
            <option>状态: 全部</option>
            <option>待审批</option>
            <option>部分入库</option>
            <option>已完成</option>
          </select>
        </div>
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-medium">采购单号</th>
              <th className="px-6 py-3 font-medium">供应商</th>
              <th className="px-6 py-3 font-medium">SKU 种类/数量</th>
              <th className="px-6 py-3 font-medium">采购金额</th>
              <th className="px-6 py-3 font-medium">预计到货</th>
              <th className="px-6 py-3 font-medium">状态</th>
              <th className="px-6 py-3 font-medium text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[1, 2, 3].map((i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">PO-2026040{i}</td>
                <td className="px-6 py-4">深圳市某某科技有限公司</td>
                <td className="px-6 py-4">3 种 / 1,500 件</td>
                <td className="px-6 py-4 font-medium">¥ 45,000.00</td>
                <td className="px-6 py-4 text-gray-500">2026-04-1{i}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">在途</span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">详情</button>
                  <button className="text-gray-500 hover:text-gray-700 font-medium">入库</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
