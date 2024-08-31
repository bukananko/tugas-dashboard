import { FormEvent, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Login = () => {
  const navigate = useNavigate();
  const [_, setCookie] = useCookies(["accessToken"]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ phone: string; password: string }>(
    { phone: "", password: "" }
  );

  const handleSumit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await useFetch<{
        access_token: string;
        response_message: string;
      }>("/api/dashboard/common/v1/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (data.access_token) {
        setCookie("accessToken", data.access_token);
        navigate("/");
      } else {
        toast.error(data.response_message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col space-y-10">
      <h1 className="text-xl font-bold">Welcome</h1>

      <form onSubmit={handleSumit} className="space-y-3 w-60">
        <label htmlFor="phone" className="flex flex-col">
          Phone Number
          <input
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </label>

        <label htmlFor="password" className="flex flex-col">
          Password
          <input
            type="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </label>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
