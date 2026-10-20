export type ServiceId =
  | "custom"
  | "fine-line"
  | "blackwork"
  | "traditional"
  | "piercing"
  | "consultation";

export type GalleryCategory = "fine-line" | "blackwork" | "traditional" | "piercing";

export type ArtistId = "atlas" | "rowan" | "mira";

export interface Service {
  id: ServiceId;
  name: string;
  eyebrow: string;
  summary: string;
  details: string[];
  image: string;
  imageAlt: string;
  layout: "image-left" | "image-right";
}

export interface Artist {
  id: ArtistId;
  name: string;
  specialization: string;
  statement: string;
  portrait: string;
  portraitAlt: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  artistId: ArtistId;
  category: GalleryCategory;
  style: string;
  description: string;
  aspect: "portrait" | "landscape" | "square";
}

export interface AftercareItem {
  id: string;
  title: string;
  body: string;
}
