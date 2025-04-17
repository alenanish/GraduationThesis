import Link from "next/link";


export const Navbar = () => {
  const Buttons = [
    { key: 1, title: "Главная", path: "/home" },
    { key: 2, title: "Стартапы", path: "/startup" },
    { key: 3, title: "Инвесторы", path: "/investor" },
    { key: 4, title: "Специалисты", path: "/specialist" },
    { key: 5, title: "Аккаунт", path: "/account" },
    { key: 6, title: "Чат", path: "/chat" },
  ];

  return (
    <nav className="flex w-full flex-row items-start p-0 gap-3 relative">
      {Buttons.map((button, index) => (
        <Link key={button.key} href={button.path}>
          {button.title}
        </Link>
      ))}
    </nav>
  );
};
