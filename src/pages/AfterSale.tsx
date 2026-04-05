import { Search, Filter, MessageSquare, RefreshCcw } from "lucide-react";

export default function AfterSale() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">客服售后中心</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <MessageSquare className="w-4 h-4" />
            站内信集成
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200 px-4">
          {['售后订单', '退款管理', '退货入库'].map((tab, i) => (
            <button key={tab} className={`px-4 py-3 text-sm font-medium border-b-2 ${i === 0 ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="p-4 border-b border-gray-200 flex flex-wrap gap-4 bg-gray-50">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="搜索订单号、买家邮箱..." className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
          </div>
          <select className="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg text-sm outline-none">
            <option>售后类型: 全部</option>
            <option>仅退款</option>
            <option>退货退款</option>
            <option>补发</option>
          </select>
        </div>
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-medium">售后单号</th>
              <th className="px-6 py-3 font-medium">关联订单</th>
              <th className="px-6 py-3 font-medium">售后类型</th>
              <th className="px-6 py-3 font-medium">退款金额</th>
              <th className="px-6 py-3 font-medium">原因</th>
              <th className="px-6 py-3 font-medium">状态</th>
              <th className="px-6 py-3 font-medium text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[1, 2].map((i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">AS-2026040{i}</td>
                <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer">#US-100{i}4</td>
                <td className="px-6 py-4">退货退款</td>
                <td className="px-6 py-4 font-medium text-red-600">$45.00</td>
                <td className="px-6 py-4 text-gray-500">商品破损</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">处理中</span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">审核</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
