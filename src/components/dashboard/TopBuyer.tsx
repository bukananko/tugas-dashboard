import { getTopBuyer } from "@/lib/getData";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

const TopBuyer = ({ accessToken }: { accessToken: string }) => {
  const { data } = useQuery({
    queryKey: ["topBuyer"],
    queryFn: () => getTopBuyer(accessToken),
  });

  return (
    <div className="space-y-8">
      {data?.items && data.items.length > 0 ? (
        <>
          {data?.items.map((buyer, i) => (
            <div className="flex items-center gap-5" key={i}>
              <p>{i + 1}</p>

              <div className="md:flex md:justify-between w-full">
                <div className="space-y-1">
                  <p className="font-medium leading-none">Name: {buyer.name}</p>
                  <p className="text-muted-foreground">Phone: {buyer.phone}</p>
                </div>

                <div>
                  <p className="ml-auto">Period: {data.period}</p>
                  <p className="ml-auto">Amount: {buyer.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {new Array(6).fill(0).map((_, i) => (
            <div key={i} className="md:flex md:justify-between w-full">
              <div className="space-y-2">
                <Skeleton className="w-44" />
                <Skeleton className="w-40" />
              </div>

              <div className="space-y-2">
                <Skeleton className="w-40" />
                <Skeleton className="w-44" />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default TopBuyer;
