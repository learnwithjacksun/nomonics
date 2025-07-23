import { comicCategories } from "@/constants/data";
import { toMB } from "@/helpers/toMb";
import { BookOpen, BookPlus, FileText, ImagePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { InputWithIcon, ButtonWithLoader, SelectWithIcon } from "../ui";
import MultiSelect from "../ui/MultiSelect";

const ExistingUpload = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
  
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
  return (
   <>
   <form className="space-y-6">
    <SelectWithIcon
    label="Select Comic"
    options={[{label: "Comic 1", value: "comic-1"}, {label: "Comic 2", value: "comic-2"}, {label: "Comic 3", value: "comic-3"}]}
   
    icon={<BookPlus size={16} />}
    />
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
                  <div className="space-y-4">
                    <div>
                      <p className="text-muted text-sm">
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
                      className=" text-sm bg-red-500/10 text-red-500 rounded-md px-2 py-1"
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
            <h3 className="text-lg font-medium">Episode Details</h3>
            <p className="text-sm text-muted">
              Please fill in the details of the episode.
            </p>
          </div>

          <InputWithIcon
            icon={<BookOpen size={16} />}
            type="text"
            label="Episode Subtitle"
            placeholder="Episode Subtitle"
          />

          <MultiSelect
            label="Add Tags"
            options={comicCategories}
            selected={categories}
            onChange={setCategories}
          />

          <div className="space-y-1">
            <label
              htmlFor="description"
              className="text-sm text-muted font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={5}
              placeholder="Episode synopsis"
              className="p-4 w-full rounded-lg text-sm mt-1 border border-line focus:border-primary focus:ring-[3px] focus:ring-primary/20 dark:bg-secondary"
            ></textarea>
          </div>
        </div>
        <ButtonWithLoader
              loading={false}
              initialText="Upload"
              loadingText="Uploading..."
              type="submit"
              className="w-full h-11 rounded-md btn-primary mb-10"
            />
      </form>
   </>
  )
}

export default ExistingUpload;