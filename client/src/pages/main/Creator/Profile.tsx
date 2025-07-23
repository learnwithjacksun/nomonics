import { PersonalInfo } from "@/components/creator";
import { Void } from "@/components/ui";
import { DashboardLayout } from "@/layouts";
import clsx from "clsx";
import { Building2, Lock, User } from "lucide-react";
import { useState } from "react";

const profileTabs = [
  {
    id: "personal",
    label: "Personal Info",
    icon: User,
  },
  {
    id: "bank",
    label: "Bank Details",
    icon: Building2,
  },
  {
    id: "security",
    label: "Security",
    icon: Lock,
  },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  return (
    <DashboardLayout title="Profile" description="Manage your profile">
      <div className="flex items-center gap-4 flex-wrap">
        {profileTabs.map((x, y) => (
          <div
            key={y}
            className={clsx(
              "flex items-center text-sm gap-2 cursor-pointer border-b-2 pb-2 px-4",
              activeTab === x.id
                ? "text-secondary font-medium border-secondary"
                : "text-muted border-transparent"
            )}
            onClick={() => setActiveTab(x.id)}
          >
            <x.icon size={18} />
            <p>{x.label}</p>
          </div>
        ))}
      </div>

      {activeTab === "personal" && <PersonalInfo />}
      {activeTab === "bank" && <Void />}
      {activeTab === "security" && <Void />}
    </DashboardLayout>
  );
};

export default Profile;
