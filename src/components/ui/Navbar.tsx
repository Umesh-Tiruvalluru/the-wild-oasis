import { Calendar, House, School, Settings, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

// const NavList = styled.ul`
//   display: flex;
//   flex-direction: column;
//   gap: 0.8rem;
// `;

// const Link = styled.a`
//   &:link,
//   &:visited {
//     display: flex;
//     align-items: center;
//     gap: 1.2rem;

//     color: var(--color-grey-600);
//     font-size: 1.6rem;
//     font-weight: 500;
//     padding: 1.2rem 2.4rem;
//     transition: all 0.3s;
//   }

//   /* This works because react-router places the active class on the active NavLink */
//   &:hover,
//   &:active,
//   &.active:link,
//   &.active:visited {
//     color: var(--color-grey-800);
//     background-color: var(--color-grey-50);
//     border-radius: var(--border-radius-sm);
//   }

//   & svg {
//     width: 2.4rem;
//     height: 2.4rem;
//     color: var(--color-grey-400);
//     transition: all 0.3s;
//   }

//   &:hover svg,
//   &:active svg,
//   &.active:link svg,
//   &.active:visited svg {
//     color: var(--color-brand-600);
//   }
// `;

function Navbar() {
  return (
    <nav className="mt-6 font-medium font-figtree">
      <ul className="flex flex-col justify-center">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center mb-2 gap-4 text-xl px-4 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-200 [&>svg]:hover:text-purple-600 rounded-lg ${
                isActive && "bg-gray-200 text-gray-800 [&>svg]:text-purple-600"
              }`
            }
          >
            <House className=" " />
            Home
          </NavLink>
          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              `flex items-center gap-4 mb-2 text-xl px-4 py-3 text-gray-600 hover:text-gray-800 [&>svg]:hover:text-purple-600 hover:bg-gray-200 rounded-lg ${
                isActive && "bg-gray-200 text-gray-800 [&>svg]:text-purple-600"
              }`
            }
          >
            <Calendar />
            Bookings
          </NavLink>
          <NavLink
            to="/cabins"
            className={({ isActive }) =>
              `flex items-center mb-2 gap-4 text-xl px-4 py-3 [&>svg]:hover:text-purple-600 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg ${
                isActive && "bg-gray-200 text-gray-800 [&>svg]:text-purple-600"
              }`
            }
          >
            <School />
            Cabins
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center gap-4 mb-2 text-xl px-4 py-3 text-gray-600 [&>svg]:hover:text-purple-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg ${
                isActive && "bg-gray-200 text-gray-800 [&>svg]:text-purple-600"
              }`
            }
          >
            <Users />
            Users
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-4 text-xl mb-2 px-4 py-3 text-gray-600 [&>svg]:hover:text-purple-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg ${
                isActive && "bg-gray-200 text-gray-800 [&>svg]:text-purple-600"
              }`
            }
          >
            <Settings />
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
