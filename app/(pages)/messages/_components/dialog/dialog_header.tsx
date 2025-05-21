import { User } from "@/app/types/user"; // Replace with your actual User type
import { DefaultAccount, More } from "@/app/components/icons"; // Assuming you have this component
import Image from "next/image";
import Loading from "@/app/components/ui/custom/loading";
import { DropDownMenu, ErrorMessage } from "@/app/components/ui";
import Link from "next/link";

interface DialogHeaderProps {
  user: User | null;
  isLoading?: boolean;
}

const DialogHeader: React.FC<DialogHeaderProps> = ({ user, isLoading }) => {
  const profileItems = [
    { label: "Пригласить\nв стартап", href: "/invitations/" },
    { label: "Удалить", href: `/messages/${user?.user_id}`, color: "red" },
  ];

  const profileDropDown = () => {
    return (
      <DropDownMenu
        icon={<More />}
        options={profileItems}
        position='bottom-left'
        variant="tertiary"
      />
    );
  };

  return (
    <div className="absolute top-0 z-10 bg-base-0 rounded-[16px] p-2  flex w-full items-center gap-2 justify-between">
      <div className="flex items-center">
        {isLoading ? (
          <Loading />
        ) : user ? (
          <>
            <div className="w-10 h-10 rounded-full overflow-hidden mr-2 text-prime-500">
              {user.avatar ? (
                <Link href={`/profile/${user.user_id}`} passHref>
                  <Image
                    src={user.avatar}
                    alt={`Avatar of ${user.full_name}`}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </Link>
              ) : (
                <Link href={`/profile/${user.user_id}`} passHref>
                  <DefaultAccount size={40} />
                </Link>
              )}
            </div>
            <h2 className="text-body-m font-medium text-base-800">
              {user.full_name}
            </h2>
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="flex flex-row gap-1">{profileDropDown()}</div>
    </div>
  );
};

export default DialogHeader;
