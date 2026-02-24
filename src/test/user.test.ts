import { describe, it, expect } from 'vitest';
import type { User, CreateUserDto, UpdateUserDto } from '../types/user';

// --- Утилитные функции для тестирования ---

function formatUserLabel(user: User): string {
  return `${user.name} <${user.email}>`;
}

function filterUsersByName(users: User[], query: string): User[] {
  return users.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()));
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// --- Синхронные тесты ---

describe('User utilities (sync)', () => {
  const mockUser: User = { id: 1, name: 'Alice Smith', email: 'alice@example.com' };

  it('форматирует пользователя в строку label', () => {
    expect(formatUserLabel(mockUser)).toBe('Alice Smith <alice@example.com>');
  });

  it('фильтрует пользователей по имени (регистронезависимо)', () => {
    const users: User[] = [
      { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
      { id: 2, name: 'Bob Jones', email: 'bob@example.com' },
      { id: 3, name: 'alice Cooper', email: 'acooper@example.com' },
    ];

    const result = filterUsersByName(users, 'alice');
    expect(result).toHaveLength(2);
    expect(result.map((u) => u.id)).toEqual([1, 3]);
  });

  it('возвращает пустой массив если нет совпадений', () => {
    const users: User[] = [{ id: 1, name: 'Alice', email: 'alice@example.com' }];
    expect(filterUsersByName(users, 'xyz')).toHaveLength(0);
  });

  it('валидирует корректный email', () => {
    expect(isValidEmail('user@domain.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('missing@tld')).toBe(false);
  });

  it('CreateUserDto содержит только name и email', () => {
    const dto: CreateUserDto = { name: 'Test', email: 'test@test.com' };
    expect(dto.name).toBe('Test');
    expect(dto.email).toBe('test@test.com');
  });

  it('UpdateUserDto содержит id, name и email', () => {
    const dto: UpdateUserDto = { id: 42, name: 'Updated', email: 'updated@test.com' };
    expect(dto.id).toBe(42);
  });
});
