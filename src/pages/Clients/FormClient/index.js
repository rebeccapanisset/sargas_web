import React, { useRef, useState, useEffect, useCallback } from 'react';

import { Form } from '@unform/web';
import cep from 'cep-promise';
import { useHistory, useParams } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { Container, FormContainer } from './styles';
import Input from '~/components/Input';
import InputMasked from '~/components/Input/MaskedInput';
import ModalDialog from '~/components/ModalDialog';
import Button from '~/components/Button';
import Select from '~/components/Select';
import { useClient } from '~/connection/Clients';
import { checkValidation } from '~/libs/checkSchemaValidation';
import schema from './validation';
import states from '~/utils/states';
import { useMask } from '~/libs/masks';

function FormClient() {
  const history = useHistory();
  const formRef = useRef();

  const { storeClient, updateClient, getClient, deletePhone } = useClient();
  const { cpfCnpjMask, phoneMask, cepMask } = useMask();

  const [loading, setLoading] = useState(false);
  const [loadingCEP, setLoadingCEP] = useState(false);
  const [phones, setPhones] = useState([]);
  const [deleteShow, setDeleteShow] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState({});

  const { id } = useParams();
  const update = !!id;

  const stateOptions = states;

  const handleConfirm = useCallback(async (phoneSelected, index) => {
    if (phoneSelected.id !== '') {
      setDeleteShow(true);
      setSelectedPhone(phoneSelected);
    } else {
      const phoneChange = phones.filter((phone, i) => {
        return i !== index;
      });
      setPhones(phoneChange);
    }
  });

  const addField = useCallback(() => {
    setPhones([
      ...phones,
      {
        id: '',
        number: '',
      },
    ]);
  });

  const handleForm = useCallback(async (data) => {
    // Precisa pensar em uma forma melhor de fazer isso
    const cpf_cnpj = formRef.current.getFieldRef('cpf_cnpj').inputElement.value;
    const zip_code = formRef.current.getFieldRef('zip_code').inputElement.value;

    const phoneElement = [];

    phones.map((phone, index) => {
      phoneElement.push({
        id: formRef.current.getFieldRef(`phone${index}`).inputElement.id,
        number: formRef.current.getFieldRef(`phone${index}`).inputElement.value,
        client_id: id,
      });

      return phoneElement.map((p, i) => {
        if (p.number === '') {
          phoneElement.splice(i, 1);
        } else if (p.id === '') {
          delete p.id;
        }
        return p;
      });
    });

    if (cpf_cnpj.length > 14) {
      data = { ...data, person_indicator: 'PJ' };
    } else {
      data = { ...data, person_indicator: 'PF' };
    }

    data = { ...data, cpf_cnpj, phones: phoneElement, zip_code };

    setLoading(true);
    if (await checkValidation(formRef, data, schema)) {
      const response = update
        ? await updateClient(data, id)
        : await storeClient(data);

      if (response) {
        history.push(`/clientes`);
        setLoading(false);
      }
    }

    setLoading(false);
  });

  const handleCEP = useCallback(async (e) => {
    const formatedCEP = e.target.value.replace('-', '');

    try {
      formRef.current.setFieldError('zip_code', null);
      setLoadingCEP(true);
      const response = await cep(formatedCEP);

      setLoadingCEP(false);

      formRef.current.setFieldValue('address', response.street);
      formRef.current.setFieldValue('neighborhood', response.neighborhood);
      formRef.current.setFieldValue('city', response.city);

      const state = states.find((option) => option.value === response.state);

      await formRef.current.setFieldValue('state', state);
      formRef.current.setFieldError('zip_code', null);
    } catch (err) {
      setLoadingCEP(false);
      if (err.type === 'validation_error') {
        formRef.current.setFieldError('zip_code', err.errors[0].message);
      } else if (err.type === 'service_error') {
        if (formRef.current !== null)
          formRef.current.setFieldError('zip_code', err.errors[1].message);
      }
    }
  }, []);

  const reset = useCallback(() => {
    setDeleteShow(false);
    setSelectedPhone({});
  }, []);

  useEffect(() => {
    async function loadClient() {
      if (id) {
        const response = await getClient(id);
        formRef.current.setData(response);

        const state = stateOptions.find(
          (option) => option.value === response.state
        );

        setPhones(response.phones);

        formRef.current.setFieldValue('state', state);
      }
    }
    loadClient();

    if (!update) {
      setPhones([
        {
          id: '',
          number: '',
        },
      ]);
    }
  }, [id, selectedPhone]);

  async function removePhone() {
    const response = await deletePhone(selectedPhone.id);
    if (response) {
      reset();
    }
  }

  const handleInputChange = (index, event) => {
    const values = [...phones];

    values[index].number = event.target.value;

    setPhones(values);
  };

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleForm}>
        <FormContainer>
          <div>
            <Input type="text" name="name" placeholder="Nome" label="Nome" />
            <InputMasked
              type="text"
              name="cpf_cnpj"
              placeholder="CNPJ ou CPF"
              label="CPF/CNPJ"
              mask={cpfCnpjMask}
            />
            <Input
              type="text"
              name="ie"
              placeholder="Inscrição Estadual"
              label="Inscrição Estadual"
            />

            <Input
              type="email"
              name="email"
              placeholder="Email"
              label="E-mail"
            />
            {phones.map((phone, index, { length }) => (
              <InputMasked
                key={index}
                type="text"
                name={`phone${index}`}
                placeholder={`Telefone ${index + 1}`}
                label={`Telefone ${index + 1}`}
                value={phone.number}
                mask={phoneMask}
                remove={index !== 0}
                add={index + 1 === length && length !== 3}
                fnR={() => {
                  handleConfirm(phone, index);
                }}
                fnA={() => {
                  addField(phone.id);
                }}
                id={phone.id}
                onChange={(event) => handleInputChange(index, event)}
              />
            ))}
          </div>
          <div>
            <InputMasked
              type="text"
              name="zip_code"
              placeholder="CEP"
              label="CEP"
              mask={cepMask}
              onBlur={handleCEP}
              icon={loadingCEP && <FaSpinner />}
            />
            <Input
              type="text"
              name="address"
              placeholder="Endereço"
              label="Endereço"
            />
            <Input
              type="text"
              name="neighborhood"
              placeholder="Bairro"
              label="Bairro"
            />
            <Input
              type="text"
              name="city"
              placeholder="Cidade"
              label="Cidade"
            />

            <Select
              name="state"
              placeholder="Estado"
              options={stateOptions}
              label="Estado"
            />
          </div>
        </FormContainer>
        <Button type="submit" loading={loading} margin="10px 0 0">
          {update ? 'Editar' : 'Salvar'}
        </Button>
      </Form>
      <ModalDialog
        show={deleteShow}
        onHide={reset}
        selectedItem={selectedPhone}
        content={{
          title: 'Confirmação de Deleção',
          body: 'Deseja realmente deletar o telefone:',
          value: selectedPhone.number,
          confirmation: 'Deletar',
        }}
        handleAction={removePhone}
      />
    </Container>
  );
}

export default FormClient;
