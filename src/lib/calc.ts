export type Service = { 
  id: string; 
  label: string; 
  rate?: number; 
  price_pre_gst?: number;
  price_incl_gst?: number;
  price_ex_gst?: number;
  days?: number;
  outcome?: string;
  includes?: string[];
  discount_pct?: number;
};

export type Preset = {
  id: string;
  label: string;
  tag: string;
  days: number;
  includes: string[];
  price_pre_gst: number;
  discount_pct?: number;
};

export const GST = 0.18;

export function calcSubtotal(keys: string[], map: Record<string, Service>): number { 
  return keys.reduce((s, k) => s + (map[k]?.price_incl_gst || map[k]?.rate || 0), 0); 
}

export function sumIncl(items: Service[]): number {
  return items.reduce((sum, item) => {
    if (item.price_pre_gst) {
      return sum + Math.round(item.price_pre_gst * 1.18); // Convert to incl GST
    }
    return sum + (item.price_incl_gst || item.rate || 0);
  }, 0);
}

export function timelineDays(items: Service[]): number {
  if (items.length === 0) return 0;
  return Math.max(...items.map(item => item.days || 0));
}

export function discountTier(count: number): number { 
  if(count >= 5) return 0.15; // 15% off for 5+ items
  if(count >= 3) return 0.10; // 10% off for 3-4 items  
  if(count >= 2) return 0.05; // 5% off for 2 items
  return 0; 
}

export function discountAmount(subtotal: number, count: number): number { 
  return subtotal * discountTier(count); 
}

export function calcGST(amount: number): number { 
  return amount * GST; 
}

export function grandTotal(subtotal: number, discount: number): number { 
  const afterDisc = Math.max(0, subtotal - discount); 
  return afterDisc + calcGST(afterDisc); 
}

export function getPriceDisplay(item: Service): { incl: number; ex: number } {
  if (item.price_pre_gst) {
    const ex = item.price_pre_gst;
    const incl = Math.round(ex * (1 + GST));
    return { incl, ex };
  }
  if (item.price_incl_gst) {
    const incl = item.price_incl_gst;
    const ex = item.price_ex_gst || Math.round(incl / (1 + GST));
    return { incl, ex };
  }
  const ex = item.rate || 0;
  const incl = Math.round(ex * (1 + GST));
  return { incl, ex };
}
