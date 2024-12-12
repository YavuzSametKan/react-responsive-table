import { BsThreeDotsVertical } from "react-icons/bs";

const TableMobile = ({
    head,
    body,
    selectable = false,
    selectedRows = [],
    toggleRowSelection = () => {},
    toggleSelectAll = () => {},
    isAllSelected = false,
    activeMenuIndex = null,
    toggleMenu = () => {},
    onDelete = () => {},
    onUpdate = () => {},
    onDetail = () => {}
}) => {
    return (
        <div className="flex flex-col space-y-4">
            {/* Select All Checkbox */}
            {selectable && (
                <div className="flex justify-end">
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

            {/* Render Each Row as a Card */}
            {body.length > 0 ? (
                body.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        className="border rounded-md shadow-sm bg-white rounded-md overflow-hidden relative"
                    >
                        {/* Row Header */}
                        <header className={`w-full h-12 flex items-center ${selectable ? "justify-between" : "justify-end"} px-3 bg-brand-green text-white`}>
                            {selectable && (
                                <div className="inline-flex justify-end">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(rowIndex)}
                                            onChange={() => toggleRowSelection(rowIndex)}
                                            className="form-checkbox"
                                        />
                                        <span>Seç</span>
                                    </label>
                                </div>
                            )}
                            <div
                                className="inline-flex size-8 bg-white text-gray-700 rounded-full items-center justify-center"
                                onClick={() => toggleMenu(rowIndex)}
                            >
                                <BsThreeDotsVertical/>
                            </div>
                            {activeMenuIndex === rowIndex && (
                                <div className="absolute right-0 top-12 bg-white shadow-md rounded-md p-2 z-10">
                                    <button
                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-blue-500"
                                        onClick={() => onUpdate(rowIndex)}
                                    >
                                        Güncelle
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                                        onClick={() => onDelete(rowIndex)}
                                    >
                                        Sil
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-brand-green"
                                        onClick={() => onDetail(rowIndex)}
                                    >
                                        Detaylar
                                    </button>
                                </div>
                            )}
                        </header>

                        {/* Row Data */}
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
                ))
            ) : (
                <div className="text-center text-gray-500">Veri Bulunamadı.</div>
            )}
        </div>
    );
};

export default TableMobile;
