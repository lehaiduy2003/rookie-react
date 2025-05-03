import { Skeleton } from "@/components/ui/skeleton";

// Generate loading skeletons for list view
const RenderSkeletons = () => {
  return Array(5)
    .fill(0)
    .map((_, index) => (
      <div
        key={`skeleton-${index}`}
        className="flex flex-col md:flex-row gap-4 p-4 border-b last:border-b-0"
      >
        <Skeleton className="h-[120px] w-[120px] rounded-md flex-shrink-0" />
        <div className="flex-grow space-y-2 w-full">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    ));
};

export default RenderSkeletons;
