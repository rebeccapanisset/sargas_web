import React, { useRef, useState, useEffect, useCallback } from 'react';

import { Form } from '@unform/web';
import { Container, FormContainer, SetedImage, InputFile, FileInputContainer, FileInputBox } from './styles';
import Input from '~/components/Input';
import ModalDialog from '~/components/ModalDialog';
import Button from '~/components/Button';
import { useConfiguration } from '~/connection/Configuration';
import { useFile } from '~/connection/File';
import { checkValidation } from '~/libs/checkSchemaValidation';
import schema from './validation';

import FileInput from '~/components/FileInput';
import defaultImage from '~/assets/default-image.png';

function FormConfig() {
  const formRef = useRef();

  const {
    updateConfiguration,
    getConfigurations,
    deletePaymentMethod,
    deleteSaleType,
  } = useConfiguration();
  const { storeFile } = useFile();

  const [loading, setLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [saleTypes, setSaleTypes] = useState([]);
  const [deletePaymentShow, setDeletePaymentShow] = useState(false);
  const [deleteSaleShow, setDeleteSaleShow] = useState(false);
  const [selectedPayMethod, setSelectedPayMethod] = useState({});
  const [selectedSaleType, setSelectedSaleType] = useState({});

  const [config, setConfig] = useState({});

  const handleConfirmPayment = useCallback(async (payment, index) => {
    if (payment.id !== '') {
      setDeletePaymentShow(true);
      setSelectedPayMethod(payment);
    } else {
      const payMethodChange = paymentMethods.filter((p, i) => {
        return i !== index;
      });
      setPaymentMethods(payMethodChange);
    }
  });

  const handleConfirmSale = useCallback(async (sale, index) => {
    if (sale.id !== '') {
      setDeleteSaleShow(true);
      setSelectedSaleType(sale);
    } else {
      const saleTypeChange = saleTypes.filter((s, i) => {
        return i !== index;
      });
      setSaleTypes(saleTypeChange);
    }
  });

  const addFieldPayment = useCallback(() => {
    setPaymentMethods([
      ...paymentMethods,
      {
        id: '',
        payment_method: '',
      },
    ]);
  });

  const addFieldSale = useCallback(() => {
    setSaleTypes([
      ...saleTypes,
      {
        id: '',
        sale_type: '',
      },
    ]);
  });

  const handleForm = useCallback(async (data) => {
    const payMethodElement = [];
    const saleTypeElement = [];

    paymentMethods.map((payment, index) => {
      payMethodElement.push({
        id: formRef.current.getFieldRef(`payment${index}`).id,
        payment_method: formRef.current.getFieldRef(`payment${index}`).value,
      });

      return payMethodElement.map((p, i) => {
        if (p.payment_method === '') {
          payMethodElement.splice(i, 1);
        } else if (p.id === '') {
          delete p.id;
        }
        return p;
      });
    });

    if (payMethodElement.length !== 0) {
      setPaymentMethods(payMethodElement);
    }

    saleTypes.map((sale, index) => {
      saleTypeElement.push({
        id: formRef.current.getFieldRef(`sale${index}`).id,
        sale_type: formRef.current.getFieldRef(`sale${index}`).value,
      });

      return saleTypeElement.map((s, i) => {
        if (s.sale_type === '') {
          saleTypeElement.splice(i, 1);
        } else if (s.id === '') {
          delete s.id;
        }
        return s;
      });
    });

    if (saleTypeElement.length !== 0) {
      setSaleTypes(saleTypeElement);
    }

    let formData = {
      expiration: data.expiration,
      discontinuance: data.discontinuance,
      payment_methods: payMethodElement,
      sale_types: saleTypeElement,
    };

    setLoading(true);
    if (await checkValidation(formRef, formData, schema)) {
      if (data.header || data.footer || data.watermark){
        const header = data.header ? await storeFile(data.header, 'pdf') : null;
        const footer = data.footer ? await storeFile(data.footer, 'pdf') : null;
        const watermark = data.watermark ? await storeFile(data.watermark, 'pdf') : null;

        formData = {
          ...formData,
          pdf_header_id: header ? header.id : config.header?.id,
          pdf_footer_id: footer ? footer?.id : config.footer?.id,
          pdf_watermark_id: watermark ? watermark?.id : config.watermark?.id,
        }
      }
      else {
        formData = { 
          ...formData, 
          pdf_header_id: config.header?.id,
          pdf_footer_id: config.footer?.id,
          pdf_watermark_id: config.watermark?.id,
        }
      }
      const response = await updateConfiguration(formData);

      if (response) {
        setConfig(response.data.configuration);
        formRef.current.setFieldValue('header', '');
        formRef.current.setFieldValue('footer', '');
        formRef.current.setFieldValue('watermark', '');
        setLoading(false);
      }
    }

    setLoading(false);
  });

  const reset = useCallback(() => {
    setDeletePaymentShow(false);
    setDeleteSaleShow(false);
    setSelectedPayMethod({});
    setSelectedSaleType({});
  }, []);

  useEffect(() => {
    async function loadConfig() {
      const {
        configuration,
        payment_methods,
        sale_types,
      } = await getConfigurations();

      formRef.current.setData(configuration);
      formRef.current.setFieldValue('header', '');
      formRef.current.setFieldValue('footer', '');
      formRef.current.setFieldValue('watermark', '');

      setConfig(configuration);

      if (!payment_methods || payment_methods.length === 0) {
        setPaymentMethods([
          {
            id: '',
            payment_method: '',
          },
        ]);
      } else {
        setPaymentMethods(payment_methods);
      }

      if (!sale_types || sale_types.length === 0) {
        setSaleTypes([
          {
            id: '',
            sale_type: '',
          },
        ]);
      } else {
        setSaleTypes(sale_types);
      }
    }

    loadConfig();
  }, [selectedPayMethod, selectedSaleType]);

  async function removePaymentMethod() {
    const response = await deletePaymentMethod(selectedPayMethod.id);
    if (response) {
      reset();
    }
  }

  async function removeSaleType() {
    const response = await deleteSaleType(selectedSaleType.id);
    if (response) {
      reset();
    }
  }

  const handleChangePayment = (index, event) => {
    const values = [...paymentMethods];

    values[index].payment_method = event.target.value;

    setPaymentMethods(values);
  };

  const handleChangeSale = (index, event) => {
    const values = [...saleTypes];

    values[index].sale_type = event.target.value;

    setSaleTypes(values);
  };

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleForm}>
        <FormContainer>
          <div>
            <Input
              type="text"
              name="expiration"
              placeholder="Dias para Expiração"
              label="Dias para Expiração"
            />
            <h6>Formas de Pagamento</h6>
            {paymentMethods.map((payment, index, { length }) => (
              <Input
                key={index}
                type="text"
                name={`payment${index}`}
                placeholder={`Forma de Pagamento ${index + 1}`}
                value={payment.payment_method}
                remove={index !== 0}
                add={index + 1 === length}
                fnR={() => {
                  handleConfirmPayment(payment, index);
                }}
                fnA={() => {
                  addFieldPayment(payment.id);
                }}
                id={payment.id}
                onChange={(event) => handleChangePayment(index, event)}
              />
            ))}
          </div>
          <div>
            <Input
              type="text"
              name="discontinuance"
              placeholder="Dias para Arquivamento"
              label="Dias para Arquivamento"
            />
            <h6>Tipos de Venda</h6>
            {saleTypes.map((sale, index, { length }) => (
              <Input
                key={index}
                type="text"
                name={`sale${index}`}
                placeholder={`Tipo de Venda ${index + 1}`}
                value={sale.sale_type}
                remove={index !== 0}
                add={index + 1 === length}
                fnR={() => {
                  handleConfirmSale(sale, index);
                }}
                fnA={() => {
                  addFieldSale(sale.id);
                }}
                id={sale.id}
                onChange={(event) => handleChangeSale(index, event)}
              />
            ))}
          </div>
          
        </FormContainer>
        <FileInputContainer>
            <h6>Imagens estáticas do PDF</h6>
            <FileInputBox>
              <InputFile name="header" label="Cabeçalho" />
              <SetedImage>
                <strong>Cabeçalho Cadastrado</strong>
                <img src={config.header?.url || defaultImage} width alt="Assinatura cadastrada" />
              </SetedImage>
            </FileInputBox>

            <FileInputBox>
            <FileInput name="footer" label="Rodapé" />
            <SetedImage>
              <strong>Rodapé Cadastrado</strong>
              <img src={config.footer?.url || defaultImage} width alt="Assinatura cadastrada" />
            </SetedImage>
            </FileInputBox>

            <FileInputBox>
            <FileInput name="watermark" label="Marca D'Água" />
            <SetedImage>
              <strong>Marca D'Água Cadastrada</strong>
              <img src={config.watermark?.url || defaultImage} width alt="Assinatura cadastrada" />
            </SetedImage>
            </FileInputBox>
          </FileInputContainer>
        <Button type="submit" loading={loading} margin="10px 0 0">
          Salvar
        </Button>
      </Form>
      <ModalDialog
        show={deletePaymentShow}
        onHide={reset}
        selectedItem={selectedPayMethod}
        content={{
          title: 'Confirmação de Deleção',
          body: 'Deseja realmente deletar a forma de pagamento:',
          value: selectedPayMethod.payment_method,
          confirmation: 'Deletar',
        }}
        handleAction={removePaymentMethod}
      />
      <ModalDialog
        show={deleteSaleShow}
        onHide={reset}
        selectedItem={selectedSaleType}
        content={{
          title: 'Confirmação de Deleção',
          body: 'Deseja realmente deletar o tipo de venda:',
          value: selectedSaleType.sale_type,
          confirmation: 'Deletar',
        }}
        handleAction={removeSaleType}
      />
    </Container>
  );
}

export default FormConfig;
