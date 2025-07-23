import { Breadcrumb, Void } from "@/components/ui"
import { MainLayout } from "@/layouts"

const Genre = () => {
  return (
    <MainLayout>
        <div className="main py-10">
            <Breadcrumb title="Genre" link="/genre" />
        </div>

        <Void/>
    </MainLayout>
  )
}

export default Genre