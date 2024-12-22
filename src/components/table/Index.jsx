import {useState, useEffect} from "react"
import TableMobile from "./TableMobile.jsx"
import useMediaQuery from "../../hooks/useMediaQuery.js"
import TableDesktop from "./TableDesktop.jsx"

const SortOrder = { // SortOrder Enum
    ASC: "ASC",
    DESC: "DESC",
    NONE: null,
}

const Table = ({
    head = [],
    body = [],
    searchable = false,
    selectable = false,
    onDelete = null,
    onUpdate = null,
    onDetail = null,
    textSize = "text-md"
}) => {

    const [search, setSearch] = useState('')
    const [sorting, setSorting] = useState({key: null, orderBy: SortOrder.NONE})
    const [selectedRows, setSelectedRows] = useState([])
    const [activeMenuIndex, setActiveMenuIndex] = useState(null) // To manage which row's menu is open

    const objectToArray = (data) =>
        data.map(d => Object.values(d))

    const parseUnvisibleData = (data) =>
        data.map(row =>
            row.filter(item =>
                !(typeof item === "object" && item?.data && item?.visibility === false)
            )
        )

    const filteredData = parseUnvisibleData(objectToArray(body))
        .map((row, index) => ({ row, originalIndex: index })) // original index
        .filter(({ row }) =>
            row.some(value => {
                const searchableContent =
                    typeof value === "object" && value?.searchableText
                        ? value.searchableText.toString()
                        : value?.toString()
                return searchableContent
                    ?.toLocaleLowerCase("TR")
                    .includes(search.toLocaleLowerCase("TR"))
            })
        )
        .sort((a, b) => {
            if (sorting?.orderBy === SortOrder.ASC) {
                return a.row[sorting.key]?.toString()?.localeCompare(b.row[sorting.key])
            } else if (sorting?.orderBy === SortOrder.DESC) {
                return b.row[sorting.key]?.toString()?.localeCompare(a.row[sorting.key])
            }
        })

    const handleSort = (index, sortable) => {
        if (!sortable) return
        setSorting(prev => {
            if (prev.key === index) {
                if (prev.orderBy === SortOrder.ASC) return {key: index, orderBy: SortOrder.DESC} // ASC -> DESC
                if (prev.orderBy === SortOrder.DESC) return {key: null, orderBy: SortOrder.NONE}  // DESC -> Sorting Off
            }
            return {key: index, orderBy: SortOrder.ASC} // Default ASC
        })
    }

    const toggleRowSelection = (index) => {
        setSelectedRows((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index) // Deselect
                : [...prev, index] // Select
        )
    }

    const isRowSelected = (index) => selectedRows.includes(index)

    const toggleSelectAll = () => {
        if (selectedRows.length === filteredData.length) {
            setSelectedRows([]) // Deselect all
        } else {
            setSelectedRows(filteredData.map((_, index) => index)) // Select all
        }
    }

    const isAllSelected =
        filteredData.length > 0 && selectedRows.length === filteredData.length

    const isMobile = useMediaQuery("(max-width: 768px)")

    const toggleMenu = (index) => {
        if (activeMenuIndex === index) {
            setActiveMenuIndex(null)
        } else {
            setActiveMenuIndex(index)
        }
    }

    const handleOutsideClick = (event) => {
        if (!event.target.closest(".table-transactions")) {
            setActiveMenuIndex(null)
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick)
        return () => {
            document.removeEventListener("click", handleOutsideClick)
        }
    }, [])

    const hasActions = (onDelete || onUpdate || onDetail) ? true : false

    return (
        // Container
        <section className="max-h-screen flex flex-col p-6">
            {/* Search Area */}
            {searchable && (
                <div className="flex justify-center items-center mb-4 h-20 flex-shrink-0">
                    <input
                        type="search"
                        placeholder="Tabloda Ara..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="px-4 py-2 w-1/3 max-md:w-full rounded-md focus:outline-brand-green border-2 border-gray-300"
                    />
                </div>
            )}

            {/* Table Area */}
            {isMobile ? (
                // Mobile Table
                <TableMobile
                    head={head}
                    body={filteredData}
                    rawBody={body}
                    selectable={selectable}
                    selectedRows={selectedRows}
                    toggleRowSelection={toggleRowSelection}
                    toggleSelectAll={toggleSelectAll}
                    isAllSelected={isAllSelected}
                    activeMenuIndex={activeMenuIndex}
                    toggleMenu={toggleMenu}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    onDetail={onDetail}
                    handleSort={handleSort}
                    sorting={sorting}
                    isRowSelected={isRowSelected}
                    hasActions={hasActions}
                />
            ) : (
                // Desktop Table
                <TableDesktop
                    head={head}
                    body={filteredData}
                    rawBody={body}
                    selectable={selectable}
                    selectedRows={selectedRows}
                    toggleRowSelection={toggleRowSelection}
                    toggleSelectAll={toggleSelectAll}
                    isAllSelected={isAllSelected}
                    activeMenuIndex={activeMenuIndex}
                    toggleMenu={toggleMenu}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    onDetail={onDetail}
                    handleSort={handleSort}
                    sorting={sorting}
                    isRowSelected={isRowSelected}
                    hasActions={hasActions}
                    textSize={textSize}
                />
            )}
        </section>
    )
}

export default Table