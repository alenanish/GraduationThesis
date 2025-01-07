import React, { useState, FC, useCallback } from 'react';
import { CheckboxBlank, CheckboxMarked } from '../icons';

interface CheckboxProps {
    label: string;
    value: string;
    checked?: boolean;
    onChange?: (value: string, checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({ label, value, checked = false, onChange }) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleChange = useCallback(() => {
            const newChecked = !isChecked;
            setIsChecked(newChecked);
            if (onChange) {
                onChange(value, newChecked);
            }
    }, [isChecked, value, onChange]);



    return (
        <div className={`flex items-start space-x-1 cursor-pointer`}
            onClick={handleChange}
        >
                {isChecked ? <CheckboxMarked color='#0094C8' /> : <CheckboxBlank color='#5d5d5d' />}
            <label className={`text-body-s text-white-800`}>
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
