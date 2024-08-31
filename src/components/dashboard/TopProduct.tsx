import { useQuery } from "@tanstack/react-query";
import { getTopProducts } from "@/lib/getData";
import { Skeleton } from "../ui/skeleton";

const TopProduct = ({ accessToken }: { accessToken: string }) => {
  const { data } = useQuery({
    queryKey: ["topProduct"],
    queryFn: () => getTopProducts(accessToken),
  });

  const topProducts = data?.items || [];

  return (
    <div className="space-y-8">
      {topProducts.length > 0 ? (
        <>
          {topProducts.map((product, i) => (
            <div className="flex items-center gap-5" key={i}>
              <p>{i + 1}</p>

              <div className="md:flex md:justify-between w-full">
                <div className="space-y-1">
                  <p className="font-medium leading-none">
                    Name: {product.name}
                  </p>
                  <p className="text-muted-foreground">
                    Category: {product.category}
                  </p>
                </div>

                <div className="w-32">
                  <p>Quantity: {product.qty}</p>
                  <p>Amount: {product.amount}</p>
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
                <Skeleton className="w-36" />
                <Skeleton className="w-40" />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default TopProduct;
