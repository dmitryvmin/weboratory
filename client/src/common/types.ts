export type TTag = {
  id: string;
  title: string;
}

export type TPost = {
  title: string;
  content: string;
  updated_at: string;
  created_at: string;
  id: string;
  draft: boolean;
};

export type TCoords = [number, number];

export type TTagMap = {
  id: string;
  post_ids: string;
  tag_ids: string[];
}

export type TLngLat = {
  lat: number;
  lng: number;
}

export type EventVisibility = "PUBLIC" | "PRIVATE";

export type IEvent = {
  eventId: string;
  address: string;
  coordinates: TLngLat;
  createdAt: string;
  updatedAt: string;
  time: Date;
  title: string;
  content?: any;
  visibility?: EventVisibility;
  color?: string;
}