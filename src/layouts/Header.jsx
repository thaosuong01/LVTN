import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { user } = useSelector((state) => state.user);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [showInput, setShowInput] = useState(false);

  const handleMouseEnter = () => {
    setShowInput(true);
  };

  const handleMouseLeave = () => {
    setShowInput(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("editingMode");
    window.location.href = "/login";
  };

  return (
    <>
      <div className="bg-[#f2f2f2] border-solid border-[4px] border-t border-primary w-full px-4"></div>
      <div className="bg-white">
        <div className="py-3 px-5 h-44 flex justify-between">
          <div>
            <img src="/../src/assets/Logo.jpg" alt="logo" className="h-40" />
          </div>
          {user && (
            <div className="flex gap-4">
              <div className="flex items-center cursor-pointer">
                <div className="flex items-center">
                  <div className="flex gap-4 px-4">
                    <div>
                      <img
                        src="/../src/assets/icons/notifications.svg"
                        alt=""
                      />
                    </div>
                    <div>
                      <img
                        className="w-4"
                        src="/../src/assets/icons/message.svg"
                        alt=""
                      />
                    </div>
                    <div>
                      <img
                        className="w-4"
                        src="/../src/assets/icons/mail.svg"
                        alt=""
                      />
                    </div>
                  </div>
                  <h4 className="text-primary font-bold text-xl">
                    {user?.fullname}
                  </h4>
                  <ArrowDropDownIcon
                    className="text-gray-500 cursor-pointer"
                    onClick={handleOpen}
                  ></ArrowDropDownIcon>
                  <Menu
                    id="demo-customized-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <img
                        className="w-4 mr-3"
                        src="/../src/assets/icons/dashboard.svg"
                        alt=""
                      />
                      <span className="text-sm">Dashboard</span>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link to={``} className="flex gap-2 ">
                        <img
                          className="w-4 mr-1"
                          src="/../src/assets/icons/user.svg"
                          alt=""
                        />
                        <span className="text-sm text-second">Profile</span>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <img
                        className="w-4 mr-3"
                        src="/../src/assets/icons/message.svg"
                        alt=""
                      />
                      <span className="text-sm">Messages</span>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <img
                        className="w-4 mr-3"
                        src="/../src/assets/icons/preferences.svg"
                        alt=""
                      />
                      <span className="text-sm">Preferences</span>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <img
                        className="w-4 mr-3"
                        src="/../src/assets/icons/logout.svg"
                        alt=""
                      />
                      <span className="text-sm">Log out</span>
                    </MenuItem>
                  </Menu>
                </div>
                <div>
                  <img
                    className="w-20 h-20 object-contain ml-3"
                    src="/../src/assets/default-avatar.png"
                    alt="avatar"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="text-white bg-second relative">
          <div className="h-fit">
            <div className="flex justify-between">
              <div className="flex gap-4 ">
                <Link
                  to="/home"
                  className="py-3 px-5 bg-primary hover:bg-hover transition-all ease-in-out w-fit block"
                >
                  Home
                </Link>
              </div>
              {user && (
                <div className="relative">
                  <div
                    className="py-3 px-5 bg-primary hover:bg-hover transition-all ease-in-out cursor-pointer"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <SearchIcon style={{ fontSize: "24px" }} />
                  </div>
                  {showInput && (
                    <input
                      type="text"
                      className="absolute top-0 left-0 transform -translate-x-full py-3 px-5 bg-[#555] h-[100%] focus:outline-none transition-all ease-in-out duration-150"
                      placeholder="Search..."
                      onMouseEnter={() => setShowInput(true)}
                      onMouseLeave={() => setShowInput(false)}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
