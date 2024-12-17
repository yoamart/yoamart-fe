"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/local/auth/Login";
import Register from "@/components/local/auth/Register";
import Dashboard from "@/components/local/user/Dashboard";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/types";

export default function MyAccount() {
  const session = useSelector((state: RootState) => state.auth.isAuthenticated);
  // console.log("session", session);

  return (
    <>
      {session ? (
        <Dashboard />
      ) : (
        <div className="md:min-h-[50vh] flex justify-center items-center  my-10">
          <Tabs
            defaultValue="login"
            className="md:border rounded-md p-5 w-[448px] min-h-[600px]"
          >
            <TabsList className="mx-auto w-full bg-transparent space-x-10">
              <TabsTrigger
                value="login"
                className="font-dosis font-bold text-[20px]"
              >
                LOGIN
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="font-dosis font-bold text-[20px]"
              >
                REGISTER
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Login />
            </TabsContent>
            <TabsContent value="register">
              <Register />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
}
