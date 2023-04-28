import { useRouter } from "next/router";
import moment from "moment";
import { Product } from "@prisma/client";
import {
  ShoppingBagIcon,
  BanknotesIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  const router = useRouter();

  const startDate = moment(product.date).format("ll");
  const addDuraton = moment().add(product.period, "years");
  const endDate = addDuraton.format("ll");

  const handleNavigate = () => {
    router.push("/product/[id]", `/product/${product.id}`);
  };

  return (
    <article
      onClick={handleNavigate}
      className="flex flex-col bg-slate-50 rounded shadow items-center px-3 py-5 space-y-3 w-72 border cursor-pointer hover:scale-105 hover:bg-white hover:drop-shadow tranistion ease-in duration-200 text-center"
    >
      <section className="border-b pb-2 w-full flex flex-col items-start justify-evenly space-y-1">
        {/* Product name */}
        <div className="flex items-center px-4 py-2 w-full rounded bg-slate-300">
          <ShoppingBagIcon className="h-6 w-6 mr-5" />
          <div className="pl-3 flex flex-col items-start border-l-2 border-slate-600">
            <h3 className="text-lg font-semibold">{product.product}</h3>
            <p className="text-xs text-gray-500 uppercase">Product</p>
          </div>
        </div>
        {/* Value */}
        <div className="flex items-center px-4 py-2 bg-green-200/80 rounded w-full">
          <BanknotesIcon className="h-6 w-6 mr-5 text-green-600" />
          <div className="pl-3 flex flex-col items-start border-l-2 border-green-600">
            <h3 className="text-lg font-semibold">
              {product.value || "N/A"} &euro;
            </h3>
            <p className="text-xs text-gray-500 uppercase">value </p>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center px-4 py-2 bg-orange-200/80 w-full rounded">
          <ClockIcon className="h-6 w-6 mr-5 text-orange-500" />
          <div className="pl-3 flex flex-col items-start border-l-2 border-orange-500">
            <h3 className="text-lg font-semibold">{product.period} Years</h3>
            <p className="text-xs text-gray-500 uppercase">duration</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-x-5">
        {/* Starting Date */}
        <div className="bg-slate-300 rounded px-1 py-2">
          <h3 className="text-lg font-semibold">{startDate}</h3>
          <p className="text-xs text-gray-500 uppercase col-span-2">Starts</p>
        </div>
        {/* Ending Date */}
        <div className="bg-orange-200/80 rounded px-1 py-2">
          <h3 className="text-lg font-semibold text-orange-500">{endDate}</h3>
          <p className="text-xs text-gray-500 uppercase col-span-2">Expires</p>
        </div>
      </section>
    </article>
  );
}

export default ProductCard;
