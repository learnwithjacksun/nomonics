import { Breadcrumb, Void } from "@/components/ui"
import { MainLayout } from "@/layouts"

const ReelFlow = () => {
  return (
    <MainLayout>
        <div className="main py-10">
            <Breadcrumb title="Reel Flow" link="/reel-flow" />
        </div>

        <Void/>
    </MainLayout>
  )
}   

export default ReelFlow;