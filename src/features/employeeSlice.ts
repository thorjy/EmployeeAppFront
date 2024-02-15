import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Employee {
    
    name : string; 
    salary : number;
    department : string;
    id:number;
}

export interface EmployeeState {
    employees: Employee[];
}

const initialState : EmployeeState = { employees : [] }

const employeeSlice = createSlice({
    name:'employee',
    initialState, 
    reducers : {
        getAllEmployees : (state, action : PayloadAction<Employee[]>) => {
            state.employees = action.payload
        }
    }
})

export const {getAllEmployees} = employeeSlice.actions;

export default employeeSlice.reducer;