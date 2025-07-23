import { Link } from "react-router-dom"

interface BreadcrumbProps {
    title: string
    link: string,
    previous?: string
    previousLink?: string
}

const Breadcrumb = ({title, link, previous="Home", previousLink="/"}: BreadcrumbProps) => {
  return (
    <div>
        <div className="flex items-center gap-1 font-semibold">
            <Link to={previousLink} className="text-muted">{previous}</Link>
            <span>/</span>
            <Link to={link} className="text-main">{title}</Link>
        </div>
    </div>
  )
}

export default Breadcrumb