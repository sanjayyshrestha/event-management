'use client'
import React, { useState } from "react";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription,  CardContent } from "@/components/ui/card";

type User = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  _count: { bookings: number };
};

const mockUsers: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "USER", _count: { bookings: 3 } },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "ADMIN", _count: { bookings: 5 } },
  { id: "3", name: "Charlie Brown", email: "charlie@example.com", role: "USER", _count: { bookings: 1 } },
];

export default function AdminUserList() {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const handleRoleChange = (userId: string, newRole: "USER" | "ADMIN") => {
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, role: newRole } : user))
    );
    // Here you can also call your API to update the role in backend
    console.log(`User ${userId} role changed to ${newRole}`);
  };

  const handleDeactivate = (userId: string) => {
    // Mock deactivate: just log for now
    console.log(`User ${userId} deactivated`);
    alert(`User ${userId} has been deactivated`);
    // In real app, call API to deactivate user
  };

  return (
    <Card className="shadow-md rounded-2xl border border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">User Management</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Manage users and assign roles.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Total Bookings</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as "USER" | "ADMIN")}
                      className="border px-2 py-1 rounded"
                    >
                      <option value="USER">User</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </TableCell>
                  <TableCell>{user._count.bookings}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeactivate(user.id)}
                      >
                        Deactivate
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
