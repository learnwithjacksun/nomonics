import { useAuth } from "@/hooks";
import {
  Camera,
  Mail,
  MapPin,
  Phone,
  User,
  UserRoundCheck,
  Venus,
} from "lucide-react";
import { ButtonWithLoader, InputWithIcon, SelectWithIcon } from "../ui";
import { type ProfileSchema, profileSchema } from "@/schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const PersonalInfo = () => {
  const { user } = useAuth();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
      });
    }
  }, [reset, user]);

  const onSubmit = (data: ProfileSchema) => {
    console.log(data, image);
  };
  return (
    <div className="border border-line rounded-2xl p-6">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="image">
            <input type="file" name="image" id="image" className="hidden" onChange={handleImageChange} />
            <div className="h-24 w-24 mx-auto rounded-full overflow-hidden relative group cursor-pointer">
              <img
                src={imagePreview || user?.avatar || `https://api.dicebear.com/9.x/initials/svg?seed=${user?.name}`}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute h-full w-full top-0 left-0 bg-black/50 rounded-full items-center justify-center hidden group-hover:flex text-white">
                <Camera size={20} />
              </div>
            </div>
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <InputWithIcon
            icon={<User size={20} />}
            label="Display Name"
            placeholder="Enter your name"
            type="text"
            {...register("name")}
            error={errors.name?.message}
          />
          <InputWithIcon
            icon={<UserRoundCheck size={20} />}
            type="text"
            label="Username"
            placeholder="Enter your username"
            {...register("username")}
            error={errors.username?.message}
          />
          <InputWithIcon
            icon={<Mail size={20} />}
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />
          <InputWithIcon
            icon={<Phone size={20} />}
            label="Phone Number"
            placeholder="Enter your phone number"
            type="text"
            {...register("phone")}
            error={errors.phone?.message}
          />
          <InputWithIcon
            icon={<MapPin size={20} />}
            type="text"
            label="Address"
            placeholder="Jl. Raya No. 123"
            {...register("address")}
            error={errors.address?.message}
          />
          <SelectWithIcon
            icon={<Venus size={20} />}
            label="Gender"
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "LGBTQ+", value: "lgbtq" },
            ]}
            {...register("gender")}
            error={errors.gender?.message}
          />
        </div>
        <ButtonWithLoader
              type="submit"
              className="bg-primary h-11 rounded-lg w-full"
              initialText="Save Changes"
              loadingText="Saving..."
            />
      </form>
    </div>
  );
};

export default PersonalInfo;
