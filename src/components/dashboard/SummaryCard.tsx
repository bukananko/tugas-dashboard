import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { getOrderComparison } from "@/lib/getData";
import { formatNumber } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

const SummaryCard = ({ accessToken }: { accessToken: string }) => {
  const { data: orderComparison } = useQuery({
    queryKey: ["orderComparison"],
    queryFn: () => getOrderComparison(accessToken),
  });

  return (
    <div className="flex max-md:flex-col gap-5 justify-start items-center mt-5">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Current Orders{" "}
            {orderComparison && `(${orderComparison?.current.month})`}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {orderComparison ? (
            <>
              <div className="text-2xl font-bold">
                {formatNumber(orderComparison?.current.amount!)}
              </div>
              <p className="text-xs text-muted-foreground">
                {orderComparison?.percentage}% from last month
              </p>
            </>
          ) : (
            <div className="space-y-3">
              <Skeleton className="w-40" />
              <Skeleton className="w-36" />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Previous Orders{" "}
            {orderComparison && `(${orderComparison?.previous.month})`}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {orderComparison ? (
            <div className="text-2xl font-bold">
              {formatNumber(orderComparison?.previous.amount!)}
            </div>
          ) : (
            <Skeleton className="w-40" />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCard;
