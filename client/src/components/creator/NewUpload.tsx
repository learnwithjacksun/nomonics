import { comicCategories } from "@/constants/data";
import { toMB } from "@/helpers/toMb";
import { BookOpen, FileText, ImagePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { InputWithIcon, ButtonWithLoader } from "../ui";
import MultiSelect from "../ui/MultiSelect";
import { useCreateComic } from "@/hooks";

const NewUpload = () => {
  const {createNewComic, loading} = useCreateComic()
  const [categories, setCategories] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isPdf = file.type === "application/pdf";
      if (isPdf) {
        setFile(file);
      } else {
        toast.error("File must be a PDF");
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      setImage(image);
      setImagePreview(URL.createObjectURL(image));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload a PDF file");
      return;
    }
  
    if (!title) {
      toast.error("Please enter a title");
      return;
    }
    if (!categories.length) {
      toast.error("Please select at least one category");
      return;
    }
    if (!description) {
      toast.error("Please enter a description");
      return;
    }

    const data: INewComicData = {
      title,
      description,
      pdf: file,
      image: image || null,
      categories
    }
    const success = await createNewComic(data)
    if (success) {
     setTitle("")
     setDescription("")
     setCategories([])
     setFile(null)
     setImage(null)
     setImagePreview(null)
    }
    
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <p className="text-sm text-muted font-medium mb-2">PDF File</p>
            <label htmlFor="file">
              <input
                type="file"
                name="file"
                id="file"
                className="hidden"
                accept=".pdf"
                onChange={handleFileChange}
              />
              <div className="center flex-col gap-2 border border-dashed text-blue-400 border-blue-400 rounded-2xl bg-blue-500/10 p-4 min-h-[150px]">
                <FileText size={24} className="" />
                {!file ? (
                  <p className="text-center text-sm">
                    Click this area to upload PDF file
                  </p>
                ) : (
                  <div className="text-center">
                    <p className="text-muted text-sm">{file.name}</p>
                    <p className="text-muted text-sm">{toMB(file.size)} MB</p>
                  </div>
                )}
              </div>
            </label>
          </div>
          <div>
            <p className="text-sm text-muted font-medium mb-2">
              Cover Image (Optional)
            </p>
            <label htmlFor="image">
              <input
                type="file"
                name="image"
                id="image"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              {!image && (
                <>
                  <div className="center flex-col gap-2 border border-dashed text-secondary border-primary rounded-2xl bg-primary/10 p-4 min-h-[150px]">
                    <ImagePlus size={24} />
                    <p className="text-center text-sm">
                      Click this area to upload image
                    </p>
                  </div>
                </>
              )}

              {image && imagePreview && (
                <div className="flex items-center gap-4">
                  <div className="w-[150px] h-[150px] object-cover rounded-2xl">
                    <img
                      src={imagePreview || ""}
                      alt="image"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                  <div className="space-y-6">
                    <div>
                      <p className="text-lg">
                        {image.name.slice(0, 10)}...
                      </p>
                      <p className="text-muted text-sm">
                        {toMB(image.size)} MB
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                      className="text-sm bg-red-500/10 text-red-500 rounded-md px-2 py-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </label>
          </div>
        </div>

        <div className="space-y-6 border border-line rounded-2xl md:p-6 p-4">
          <div className="border-b border-line pb-4">
            <h3 className="text-lg font-medium">Comic Details</h3>
            <p className="text-sm text-muted">
              Please fill in the details of your comic.
            </p>
          </div>

          <InputWithIcon
            icon={<BookOpen size={16} />}
            type="text"
            label="Comic Title"
            placeholder="Comic Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <MultiSelect
            label="Add Categories"
            options={comicCategories}
            selected={categories}
            onChange={setCategories}
          />

          <div className="space-y-1">
            <label
              htmlFor="description"
              className="text-sm text-muted font-medium"
            >
              Synopsis
            </label>
            <textarea
              name="description"
              id="description"
              rows={5}
              placeholder="Comic synopsis"
              className="p-4 w-full rounded-lg text-sm border border-line focus:border-primary focus:ring-[3px] focus:ring-primary/20 dark:bg-secondary mt-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <ButtonWithLoader
          loading={loading}
          initialText="Upload"
          loadingText="Uploading..."
          type="submit"
          className="w-full h-11 rounded-md btn-primary mb-10"
        />
      </form>
    </>
  );
};

export default NewUpload;
