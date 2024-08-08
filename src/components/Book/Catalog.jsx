import LibraryOfBooks from "./LibraryOfBooks";
import { useTranslation } from "react-i18next";


export default function Catalog() {
    const { i18n } = useTranslation()

    return (
        <LibraryOfBooks key={i18n.language} />
    )
}

// DISABLED FOR NOW