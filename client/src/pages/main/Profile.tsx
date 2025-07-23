import {
  ButtonWithLoader,
  InputWithIcon,
  SelectWithIcon,
} from "@/components/ui";
import { useAuth } from "@/hooks";
import { MainLayout } from "@/layouts";
import {
  ImagePlus,
  Mail,
  MapPin,
  Phone,
  Sparkle,
  UserRound,
  UserRoundCheck,
  Venus,
} from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileSchema } from "@/schemas/profile";
import { useEffect } from "react";
import CountUp from "react-countup";

const Profile = () => {
  const { user } = useAuth();
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
    console.log(data);
  };

  return (
    <>
      <MainLayout>
       

        <div className="layout p-6 bg-white rounded-2xl border border-line space-y-4 my-10">
          <div className="flex items-center gap-4 flex-col md:flex-row">
            <div className="h-24 w-24 rounded-full overflow-hidden">
              <img
                src={
                  user?.avatar ||
                  `https://api.dicebear.com/9.x/initials/svg?seed=${user?.name}`
                }
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1 text-center md:text-left">
              <p className="text-2xl font-bold">{user?.name}</p>
              <p className="text-sm text-muted">@{user?.username}</p>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Sparkle size={20} className="text-primary" />
                <p className="capitalize">{user?.role}</p>
              </div>
            </div>

            <input type="file" id="avatar-input" className="hidden" />

            <button
              onClick={() => {
                // document.getElementById("avatar-input")?.click();
                toast.warning("This feature is not available yet");
              }}
              className="md:ml-auto border border-line h-11 px-4 rounded-lg"
            >
              <ImagePlus size={20} />
              <p>Change Avatar</p>
            </button>
          </div>
        </div>

        <div className="layout bg-white  grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
          <div className="space-y-1 rounded-2xl border border-line p-6">
            <p className="text-sm text-muted">Earnings</p>
            <p className="text-2xl font-bold">
              &#8358; <CountUp end={user?.earnings || 0} separator="," decimals={2} decimalPlaces={2} />
            </p>
          </div>
          <div className="space-y-1 rounded-2xl border border-line p-6">
            <p className="text-sm text-muted">Total Comics</p>
            <p className="text-2xl font-bold">
              <CountUp end={user?.totalComics || 0} separator="," />
            </p>
          </div>
        </div>

        <div className="layout p-6 bg-white rounded-2xl border border-line space-y-4 mb-10">
          <h3 className="text-lg font-bold">Profile Information</h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <InputWithIcon
              icon={<UserRound size={20} />}
              type="text"
              label="Full Name"
              {...register("name")}
              error={errors.name?.message}
            />
            <InputWithIcon
              icon={<UserRoundCheck size={20} />}
              type="text"
              label="Username"
              {...register("username")}
              error={errors.username?.message}
            />
            <InputWithIcon
              icon={<Mail size={20} />}
              type="email"
              label="Email Address"
              {...register("email")}
              error={errors.email?.message}
            />
            <InputWithIcon
              icon={<Phone size={20} />}
              type="text"
              label="Phone Number"
              placeholder="081234567890"
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
            <ButtonWithLoader
              type="submit"
              className="md:col-span-2 bg-primary h-11 rounded-lg"
              initialText="Save Changes"
              loadingText="Saving..."
            />
          </form>
        </div>
      </MainLayout>
    </>
  );
};

export default Profile;
