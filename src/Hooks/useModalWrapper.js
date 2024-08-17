import { useEffect, useRef, useState } from "react";

function useModalWrapper(isOpen, onClose) {
    const modalRef = useRef(null);
    const [isVisible, setIsVisible] = useState(isOpen);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setTimeout(() => setIsActive(true), 10); // Allowing time for rendering before activating
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        } else {
            setIsActive(false);
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target) && event.button !== 2) {
            closeModal();
        }
    };

    const closeModal = () => {
        if (onClose) onClose();
    };

    const handleTransitionEnd = () => {
        if (!isActive && !isOpen) {
            setIsVisible(false);
        }
    };

    if (!isVisible) return null;

    const WrappedChildren = ({ children }) => (
        <div className={`modal-overlay ${isActive ? 'active' : ''}`}>
            <div
                className={`modal-content ${isActive ? 'active' : ''}`}
                ref={modalRef}
                onTransitionEnd={handleTransitionEnd}
            >
                {children}
            </div>
        </div>
    );

    return WrappedChildren;
}

export default useModalWrapper;