import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Dropdown from "../dropdown/Dropdown";
import useOutsideClick from "../../hooks/use-outside-click";
import useUIStore from "../../stores/useUIStore";
import useAuthStore from "../../stores/useAuthStore";
import { isEmptyObject, isDateExpired } from "../../utils/utils";
import "./MenuLog.css";

export default function MenuLog() {
  const [t] = useTranslation("translation");
  const { user_data = {}, user_member_data = {} } = useAuthStore();
  const logout = useAuthStore((state) => state.logout);
  const { isProfileMenuOpen, openProfileMenu, closeProfileMenu } = useUIStore();
  const dropdownRef = useRef("menulogprofile");

  const isMember =
    !isEmptyObject(user_member_data) && !isDateExpired(user_member_data.expires);
  const fullName = [user_member_data.first_name, user_member_data.last_name]
    .filter(Boolean)
    .join(" ");
  const userName = (user_data.username || "").split(" ")[0];
  const userNameShortened =
    userName.length > 9 ? userName.slice(0, 9) + "…" : userName;
  const validYear = user_member_data.expires
    ? new Date(user_member_data.expires).getFullYear()
    : null;

  const handleToggle = () =>
    isProfileMenuOpen ? closeProfileMenu() : openProfileMenu();

  const handleLogout = () => {
    closeProfileMenu();
    logout();
  };

  useOutsideClick(dropdownRef, () => {
    if (isProfileMenuOpen) closeProfileMenu();
  });

  return (
    <div className="menu-log" ref={dropdownRef}>
      <button
        type="button"
        className="menu-log__trigger"
        aria-haspopup="menu"
        aria-expanded={isProfileMenuOpen}
        onClick={handleToggle}
      >
        {userNameShortened || t("compte.eyebrow")}
        <span className="menu-log__caret" aria-hidden="true">
          {isProfileMenuOpen ? "▲" : "▼"}
        </span>
      </button>

      <Dropdown open={isProfileMenuOpen} setIsOpen={closeProfileMenu} externalClickOutside>
        <div className="menu-log__pop" role="menu">
          <div className="menu-log__head">
            <span className="menu-log__fullname">{fullName || userName}</span>
            {isMember && (
              <span className="menu-log__meta">
                {t("form.soci")} {user_member_data.number}
                {validYear && ` · ${t("compte.valid-fins")} ${validYear}`}
              </span>
            )}
          </div>
          <NavLink
            role="menuitem"
            className="menu-log__item"
            to="/compte/dades"
            onClick={closeProfileMenu}
          >
            {t("compte.eyebrow")}
            <span aria-hidden="true">→</span>
          </NavLink>
          {isMember && (
            <NavLink
              role="menuitem"
              className="menu-log__item"
              to="/compte/projecte"
              onClick={closeProfileMenu}
            >
              {t("menu.el-meu-projecte")}
              <span aria-hidden="true">→</span>
            </NavLink>
          )}
          <div className="menu-log__foot">
            <button
              type="button"
              role="menuitem"
              className="menu-log__item menu-log__item--danger"
              onClick={handleLogout}
            >
              {t("compte.logout")}
            </button>
          </div>
        </div>
      </Dropdown>
    </div>
  );
}
