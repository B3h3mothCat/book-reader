// create custom buttons for small elements ?

import ReaderNavButtons from "./ReaderNavButtons"

export default function ReaderMenuBar() {


    return (
        <div className="reader-menu-wrap">
            <button>Home</button>
            <div className="">Название книги</div>
            <div className="">
                <ReaderNavButtons></ReaderNavButtons>
                <div>
                    <div>Оглавление</div>
                    <div>Том Глава</div>
                </div>
            </div>
            <div className="customizer">Customizer btn</div>
        </div>
    )
}