import { useState } from "react";
import { Users, Shield, Database, Bell, Activity } from "lucide-react";
import Toast from "../components/Toast";

const TABS = [
  { id: 'roles', name: '角色管理', icon: Users },
  { id: 'menus', name: '菜单权限', icon: Shield },
  { id: 'data', name: '数据权限', icon: Database },
  { id: 'notifications', name: '消息通知', icon: Bell },
  { id: 'logs', name: '操作日志', icon: Activity },
];

export default function Setting() {
  const [activeTab, setActiveTab] = useState('roles');
  const [toast, setToast] = useState<{ message: string, type: "success" | "error" } | null>(null);

  const handleSave = () => {
    setToast({ message: "设置已保存", type: "success" });
  };

  return (
    <div className="space-y-6 relative">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <h1 className="text-2xl font-bold text-gray-900">系统设置与权限</h1>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex min-h-[600px]">
        {/* Left Sidebar */}
        <div className="w-64 border-r border-gray-200 bg-gray-50 p-4">
          <nav className="space-y-1">
            {TABS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Content */}
        <div className="flex-1 p-6">
          {activeTab === 'roles' && (
            <div className="animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">角色管理</h2>
                <button onClick={() => setToast({ message: "打开新增角色弹窗...", type: "success" })} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  新增角色
                </button>
              </div>

              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 font-medium">角色名称</th>
                    <th className="px-6 py-3 font-medium">描述</th>
                    <th className="px-6 py-3 font-medium">关联用户数</th>
                    <th className="px-6 py-3 font-medium">状态</th>
                    <th className="px-6 py-3 font-medium text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { name: '超级管理员', desc: '系统最高权限，拥有所有模块访问权', users: 2, status: 'active' },
                    { name: '运营专员', desc: '负责商品刊登、订单审核', users: 8, status: 'active' },
                    { name: '仓储管理员', desc: '负责库存盘点、出入库操作', users: 5, status: 'active' },
                    { name: '财务专员', desc: '负责利润核算、对账', users: 3, status: 'active' },
                  ].map((role, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{role.name}</td>
                      <td className="px-6 py-4 text-gray-500">{role.desc}</td>
                      <td className="px-6 py-4">{role.users}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">启用</span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-3">
                        <button onClick={() => setToast({ message: `编辑角色: ${role.name}`, type: "success" })} className="text-blue-600 hover:text-blue-800 font-medium">编辑权限</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'menus' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">菜单权限配置</h2>
              <div className="space-y-4 max-w-md">
                {['首页概览', '店铺管理', '商品管理', '订单履约', '库存仓储', '系统设置'].map((menu, i) => (
                  <label key={i} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
                    <span className="text-sm font-medium text-gray-700">{menu}</span>
                  </label>
                ))}
                <div className="pt-4">
                  <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    保存配置
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 animate-in fade-in duration-300">
              <Database className="w-12 h-12 text-gray-300 mb-4" />
              <p>数据权限配置正在开发中...</p>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">消息通知设置</h2>
              <div className="space-y-4 max-w-md">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">新订单提醒</p>
                    <p className="text-sm text-gray-500 mt-1">当有新订单同步时发送通知</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">库存预警</p>
                    <p className="text-sm text-gray-500 mt-1">当商品库存低于安全阈值时提醒</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 animate-in fade-in duration-300">
              <Activity className="w-12 h-12 text-gray-300 mb-4" />
              <p>操作日志记录正在开发中...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
