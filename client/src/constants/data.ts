import { BookOpen, CreditCard, LayoutDashboard, Plus, UserRoundCog } from "lucide-react";

export const navLinks = [
  { label: "E-Comics", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Market Place", href: "/marketplace" },
  { label: "Library", href: "/library" },
  { label: "Genre", href: "/genre" },
  { label: "Reel flow", href: "/reel" },
];

export const navLinksCreator = [
  { label: "Dashboard", href: "/creator/dashboard", icon: LayoutDashboard },
  { label: "Upload Comic", href: "/creator/upload/type", icon: Plus },
  { label: "My Collections", href: "/creator/collections", icon: BookOpen },
  { label: "Subscriptions", href: "/creator/subscriptions", icon: CreditCard },
  { label: "Profile", href: "/creator/profile", icon: UserRoundCog },
];

export const accountTypes = [
  {
    label: "reader",
    description: "For readers who want to explore and read comics",
  },
  {
    label: "creator",
    description: "For creators who want to upload and manage their comics",
  },
];

export const comicTypes = [
  {
    label: "Single Comic",
    description: "Create a single or one-shot comic",
    href: "/creator/create/single",
  },
  {
    label: "Playlist Comic",
    description: "Create a playlist of comics",
    href: "/creator/create/playlist",
  },
];

export const categoryFilter = [
  "all",
  "drama",
  "action",
  "comedy",
  "fantasy",
  "horror",
  "mystery",
  "romance",
  "sci-fi",
  "thriller",
];

export const libraryFilter = ["saved", "favorite"];

export const comicCategories = [
  {
    label: "Action",
    value: "action",
  },
  {
    label: "Adventure",
    value: "adventure",
  },
  {
    label: "Comedy",
    value: "comedy",
  },
  {
    label: "Drama",
    value: "drama",
  },
  {
    label: "Fantasy",
    value: "fantasy",
  },
  {
    label: "Horror",
    value: "horror",
  },
  {
    label: "Mystery",
    value: "mystery",
  },
  {
    label: "Romance",
    value: "romance",
  },
  {
    label: "Sci-Fi",
    value: "sci-fi",
  },
  {
    label: "Thriller",
    value: "thriller",
  }
];
