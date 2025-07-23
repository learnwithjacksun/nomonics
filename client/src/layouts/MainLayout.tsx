import { Footer, Header } from "@/components/main"

const MainLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
    <Header/>
    <main className="">
        {children}
    </main>
    <Footer/>
    </>
  )
}

export default MainLayout