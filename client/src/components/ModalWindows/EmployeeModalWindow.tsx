import React, {useEffect, useState} from 'react'
import {TEmployee} from '../../types';
import {api} from '../../API/api';

const EmployeeModalWindow: React.FC = () => {
  const [employees, setEmployees] = useState<TEmployee[]>();

  useEffect(() => {
    api.employee.getAll().then(({data}) => setEmployees(data))
  }, [])

  return (
    <>
      <ul>
        {
          employees?.map(employee =>
            <li key={employee.id_user}>
              {employee.name}:&nbsp;
              {employee.position},
              заработная плата: {employee.wage}
            </li>)
        }
      </ul>
    </>
  )
}

export default EmployeeModalWindow