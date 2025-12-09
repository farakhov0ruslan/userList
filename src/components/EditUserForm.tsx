import { useState, FormEvent, useEffect } from 'react';
import { useUpdateUserMutation } from '../store/api';
import type { User } from '../types/user';

interface EditUserFormProps {
  user: User | null;
  onClose: () => void;
}

export default function EditUserForm({ user, onClose }: EditUserFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  if (!user) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    try {
      await updateUser({ id: user.id, name, email }).unwrap();
      alert('Пользователь успешно обновлен!');
      onClose();
    } catch (error) {
      alert('Ошибка при обновлении пользователя');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Редактировать пользователя</h2>
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
          <div className="form-actions">
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Сохранение...' : 'Сохранить'}
            </button>
            <button type="button" onClick={onClose} className="btn-cancel">
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
