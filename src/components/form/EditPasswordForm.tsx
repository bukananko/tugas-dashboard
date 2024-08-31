import useFetch from "@/hooks/useFetch";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

type Password = {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
};

type Props = {
  setIsEditPassword: React.Dispatch<React.SetStateAction<boolean>>;
  accessToken: string;
};

const EditPasswordForm = ({ setIsEditPassword, accessToken }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<Password>({} as Password);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await useFetch<{ response_message: string; errors: {} }>(
        "/api/dashboard/common/v1/auth/password",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          method: "PUT",
          body: JSON.stringify(newPassword),
        }
      );

      if (!response.errors) {
        setIsEditPassword(false);
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
      <div>
        <label htmlFor="currentPassword" className="font-semibold">
          Current Password
        </label>
        <input
          required
          id="currentPassword"
          type="password"
          className="w-full"
          onChange={(e) =>
            setNewPassword({ ...newPassword, current_password: e.target.value })
          }
        />
      </div>

      <div>
        <label htmlFor="newPassword" className="font-semibold">
          New Password
        </label>
        <input
          required
          id="newPassword"
          type="password"
          minLength={8}
          className="w-full"
          onChange={(e) =>
            setNewPassword({ ...newPassword, new_password: e.target.value })
          }
        />
      </div>

      <div>
        <label htmlFor="newPasswordConfirmation" className="font-semibold">
          New Password Confirmation
        </label>
        <input
          required
          type="password"
          minLength={8}
          id="newPasswordConfirmation"
          className="w-full"
          onChange={(e) =>
            setNewPassword({
              ...newPassword,
              new_password_confirmation: e.target.value,
            })
          }
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-black py-2 px-3 text-white rounded-md w-max disabled:opacity-50">
          {isLoading ? "Loading..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default EditPasswordForm;
