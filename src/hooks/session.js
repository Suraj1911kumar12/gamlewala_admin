import { useCallback } from "react";

export default function useSession() {

    const setSession = useCallback(function (cname, cvalue) {
        window.sessionStorage.setItem(cname, cvalue);
        return true;
    }, []);


    const getSession = useCallback(function useGetCookie(cname) {
        return window.sessionStorage.getItem(cname);
    },[]);


    return [setSession, getSession];

};

export const deleteSession = function (cname) {
    return window.sessionStorage.setItem(cname, '');
};