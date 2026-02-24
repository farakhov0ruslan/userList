import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { User } from '../types/user';

// --- Мок axios-инстанса ---

const mockGet = vi.fn();

vi.mock('../api/axios', () => ({
  default: { get: mockGet },
}));

// --- Асинхронные тесты ---

describe('API calls (async)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('возвращает массив пользователей при успешном запросе', async () => {
    const users: User[] = [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
    ];
    mockGet.mockResolvedValueOnce({ data: users });

    const axiosInstance = (await import('../api/axios')).default;
    const response = await axiosInstance.get<User[]>('/users');

    expect(response.data).toHaveLength(2);
    expect(response.data[0].name).toBe('Alice');
    expect(mockGet).toHaveBeenCalledWith('/users');
  });

  it('выбрасывает ошибку при сетевом сбое', async () => {
    mockGet.mockRejectedValueOnce(new Error('Network Error'));

    const axiosInstance = (await import('../api/axios')).default;

    await expect(axiosInstance.get('/users')).rejects.toThrow('Network Error');
  });

  it('запрос одного пользователя возвращает объект с id', async () => {
    const user: User = { id: 5, name: 'Charlie', email: 'charlie@example.com' };
    mockGet.mockResolvedValueOnce({ data: user });

    const axiosInstance = (await import('../api/axios')).default;
    const response = await axiosInstance.get<User>('/users/5');

    expect(response.data.id).toBe(5);
    expect(response.data.email).toContain('@');
  });
});
