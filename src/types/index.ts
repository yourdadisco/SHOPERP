// 核心数据模型 (Core Data Models)

export interface Shop {
  id: string;
  name: string;
  domain: string;
  region: 'North America' | 'Europe' | 'UK' | 'Asia Pacific';
  currency: string;
  taxMode: 'inclusive' | 'exclusive';
  status: 'active' | 'expired' | 'disconnected';
  syncEnabled: boolean;
  lastSyncTime: string;
  apiKey: string;
}

export interface Product {
  id: string;
  shopId: string;
  title: string;
  imageUrl: string;
  status: 'active' | 'draft' | 'archived';
  vendor: string;
  productType: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SKU {
  id: string;
  productId: string;
  skuCode: string;
  title: string;
  price: number;
  costPrice: number;
  weight: number;
  availableStock: number;
  warningStock: number;
  status: 'active' | 'inactive';
}

export interface Order {
  id: string;
  orderNumber: string;
  shopId: string;
  buyerName: string;
  buyerEmail: string;
  country: string;
  region: string;
  currency: string;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  fulfillmentStatus: 'unfulfilled' | 'partial' | 'fulfilled';
  totalAmount: number;
  trackingNumber?: string;
  warehouseId?: string;
  internalNotes?: string;
  tags: string[];
  createdAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  skuId: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Inventory {
  id: string;
  skuId: string;
  warehouseId: string;
  available: number;
  reserved: number;
  inTransit: number;
  location: string;
  batchNumber: string;
  warningThreshold: number;
}

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  country: string;
  type: 'local' | 'fba' | 'third_party';
  status: 'active' | 'inactive';
}

export interface Purchase {
  id: string;
  purchaseNumber: string;
  supplierId: string;
  skuId: string;
  purchasePrice: number;
  quantity: number;
  expectedArrivalDate: string;
  logisticsMethod: string;
  status: 'draft' | 'pending_approval' | 'approved' | 'in_transit' | 'received';
}

export interface Logistics {
  id: string;
  providerName: string;
  channelName: string;
  estimatedDays: string;
  pricePerKg: number;
  status: 'active' | 'inactive';
}

export interface Refund {
  id: string;
  orderId: string;
  type: 'refund' | 'return';
  reason: string;
  amount: number;
  returnAddress?: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
}

export interface FinanceProfit {
  id: string;
  orderId: string;
  shopId: string;
  salesAmount: number;
  productCost: number;
  logisticsCost: number;
  platformFee: number;
  transactionFee: number;
  netProfit: number;
  grossMargin: number;
  date: string;
}
