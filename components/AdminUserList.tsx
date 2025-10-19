'use client';

import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShieldCheck, UserCog, UserMinus } from "lucide-react";
import type { Users } from "@/app/(admin)/dashboard/users/page";
import { Role } from "@/types/status";
import {  updateUserRole } from "@/actions/user";




export default function AdminUserList({users,curretAdminId}:{
  users:Users,
  curretAdminId:string
}) {


  const handleRoleUpdate = async (userId: string, newRole: Role) => {
    try {
      await updateUserRole(userId,newRole,curretAdminId)
    } catch (error) {
      console.log('Error in updating role : ',error)
    }
  };

  const handleDeactivate = (userId: string) => {
    console.log(`User ${userId} deactivated`);
    alert(`User ${userId} has been deactivated`);
    // In real app: await deactivateUser(userId)
  };

  return (
    <Card className="shadow-md rounded-2xl border border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">User Management</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Manage users, assign roles, and deactivate accounts.
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
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.role === "ADMIN"
                          ? "destructive"
                          : user.role === "ORGANIZER"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{user._count.bookings}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {/* Role-specific actions */}
                      {user.role === "USER" && (
                        <>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleRoleUpdate(user.id, "ORGANIZER")}
                          >
                            <UserCog className="w-4 h-4 mr-1" />
                            Make Organizer
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRoleUpdate(user.id, "ADMIN")}
                          >
                            <ShieldCheck className="w-4 h-4 mr-1" />
                            Make Admin
                          </Button>
                        </>
                      )}

                      {user.role === "ORGANIZER" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRoleUpdate(user.id, "USER")}
                          >
                            <UserMinus className="w-4 h-4 mr-1" />
                            Revoke to User
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRoleUpdate(user.id, "ADMIN")}
                          >
                            <ShieldCheck className="w-4 h-4 mr-1" />
                            Promote to Admin
                          </Button>
                        </>
                      )}

                      {user.role === "ADMIN" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRoleUpdate(user.id, "USER")}
                        >
                          <UserMinus className="w-4 h-4 mr-1" />
                          Demote to User
                        </Button>
                      )}

                      {/* Deactivate Action */}
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
