import { useGetUsersQuery } from '../store/api';
import type { User } from '../types/user';

interface UserListProps {
  onEdit: (user: User) => void;
}

export default function UserList({ onEdit }: UserListProps) {
  const { data: users, isLoading, error } = useGetUsersQuery();

  if (isLoading) return <div className="loading">Загрузка пользователей...</div>;
  if (error) return <div className="error">Ошибка загрузки данных</div>;

  return (
    <div className="user-list">
      <h2>Список пользователей</h2>
      <div className="users">
        {users?.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-info">
              <div className="user-name">{user.name}</div>
              <div className="user-email">{user.email}</div>
            </div>
            <button onClick={() => onEdit(user)} className="btn-edit">
              Редактировать
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
