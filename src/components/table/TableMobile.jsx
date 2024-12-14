import { BsThreeDotsVertical } from "react-icons/bs"
import Transactions from "./Transactions.jsx"

const TableMobile = ({
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
    hasActions
}) => {
    return (
        // Container
        <div className="flex flex-col overflow-y-auto">
            {/* Select All */}
            {selectable && (
                <div className="flex justify-end mb-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={toggleSelectAll}
                            className="form-checkbox"
                        />
                        <span>Tümünü Seç</span>
                    </label>
                </div>
            )}

            {/* Table */}
            {body.length > 0 ? (
                <section className="overflow-y-auto scroll-smooth scroll-hidden">
                {body.map(({ row, originalIndex }, i) => (
                    <div
                        key={i}
                        className="border rounded-md shadow-sm bg-white overflow-hidden relative mb-5"
                    >
                        {/* Header */}
                        <header className={`w-full h-12 flex items-center ${selectable ? "justify-between" : "justify-end"} px-3 bg-brand-green text-white`}>

                            {/* Selections */}
                            {selectable && (
                                <div className="inline-flex justify-end">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(i)}
                                            onChange={() => toggleRowSelection(i)}
                                            className="form-checkbox"
                                        />
                                        <span>Seç</span>
                                    </label>
                                </div>
                            )}

                            {/* Transactions */}
                            {hasActions && (
                                <>
                                    <span
                                        className="inline-flex size-8 bg-white text-gray-700 rounded-full items-center justify-center"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            toggleMenu(i)
                                        }}
                                    >
                                        <BsThreeDotsVertical/>
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
                                </>
                            )}
                        </header>

                        {/* Datas */}
                        <ul>
                            {row.map((cell, cellIndex) => (
                                <li
                                    key={cellIndex}
                                    className={`flex items-center min-h-10 px-3 text-sm ${cellIndex % 2 !== 0 && "bg-brand-shade-green"}`}
                                >
                                    <span className="font-bold min-w-[40%]">
                                        {head[cellIndex]?.title}:
                                    </span>
                                    <span className="min-w-[70%]">
                                        {cell && typeof cell === "object" && "content" in cell
                                            ? cell.content
                                            : cell || "---"}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                </section>
            ) : (
                // Not Found Data
                <div className="text-center text-gray-500">Veri Bulunamadı.</div>
            )}
        </div>
    )
}

export default TableMobile
