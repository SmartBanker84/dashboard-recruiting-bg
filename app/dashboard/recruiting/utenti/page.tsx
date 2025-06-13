'use client'

import { UserTable } from './components/UserTable';
import { useUsers } from './hooks/useUsers';

export default function UsersPage() {
  const { users, loading } = useUsers();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <UserTable data={users} />
    </div>
  );
}
