import React from 'react';
import Button from './components/ui/button'; 
import IconButton from './components/ui/icon_button';
import { ArrowDownFromLine, Circle } from 'lucide-react';

export default function Page() {
  return (
  <div className="p-4 space-y-4">
    <h2 className='text-h4 font-bold text-white-900'>Buttons</h2>
      <div className="flex space-x-4">
          {/* Primary Buttons */}
          <Button type="primary"><Circle size={16}/>Button</Button>
          <Button type="secondary" >Button</Button>
          <Button type="tertiary">Button</Button>
          <Button type="secondary" disabled >Button</Button>
          
      </div>
      <div className="flex space-x-4">
          {/* Secondary Buttons */}
          
          <Button type="primary" size='sm'><Circle size={12}/>Button<Circle size={12}/></Button>
          <Button type="secondary" size='sm'>Button</Button>
          <Button type="tertiary" size='sm'>Button</Button>
          <Button type="primary" size='sm' disabled >Button</Button>
      </div>
      <h2 className='text-h4 font-bold text-white-900'>Icon Buttons</h2>
      <div className="flex space-x-4">
        {/* Icon Buttons */}
        <IconButton size="md" icon={<Circle/>} />
        <IconButton type="secondary" size="md" icon={<Circle/>} />
        <IconButton type="tertiary" size="md" icon={<Circle/>}  />
        <IconButton size="md" disabled icon={<Circle/>}  />
        <IconButton size="sm" icon={<Circle/>}  />
        <IconButton type="secondary"  size="sm"icon={<Circle/>} />
        <IconButton type="tertiary" size="sm" icon={<Circle/>} />
    </div>
  </div>
);
}