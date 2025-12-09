import { useState, FormEvent } from 'react';
import { useCreateUserMutation } from '../store/api';

export default function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    try {
      await createUser({ name, email }).unwrap();
      setName('');
      setEmail('');
      alert('Пользователь успешно добавлен!');
    } catch (error) {
      alert('Ошибка при добавлении пользователя');
    }
  };

  return (
    <div className="user-form">
      <h2>Добавить пользователя</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Добавление...' : 'Добавить'}
        </button>
      </form>
    </div>
  );
}
