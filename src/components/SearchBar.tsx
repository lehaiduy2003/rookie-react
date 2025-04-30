import { FormEvent } from "react";
import { cn } from "../lib/utils";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
interface SearchBarProps {
  className?: string;
  placeholder?: string;
  value: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: FormEvent) => void;
}

const SearchBar = ({
  className,
  placeholder = "search...",
  value,
  setSearchQuery,
  handleSearch,
}: SearchBarProps) => {
  // const [searchQuery, setSearchQuery] = useState("");

  return (
    <form onSubmit={handleSearch} className={cn("relative flex w-full items-center", className)}>
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="input-search"
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-[4.5rem]"
        />
        <Button
          id="btn-search"
          type="submit"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 text-xs"
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
