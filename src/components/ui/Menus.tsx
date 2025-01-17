import { EllipsisVertical } from "lucide-react";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  useEffect,
} from "react";
import { createPortal } from "react-dom";

// Define types for context and props
interface Position {
  x: number;
  y: number;
}

interface MenusContextType {
  openId: string;
  open: (id: string) => void;
  close: () => void;
  position: Position | null;
  setPosition: (position: Position | null) => void;
}

interface MenusProps {
  children: ReactNode;
}

interface ToggleProps {
  id: string;
}

interface ListProps {
  id: string;
  children: ReactNode;
}

interface ButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
}

// Create context with proper typing
const MenusContext = createContext<MenusContextType | undefined>(undefined);

// Custom hook for using context
const useMenusContext = () => {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error("Menus components must be used within a MenusProvider");
  }
  return context;
};

// Custom hook for handling outside clicks
const useOutsideClick = (handler: () => void, listenCapturing = true) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };

    document.addEventListener("click", handleClick, listenCapturing);
    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
};

// Main Menus component
const Menus = ({ children }: MenusProps) => {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState<Position | null>(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};

// Toggle component
const Toggle = ({ id }: ToggleProps) => {
  const { openId, close, open, setPosition } = useMenusContext();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    if (openId === "" || openId !== id) {
      open(id);
    } else {
      close();
    }
  }

  return (
    <button
      onClick={handleClick}
      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-900 rounded-lg"
    >
      <EllipsisVertical className="w-5 h-5" />
    </button>
  );
};

// List component
const List = ({ id, children }: ListProps) => {
  const { openId, position, close } = useMenusContext();
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return createPortal(
    <div
      ref={ref}
      className="absolute shadow-lg rounded-lg py-2 min-w-[200px]"
      style={{
        top: position?.y ?? 0,
        right: position?.x ?? 0,
      }}
    >
      <ul className="divide-y divide-gray-100 dark:divide-gray-900 dark:bg-gray-800 rounded-lg">
        {children}
      </ul>
    </div>,
    document.body,
  );
};

// Button component
const Button = ({ children, icon, onClick }: ButtonProps) => {
  const { close } = useMenusContext();

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li className="">
      <button
        onClick={handleClick}
        className="w-full px-4 py-2 flex items-center gap-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
      >
        {icon && <span className="">{icon}</span>}
        <span>{children}</span>
      </button>
    </li>
  );
};

// Menu component (container)
const Menu = ({ children }: { children: ReactNode }) => {
  return <div className="relative">{children}</div>;
};

// Compose components
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
