import { useRef } from "react";
import {
    useUserInitialState,
    useUserState,
    useCommonState,
} from "../data/state";
import { motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";

const Header = () => {
    // state variables
    const { user, logged } = useUserState((state) => state);
    const { profileDropdown, newNote } =
        useCommonState((state) => state);

    // animation variables
    const animationVariants = {
        open: { opacity: 1, hieght: "16rem", width: "16em" },
        closed: { opacity: 0, width: 0, hieght: 0 },
        hidden: { display: "none" },
        visible: { display: "block", y: 0 },
        sizeOpen: { fontSize: "100%" },
        sizeClose: { fontSize: ["75%", "25%", "0"] },
    };

    // Functions
    const handleSignOut = () => {
        useCommonState.setState({ profileDropdown: false });
        setTimeout(
            () => useUserState.setState({ ...useUserInitialState }),
            200
        );
    };

    const handleProfileDropdown = () => {
        useCommonState.setState({ profileDropdown: !profileDropdown });
        document.addEventListener("mousedown", handleClickOutside);
    };

    // close the profile dropdown
    const ref = useRef<any>(null);
    const buttonRef = useRef<any>(null);
    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && ref.current.contains(event.target)) {
        } else if (
            buttonRef.current &&
            buttonRef.current.contains(event.target)
        ) {
            document.removeEventListener("mousedown", handleClickOutside);
        } else {
            useCommonState.setState({ profileDropdown: false });
        }
    };

    return (
        <div>
            {!newNote && (
                <div className="top-0 flex flex-col h-14 w-full">
                    {/* Main Navbar Start */}
                    <div className="pt-10 h-auto flex flex-row  px-4 justify-between">
                        {/* Name */}
                        <h1 className=" text-4xl font-bold self-center text-color2">
                            REMIND
                        </h1>

                        {/* Profile Button */}
                        <motion.div
                            ref={buttonRef}
                            initial="hidden"
                            variants={animationVariants}
                            animate={logged ? "visible" : "hidden"}
                            className="z-20"
                        >
                            <button
                                onClick={handleProfileDropdown}
                                className="text-4xl text-center  cursor-pointer rounded bg-color2 p-2 "
                            >
                                <CgProfile style={{ color: "#E97777" }} />
                            </button>
                        </motion.div>

                        {/* Sign In Button */}
                        <motion.div
                            initial="hidden"
                            variants={animationVariants}
                            animate={!logged ? "visible" : "hidden"}
                            id="signInDiv"
                            className=" my-4 "
                        ></motion.div>
                    </div>
                    {/* Main Navbar End */}

                    {/* Profile Dropdown Start */}
                    <motion.div
                        ref={ref}
                        className="z-10 self-end p-3 pt-14  mr-4  -mt-14 bg-color2 rounded text-white"
                        initial="closed"
                        variants={animationVariants}
                        animate={profileDropdown ? "open" : "closed"}
                        transition={{ ease: "easeInOut", duration: 0.3 }}
                    >
                        <motion.h2
                            initial="sizeClose"
                            variants={animationVariants}
                            animate={profileDropdown ? "sizeOpen" : "sizeClose"}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            Email:
                        </motion.h2>
                        <motion.h2
                            initial="sizeClose"
                            variants={animationVariants}
                            animate={profileDropdown ? "sizeOpen" : "sizeClose"}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="mb-2"
                        >
                            {user.email}
                        </motion.h2>
                        <motion.button
                            initial="sizeClose"
                            variants={animationVariants}
                            animate={profileDropdown ? "sizeOpen" : "sizeClose"}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className=" bg-color1light text-color2 rounded p-3 hover:bg-color1 hover:text-black"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </motion.button>
                    </motion.div>
                    {/* Profile Dropdown End */}
                </div>
            )}
        </div>
    );
};

export default Header;
