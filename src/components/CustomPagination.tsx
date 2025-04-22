import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface CustomPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

interface PaginationItemProps {
  page: number;
  isActive: boolean;
  onPageChange: (page: number) => void;
}

const ActiveItem = ({ page }: PaginationItemProps) => {
  return (
    <PaginationItem className="pointer-events-none">
      <PaginationLink isActive className="text-white bg-[#FB6E52]">
        {page}
      </PaginationLink>
    </PaginationItem>
  );
};

const UnActiveItem = ({ page, onPageChange }: PaginationItemProps) => {
  return (
    <PaginationItem>
      <PaginationLink
        className="text-[#FB6E52] hover:bg-[#FB6E52]/10 hover:text-[#FB6E52]"
        href={`page=${page}`}
        onClick={(e) => {
          e.preventDefault();
          onPageChange(page);
        }}
      >
        {page}
      </PaginationLink>
    </PaginationItem>
  );
};

const RenderPaginationItems = ({
  totalPages,
  currentPage,
  onPageChange,
}: CustomPaginationProps) => {
  // Logic to determine which page numbers to show
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Always show first page
    pageNumbers.push(1);

    // Calculate the range of pages to show around the current page
    let startPage = Math.max(2, currentPage - 2);
    let endPage = Math.min(totalPages - 1, currentPage + 2);

    // Adjust start and end pages to ensure we show 5 pages when possible
    if (endPage - startPage < 4) {
      if (currentPage < totalPages / 2) {
        endPage = Math.min(totalPages - 1, startPage + 4);
      } else {
        startPage = Math.max(2, endPage - 4);
      }
    }

    // Add ellipsis after page 1 if needed
    if (startPage > 2) {
      pageNumbers.push("ellipsis-start");
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis before the last page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push("ellipsis-end");
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <>
      {getPageNumbers().map((page, index) => {
        if (page === "ellipsis-start" || page === "ellipsis-end") {
          return <PaginationEllipsis key={`ellipsis-${index}`} className="hidden md:inline-flex" />;
        }

        const pageNum = page as number;
        const isActive = pageNum === currentPage;

        return isActive ? (
          <ActiveItem key={pageNum} page={pageNum} isActive={true} onPageChange={onPageChange} />
        ) : (
          <UnActiveItem key={pageNum} page={pageNum} isActive={false} onPageChange={onPageChange} />
        );
      })}
    </>
  );
};

const CustomPagination = ({ totalPages, currentPage, onPageChange }: CustomPaginationProps) => {
  if (totalPages <= 1) {
    return null; // Don't show pagination if there's only one page
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage > 1) onPageChange(currentPage - 1);
          }}
          className={
            currentPage === 1
              ? "pointer-events-none opacity-50"
              : "hover:bg-[#FB6E52]/10 hover:text-[#FB6E52]"
          }
        >
          Previous
        </PaginationPrevious>

        <RenderPaginationItems
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />

        <PaginationNext
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage < totalPages) onPageChange(currentPage + 1);
          }}
          className={
            currentPage === totalPages
              ? "pointer-events-none opacity-50"
              : "hover:bg-[#FB6E52]/10 hover:text-[#FB6E52]"
          }
        >
          Next
        </PaginationNext>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
