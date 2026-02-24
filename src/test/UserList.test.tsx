import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { User } from '../types/user';

// Мок RTK Query хука
vi.mock('../store/api', () => ({
  useGetUsersQuery: vi.fn(),
  useCreateUserMutation: vi.fn(() => [vi.fn(), { isLoading: false }]),
  useUpdateUserMutation: vi.fn(() => [vi.fn(), { isLoading: false }]),
}));

import { useGetUsersQuery } from '../store/api';
import UserList from '../components/UserList';

const mockUsers: User[] = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
  { id: 2, name: 'Bob Jones', email: 'bob@example.com' },
];

describe('UserList component', () => {
  it('отображает спиннер загрузки', () => {
    vi.mocked(useGetUsersQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    } as ReturnType<typeof useGetUsersQuery>);

    render(<UserList onEdit={vi.fn()} />);

    expect(screen.getByText(/загрузка пользователей/i)).toBeInTheDocument();
  });

  it('отображает список пользователей', () => {
    vi.mocked(useGetUsersQuery).mockReturnValue({
      data: mockUsers,
      isLoading: false,
      error: undefined,
    } as ReturnType<typeof useGetUsersQuery>);

    render(<UserList onEdit={vi.fn()} />);

    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Jones')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
  });

  it('вызывает onEdit при нажатии кнопки редактирования', async () => {
    vi.mocked(useGetUsersQuery).mockReturnValue({
      data: mockUsers,
      isLoading: false,
      error: undefined,
    } as ReturnType<typeof useGetUsersQuery>);

    const onEdit = vi.fn();
    render(<UserList onEdit={onEdit} />);

    const editButtons = screen.getAllByText(/редактировать/i);
    await userEvent.click(editButtons[0]);

    expect(onEdit).toHaveBeenCalledWith(mockUsers[0]);
  });

  it('показывает сообщение об ошибке при сбое запроса', () => {
    vi.mocked(useGetUsersQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { status: 500 },
    } as ReturnType<typeof useGetUsersQuery>);

    render(<UserList onEdit={vi.fn()} />);

    expect(screen.getByText(/ошибка загрузки данных/i)).toBeInTheDocument();
  });
});
