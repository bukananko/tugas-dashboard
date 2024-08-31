import useFetch from "@/hooks/useFetch";
import {
  CouponData,
  CouponItem,
  DetailOrderItem,
  MonthlyOrder,
  OrderComparison,
  OrderData,
  ProductData,
  TopBuyer,
  TopStore,
  UserProps,
  YearlyOrder,
} from "./type";

export const getCurrentUser = async (accessToken: string) => {
  const data = await useFetch<UserProps>(
    "/api/dashboard/common/v1/auth/profile",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return {
    name: data.name,
    profile_image: data.profile_image,
  };
};

export const getMonthlyOrder = async (accessToken: string) => {
  const data = await useFetch<MonthlyOrder>(
    `/api/dashboard/common/v1/summaries/orders/monthly?start_month=2022-01&end_month=2024-08`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data.items ?? [];
};

export const getYearlyOrder = async (accessToken: string) => {
  const data = await useFetch<YearlyOrder>(
    `/api/dashboard/common/v1/summaries/orders/yearly?start_year=2021&end_year=2024`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data.items ?? [];
};

export const getOrderComparison = async (accessToken: string) => {
  const data = await useFetch<OrderComparison>(
    `/api/dashboard/common/v1/summaries/orders/comparison`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data;
};

export const getTopProducts = async (accessToken: string) => {
  const data = await useFetch<ProductData>(
    `/api/dashboard/common/v1/summaries/top/products?limit=5`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data;
};

export const getTopBuyer = async (accessToken: string) => {
  const data = await useFetch<TopBuyer>(
    `/api/dashboard/common/v1/summaries/top/buyers?limit=5`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data;
};

export const getTopStore = async (accessToken: string) => {
  const data = await useFetch<TopStore>(
    `/api/dashboard/common/v1/summaries/top/stores?limit=5`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data;
};

export const getAllCoupon = async ({
  pageParam,
  accessToken,
}: {
  pageParam: number;
  accessToken: string;
}) => {
  const data = await useFetch<CouponData>(
    `/api/dashboard/customer-service/v1/coupons?page=${pageParam}&per_page=10&sort_by=name&sort_direction=asc&search_by=name&search_query=`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data;
};

export const getDetailCoupon = async ({
  couponCode,
  accessToken,
}: {
  couponCode: string;
  accessToken: string;
}) => {
  const data = await useFetch<CouponItem>(
    `/api/dashboard/customer-service/v1/coupons/${couponCode}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data;
};

export const getExportCoupon = async (accessToken: string) => {
  const data = await useFetch<CouponItem>(
    `/api/dashboard/customer-service/v1/coupons/export?sort_by=name&sort_direction=asc&search_by=name&search_query=Coupon1`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data;
};

export const getAllOrder = async ({
  pageParam,
  accessToken,
  sortBy,
}: {
  pageParam: number;
  accessToken: string;
  sortBy: "created_at" | "grandtotal";
}) => {
  const data = await useFetch<OrderData>(
    `/api/dashboard/customer-service/v1/orders?page=${pageParam}&per_page=10&sort_by=${sortBy}&sort_direction=desc&start_date=2024-08-01&end_date=2024-08-31&search_by=invoice_no`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data;
};

export const getDetailOrder = async ({
  invoiceNo,
  accessToken,
}: {
  invoiceNo: string;
  accessToken: string;
}) => {
  const data = await useFetch<DetailOrderItem>(
    `/api/dashboard/customer-service/v1/orders/${invoiceNo}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data;
};
