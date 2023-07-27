import { Image } from "@hooks/useImagePicker";

export type ProfileDTO = {
  name: string;
  nickname: string;
  favorite_sport: string;
  favorite_time: string;
};

export type ChangeAvatarDTO = {
  avatar: Image;
};
