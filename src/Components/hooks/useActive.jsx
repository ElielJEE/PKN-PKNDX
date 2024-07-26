import { useState, useEffect, useRef } from "react";

export default function useActive() {
  const [active, setActive] = useState(false);
  const dropdownRef = useRef(null);

  const toggleActive = () => {
    setActive(!active);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActive(false);
    }
  };

  useEffect(() => {
    if (active) {
      document.addEventListener("mousedown", closeDropdown);
    } else {
      document.removeEventListener("mousedown", closeDropdown);
    }
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, [active]);

  return { active, toggleActive, dropdownRef };
}
