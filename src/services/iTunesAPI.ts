import axios from "axios";
import type { ItunesTypes } from "../types/ItunesTypes.interface";

export const itunesSearch = async(search: string): Promise<ItunesTypes> => {
  const queryParameter = "search?term=" + search + "&entity=album";
  const res = axios.get(
    `https://itunes.apple.com/${queryParameter}`
  );
  return (await res).data;
};