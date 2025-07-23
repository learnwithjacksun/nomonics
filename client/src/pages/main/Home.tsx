import { MainLayout } from "@/layouts"
import { Hero, NewReleases, Banner, MostViewed, FreeComic } from "@/components/main"

const Home = () => {
  return (
    <MainLayout>
        <Hero/>
        <NewReleases/>
        <Banner/>
        <MostViewed/>
        <FreeComic/>
    </MainLayout>
  )
}

export default Home