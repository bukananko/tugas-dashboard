import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import TopProduct from "@/components/dashboard/TopProduct";
import OrderStatusChart from "@/components/dashboard/OrderStatusChart";
import SummaryCard from "@/components/dashboard/SummaryCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TopBuyer from "@/components/dashboard/TopBuyer";
import TopStore from "@/components/dashboard/TopStore";

const HomePage = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["accessToken"]);

  useEffect(() => {
    if (!cookies.accessToken) {
      navigate("/login");
    }
  }, []);

  return (
    <main className="space-y-5 pb-10 px-3">
      <SummaryCard accessToken={cookies.accessToken} />

      <div className="md:grid gap-4 md:grid-cols-2 lg:grid-cols-7 max-md:space-y-5">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Orders Status</CardTitle>
          </CardHeader>

          <CardContent>
            <OrderStatusChart accessToken={cookies.accessToken} />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>

          <CardContent>
            <TopProduct accessToken={cookies.accessToken} />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Buyer</CardTitle>
          </CardHeader>

          <CardContent>
            <TopBuyer accessToken={cookies.accessToken} />
          </CardContent>
        </Card>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Top Store</CardTitle>
          </CardHeader>

          <CardContent>
            <TopStore accessToken={cookies.accessToken} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default HomePage;
