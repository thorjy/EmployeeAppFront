import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Employee } from '../features/employeeSlice';

export const employeeApi = createApi({
    baseQuery : fetchBaseQuery({ baseUrl : 'http://localhost:3000/api'}),
    tagTypes:['List'],
    endpoints : (builder) => ({
        getEmployeeList : builder.query<Employee[], void>({
            query: () => `employee`,
            providesTags:['List']
        }),

        createNewEmployee : builder.mutation({
            query: (employee) => ({
                url: '/employee',
                method: 'POST',
                body: employee,
            }),
            invalidatesTags:['List']
        }),

        getEmployeeById : builder.query<Employee, string>({
            query: (id) => `employee/${id}`,
            providesTags:['List']
        }),

        updateEmployee : builder.mutation ({
            query: ([employee, id]) => ({
                url: `employee/${id}`,
                method: 'PUT',
                body : employee,
            }),
            invalidatesTags:['List']
        }),

        deleteEmployee : builder.mutation({
            query: (id) => ({
                url: `employee/${id}`,
                method: 'DELETE',

            }),
            invalidatesTags:['List']
        })

    })
})

export const { useCreateNewEmployeeMutation } = employeeApi;
export const { useUpdateEmployeeMutation } = employeeApi;
export const { useDeleteEmployeeMutation } = employeeApi
export const { useGetEmployeeListQuery } = employeeApi;
export const { useGetEmployeeByIdQuery } = employeeApi;