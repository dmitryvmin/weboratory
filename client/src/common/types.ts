import { TLngLat } from "@components/Events/types";

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

export type TTagMap = {
  id: string;
  post_ids: string;
  tag_ids: string[];
}

export type IEvent = {
  event_id?: string;
  location?: string;
  coords?: string;
  created_at?: string;
  updated_at?: string;
  time?: string;
  title?: string;
  content?: any;
  visibility?: string;
}