import { Search, Filter, DollarSign, TrendingUp, Download, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function Finance() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">财务利润中心</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Download className="w-4 h-4" />
            导出报表
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: '总销售额', value: '$45,231.89', trend: '+20.1%', positive: true },
          { title: '商品总成本', value: '$12,450.00', trend: '+15.2%', positive: false },
          { title: '预估净利润', value: '$21,340.50', trend: '+24.5%', positive: true },
          { title: '平均毛利率', value: '47.2%', trend: '+2.1%', positive: true },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <div className={`flex items-center text-sm font-medium ${stat.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.positive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200 px-4">
          {['订单成本明细', '店铺对账', 'VAT/税费统计'].map((tab, i) => (
            <button key={tab} className={`px-4 py-3 text-sm font-medium border-b-2 ${i === 0 ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="p-4 border-b border-gray-200 flex flex-wrap gap-4 bg-gray-50">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="搜索订单号..." className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
          </div>
        </div>
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-medium">订单号</th>
              <th className="px-6 py-3 font-medium">销售额</th>
              <th className="px-6 py-3 font-medium">商品成本</th>
              <th className="px-6 py-3 font-medium">物流费用</th>
              <th className="px-6 py-3 font-medium">平台费用</th>
              <th className="px-6 py-3 font-medium">净利润</th>
              <th className="px-6 py-3 font-medium">毛利率</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[1, 2, 3].map((i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-blue-600 hover:underline cursor-pointer">#US-100{i}4</td>
                <td className="px-6 py-4 text-gray-900">$348.00</td>
                <td className="px-6 py-4 text-red-600">-$120.00</td>
                <td className="px-6 py-4 text-red-600">-$25.00</td>
                <td className="px-6 py-4 text-red-600">-$10.44</td>
                <td className="px-6 py-4 font-medium text-emerald-600">$192.56</td>
                <td className="px-6 py-4">55.3%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
