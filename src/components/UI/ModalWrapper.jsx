import { useEffect, useRef, useState } from "react";
import "../ui/ModalWrapper.css"


export default function ModalWrapper({ children, isOpen, onClose }) {
    const modalRef = useRef(null)


    const closeModal = () => {
        if (onClose) onClose();
    };


    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target) && event.button !== 2) {
            closeModal();
        }
    };
    // event.button !== 2 (close modal on any click outside except rightclick)

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);



    return (
        <>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content" ref={modalRef}>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
}
