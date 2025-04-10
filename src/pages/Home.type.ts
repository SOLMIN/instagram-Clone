export interface CommentType {
    id: string;
    text: string;
    likes: number;
  }
  
  export interface Post {
    id: string;
    username: string;
    avatar: string;
    image: string;
    caption: string;
    likes: number;
    comments: CommentType[];
  }