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
import Select from '~/components/Select';

// Conecções
import { useBudget } from '~/connection/Budgets';
import { usePdf } from '~/connection/Pdf';

import { Container, FormContainer } from './styles';
import { checkValidation } from '~/libs/checkSchemaValidation';
import schema from './validation';

function NegociateBudget() {
  const formRef = useRef();
  const history = useHistory();

  // Conecções
  const { getBudget, negociateBudget } = useBudget();
  const { getPdfs } = usePdf();

  // Estados
  const [accessories, setAccessories] = useState([]);
  const [budget, setBudget] = useState({});
  const [client, setClient] = useState({});
  const [initialData, setInitialData] = useState({});
  const [product, setProduct] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [pdfs, setPdfs] = useState([]);

  const { id, type } = useParams();

  const handleForm = useCallback(async (data) => {
    const { numAsString } = formRef.current.getFieldRef('value').state;

    data = { ...data, value: numAsString };

    setLoading(true);
    if (await checkValidation(formRef, data, schema)) {
      const response = await negociateBudget(id, numAsString, data.pdf);

      if (response) {
        history.push(`/orcamentos/${type}`);
        setLoading(false);
      }
    }

    setLoading(false);
  });

  const handleApplyDiscount = useCallback((e) => {
    const { total } = budget;
    const discount = e.target.value;

    const newValue = total - (total * discount) / 100;

    setInitialData({ value: newValue });
  });

  async function loadData() {
    const response = await getBudget(id);

    setBudget(response);
    setClient({ ...response.client, phone: response.client.phones[0].number });
    setProduct(response.product);
    setUser(response.user);
    setAccessories(response.accessories);

    setInitialData({ value: response.total });

    const responsePdfs = await getPdfs({
      doc_type: 1,
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
            <CurrencyInput
              type="text"
              name="value"
              placeholder="Valor"
              label="Valor"
            />
            <Select
              name="pdf"
              placeholder="Template de PDF"
              options={pdfs}
              label="Template de PDF"
            />
          </div>
          <div>
            <Input
              type="text"
              name="discount"
              placeholder="Desconto"
              label="Desconto %"
              onKeyUp={handleApplyDiscount}
            />
          </div>
        </FormContainer>
        <Button type="submit" loading={loading} margin="10px 0 0">
          Negociar
        </Button>
      </Form>
    </Container>
  );
}

export default NegociateBudget;
