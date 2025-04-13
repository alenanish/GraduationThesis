import React, { useState, useRef, useEffect } from 'react';
import { IconButton } from '../ui';
import TopBarButton from './top-bar/top-bar-button';

type Size = 's' | 'm';
type Position = 'bottom' | 'left' | 'right';


interface DropDownMenuProps {
    icon: React.ReactNode;
    options: { label: string; onClick: () => void }[];
    size?: Size;
    position?: Position;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ 
    icon,
    options,
    size = 's',
    position = 'bottom',
 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (onClick: () => void) => {
    onClick();
    setIsOpen(false);
  };

  const getDropdownPositionClasses = () => {
    let baseStyles = 'absolute w-[133px] bg-base-0 '
    switch (position) {
      case 'left':
        baseStyles += '-top-0.5 ';
        if (size === 's'){
          baseStyles += ' right-10 ';

        } else {
          baseStyles += 'right-13 ';
        } 
        return baseStyles;
      case 'right':
        baseStyles += '-top-0.5 ';
        if (size === 's'){
          baseStyles += ' left-10 ';

        } else {
          baseStyles += 'left-13 ';
        } 
        return baseStyles;
      case 'bottom':
      default:
        baseStyles +=  'origin-top  left-0 ';
        return baseStyles;

    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);


    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);


  return (
    <div className="relative inline-block text-left " ref={dropdownRef}>
      <div>
        <IconButton variant="secondary" size={size}  type="button" onClick={toggleOpen}> 
            {icon}
        </IconButton>
      </div>

      {isOpen && (
        <div className={getDropdownPositionClasses()}>
          <div className="py-1">
            {options.map((option, index) => (

               <TopBarButton
               key={index}
               variant="top-bar-menu"
               size={size}
               className='w-full'
               onClick={() => handleOptionClick(option.onClick)}
             >
               {option.label}
             </TopBarButton>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
