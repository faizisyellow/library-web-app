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
  dataUpdate: FormData;
}

export interface GetBooksResponse {
  code: number;
  data: {
    id: string;
    title: string;
    author: string;
    stock:number;
    category: {
      id: string;
      name: string;
    };
    coverImage: string;
  }[];
  message: string;
  status: string;
}
