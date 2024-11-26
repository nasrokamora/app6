

"use client";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function SelectMoviesPages() {
  const [currentPage, setCurrentPage] = useState(1); // الصفحة الحالية
  const [dataMovies, setDataMovies] = useState([]);  // بيانات الأفلام
  const [isLoading, setIsLoading] = useState(true);  // حالة التحميل

  // استدعاء بيانات الأفلام عند تغيير الصفحة
  useEffect(() => {
    fetchPagesMovies();
  }, [currentPage]);

  const fetchPagesMovies = async () => {
    setIsLoading(true); // تفعيل حالة التحميل
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?page=${currentPage}`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`, // ضع هنا رمز الوصول الخاص بك
            accept:"application/json"
          }
        }
      );
      const data = await response.json();
      setDataMovies(data.results); // تحديث بيانات الأفلام
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setIsLoading(false); // إيقاف حالة التحميل
  };

  // تحديث الصفحة عند النقر على رابط صفحة جديد
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className=" h-[30rem] w-full">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className=" overflow-hidden">
          <ul className='overflow-hidden flex justify-center items-center'>
            {dataMovies.map((movie) => (
              <li key={movie.id} className=''>{movie.title}</li>
            ))}
          </ul>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="cursor-pointer"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {[...Array(5)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink className="cursor-pointer"
                    
                    isActive={currentPage === index + 1}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className="cursor-pointer"
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}