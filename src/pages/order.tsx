import DetailOrder from "@/components/order/DetailOrder";
import { getAllOrder } from "@/lib/getData";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Order = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["accessToken"]);
  const [pageParam, setPageParam] = useState(1);
  const [sortBy, setSortBy] = useState<"created_at" | "grandtotal">(
    "created_at"
  );

  useEffect(() => {
    if (!cookies.accessToken) {
      navigate("/login");
    }
  }, []);

  const { data, refetch } = useQuery({
    queryKey: [sortBy + pageParam + "order"],
    queryFn: () =>
      getAllOrder({
        pageParam,
        accessToken: cookies.accessToken,
        sortBy,
      }),
  });

  const orders = data?.items ?? [];

  return (
    <section className="mx-5 py-3 space-y-5">
      {orders.length > 0 ? (
        <>
          <Select
            defaultValue={sortBy}
            onValueChange={(value) => {
              refetch();
              setSortBy(value as "created_at" | "grandtotal");
            }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter</SelectLabel>
                <SelectItem value="grandtotal">Grand Total</SelectItem>
                <SelectItem value="created_at">Created At</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="grid md:grid-cols-3 gap-4">
            {orders.map((order, i) => (
              <div key={i} className="py-2 space-y-2 border px-3 rounded-md">
                <div>
                  <p className="font-semibold">Name: {order.buyer.name}</p>
                  <p>Phone: {order.buyer.phone}</p>
                </div>

                <div className="flex gap-3">
                  <DetailOrder
                    invoiceNo={order.invoice_no}
                    accessToken={cookies.accessToken}
                  />
                </div>
              </div>
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <button
                  disabled={pageParam === 1}
                  onClick={() => setPageParam(pageParam - 1)}
                  className="disabled:opacity-20">
                  <PaginationPrevious to="#" />
                </button>
              </PaginationItem>

              <PaginationItem>
                <button className="size-10 rounded-md border border-black">
                  {pageParam}
                </button>
              </PaginationItem>

              <PaginationItem>
                <button
                  className="disabled:opacity-20"
                  disabled={pageParam === data?.last_page}
                  onClick={() => setPageParam(pageParam + 1)}>
                  <PaginationNext to="#" />
                </button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      )}
    </section>
  );
};

export default Order;
