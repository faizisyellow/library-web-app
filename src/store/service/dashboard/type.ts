export interface CategoryBooksData {
  category: string;
  books: number;
}

export interface RecentBorrowsBook {
  borrowDate: string;
  id: string;
  book: {
    coverImage: string | File;
    id: string;
    title: string;
    author: string;
  };
}

export interface DataDashboardOverview {
  books: number;
  categories: number;
  chartCategoryBooksData: CategoryBooksData[];
  recentBorrowsBook: RecentBorrowsBook[];
  users: number;
  borrowBooks: number;
}

export interface GetDashboardOverviewResponse {
  code: number;
  data: DataDashboardOverview;
  message: string;
  status: string;
}
