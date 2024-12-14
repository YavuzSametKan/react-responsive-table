import {CgSortAz, CgSortZa} from "react-icons/cg"
import {BsThreeDotsVertical} from "react-icons/bs"
import Transactions from "./Transactions.jsx"

const TableDesktop = ({
    head,
    body,
    rawBody,
    selectable,
    selectedRows,
    toggleRowSelection,
    toggleSelectAll,
    isAllSelected,
    activeMenuIndex,
    toggleMenu,
    onDelete,
    onUpdate,
    onDetail,
    handleSort,
    sorting,
    isRowSelected,
    hasActions,
    textSize
}) => {
    return (
        // Table Container
        <section className="flex-grow overflow-y-auto scroll-smooth table-scroll rounded-md">
            {/* Table */}
            <table className="w-full flex-grow-0">
                {/* Header */}
                <thead className="bg-brand-green h-14 w-full">
                    <tr>
                        {selectable && (
                            <th className="sticky top-0 z-10 bg-brand-green">
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
                                className={`bg-brand-green text-white ${textSize} sticky top-0 z-10 ${h.sortable && "cursor-pointer"}`}
                                onClick={() => handleSort(i, h.sortable)}
                            >
                                <div className="flex items-center justify-center">
                                        <span
                                            className={h.sortable && "hover:underline decoration-dashed decoration-brand-shade-green"}>
                                            {h.title}
                                        </span>
                                    {sorting.key === i && sorting.orderBy === "ASC" && <CgSortZa className="size-6"/>}
                                    {sorting.key === i && sorting.orderBy === "DESC" && <CgSortAz className="size-6"/>}
                                </div>
                            </th>
                        ))}
                        {hasActions && <th className="bg-brand-green text-white sticky top-0 z-10">İşlemler</th>}
                    </tr>
                </thead>
                {/* Body */}
                {body.length ? (
                    <tbody>
                    {body.map(({row, originalIndex}, i) => (
                        <tr
                            key={i}
                            className={`h-12 even:bg-brand-shade-green odd:bg-white text-center  ${textSize} transition-colors duration-300 border-b border-dotted border-b-transparent ${
                                isRowSelected(i) ? "!bg-green-200 text-brand-green !border-b-brand-green" : ""
                            }`}
                        >
                            {/* Selections */}
                            {selectable && (
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={isRowSelected(i)}
                                        onChange={() => toggleRowSelection(i)}
                                    />
                                </td>
                            )}

                            {/* Datas */}
                            {row.map((item, index) => (
                                <td key={index}>
                                    {item && typeof item === "object" && "content" in item
                                        ? item.content
                                        : item || "---"}
                                </td>
                            ))}

                            {/* Transactions */}
                            {hasActions && (
                                <td className="relative">
                                    <span
                                        className="table-transactions inline-flex items-center justify-center cursor-pointer size-8 rounded-full bg-brand-green transition-transform hover:rotate-90"
                                        onClick={() => toggleMenu(i)}
                                    >
                                        <BsThreeDotsVertical className="cursor-pointer size-4 text-white"/>
                                    </span>
                                    {activeMenuIndex === i && (
                                        <Transactions
                                            onDelete={onDelete}
                                            onUpdate={onUpdate}
                                            onDetail={onDetail}
                                            rawBody={rawBody}
                                            originalIndex={originalIndex}
                                        />
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                ) : (
                    // Not Found Data
                    <tbody>
                        <tr>
                            <td
                                colSpan={head.length + (selectable ? 1 : 0) + (hasActions ? 1 : 0)}
                                className="text-center h-12 bg-brand-shade-green"
                            >
                                Veri Bulunamadı.
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
        </section>
    )
}

export default TableDesktop
