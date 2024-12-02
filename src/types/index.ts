export type UserRole = 'teen' | 'parent';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  role: UserRole;
}

export interface User {
  id: string;
  email: string;
  role?: UserRole;
}

export interface FormEvent extends React.FormEvent<HTMLFormElement> {
  preventDefault(): void;
}

export interface InputEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement;
}

export interface KeyboardEvent extends React.KeyboardEvent<HTMLInputElement> {
  key: string;
}