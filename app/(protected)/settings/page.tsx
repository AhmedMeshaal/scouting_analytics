"use client";

import { logout } from "@/actions/logout";
import {signOut} from "next-auth/react";
import {useCurrentUser} from "@/hooks/use-current-user";


const SettingsPage = () => {

    const user = useCurrentUser();

    const onClick = () => {
        signOut();
    }

    return (
        <div>
            {/*{JSON.stringify(user)}*/}
            <form>
                <button onClick={onClick} type="submit">
                    Sign out
                </button>
            </form>
        </div>
    );
}

export default SettingsPage;