import List from "../components/Book/List"
import { Link, useLocation } from "react-router-dom"

export default function BookFrontPage() {
    // const { chapters, title, description } = useLocation().state;

    return (
        <>
            <div>THIS IS NAVBAR IN FUTURE
                <br />
                <Link to='/'>Home</Link>
            </div>
            <div>
                <div>here should be wide banner picture</div>
                <div>cover of book</div>
                <div>Button to start reaad From 1st page for now</div>

                <div className="">Navbar for book tabs
                    <div>Default: Description</div>
                    <div>Selectable: List component</div>
                </div>
                {/* <List
                    chapters={chapters}
                    title={title}
                    description={description}
                ></List> */}
            </div>
        </>
    )
}