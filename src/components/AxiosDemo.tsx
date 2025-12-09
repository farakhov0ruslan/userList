import { useState, useRef } from 'react';
import axiosInstance from '../api/axios';
import type { User } from '../types/user';

export default function AxiosDemo() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadUsers = async () => {
    abortControllerRef.current = new AbortController();
    setLoading(true);
    setError(null);
    setUsers([]);

    try {
      // Добавляем задержку 3 секунды для демонстрации отмены
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, 3000);

        abortControllerRef.current?.signal.addEventListener('abort', () => {
          clearTimeout(timeout);
          reject(new DOMException('Запрос был отменен', 'AbortError'));
        });
      });

      const response = await axiosInstance.get<User[]>('/users', {
        signal: abortControllerRef.current.signal,
      });
      setUsers(response.data);
    } catch (error: any) {
      if (error.name === 'AbortError' || error.name === 'CanceledError') {
        setError('Запрос был отменен');
      } else {
        setError('Ошибка загрузки данных');
      }
    } finally {
      setLoading(false);
    }
  };

  const cancelRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="axios-demo">
      <h2>Axios с AbortController</h2>
      <div className="demo-controls">
        <button onClick={loadUsers} disabled={loading}>
          {loading ? 'Загрузка...' : 'Загрузить через Axios'}
        </button>
        {loading && (
          <button onClick={cancelRequest} className="btn-cancel">
            Отменить загрузку
          </button>
        )}
      </div>
      {error && <div className="error">{error}</div>}
      {users.length > 0 && (
        <div className="axios-results">
          <p className="result-title">Загружено пользователей: {users.length}</p>
          <div className="user-preview">
            <p className="preview-label">Первые 5 пользователей:</p>
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="preview-user">
                <span className="preview-name">{user.name}</span>
                <span className="preview-email">{user.email}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
