import { UserProps } from "@/lib/type";
import useFetch from "@/hooks/useFetch";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

type Props = {
  currentUser: UserProps;
  accessToken: string;
  setIsEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditProfileForm = ({
  currentUser,
  accessToken,
  setIsEditProfile,
}: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<UserProps>({
    name: currentUser.name,
    profile_image: currentUser.profile_image,
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files[0]);
      const file = e.target.files[0];
      setImage(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("profile_image", image!);
    formData.append("name", data.name);

    try {
      const response = await useFetch<{
        response_message: string;
        errors: {};
      }>("/api/dashboard/common/v1/auth/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "POST",
        body: formData,
      });

      if (!response.errors) {
        setIsEditProfile(false);
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
      <div className="flex gap-3">
        <label htmlFor="name" className="font-semibold">
          Name
        </label>
        <input
          required
          id="name"
          defaultValue={currentUser.name}
          maxLength={32}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="w-full"
        />
      </div>

      <div className="flex gap-3">
        <label htmlFor="name" className="font-semibold">
          Image
        </label>
        <input
          required
          type="file"
          accept="image/*"
          id="name"
          onChange={handleFileChange}
          className="w-full"
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

export default EditProfileForm;
