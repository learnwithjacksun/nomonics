interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  type: string;
  label?: string;
  error?: string;
}

interface ButtonWithLoaderProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  initialText: string;
  loadingText: string;
}

interface SelectWithIconProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon: React.ReactNode;
  label?: string;
  error?: string;
  defaultValue?: string;
  options: {
    label: string;
    value: string;
  }[];
}

interface IUser {
  id: string;
  name: string;
  email: string;
  role: "reader" | "creator";
  username: string;
  avatar?: string;
  gender?: string;
  phone?: string;
  address?: string;
  earnings: number;
  totalComics: number;
  savedComics: string[];
  purchasedComics: string[];
  isVerified: boolean;
  preferences: {
    sendPromotionalEmails: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

interface CommentType {
  id: string;
  name: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

interface SingleComicType {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  pdf: string;
  categories: string[];
  creator: IUser;
  comments: CommentType[];
  averageRating: number;
  createdAt: string;
  updatedAt: string;
}


interface INewComicData {
  title: string,
  description: string,
  pdf: File,
  image: File | null,
  categories: string[]
}

interface IComic {
  id: string;
  creator: {
    id: string;
    name: string;
    email: string;
  };
  title: string;
  coverImage: string;
  subscribers: {
    users: string[];
    count: number;
  };
  isFree: boolean;
  categories: string[];
  createdAt: string;
  updatedAt: string;
}

interface IEpisode {
  id: string;
  comicId: string;
  title: string;
  episodeNumber: number;
  description: string;
  coverImage: string;
  coverImageId?: string;
  pdf: string;
  pdfId: string;
  likes: {
    userIds: string[];
    count: number;
  };
  dislikes: {
    userIds: string[];
    count: number;
  };
  views: {
    ipAddresses: string[];
    count: number;
  };
  createdAt: string;
  updatedAt: string;
}

