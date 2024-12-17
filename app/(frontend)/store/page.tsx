"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/local/ProductCard";
import { MobileFilterSidebar } from "@/components/local/MobileFilterSidebar";
import PaginationComponent from "@/components/local/PaginationComponent";
import {
  useGetAllCategoryQuery,
  useGetAllProductQuery,
  useLazySearchQuery,
} from "@/redux/appData";
import { Category, Product } from "@/lib/types";
import CustomLoader from "@/components/local/CustomLoader";
import Filter from "./Filter";
import { useSearchParams } from "next/navigation";

type SelectedRange = {
  min: number;
  max: number;
};

export default function Store() {
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [category, setCategory] = useState<string[]>([]);
  const [min, setMin] = useState<number | undefined>(undefined);
  const [max, setMax] = useState<number | undefined>(undefined);
  const [sort, setSort] = useState<string | undefined>("newest");
  const [inStock, setInStock] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);

  const handleStockChange = (status: string) => {
    if (status === "inStock") {
      setInStock((prev) => !prev);
    } else if (status === "outOfStock") {
      setOutOfStock((prev) => !prev);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setCategory((prev) => {
      // Check if the categoryId is already in the array
      if (prev.includes(categoryId)) {
        // Remove the categoryId if it's already selected
        return prev.filter((id) => id !== categoryId);
      } else {
        // Add the categoryId if it's not already selected
        return [...prev, categoryId];
      }
    });
  };

  const { data, isLoading, error } = useGetAllProductQuery(
    {
      page,
      limit,
      category,
      min,
      max,
      sort,
      inStock,
      outOfStock,
    },
    { refetchOnMountOrArgChange: true }
  );

  const products: Product[] = data ? data.products : [];
  const [searchTitle, setSearchTitle] = useState<string>("");

  // Use useSearchParams hook to get the search query from URL
  const searchParams = useSearchParams();
  const searchQueryFromUrl = searchParams.get("search") || "";

  React.useEffect(() => {
    // Sync the state with the URL search parameter
    setSearchTitle(searchQueryFromUrl);
  }, [searchQueryFromUrl]);
  const [search, { data: searchData, isLoading: searchIsLoading }] =
    useLazySearchQuery();

  React.useEffect(() => {
    if (searchQueryFromUrl) {
      search({ title: searchQueryFromUrl, page, limit });
    }
  }, [search, searchQueryFromUrl, page, limit]);

  const searchResults: Product[] = searchData?.products;

  const productsToDisplay = searchQueryFromUrl ? searchResults : products;
  const totalPages = searchQueryFromUrl
    ? searchData?.pagination?.totalPages
    : data && data.pagination.totalPages;

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  // Compute the highest price
  // const highestPrice = products.length
  //   ? Math.ceil(Math.max(...products.map((product) => product.price)) / 5000) *
  //     5000
  //   : 20000;
  const highestPrice = 20000;

  const [range, setRange] = useState<[number, number]>([0, highestPrice]);

  const handleFilter = (selectedRange: SelectedRange) => {
    setRange([selectedRange.min, selectedRange.max]);
    setMin(selectedRange.min);
    setMax(selectedRange.max);
  };

  const handleSortChange = (value: string) => {
    setSort(value); // Update sort state directly
  };

  const {
    data: categories,
    isLoading: isLoadingCategories,
    // error: errorCategories,
  } = useGetAllCategoryQuery(undefined);
  // console.log(data && data);
  // Shuffle data and pick the first 9 categories
  const categoryData: Category[] = categories ? categories.category : [];
  const isAnyLoading = isLoading || searchIsLoading || isLoadingCategories;


  return (
    <div className="px-2 lg:px-10 flex gap-5 w-full">
      {/* Left Section */}
      <div className="min-h-20 hidden md:block md:w-[320px] space-y-10">
        <Filter
          category={categoryData}
          handleFilter={handleFilter}
          highestPrice={highestPrice}
          range={range}
          isLoading={isLoadingCategories}
          onStockChange={handleStockChange}
          onCategoryChange={handleCategorySelect}
        />
      </div>

      {/* Main Section */}
      <div className="w-full md:w-[calc(100vw-320px)] flex flex-col gap-5">
        <section className="relative w-full hidden md:block h-[230px] rounded-lg overflow-hidden shadow-lg">
          {/* Background Image */}
          <div className="relative">
            <Image
              src="/images/store.jpg"
              alt="banner"
              width={600}
              height={230}
              className="w-full h-full object-cover rounded-lg filter brightness-75 blur-[0.2px] "
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>

          {/* Text Content */}
          <div className="absolute top-1/2 transform -translate-y-1/2  text-center -translate-x-1/2 left-1/2">
            <p className="text-xs text-white tracking-wide uppercase">
              Discover Yoamart
            </p>
            <h2 className="text-lg font-medium text-white">
              All Your Favorite Products in One Place
            </h2>
            <h1 className="text-2xl font-bold text-white">
              Shop, Save, Repeat
            </h1>
          </div>
        </section>
        {searchQueryFromUrl && (
          <p className="">showing search results for: {searchTitle}</p>
        )}

        {/* <div className="grid grid-cols-5 lg:grid-cols-10 gap-2">
          {Array.from({length: 20}).map((_, index)=>(
          <p key={index} className="flex items-center gap-2 border p-2 rounded-[30px] justify-center">
            Food <X className="w-4 h-4" />
          </p>))}
        </div> */}
        <div className="flex items-center justify-between w-full bg-[#f7f8fd] h-10 rounded-lg p-2">
          <div className="md:hidden">
            <MobileFilterSidebar
              category={categoryData}
              handleFilter={handleFilter}
              highestPrice={highestPrice}
              range={range}
              isLoading={isLoadingCategories}
              onStockChange={handleStockChange}
              onCategoryChange={handleCategorySelect}
            />{" "}
          </div>
          <div className="flex items-center gap-3 md:justify-end md:w-full">
            <Select value={sort} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[100px] md:w-[180px] border-none bg-transparent">
                <SelectValue placeholder={`Sort by`} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="newest">Sort by Newest</SelectItem>
                  <SelectItem value="alphabetical">
                    Sort by Alphabetical
                  </SelectItem>
                  <SelectItem value="price-low-high">
                    Sort by Price (Low to High)
                  </SelectItem>
                  <SelectItem value="price-high-low">
                    Sort by Price (High to Low)
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>{" "}
        </div>
        {isAnyLoading ? (
          <div className="w-full rounded-lg border h-[50vh] flex items-center justify-center">
            <CustomLoader />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-[283px]">
            <p className="text-red-500">Failed to load All products.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 border rounded-lg">
            {" "}
            {productsToDisplay.map((data, index) => (
              <ProductCard key={index} data={data} />
            ))}
          </div>
        )}
        <PaginationComponent
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          onPageChange={handlePageChange}
          currentPage={page}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
