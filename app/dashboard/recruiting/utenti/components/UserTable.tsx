// components/UserTable.tsx
import { FC } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
};

type Props = {
  data: User[];
};

export const UserTable: FC<Props> = ({ data }) => (
  <table className="w-full border-collapse">
    <thead>
      <tr>
        <th className="border px-4 py-2">Nome</th>
        <th className="border px-4 py-2">Email</th>
      </tr>
    </thead>
    <tbody>
      {data.map(user => (
        <tr key={user.id}>
          <td className="border px-4 py-2">{user.name}</td>
          <td className="border px-4 py-2">{user.email}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
