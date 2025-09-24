export interface CommentsType {
  id?: number;
  name_user: string;
  url_image_user: string;
  message: string;
  rating: number;
  created_at: string;
};

export interface MetadataType {
  current_page: number;
  next_page: boolean;
  size_page: number;
};

export default interface CommentsResponseType {
  data: CommentsType[];
  metadata: MetadataType;
};