import { getDetailOrder } from "@/lib/getData";
import { formatNumber } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { DetailOrderItem } from "@/lib/type";
import { useState } from "react";
import Loading from "../Loading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const DetailOrder = ({
  invoiceNo,
  accessToken,
}: {
  invoiceNo: string;
  accessToken: string;
}) => {
  const [data, setdata] = useState<DetailOrderItem>({} as DetailOrderItem);

  const { mutate } = useMutation({
    mutationKey: [invoiceNo],
    mutationFn: async () => {
      const response = await getDetailOrder({ invoiceNo, accessToken });
      setdata(response);
    },
  });

  return (
    <Dialog>
      <DialogTrigger
        onClick={() => mutate()}
        className="bg-black w-max text-white rounded-md py-2 px-3">
        Show Detail
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
        <DialogHeader className="py-3 px-6 pb-0">
          <DialogTitle className="text-2xl">Order Detail</DialogTitle>

          {data.buyer && (
            <>
              <DialogDescription className="text-base">
                Invoice No: {data?.invoice_no}
              </DialogDescription>

              <DialogDescription className="text-base">
                Created At: {data?.created_at}
              </DialogDescription>
            </>
          )}
        </DialogHeader>

        {data.buyer ? (
          <>
            <div className="grid gap-4 py-4 overflow-y-auto px-6">
              <div>
                <h3 className="font-semibold text-lg">Buyer</h3>
                <p>
                  Name:{" "}
                  <span className="font-semibold">{data.buyer.name ?? ""}</span>
                </p>
                <p>Phone: {data?.buyer.phone}</p>
              </div>

              <hr />

              <div>
                <h3 className="font-semibold text-lg">Coupon</h3>
                <div>
                  Name:{" "}
                  <span className="font-semibold">{data?.coupon.name}</span>
                </div>
                <div>Code: {data?.coupon.code}</div>
              </div>

              <hr />

              <div>
                <h3 className="font-semibold text-lg">Store</h3>
                <div>
                  Name:{" "}
                  <span className="font-semibold">{data?.store.name}</span>
                </div>
                <div>Code: {data?.store.code}</div>
                <div>City: {data?.store.city}</div>
                <div>Province: {data?.store.province}</div>
              </div>

              <hr />

              <div className="space-y-5">
                <h3 className="font-semibold text-lg">Product</h3>

                {data?.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-5 border p-2 rounded-md">
                    <p>{i + 1}</p>

                    <div>
                      <div key={i}>
                        <p>
                          Name:{" "}
                          <span className="font-semibold">
                            {item.product.name}
                          </span>
                        </p>
                        <p>Category: {item.product.category}</p>
                        <p>Code: {item.product.code}</p>
                        <p>
                          Price:{" "}
                          <span className="font-semibold">
                            Rp {formatNumber(item.product.price)}
                          </span>
                        </p>
                      </div>

                      <div>
                        <p>
                          Quantity:{" "}
                          <span className="font-semibold">{item.qty}</span>
                        </p>
                        <p>
                          Total Price:{" "}
                          <span className="font-semibold">
                            Rp {formatNumber(item.total_price)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter className="p-6 pt-0 font-semibold text-lg">
              <p>Grand Total: Rp {formatNumber(data?.grandtotal!)}</p>
            </DialogFooter>
          </>
        ) : (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DetailOrder;
