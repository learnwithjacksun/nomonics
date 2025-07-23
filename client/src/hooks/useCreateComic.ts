import api from "@/config/api";
import { BUCKET, storage } from "@/config/appwrite";
import onError from "@/helpers/axiosError";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ID } from "appwrite";
import type { AxiosError } from "axios";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const cloud_name = import.meta.env.VITE_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;

const useCreateComic = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createNewComic = async (data: INewComicData) => {
    setLoading(true);
    try {
      const formDataPdf = new FormData();
      formDataPdf.append("file", data.pdf);
      formDataPdf.append("upload_preset", upload_preset);

      let imageId;
      let imageView;
      let coverImageUrl;

      if (data.image) {
        const formDataImage = new FormData();
        formDataImage.append("file", data.image as File);
        formDataImage.append("upload_preset", upload_preset);

        const uploadImage = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formDataImage
        );
        imageView = uploadImage.data.secure_url;
        imageId = uploadImage.data.public_id;
      }

      const uploadPdf = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formDataPdf
      );

      const publicId = uploadPdf.data.public_id;

      if (!data.image) {
        coverImageUrl = `https://res.cloudinary.com/${cloud_name}/image/upload/pg_1/w_600,f_auto/${publicId}.jpg`;
      }

      const fileRes = await storage.createFile(BUCKET, ID.unique(), data.pdf);
      const fileId = fileRes.$id;
      const pdfView = storage.getFileView(BUCKET, fileId);

      const comicData = {
        title: data.title,
        description: data.description,
        pdf: pdfView,
        pdfId: fileId,
        coverImage: coverImageUrl || imageView,
        imageId,
        categories: data.categories,
        creatorId: user?.id,
      };

      const response = await api.post("/comics/create/new", comicData);

      if (response.data.success) {
        toast.success("Comic created successfully");
        queryClient.invalidateQueries({ queryKey: ["comics"] });
        navigate(`/creator/collections`);
        return response.data.success;
      } else {
        toast.error("Failed to create comic");
        return null;
      }
    } catch (error) {
      onError(error as Error | AxiosError);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getComics = async () => {
    try {
      const response = await api.get("/comics/all");
      if (response.data.success) {
        return response.data.comics;
      } else {
        toast.error("Failed to get comics");
        return null;
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    }
  };

  const getEpisodesByComicId = async (comicId: string) => {
    try {
      const response = await api.get(`/comics/episodes/${comicId}`);
      if (response.data.success) {
        return response.data.episodes;
      } else {
        toast.error("Failed to get episodes");
        return null;
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    }
  };

  const {
    data: comics,
    isLoading: comicsLoading,
    isSuccess: comicsSuccess,
  } = useQuery<IComic[]>({
    queryKey: ["comics"],
    queryFn: getComics,
  });

  return {
    createNewComic,
    getEpisodesByComicId,
    loading,
    comics,
    comicsLoading,
    comicsSuccess,
  };
};

export default useCreateComic;
