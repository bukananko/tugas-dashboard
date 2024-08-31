import { getAllCoupon } from "@/lib/getData";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import DetailCoupon from "@/components/coupon/DetailCoupon";
import UpdateCoupon from "@/components/coupon/UpdateCoupon";
import Loading from "@/components/Loading";
import CreateCouponForm from "@/components/form/CreateCouponForm";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Coupon = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["accessToken"]);
  const [pageParam, setPageParam] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!cookies.accessToken) {
      navigate("/login");
    }
  }, []);

  const { data } = useQuery({
    queryKey: [pageParam + "coupon"],
    queryFn: () =>
      getAllCoupon({ pageParam, accessToken: cookies.accessToken }),
  });

  const coupons = data?.items.flatMap((coupon) => coupon) ?? [];

  return (
    <section className="mx-5 py-3 space-y-5">
      {coupons.length > 0 ? (
        <>
          <div className="space-x-5 border-b border-b-gray-300 w-max pb-1 flex items-center">
            <Link
              to="/coupon/export"
              className="hover:opacity-70 flex items-center gap-1">
              <span>Export Coupon</span>
              <img src="/export.svg" alt="Export" width={18} height={18} />
            </Link>

            <Dialog
              onOpenChange={(open) => setIsDialogOpen(open)}
              open={isDialogOpen}>
              <DialogTrigger className="hover:opacity-70 flex gap-1 items-center">
                <span>Create Coupon</span>
                <img src="/pencil.svg" alt="Edit" width={16} height={16} />
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Coupon</DialogTitle>
                </DialogHeader>

                <CreateCouponForm
                  accessToken={cookies.accessToken}
                  setIsDialogOpen={setIsDialogOpen}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="md:grid grid-cols-3 gap-4 max-md:space-y-4">
            {coupons.map((coupon) => (
              <div
                key={coupon.code}
                className="py-2 space-y-2 border px-3 rounded-md">
                <div>
                  <p className="font-semibold">Name: {coupon.name}</p>
                  <p>Code: {coupon.code}</p>
                </div>

                <div className="flex gap-3">
                  <DetailCoupon
                    couponCode={coupon.code}
                    accessToken={cookies.accessToken}
                  />

                  <UpdateCoupon
                    coupon={coupon}
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

export default Coupon;
