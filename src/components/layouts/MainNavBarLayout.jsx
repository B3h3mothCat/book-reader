import { Outlet } from "react-router-dom";
import MainNavBar from "../MainNavBar";

export default function MainNavBarLayout() {
    return (
        <>
            <MainNavBar />
            <Outlet />
        </>
    )
}