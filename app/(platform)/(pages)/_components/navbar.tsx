import Link from "next/link";


export const Navbar = ( ) => {

    const Buttons = [
        {title: "Главная", path: "/home"},
        {title: "Стартапы", path: "/startup"},
        {title: "Инвесторы", path: "/investor"},
        {title: "Специалисты", path: "/specialist"},
        {title: "Аккаунт", path: "/account"},
        {title: "Чат", path: "/chat"},
    
            
    ]
   

    return (
        <nav className="flex w-full flex-row items-start p-0 gap-3 relative">                
        {
            Buttons.map((button, index) => (
                <Link href={button.path}>{button.title}</Link>
            ))
                        
        }
        </nav>
    );
};

