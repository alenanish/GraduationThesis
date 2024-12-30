import { Navbar } from "./_components/navbar"

export default function MainLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <>
    <Navbar />
    <div>{children}</div>
    
    </>
  }