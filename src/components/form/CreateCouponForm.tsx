import useFetch from "@/hooks/useFetch";
import { Button } from "../ui/button";
import { CouponItem } from "@/lib/type";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

type Props = {
  accessToken: string;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateCouponForm = ({ accessToken, setIsDialogOpen }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<CouponItem>({} as CouponItem);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await useFetch<{
        response_message: string;
        errors: {};
      }>("/api/dashboard/customer-service/v1/coupons", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!response.errors) {
        setIsDialogOpen(false);
        toast.success(response.response_message);
      } else {
        toast.error(response.response_message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="code" className="text-right">
          Code:
        </label>
        <input
          required
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          id="code"
          type="text"
          className="col-span-3"
          maxLength={8}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="name" className="text-right">
          Name:
        </label>
        <input
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          id="name"
          type="text"
          className="col-span-3"
          maxLength={32}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="startDate" className="text-right">
          Start Date:
        </label>
        <input
          required
          onChange={(e) =>
            setFormData({ ...formData, start_date: e.target.value })
          }
          id="startDate"
          type="date"
          className="col-span-3"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="endDate" className="text-right">
          End Date:
        </label>
        <input
          required
          onChange={(e) =>
            setFormData({ ...formData, end_date: e.target.value })
          }
          id="endDate"
          type="date"
          className="col-span-3"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="disabled:opacity-50">
        {isLoading ? "Loading..." : "Create"}
      </Button>
    </form>
  );
};

export default CreateCouponForm;
