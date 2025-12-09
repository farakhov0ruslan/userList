import { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import EditUserForm from './components/EditUserForm';
import AxiosDemo from './components/AxiosDemo';
import type { User } from './types/user';
import './App.css';

function App() {
  const [editingUser, setEditingUser] = useState<User | null>(null);

  return (
    <div className="App">
      <h1>Управление пользователями</h1>

      <div className="container">
        <UserForm />
        <UserList onEdit={setEditingUser} />
        <AxiosDemo />
      </div>

      <EditUserForm user={editingUser} onClose={() => setEditingUser(null)} />
    </div>
  );
}

export default App;
