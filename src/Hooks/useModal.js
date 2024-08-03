import { useState, useEffect, useRef } from 'react';

export default function useModal(initialState = false) {
    const [isModalOpen, setIsModalOpen] = useState(initialState);
    const modalRef = useRef(null);

    const openModal = () => setIsModalOpen(true);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setIsModalOpen(false);
            // this code checks if modal exists, and if so: is click was made outside?
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden'; // prevents scrolling when modal is open
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'auto'; // Cleanup on component unmount
        };
    }, [isModalOpen]);

    return { isModalOpen, openModal, modalRef };
}