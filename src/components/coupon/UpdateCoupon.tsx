import { Button } from "../ui/button";
import useFetch from "@/hooks/useFetch";
import { FormEvent, useState } from "react";
import { CouponItem } from "@/lib/type";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type Props = {
  coupon: CouponItem;
  accessToken: string;
};

const UpdateCoupon = ({ accessToken, coupon }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [couponDate, setCouponDate] = useState<{
    start_date: string;
    end_date: string;
  }>({
    start_date: coupon.start_date,
    end_date: coupon.end_date,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { response_message } = await useFetch<{ response_message: string }>(
        `/api/dashboard/customer-service/v1/coupons/${coupon.code}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          method: "PUT",
          body: JSON.stringify(couponDate),
        }
      );

      toast.success(response_message);
      setIsDialogOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={(open) => setIsDialogOpen(open)} open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Update Coupon</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Coupon Update</DialogTitle>

          <div>
            <p>Name: {coupon.name}</p>
            <p>Code: {coupon.code}</p>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="startDate" className="text-right">
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              className="col-span-3"
              defaultValue={coupon.start_date}
              onChange={(e) =>
                setCouponDate({ ...couponDate, start_date: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="endDate" className="text-right">
              End Date
            </label>
            <input
              id="endDate"
              type="date"
              className="col-span-3"
              defaultValue={coupon.end_date}
              onChange={(e) =>
                setCouponDate({ ...couponDate, end_date: e.target.value })
              }
            />
          </div>

          <Button
            disabled={isLoading}
            type="submit"
            className="disabled:opacity-50">
            {isLoading ? "Loading..." : "Update"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCoupon;
