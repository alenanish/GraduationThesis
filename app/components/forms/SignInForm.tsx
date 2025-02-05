import React, { useState } from 'react';
import Input from '../ui/input';
import Button from '../ui/button';
import Link from 'next/link';
import { EyeIcon, EyeOff } from 'lucide-react';


interface SignInFormProps {
  onSubmit: (credentials: { email: string; password?: string }) => void;
  isLoading?: boolean;
  error?: string;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSubmit, isLoading = false, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

 const handleTogglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
    
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, password);
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto px-4 py-5  bg-base-0 rounded-[32px]">
      <div className="flex flex-col gap-y-2">
      <Input
            state="enabled"
            size="M"
            id='name'
            label="Name"
            placeholder="Enter your name"
            value={email}
            onChange={setEmail}
          />
          <Input
            name="password"
            id="password"
            label="Password"
            state="enabled"
            size="M"
            placeholder="Password"
            rightIcon={
              isPasswordVisible ? <EyeOff size={24} /> : <EyeIcon size={24} />
            }
            isIconActive={true}
            onClickRightIcon={handleTogglePasswordVisibility}
            value={isPasswordVisible ? '****' : password}
            onChange={setPassword}
          />
        <div className='place-items-end'> 
        
          <Button className='w-fit'
            size='s'
            type="button"
            variant='tertiary'
          >
            Забыли пароль?
          </Button>  
        </div>
      
        <Button
          type="submit"
          disabled={isLoading}
        >
          Войти
        </Button>
        <Button
          variant='secondary'
          type="button"
          color='base'
        >
          <Link href={'/'} />
          Зарегистрироваться
        </Button>
        </div>
    </form>
  );
};

export default SignInForm;
