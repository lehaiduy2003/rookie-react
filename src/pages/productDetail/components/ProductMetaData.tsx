import { Category } from "@/types/Category";
import { distanceToNow } from "@/utils/dateFormat";
import { ArrowLeftRight, Calendar, Clock, Truck } from "lucide-react";
import DetailAndSpec from "./DetailAndSpec";

interface ProductMetaDataProps {
  createdOn: Date;
  updatedOn: Date;
  description: string | null;
  category: Category;
}

const ProductMetaData = ({ createdOn, updatedOn, description, category }: ProductMetaDataProps) => {
  return (
    <>
      {/* Product metadata */}
      <div className="mt-8 border-t pt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-gray-500" />
          <span>Added {distanceToNow(createdOn)}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
          <span>Last updated {distanceToNow(updatedOn)}</span>
        </div>
      </div>
      {/* shipping information */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center text-sm">
          <Truck className="w-4 h-4 mr-2 text-gray-500" />
          <span>Free shipping on orders over $50</span>
        </div>
        <div className="flex items-center mt-2 text-sm">
          <ArrowLeftRight className="w-4 h-4 mr-2 text-gray-500" />
          <span>30-day returns</span>
        </div>
      </div>

      <div className="mt-6">
        <DetailAndSpec description={description} category={category}></DetailAndSpec>
      </div>
    </>
  );
};

export default ProductMetaData;
