import React, { useState, useRef, FocusEventHandler, MouseEventHandler } from 'react';

interface InputProps {
    id?: string,
    name?: string,
    state?: 'enabled' | 'disabled' | 'active' | 'error';
    size?: 'S' | 'M';
    isIconActive?: boolean;
    leftIcon?: React.ReactNode; 
    rightIcon?: React.ReactNode;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    onClickRightIcon?: MouseEventHandler<HTMLSpanElement>;
    onClickLeftIcon?: MouseEventHandler<HTMLSpanElement>;
    label?: string;
    errorText?: string;
    helperText?: string;
}


const Input: React.FC<InputProps> = ({
    id = '',
    name = '',
    state = 'enabled',
    size = 'M',
    isIconActive = false,
    leftIcon,
    rightIcon,
    placeholder = 'Placeholder',
    label = '',
    value = '',
    helperText = '',
    onChange,
    onFocus,
    onBlur,
    onClickRightIcon,
    onClickLeftIcon,
    errorText,

}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const [isError, setIsError] = useState(state === 'error');


    const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
        setIsFocused(true);
        if (onFocus) {
          onFocus(e);
        }
      };
    
      const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
        setIsFocused(false);
        if (onBlur) {
          onBlur(e);
        }
      };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if(onChange){
            onChange(e.target.value);
        }
    };

    const handleClickRightIcon: MouseEventHandler<HTMLSpanElement> = (e) => {
        if(isIconActive && onClickRightIcon){
            onClickRightIcon(e);
         }
    }

    const handleClickLeftIcon: MouseEventHandler<HTMLSpanElement> = (e) => {
        if(isIconActive && onClickLeftIcon){
            onClickLeftIcon(e);
         }
    }


    const getContainerStyles = () => {
        let baseStyles = 'text-white-900 py-[6px] px-3 flex items-center rounded-[32px] border transition-colors duration-200 ';

        switch (state) {
            case 'disabled':
                baseStyles += 'bg-white-50 border-white-100 cursor-not-allowed';
                break;
            case 'active':
                baseStyles += 'bg-white-0 border-white-200 focus-within:border-blue-500';
                break;
            case 'error':
                baseStyles += ' animate-shake bg-red-50 border-red-500 focus-within:border-red-500  focus-within:bg-white-0';
                break;
            default:
                baseStyles += 'bg-white-0 border-white-200 focus-within:border-blue-500';
                break;
        }
       
        if (size === 'S') {
            baseStyles += ' h-8';
          } else {
            baseStyles += ' h-11';
          }

        return baseStyles;
    };

    const getInputStyles = () => {
      let baseStyles = ' placeholder:text-white-400 placeholder:italic outline-none w-full bg-transparent placeholder:transition-colors focus-within:placeholder:text-transparent';

      if (size === 'S') {
        baseStyles += ' placeholder:text-body-s text-body-s';
      } else {
        baseStyles += ' placeholder:text-body-m text-body-m';
      }

      if (state === 'disabled') {
        baseStyles += ' cursor-not-allowed';
      }
      
      return baseStyles;
    };

    const getIconStyles = () => {
        let baseStyles = 'text-white-500 ';

        if (isIconActive){
            baseStyles += ' cursor-pointer';
        }

        return baseStyles
    }

    const getLabelStyles = () => {
        let baseStyles = 'text-white-400 mb-1 ';

        if (size === 'S') {
            baseStyles += ' text-caption';
          } else {
            baseStyles += ' text-body-s';
          }

        return baseStyles
    }

  

    return (
        <div className={'relative' }>
            { label && (<div className={getLabelStyles()} >
              {label}
            </div>)}
            <div className={getContainerStyles()}>
                {leftIcon && (
                    <span className={getIconStyles() + ' mr-2 '}>
                        {leftIcon}
                    </span>
                )}
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    placeholder={placeholder}
                    className={getInputStyles()}
                    disabled={state === 'disabled'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {rightIcon && (
                    <span className={getIconStyles() + ' ml-2 '} onClick={handleClickRightIcon}>
                        {rightIcon}
                    </span>
                )}
            </div>
            {state === 'error' && errorText && (<div className=" text-red-700 text-caption mt-1">
              {errorText}
            </div>)}
            {helperText && (<div className=" text-white-400 text-caption mt-1">
              {helperText}
            </div>)}
        </div>
    );
};

export default Input;
