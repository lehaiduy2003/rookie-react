import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Category } from "@/types/Category";
import { Info, ListChecks } from "lucide-react";
import { SiBrandfolder } from "react-icons/si";

interface DetailAndSpecProps {
  description: string | null;
  category: Category;
}

const DetailAndSpec = ({ description, category }: DetailAndSpecProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {/* Product Details */}
      <AccordionItem value="details" className="border rounded-md mb-2">
        <AccordionTrigger className="px-4 py-2">
          <div className="flex items-center">
            <Info className="w-4 h-4 mr-2" />
            <span>Product Details</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-3">
          <div className="text-gray-700">{description || "No detailed description available."}</div>
        </AccordionContent>
      </AccordionItem>
      {/* Product category */}
      <AccordionItem value="specifications" className="border rounded-md mb-2">
        <AccordionTrigger className="px-4 py-2">
          <div className="flex items-center">
            <ListChecks className="w-4 h-4 mr-2" />
            <span>Specifications</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-3">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-medium">Category</td>
                <td className="py-2">{category.name}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">description</td>
                <td className="py-2">{category.description}</td>
              </tr>
            </tbody>
          </table>
        </AccordionContent>
        {/* product brand */}
      </AccordionItem>
      <AccordionItem value="brands" className="border rounded-md mb-2">
        <AccordionTrigger className="px-4 py-2">
          <div className="flex items-center">
            <SiBrandfolder className="w-4 h-4 mr-2" />
            <span>Brand</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-3 border-b">
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="py-2 font-medium">Brand name</td>
                <td className="py-2">UNKNOWN</td>
              </tr>
            </tbody>
          </table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DetailAndSpec;
