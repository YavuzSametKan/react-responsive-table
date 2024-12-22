import { useRef, useEffect, useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { RiDeleteBin2Line } from "react-icons/ri";

const Transactions = ({ onDelete, onUpdate, onDetail, rawBody, originalIndex }) => {
    const [openUpwards, setOpenUpwards] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const checkPosition = () => {
            if (menuRef.current) {
                const { bottom } = menuRef.current.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                setOpenUpwards(bottom > viewportHeight);
            }
        };
        checkPosition();
    }, []);

    return (
        <div
            ref={menuRef}
            className={`absolute right-0 ${
                openUpwards ? "bottom-12" : "top-12"
            } bg-white shadow-md rounded-md p-2 z-[5] drop-shadow-md`}
        >
            {onUpdate && (
                <button
                    className="flex items-center gap-x-2 w-full text-left px-4 py-2 text-md text-nowrap hover:bg-gray-100 text-blue-500"
                    onClick={() => onUpdate(rawBody[originalIndex])}
                >
                    <MdOutlineModeEditOutline />
                    <span>Güncelle</span>
                </button>
            )}
            {onDelete && (
                <button
                    className="flex items-center gap-x-2 w-full text-left px-4 py-2 text-md hover:bg-gray-100 text-red-600"
                    onClick={() => onDelete(rawBody[originalIndex])}
                >
                    <RiDeleteBin2Line />
                    <span>Sil</span>
                </button>
            )}
            {onDetail && (
                <button
                    className="flex items-center gap-x-2 w-full text-left px-4 py-2 text-md hover:bg-gray-100 text-brand-green"
                    onClick={() => onDetail(rawBody[originalIndex])}
                >
                    <CgDetailsMore />
                    <span>Detaylar</span>
                </button>
            )}
        </div>
    );
};

export default Transactions;
