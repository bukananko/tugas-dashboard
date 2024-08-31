import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { getExportCoupon } from "@/lib/getData";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ExportCoupon = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["accessToken"]);

  useEffect(() => {
    if (!cookies.accessToken) {
      navigate("/login");
    }
  }, []);

  const { data } = useQuery({
    queryKey: ["exportCoupon"],
    queryFn: () => getExportCoupon(cookies.accessToken),
  });

  console.log(data);

  return (
    <div className="mx-3">
      <p>
        The api doesn't return anything based on docs, so this page empty :)
      </p>
    </div>
  );
};

export default ExportCoupon;
