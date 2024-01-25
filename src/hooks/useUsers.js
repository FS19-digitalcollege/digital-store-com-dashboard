import { useMutation, useQuery } from "react-query"
import { API, queryClient } from "../service";


export const useGetUsers = () => {
    return useQuery(['get-users'], async () => {
        const response = await API.get('users');
        return response.data;
    });
}

export const useCreateUser = () => {
    return useMutation(async (dados) => {
        const response = await API.post('users', dados);
        return response.data;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('get-users');
        }
    });
}

export const useUpdateUser = () => {
    return useMutation(async (dados) => {
        const response = await API.post(`users/${dados.user_id}`, dados);
        return response.data;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('get-users');
        }
    });
}

export const useDeleteUser = () => {
    return useMutation(async (id) => {
    const response = await API.delete(`users/${id}`);
        return response.data;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('get-users');
        }
    });
}