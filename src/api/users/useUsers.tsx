import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import baseApi from "..";
import type { ApiResponse, User } from "../../types";

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  role: string;
  username: string;
}

const getAllUsers = async (
  page: number = 1,
  limit: number = 10
): Promise<ApiResponse> => {
  const { data } = await baseApi.get("/randomusers", {
    params: { page, limit },
  });

  return data;
};

const getUserById = async (id: number): Promise<User> => {
  const { data } = await baseApi.get(`/randomusers/${id}`);
  return data;
};

const getMe = async (): Promise<User> => {
  const { data } = await baseApi.get("/api/auth/me");
  return data;
};

const loginUser = async (input: LoginInput): Promise<User> => {
  const { data } = await baseApi.post("/users/login", input);
  return data;
};

const registerUser = async (input: RegisterInput): Promise<User> => {
  const { data } = await baseApi.post("/users/register", input);
  return data;
};



export const useUsers = () => {
  const queryClient = useQueryClient();

  const useAllUsers = (page: number = 1, limit: number = 10) =>
    useQuery<ApiResponse, Error>({
      queryKey: ["users", page, limit],
      queryFn: () => getAllUsers(page, limit),
    });

  const useUserById = (id: number) =>
    useQuery<User, Error>({
      queryKey: ["user", id],
      queryFn: () => getUserById(id),
      enabled: !!id,
    });

  const useMe = () =>
    useQuery<User, Error>({
      queryKey: ["me"],
      queryFn: getMe,
    });

  const useLogin = () =>
    useMutation<User, Error, LoginInput>({
      mutationFn: loginUser,
      onSuccess: (data) => {
        queryClient.setQueryData(["me"], data);
      },
    });

  const useRegister = () =>
    useMutation<User, Error, RegisterInput>({
      mutationFn: registerUser,
      onSuccess: (data) => {
        queryClient.setQueryData(["me"], data);
      },
    });

  return {
    useAllUsers,
    useUserById,
    useMe,
    useLogin,
    useRegister,
  };
};
