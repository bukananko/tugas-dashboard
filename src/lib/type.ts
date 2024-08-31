export type MonthlyOrder = {
  items: {
    month: string;
    orders: string;
  }[];
};

export type YearlyOrder = {
  items: {
    year: number;
    amount: string;
  }[];
};

export type TopBuyer = {
  period: string;
  items: {
    name: string;
    phone: string;
    amount: string;
  }[];
};

export type TopStore = {
  period: string;
  items: {
    name: string;
    code: string;
    city: string;
    province: string;
    amount: string;
  }[];
};

export type ProductItem = {
  name: string;
  code: string;
  category: string;
  qty: string;
  amount: string;
};

export type ProductData = {
  period: string;
  items: ProductItem[];
};

export type CouponItem = {
  code: string;
  name: string;
  start_date: string;
  end_date: string;
  created_at?: string;
};

export type CouponData = {
  items: CouponItem[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type UserProps = {
  name: string;
  profile_image: string;
};

export type OrderItem = {
  invoice_no: string;
  grandtotal: string;
  created_at: string;
  buyer: {
    name: string;
    phone: string;
  };
  store: {
    code: string;
    name: string;
    city?: string;
    province?: string;
  };
  coupon: {
    code: string;
    name: string;
  };
};

export type OrderData = {
  items: OrderItem[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type OrderComparison = {
  percentage: string;
  current: {
    month: string;
    amount: string;
  };
  previous: {
    month: string;
    amount: string;
  };
};

export type DetailOrderItem = OrderItem & {
  items: {
    product: {
      code: string;
      name: string;
      category: string;
      price: string;
    };
    qty: number;
    total_price: string;
  }[];
};
