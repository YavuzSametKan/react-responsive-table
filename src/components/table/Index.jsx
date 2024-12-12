import {useState} from "react";
import {CgSortAz} from "react-icons/cg";
import {CgSortZa} from "react-icons/cg";
import PropTypes from "prop-types";
import TableMobile from "./TableMobile.jsx";
import useMediaQuery from "../../hooks/useMediaQuery.js";
import {BsThreeDotsVertical} from "react-icons/bs";

const SortOrder = { // SortOrder Enum
    ASC: "ASC",
    DESC: "DESC",
    NONE: null,
}

const Table = ({
    head,
    body,
    searchable = false,
    selectable = false,
    onDelete = () => {},
    onUpdate = () => {},
    onDetail = () => {}
}) => {

    const [search, setSearch] = useState('')
    const [sorting, setSorting] = useState({key: null, orderBy: SortOrder.NONE})
    const [selectedRows, setSelectedRows] = useState([])
    const [activeMenuIndex, setActiveMenuIndex] = useState(null); // To manage which row's menu is open

    const filteredData = body
        .filter(items =>
            items.some(item => {
                const searchableContent =
                    typeof item === "object" && item?.searchableText // Is object?
                        ? item.searchableText.toString()
                        : item?.toString()
                return searchableContent
                    ?.toLocaleLowerCase("TR")
                    .includes(search.toLocaleLowerCase("TR"))
            })
        )
        .sort((a, b) => {
            if (sorting?.orderBy === SortOrder.ASC) {
                return a[sorting.key]?.toString()?.localeCompare(b[sorting.key])
            } else if (sorting?.orderBy === SortOrder.DESC) {
                return b[sorting.key]?.toString()?.localeCompare(a[sorting.key])
            }
        })

    const handleSort = (index, sortable) => {
        if (!sortable) return
        setSorting(prev => {
            if (prev.key === index) {
                if (prev.orderBy === SortOrder.ASC) return {key: index, orderBy: SortOrder.DESC} // ASC -> DESC
                if (prev.orderBy === SortOrder.DESC) return {key: null, orderBy: SortOrder.NONE}  // DESC -> Sorting Off
            }
            return {key: index, orderBy: SortOrder.ASC}; // Default ASC
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
        setActiveMenuIndex((prev) => (prev === index ? null : index))
    }

    return (
        <>
            {/* Search Area */}
            {searchable && (
                <div className="flex justify-center mb-6">
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
                <TableMobile
                    head={head}
                    body={filteredData}
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
                />
            ) : (
            // Default Table (Desktop)
            <table
                className="w-full"
            >
                <thead className="bg-brand-green h-14">
                <tr>
                    {/* Select All Items Area */}
                    {selectable && (
                        <th>
                            <input
                                type="checkbox"
                                checked={isAllSelected}
                                onChange={toggleSelectAll}
                            />
                        </th>
                    )}
                    {head.map((h, i) => (
                        <th
                            key={i}
                            width={h?.width}
                            className={`text-white text-sm ${h.sortable && "cursor-pointer"}`}
                            onClick={() => handleSort(i, h.sortable)}
                        >
                            <div className="flex items-center justify-center">
                                <span
                                    className={h.sortable && "hover:underline decoration-dashed decoration-brand-shade-green"}>{h.title}</span>
                                {sorting.key === i && sorting.orderBy === 'ASC' && <CgSortZa className="size-6"/>}
                                {sorting.key === i && sorting.orderBy === 'DESC' && <CgSortAz className="size-6"/>}
                            </div>
                        </th>
                    ))}
                    <th className="text-white">İşlemler</th>
                </tr>
                </thead>
                {filteredData.length !== 0 ? (
                    <tbody>
                    {filteredData.map((items, i) => (
                        <tr
                            key={i}
                            className={`h-12 even:bg-brand-shade-green odd:bg-white text-center text-sm transition-colors duration-300 border-b border-dotted border-b-transparent ${
                                isRowSelected(i) ? "!bg-green-200 text-brand-green !border-b-brand-green" : ""
                            }`}
                        >
                            {/* Select Item Area */}
                            {selectable && (
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={isRowSelected(i)}
                                        onChange={() => toggleRowSelection(i)}
                                    />
                                </td>
                            )}
                            {items.map((item, i) => (
                                <td key={i}>
                                    {item && typeof item === "object" && "content" in item
                                        ? item.content
                                        : item || "---"}
                                </td>
                            ))}
                            <td className="relative">
                                <span
                                    className="inline-flex items-center justify-center cursor-pointer size-8 rounded-full bg-brand-green transition-transform hover:rotate-90"
                                    onClick={() => toggleMenu(i)}
                                >
                                    <BsThreeDotsVertical className="cursor-pointer size-4 text-white"/>
                                </span>
                                {activeMenuIndex === i && (
                                    <div className="absolute right-0 bg-white shadow-md rounded-md p-2 z-10">
                                        <button
                                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-blue-500"
                                            onClick={() => onUpdate(i)}
                                        >
                                            Güncelle
                                        </button>
                                        <button
                                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                                            onClick={() => onDelete(i)}
                                        >
                                            Sil
                                        </button>
                                        <button
                                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-brand-green"
                                            onClick={() => onDelete(i)}
                                        >
                                            Detaylar
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                ) : (
                    <tbody>
                    <tr>
                        <td
                            colSpan={head.length + (selectable ? 1 : 0) + ((onUpdate || onDelete || onDetail) ? 1 : 0)} // Ensure it spans all columns
                            className="text-center h-12 bg-brand-shade-green"
                        >
                            Veri Bulunamadı.
                        </td>
                    </tr>
                    </tbody>
                )}
            </table>
            )}
        </>
    )
}

// PropTypes definition
Table.propTypes = {
    head: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired, // Column title
            width: PropTypes.number, // Column width (optional)
            sortable: PropTypes.bool, // Is column sortable? (optional)
        })
    ).isRequired,
    body: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.any,
                PropTypes.shape({
                    content: PropTypes.node, // React node for custom content
                    searchableText: PropTypes.string, // Text used for searching
                }),
            ])
        )
    ).isRequired,
    searchable: PropTypes.bool, // Is search enabled?
    selectable: PropTypes.bool, // Is row selection enabled?
}

export default Table;