export interface CreateBorrowBookRequest {
  bookId: string;
}

export interface ReturnBorrowBookRequest {
  borrowId: string;
}

export interface BorrowBook {
  id: string;
  borrowDate: string;
  returnDate: string;
  status: string;
  book: {
    id: string;
    title: string;
    author: string;
    coverImage: string;
  }[];
  user: {
    id: string;
    username: string;
  };
}

export interface GetBorrowBooksResponse {
  status: string;
  code: 200;
  data: BorrowBook[];
  message: string;
}
