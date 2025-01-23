export interface CreateBookRequest {
  title: string;
  author: string;
  categoryId: string;
  coverImage: string | File;
}

export interface Book {
  title?: string;
  author?: string;
  categoryId?: string;
  coverImage?: string | File;
}

export interface EditBookRequest {
  id: string;
  data: Book;
}

export interface GetBooksResponse {
  code: number;
  data: {
    id: string;
    title: string;
    author: string;
    category: {
      id: string;
      name: string;
    };
    coverImage: string | File;
  }[];
  message: string;
  status: string;
}
