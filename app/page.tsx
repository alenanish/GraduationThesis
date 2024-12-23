import React from 'react';
import Button from './components/ui/button'; 

export default function Page() {
  return (
  <div className="p-4 space-y-4">
    <h2 className='text-h4 font-bold text-white-900'>Buttons</h2>
      <div className="flex space-x-4">
          {/* Primary Buttons */}
          <Button type="primary" >Button</Button>
          <Button type="secondary" >Button</Button>
          <Button type="tertiary">Button</Button>
          <Button type="secondary" disabled >Button</Button>
          
      </div>
      <div className="flex space-x-4">
          {/* Secondary Buttons */}
          
          <Button type="primary" size='sm'>Button</Button>
          <Button type="secondary" size='sm'>Button</Button>
          <Button type="tertiary" size='sm'>Button</Button>
          <Button type="primary" size='sm' disabled >Button</Button>
      </div>
  </div>
);
}