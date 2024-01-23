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