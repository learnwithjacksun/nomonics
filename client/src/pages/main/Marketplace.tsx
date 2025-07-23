import { Breadcrumb, Void } from "@/components/ui"
import { MainLayout } from "@/layouts"

const Marketplace = () => {
    return (
        <MainLayout>
            <div className="main py-10">
                <Breadcrumb title="Marketplace" link="/marketplace" />
            </div>

            <Void/>
        </MainLayout>
  )
}

export default Marketplace