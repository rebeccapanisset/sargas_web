import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { Form } from '@unform/web';

import Button from '~/components/Button';
import DatePicker from '~/components/DatePicker';
import CheckboxInput from '~/components/CheckboxInput';
import Select from '~/components/Select';

import { useUser } from '~/connection/User';
import { useTankTypes } from '~/connection/TankTypes';

import status from '~/utils/status';

import { Container, ContainerSearchBox } from './styles';

function ReportToolbar({ handleSearch }) {
  const formRef = useRef();

  const [endDate, setEndDate] = useState(null);
  const [range, setRange] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [users, setUsers] = useState([]);
  const [tankTypes, setTankTypes] = useState([]);

  const { getUsers } = useUser();
  const { getTankTypes } = useTankTypes();

  const types = [
    {
      id: 1,
      value: 1,
      label: 'Arquivado',
    },
    {
      id: 2,
      value: 2,
      label: 'Expirado',
    },
  ];

  const handleForm = useCallback(async (data) => {
    const starDate = formRef.current.getFieldRef('dateRange').props.startDate;
    const edDate = formRef.current.getFieldRef('dateRange').props.endDate;

    data = { ...data, startDate: starDate, endDate: edDate };

    handleSearch(data);
  }, []);

  const onChange = (dates) => {
    const [start, end] = dates;
    const startFormat = start.toLocaleDateString();
    const endFormat = end ? ` ~ ${end.toLocaleDateString()}` : '';

    setStartDate(start);
    setEndDate(end);
    setRange(`${startFormat}${endFormat}`);
  };

  useEffect(() => {
    async function loadData() {
      const userResponse = await getUsers();
      const typeResponse = await getTankTypes();

      const changedUsers = userResponse.data.map((user) => {
        return {
          id: user.id,
          value: user.id,
          label: user.name,
        };
      });
      const changedTypes = typeResponse.map((type) => {
        return {
          id: type.id,
          value: type.id,
          label: type.name,
        };
      });

      changedUsers.push({ id: 0, value: 0, label: 'Todos' });
      status.push({ id: 0, value: 'AL', label: 'Todos' });
      changedTypes.push({ id: 0, value: 0, label: 'Todos' });

      setUsers(changedUsers);
      setTankTypes(changedTypes);
    }

    loadData();
  }, []);

  return (
    <>
      <Container>
        <ContainerSearchBox>
          <Form ref={formRef} onSubmit={handleForm}>
            <Select
              name="status"
              placeholder="Status"
              size={10}
              options={status}
              margin="0 5px"
            />
            <Select
              name="user"
              placeholder="Usuários"
              options={users}
              size={10}
              margin="0 5px"
            />
            <Select
              name="tank_type"
              placeholder="Tipos de Tanque"
              options={tankTypes}
              size={12}
              margin="0 5px"
            />
            <DatePicker
              name="dateRange"
              placeholderText="Selecione um período de tempo"
              endDate={endDate}
              maxDate={new Date()}
              onChange={onChange}
              selected={startDate}
              selectsRange
              shouldCloseOnSelect={false}
              startDate={startDate}
              value={range}
              withPortal
            />
            <CheckboxInput name="types" options={types} />
            <Button type="submit" margin="10px 0 0">
              Gerar Relatório
            </Button>
          </Form>
        </ContainerSearchBox>
      </Container>
    </>
  );
}

ReportToolbar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default ReportToolbar;
