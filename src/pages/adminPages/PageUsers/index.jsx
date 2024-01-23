import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from 'react';
import { useCreateUser, useGetUsers } from '../../../hooks/useUsers';
import { InputText } from 'primereact/inputtext';
import { useForm } from 'react-hook-form';

const PageUsers = () => {
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const { data: usuarios, isLoading } = useGetUsers();
    const {mutateAsync: criarUsuario} = useCreateUser();
    const { register: createRegister, handleSubmit: createHandleSubmit } = useForm();
    
    const createUser = (data) => {
        criarUsuario(data);
    }

    return (
        <>
            <div className={'flex justify-content-between mb-4'}>
                <h1>Usuarios</h1>
                <Button onClick={() => setVisibleCreate(true)}>Novo usuario</Button>
            </div>

            <DataTable value={usuarios} loading={isLoading} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}>
                <Column field="user_id" header="ID" className='w-3rem'></Column>
                <Column field="user_name" header="Nome"></Column>
                <Column field="user_email" header="Email"></Column>
                <Column header={'Ações'} bodyClassName={'w-1'} body={() => (
                    <div className='flex gap-3'>
                        <Button rounded icon={'pi pi-pencil'} />
                        <Button rounded icon={'pi pi-trash'} />
                    </div>
                )}/>
            </DataTable>

            <Sidebar
                visible={visibleCreate}
                onHide={() => setVisibleCreate(false)}
                position={'right'}
            >
                <form onSubmit={createHandleSubmit(createUser)}>
                    <label htmlFor="nome" className='block mb-2'>Nome</label>
                    <InputText 
                        id='nome'
                        placeholder='Digite seu Nome'
                        className='mb-3 w-full'
                        { ...createRegister('user_name', {required: true}) }
                    />
                    <label htmlFor="email" className='block mb-2'>Email</label>
                    <InputText 
                        id='email'
                        type='email'
                        placeholder='Digite seu Email'
                        className='mb-3 w-full'
                        { ...createRegister('user_email', {required: true}) }
                    />
                    <label htmlFor="senha" className='block mb-2'>Senha</label>
                    <InputText 
                        id='senha'
                        type='password'
                        placeholder='******'
                        className='mb-3 w-full'
                        { ...createRegister('user_password', {required: true}) }
                    />
                    <Button
                        type='submit' 
                        label='Salvar'
                        className='w-full border-round-3xl'
                    />
                </form>
            </Sidebar>

            <Sidebar
                visible={visibleEdit}
                onHide={() => setVisibleEdit(false)}
                position={'right'}
            >
                alguma coisa
            </Sidebar>
        </>
    )
}

export default PageUsers;