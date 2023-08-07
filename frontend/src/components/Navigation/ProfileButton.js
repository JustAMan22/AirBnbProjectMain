import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenu from "../ModalBase";
import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const sessionUser = useSelector((state) => state.session.user);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShowMenu(false);
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="navigation-buttons">
      <button onClick={openMenu} className="profile-button-man">
        ≡ <i className="fas fa-user-circle" />
      </button>
      <div>
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <div>
              <li className="user-firstname-text">Hello, {user.firstName}!</li>
              <li className="email-text-profile">{user.email}</li>
              <li>
                <NavLink to={`/users/${sessionUser.id}/spots`}>
                  <button className="manage-spots-btn">Manage Spots</button>
                </NavLink>
              </li>
              <button onClick={logout} className="logout-btn">
                Log Out
              </button>
            </div>
          ) : (
            <>
              <OpenModalMenu
                itemText="Signup"
                modalComponent={<SignupFormPage />}
              />
              <OpenModalMenu
                itemText="Login"
                modalComponent={<LoginFormPage />}
              />
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ProfileButton;
