import { Breadcrumb, Void } from "@/components/ui"
import { MainLayout } from "@/layouts"

const Ecomics = () => {
  return (
    <MainLayout>
        <div className="main py-10">
            <Breadcrumb title="E-Comics" link="/ecomics" />
        </div>

        <Void/>
    </MainLayout>
  )
}

export default Ecomics