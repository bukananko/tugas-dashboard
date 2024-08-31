import { useState } from "react";
import { CouponItem } from "@/lib/type";
import Loading from "../Loading";
import { getDetailCoupon } from "@/lib/getData";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DetailCoupon = ({
  couponCode,
  accessToken,
}: {
  couponCode: string;
  accessToken: string;
}) => {
  const [data, setdata] = useState<CouponItem>({} as CouponItem);

  const { mutate } = useMutation({
    mutationKey: [couponCode],
    mutationFn: async () => {
      const response = await getDetailCoupon({ couponCode, accessToken });
      setdata(response);
    },
  });

  return (
    <Dialog>
      <DialogTrigger
        onClick={() => mutate()}
        className="bg-black w-max text-white rounded-md py-1 px-3">
        Show Detail
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Coupon Detail</DialogTitle>
        </DialogHeader>

        {data.code ? (
          <div>
            <div>
              Name: <span className="font-semibold">{data?.name}</span>
            </div>
            <div>Code: {data?.code}</div>
            <div>Created At: {data?.created_at}</div>
            <div>Start Date: {data?.start_date}</div>
            <div>End Date: {data?.end_date}</div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DetailCoupon;
