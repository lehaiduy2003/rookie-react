import { useState, useEffect } from "react";
import { Category } from "../types/Category";
import CategoryService from "@/apis/CategoryService";

const CategoryNavbar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    CategoryService.getParents()
      .then(setCategories)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  // Handle loading categories effect
  if (isLoading) {
    return (
      <div className="w-full bg-[#FB6E52] py-3">
        <div className="flex justify-center gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 w-24 rounded-md bg-white/20 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <nav className="bg-[#FB6E52] py-3 w-screen">
      <ul className="flex items-center justify-center gap-12 overflow-x-auto">
        {categories.map((category) => (
          <li key={category.id}>
            <a
              id={`category-${category.id}`}
              href={`/products?category=${category.id}`}
              className="text-white text-sm font-medium hover:text-white/70 transition-colors whitespace-nowrap"
            >
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryNavbar;
