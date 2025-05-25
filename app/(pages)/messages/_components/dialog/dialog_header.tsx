import { User } from "@/app/types/user";
import { DefaultAccount, More } from "@/app/components/icons";
import Image from "next/image";
import { DropDownMenu, ErrorMessage } from "@/app/components/ui";
import Link from "next/link";
import { useAuth } from "@/app/context/auth_context";

interface DialogHeaderProps {
  otherUser: User | null;
  isLoading?: boolean;
}

const DialogHeader: React.FC<DialogHeaderProps> = ({ otherUser }) => {
  const { user } = useAuth();

  const menuItems1 = [
    { label: "Пригласить\nв стартап", href: "/invitations/" },
  ];

  const menuItems2 = [
    { label: "Пригласить\nв стартап", href: "/invitations/" },
    { label: "Удалить", href: `/messages/${otherUser?.user_id}`, color: "red" },
  ];

  const menuDropDown = () => {
    return (
      <DropDownMenu
        icon={<More />}
        options={
          user?.role === "startup" && otherUser?.role === "specialist"
            ? menuItems1
            : menuItems2
        }
        position="bottom-left"
        variant="tertiary"
      />
    );
  };

  return (
    <div className="absolute top-0 bo z-10 bg-base-0 rounded-[16px] p-2  flex w-full items-center gap-2 justify-between">
      <div className="flex items-center">
        {otherUser && (
          <>
            <div className="w-10 h-10 rounded-full mr-2 text-prime-500">
              {otherUser.avatar ? (
                <Link href={`/profile/${otherUser.user_id}`} passHref>
                  <Image
                    src={otherUser.avatar}
                    alt={`Avatar of ${otherUser.full_name}`}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </Link>
              ) : (
                <Link href={`/profile/${otherUser.user_id}`} passHref>
                  <DefaultAccount size={40} />
                </Link>
              )}
            </div>
            <h2 className="text-body-m font-medium text-base-800">
              {otherUser.full_name}
            </h2>
          </>
        )}
      </div>

      <div className="flex flex-row gap-1">{menuDropDown()}</div>
    </div>
  );
};

export default DialogHeader;
