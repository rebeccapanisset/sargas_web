// React Libs
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Unform Libs
import { Form } from '@unform/web';

// Componentes
import BudgetInfo from '~/components/BudgetInfo';
import Button from '~/components/Button';
import CurrencyInput from '~/components/Input/CurrencyInput';
import Input from '~/components/Input';
import InputMasked from '~/components/Input/MaskedInput';
import Select from '~/components/Select';

// Conecções
import { useBudget } from '~/connection/Budgets';
import { useContract } from '~/connection/Contract';
import { usePdf } from '~/connection/Pdf';

// Utils & Libs
import financing_types from '~/utils/financing-types';
import { useMask } from '~/libs/masks';

import {
  Container,
  FormContainer,
  FinanceContainer,
  Installment,
  PrivateContainer,
} from './styles';
import { checkValidation } from '~/libs/checkSchemaValidation';
import schema from './validation';

function StoreContract() {
  const formRef = useRef();
  const history = useHistory();

  // Conecções
  const { getBudget } = useBudget();
  const { storeContract } = useContract();
  const { getPdfs } = usePdf();

  const { dateMask } = useMask();

  // Estados
  const [accessories, setAccessories] = useState([]);
  const [budget, setBudget] = useState({});
  const [client, setClient] = useState({});
  const [financeType, setFinanceType] = useState('');
  const [initialData, setInitialData] = useState({});
  const [installments, setInstallments] = useState([]);
  const [product, setProduct] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [pdfs, setPdfs] = useState([]);

  const { id, type } = useParams();

  const handleChange = useCallback((financing_type) => {
    setFinanceType(financing_type.value);
  });

  const handleForm = useCallback(async (data) => {
    const { installments_num, financing_type, pdf } = data;

    data = {
      ...data,
      budget_id: id,
      pdf_type: pdf,
    };

    if (financing_type === 'private') {
      // Pega os valores dos inputs
      const pay_1_value = formRef.current.getFieldRef('payment_1_value').state
        .value;
      const pay_1_date = formRef.current.getFieldRef('payment_1_date')
        .inputElement.value;

      const pay_2_value = formRef.current.getFieldRef('payment_2_value').state
        .value;
      const pay_2_date = formRef.current.getFieldRef('payment_2_date')
        .inputElement.value;

      // Monta os objetos de pagamento
      const payment_1 = {
        value: pay_1_value,
        due_date: pay_1_date,
      };
      const payment_2 = {
        value: pay_2_value,
        due_date: pay_2_date,
      };

      // Seta a data nos installments
      for (let i = 0; i < installments_num; i++) {
        const pay_value = formRef.current.getFieldRef(`installment_${i}_value`)
          .state.value;
        const pay_date = formRef.current.getFieldRef(`installment_${i}_date`)
          .inputElement.value;

        installments[i].value = pay_value;
        installments[i].due_date = pay_date;
      }

      data = {
        ...data,
        payment_1,
        payment_2,
        installments,
      };
    } else {
      // Pega os valores dos inputs
      const private_value = formRef.current.getFieldRef('private_value').state
        .value;
      const finance_value = formRef.current.getFieldRef('finance_value').state
        .value;

      data = {
        ...data,
        private_value,
        finance_value,
      };
    }

    setLoading(true);
    if (await checkValidation(formRef, data, schema)) {
      const response = await storeContract(data);

      if (response) {
        history.push(`/orcamentos/${type}`);
        setLoading(false);
      }
    }

    setLoading(false);
  });

  const handleInstallments = useCallback((e) => {
    const qtd_installments = e.target.value;
    const installs = [];

    for (let i = 0; i < qtd_installments; i++) {
      installs.push({
        value: '',
        due_date: '',
      });
    }
    setInstallments(installs);
  });

  const handlePercentage = useCallback((e) => {
    const { total } = budget;
    const percent = e.target.value / 100;
    const private_pay = (total * percent).toFixed(2);
    const finance_pay = (total - private_pay).toFixed(2);

    setInitialData({
      private_value: private_pay,
      finance_value: finance_pay,
    });
  });

  const handlePrivatePercentage = useCallback((e) => {
    const { total } = budget;
    const percent = e.target.value / 100;
    const first_pay = (total * percent).toFixed(2);
    const diff = total - first_pay;
    const qtd_installments = installments.length + 1;

    const other_installments = (diff / qtd_installments).toFixed(2);

    installments.forEach((i) => {
      i.value = other_installments;
    });

    setInitialData({
      payment_1_value: first_pay,
      payment_2_value: other_installments,
    });
  });

  const handleRecalculate = useCallback((e) => {
    const { total } = budget;
    const name = e.target.id;
    const { numAsString } = formRef.current.getFieldRef(name).state;
    const qtd_installments = installments.length + 1;
    let diff;
    let other_installments;
    let first_pay;

    switch (name) {
      case 'payment_1_value':
        diff = total - numAsString;
        other_installments = (diff / qtd_installments).toFixed(2);

        installments.forEach((i) => {
          i.value = other_installments;
        });

        setInitialData({
          payment_2_value: other_installments,
        });

        break;
      case 'payment_2_value':
        first_pay = formRef.current.getFieldRef('payment_1_value').state
          .numAsString;
        diff = total - first_pay - numAsString;
        other_installments = (diff / qtd_installments).toFixed(2);

        installments.forEach((i) => {
          i.value = other_installments;
        });

        setInitialData({});

        break;
      case 'private_value':
        diff = (total - numAsString).toFixed(2);

        setInitialData({ finance_value: diff });

        break;
      case 'finance_value':
        diff = (total - numAsString).toFixed(2);

        setInitialData({ private_value: diff });

        break;
      default:
        break;
    }
  });

  async function loadData() {
    const response = await getBudget(id);

    setBudget(response);
    setClient({ ...response.client, phone: response.client.phones[0].number });
    setProduct(response.product);
    setUser(response.user);
    setAccessories(response.accessories);

    setInitialData({ tank_value: response.total });

    const responsePdfs = await getPdfs({
      doc_type: 2,
      type: response.type_id,
    });

    const changedPdfs = responsePdfs.data.map((pdf) => {
      return {
        id: pdf.id,
        value: pdf.id,
        label: pdf.title,
      };
    });

    setPdfs(changedPdfs);
  }

  useEffect(() => {
    loadData();
  }, [id]);

  return (
    <Container>
      <BudgetInfo
        budget={budget}
        client={client}
        product={product}
        user={user}
        accessories={accessories}
      />
      <Form ref={formRef} onSubmit={handleForm} initialData={initialData}>
        <FormContainer>
          <div>
            <Select
              name="financing_type"
              placeholder="Tipo de Financiamento"
              options={financing_types}
              label="Tipo de Financiamento"
              onChange={handleChange}
            />
          </div>
          <div>
            <CurrencyInput
              type="text"
              name="tank_value"
              placeholder="Valor do Tanque"
              label="Valor do Tanque"
              disabled
            />
          </div>
        </FormContainer>
        <PrivateContainer show={financeType === 'private'}>
          <div>
            <h4>Particular</h4>
          </div>
          <div />
          <div>
            <Input
              type="number"
              name="installments_num"
              placeholder="Número de Parcelas"
              label="Número de Parcelas"
              onKeyUp={handleInstallments}
              max={10}
              min={0}
            />
          </div>
          <div>
            <Input
              type="text"
              name="private_percent"
              placeholder="%"
              label="Porcentagem 1º Pagamento"
              onKeyUp={handlePrivatePercentage}
            />
          </div>
          <div>
            <CurrencyInput
              type="text"
              name="payment_1_value"
              placeholder="Valor do 1º Pagamento"
              label="1º Pagamento"
              onKeyUp={handleRecalculate}
            />
          </div>
          <div>
            <InputMasked
              type="text"
              name="payment_1_date"
              placeholder="dd/mm/aaaa"
              label="Data do Pagamento"
              mask={dateMask}
            />
          </div>
          <div>
            <CurrencyInput
              type="text"
              name="payment_2_value"
              placeholder="Valor do 2º Pagamento"
              label="2º Pagamento - Entraga"
              onKeyUp={handleRecalculate}
            />
          </div>
          <div>
            <InputMasked
              type="text"
              name="payment_2_date"
              placeholder="dd/mm/aaaa"
              label="Data da Entrega"
              mask={dateMask}
            />
          </div>
          <div>
            <h5>Parcelas</h5>
          </div>
          <div />
          {installments.map((installment, index) => (
            <Installment>
              <div>
                <CurrencyInput
                  key={String(Math.random())}
                  type="text"
                  name={`installment_${index}_value`}
                  placeholder={`Valor da ${index + 1}ª Parcela`}
                  label={`${index + 1}ª Parcela`}
                  value={installment.value}
                  disabled
                />
              </div>
              <div>
                <InputMasked
                  type="text"
                  name={`installment_${index}_date`}
                  placeholder="dd/mm/aaaa"
                  label="Data do Pagamento"
                  mask={dateMask}
                />
              </div>
            </Installment>
          ))}
        </PrivateContainer>
        <FinanceContainer
          show={financeType === 'finame' || financeType === 'finance'}
        >
          <div>
            <h4>FINAME</h4>
          </div>
          <div />
          <div>
            <Input
              type="text"
              name="percent"
              placeholder="%"
              label="Porcentagem"
              onKeyUp={handlePercentage}
            />
          </div>
          <div />
          <div>
            <CurrencyInput
              type="text"
              name="private_value"
              placeholder="Particular"
              label="Particular"
              onKeyUp={handleRecalculate}
            />
            {financeType === 'finame' ? (
              ''
            ) : (
              <Input
                type="text"
                name="finance_type"
                placeholder="Tipo de Financiamento"
                label="Tipo de Financiamento"
              />
            )}
          </div>
          <div>
            <CurrencyInput
              type="text"
              name="finance_value"
              placeholder={financeType === 'finame' ? 'FINAME' : 'Financiado'}
              label={financeType === 'finame' ? 'FINAME' : 'Financiado'}
              onKeyUp={handleRecalculate}
            />
          </div>
        </FinanceContainer>
        <div>
          <Select
            name="pdf"
            placeholder="Template de PDF"
            options={pdfs}
            label="Template de PDF"
          />
        </div>
        <Button type="submit" loading={loading} margin="10px 0 0">
          Gerar Contrato
        </Button>
      </Form>
    </Container>
  );
}

export default StoreContract;
