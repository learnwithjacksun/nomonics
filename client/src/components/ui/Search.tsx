import { SearchIcon } from "lucide-react"

interface SearchProps{
    search: string
    setSearch: (search: string) => void,
    placeholder?: string
}

const Search = ({search, setSearch, placeholder = "Search"}: SearchProps) => {
  return (
    <div className=" rounded-full flex items-center px-4 bg-foreground gap-2">
        <SearchIcon className="text-muted"/>
        <input type="text" placeholder={placeholder}  value={search} onChange={(e) => setSearch(e.target.value)} className="outline-none h-11 text-sm w-full md:w-[400px]" />
    </div>
  )
}

export default Search