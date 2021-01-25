// React Libs
import React, { useRef, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Unform Libs
import { Form } from '@unform/web';

// Components
import AutoComplete from '~/components/AutoComplete';
import Button from '~/components/Button';
import CurrencyInput from '~/components/Input/CurrencyInput';
import Input from '~/components/Input';
import MultiSelect from '~/components/MultiSelect';
import Select from '~/components/Select';

// Connections
import { useAerial } from '~/connection/Products/Aerial';
import { useBudget } from '~/connection/Budgets';
import { useClient } from '~/connection/Clients';
import { useConfiguration } from '~/connection/Configuration';
import { useFuel } from '~/connection/Products/Fuel';
import { usePdf } from '~/connection/Pdf';
import { usePipa } from '~/connection/Products/Pipa';
import { useTankTypes } from '~/connection/TankTypes';
import { useTruck } from '~/connection/Truck';
import { useWater } from '~/connection/Products/Water';

// Context
import { useAutoComplete } from '~/contexts/autocomplete';

// Validation
import { checkValidation } from '~/libs/checkSchemaValidation';
import schema from './validation';

import {
  ClientDataSection,
  Container,
  ContainerCompartments,
  FormContainer,
  ArialFields,
} from './styles';

function FormBudget() {
  const formRef = useRef();
  const history = useHistory();

  // Url Params
  const { id, type } = useParams();
  const update = !!id;

  // States used on de component
  const [clientDefaultValue, setClientDefaultValue] = useState('');
  const [clientOptions, setClientsOptions] = useState([]);
  const [compartments, setCompartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState({});
  const [pdfs, setPdfs] = useState([]);
  const [price, setPrice] = useState(0);
  const [productDefaultValue, setProductDefaultValue] = useState('');
  const [productsOptions, setProductsOptions] = useState([]);
  const [saleTypes, setSaleTypes] = useState({});
  const [selectedAccessories, setSelectedAccessories] = useState([]);
  const [selectedClient, setSelectedClient] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedTruck, setSelectedTruck] = useState({});
  const [total, setTotal] = useState(0);
  const [truckDefaultValue, setTruckDefaultValue] = useState('');
  const [trucksOptions, setTrucksOptions] = useState([]);
  const [typeTank, setTypeTank] = useState({});

  // Hooks and contexts
  const { accessories, handleSetAccessories } = useAutoComplete();
  const { getAerials } = useAerial();
  const { getClients } = useClient();
  const { getConfigurations } = useConfiguration();
  const { getFuels } = useFuel();
  const { getPdfs } = usePdf();
  const { getPipas } = usePipa();
  const { getTankTypes } = useTankTypes();
  const { getTrucks } = useTruck();
  const { getWaters } = useWater();
  const { getBudget, storeBudget, updateBudget } = useBudget();

  let time = null;

  useEffect(() => {
    async function loadBudget() {
      const configurations = await getConfigurations();

      // Preenche as opções do select de Tipo de Venda
      const sale_types = configurations.sale_types.map((sale_type) => ({
        label: sale_type.sale_type,
        value: sale_type.id,
      }));

      // Preenche as opções do select de Tipo de Pagamento
      const payment_methods = configurations.payment_methods.map(
        (payment_method) => ({
          label: payment_method.payment_method,
          value: payment_method.id,
        })
      );

      if (update) {
        const response = await getBudget(id);
        const budget = response;
        const { client, product, truck } = response;
        let tank;

        switch (type) {
          case 'aerial_tank':
            tank = product.aerialTank;

            break;
          case 'fuel_tank':
            tank = product.fuelTank;

            break;
          case 'pipa_tank':
            tank = product.pipaTank;

            break;
          case 'water_tank':
            tank = product.waterTank;

            break;
          default:
            break;
        }

        // Preenche os campos do Orçamento
        formRef.current.setData(budget);
        formRef.current.setData(client);
        formRef.current.setData(product);
        formRef.current.setData(tank);
        formRef.current.setData(truck);

        setCompartments(tank.volume);

        const compartmentPoisition = budget.compartment_position.split('/');

        compartmentPoisition.forEach((c, i) => {
          formRef.current.setFieldValue(`compartment${i}`, c);
        });

        setTotal(budget.total);
        setPrice(product.price);

        // Preenche os acessórios
        setSelectedAccessories(budget.accessories);
        handleSetAccessories(budget.accessories);

        // Preenche os campos de Cliente
        setClientDefaultValue(client.name);
        setSelectedClient(client);

        // Preenche os campos de Produto
        setProductDefaultValue(product.description);
        setSelectedProduct(tank);

        // Preenche os campos de Caminhão
        setTruckDefaultValue(truck.brand);
        setSelectedTruck(truck);

        // Preenche o Tipo de Venda
        const saleType = sale_types.find(
          (sale) => sale.value === budget.sale_type_id
        );
        formRef.current.setFieldValue('sale_type', saleType);

        // Preenche a Forma de Pagamento
        const paymentMethod = payment_methods.find(
          (payMethod) => payMethod.value === budget.payment_method_id
        );
        formRef.current.setFieldValue('payment_method', paymentMethod);
      }

      const tankType = await getTankTypes(type);
      setTypeTank(tankType[0]);

      formRef.current.setFieldValue('amount', 1);

      setSaleTypes(sale_types);

      setPaymentMethods(payment_methods);

      // Preenche as opções do select de Template de PDF
      const responsePdfs = await getPdfs({
        doc_type: 1,
        type: tankType[0].id,
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

    loadBudget();
  }, [id]);

  function handleCalculateTotal(sAccessories, productPrice, amount) {
    let totalPrice = productPrice;

    sAccessories.forEach((a) => {
      totalPrice = parseFloat(totalPrice) + parseFloat(a.price);
    });

    totalPrice = (parseFloat(totalPrice) * parseFloat(amount)).toFixed(2);

    setTotal(totalPrice);
  }

  function handleQtdChange(e) {
    const qtd = e.target.value;

    if (qtd <= 0) {
      formRef.current.setFieldValue('amount', 1);

      handleCalculateTotal(selectedAccessories, price, 1);
    } else {
      handleCalculateTotal(selectedAccessories, price, qtd);
    }
  }

  async function getTanks(filter) {
    switch (type) {
      case 'aerial_tank':
        return getAerials(1, filter);

      case 'fuel_tank':
        return getFuels(1, filter);

      case 'pipa_tank':
        return getPipas(1, filter);

      case 'water_tank':
        return getWaters(1, filter);

      default:
        return null;
    }
  }

  async function handleChangeValue(name, filter) {
    let response = [];

    clearTimeout(time);

    time = setTimeout(async () => {
      let configuredOptions = [];

      switch (name) {
        case 'clients':
          response = await getClients(1, filter);

          configuredOptions = response.data.map((res) => ({
            itemArea: {
              title: res.name,
              subtitle: res.cpf_cnpj,
            },
            object: res,
            affectedValues: ['email', 'name'],
          }));

          setClientsOptions(configuredOptions);

          break;
        case 'products':
          response = await getTanks(filter);

          configuredOptions = response.data.map((res) => ({
            itemArea: {
              title: res.description,
              subtitle: '',
            },
            object: res,
            affectedValues: ['volume', 'length', 'diameter'],
          }));

          setProductsOptions(configuredOptions);

          break;
        case 'trucks':
          response = await getTrucks(1, filter);

          configuredOptions = response.data.map((res) => ({
            itemArea: {
              title: res.brand,
              subtitle: '',
            },
            object: res,
            affectedValues: ['model', 'axes_number', 'between_axes'],
          }));

          setTrucksOptions(configuredOptions);

          break;
        default:
          break;
      }
    }, 200);
  }

  function handleSelectItem(item, inputRef, name) {
    inputRef.current.value = item.itemArea.title;

    item.affectedValues.forEach((field) => {
      formRef.current.setFieldValue(field, item.object[field]);
    });

    const amount = formRef.current.getFieldValue('amount');

    switch (name) {
      case 'clients':
        setSelectedClient(item.object);

        break;
      case 'products':
        setSelectedProduct(item.object);
        setPrice(item.object.price);
        setCompartments(item.object.volume);

        handleCalculateTotal(
          accessories.get('Accessories') || [],
          item.object.price,
          amount
        );

        break;
      case 'trucks':
        setSelectedTruck(item.object);

        break;
      default:
        break;
    }
  }

  function handleSelectedAccessories(sAccessories) {
    const amount = formRef.current.getFieldValue('amount');

    handleSetAccessories(sAccessories);
    setSelectedAccessories(sAccessories);

    handleCalculateTotal(sAccessories, price, amount);
  }

  // Submit form function
  const handleForm = async (data) => {
    const props = 'compartment';

    let compartment_position = '';

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < data.volume; index++) {
      compartment_position += data[props + index];

      compartment_position += index < data.volume - 1 ? '/' : '';
    }

    const accessoriesIds = selectedAccessories.map((accessory) => accessory.id);

    const client = selectedClient;
    const truck = selectedTruck;
    const product = selectedProduct;

    data = {
      ...data,
      compartment_position,
      accessories: accessoriesIds,
      sale_type_id: data.sale_type,
      payment_method_id: data.payment_method,
      client_id: client.id,
      truck_id: truck.id,
      product_id: product.product_id,
      type_id: typeTank.id,
      price,
      total,
      pdf_type_id: data.pdf_template,
    };

    setLoading(true);

    if (await checkValidation(formRef, data, schema)) {
      const response = update
        ? await updateBudget(data, id)
        : await storeBudget(data);

      if (response) {
        history.push(`/orcamentos/${type}`);
        setLoading(false);
      }
    }

    setLoading(false);
  };

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleForm}>
        <ClientDataSection>
          <h4>Dados do Cliente</h4>
          {/** finder de nome / CPF / CNPJ => CPF/CNPJ */}
          <AutoComplete
            placeholder="Nome do Cliente | CPF | CNPJ"
            name="clients"
            label="Nome do Cliente"
            defaultValue={clientDefaultValue}
            options={clientOptions}
            handleChangeValue={handleChangeValue}
            handleSelectItem={handleSelectItem}
          />
          {/** nome do cliente / bloqued */}
          <Input
            type="text"
            name="name"
            placeholder="Cliente"
            label="Cliente"
            disabled
          />
          {/** email do cliente / bloqued */}
          <Input
            type="text"
            name="email"
            placeholder="E-mail"
            label="E-mail"
            disabled
          />
        </ClientDataSection>
        <FormContainer>
          <div>
            <h4>Caminhão do Cliente</h4>
            {/** finder de placa / marca => placa */}
            <AutoComplete
              placeholder="Placa ou marca do caminhão"
              name="trucks"
              label="Caminhão"
              defaultValue={truckDefaultValue}
              options={trucksOptions}
              handleChangeValue={handleChangeValue}
              handleSelectItem={handleSelectItem}
            />
            {/** modelo do caminhão / bloqued */}
            <Input
              type="text"
              name="model"
              placeholder="Modelo"
              label="Modelo"
              disabled
            />
            {/** qtd eixos do caminhão / bloqued */}
            <Input
              type="text"
              name="axes_number"
              placeholder="Quantidade de eixos"
              label="Quantidade de eixos"
              disabled
            />
            {/** entre eixos do caminhão / bloqued */}
            <Input
              type="text"
              name="between_axes"
              placeholder="Distância entre eixos"
              label="Distância entre eixos"
              disabled
            />
          </div>
          <div>
            <h4>Dados do Produto</h4>
            {/** finder de descrição / id => descrição */}
            <AutoComplete
              placeholder="Produto"
              name="products"
              label="Produto"
              defaultValue={productDefaultValue}
              options={productsOptions}
              handleChangeValue={handleChangeValue}
              handleSelectItem={handleSelectItem}
            />
            {/** valor do produto / bloqued */}
            <CurrencyInput
              type="text"
              name="price"
              placeholder="Valor"
              label="Valor"
              value={price}
              disabled
            />
            {type === 'aerial_tank' ? (
              <ArialFields>
                <div>
                  <Input
                    type="text"
                    name="length"
                    placeholder="Comprimento"
                    label="Comprimento"
                    disabled
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    name="diameter"
                    placeholder="Diâmetro"
                    label="Diâmetro"
                    disabled
                  />
                </div>
              </ArialFields>
            ) : (
              ''
            )}
            <Input
              type="text"
              name="volume"
              placeholder="Volume"
              label="Volume"
              disabled
            />
            <ContainerCompartments compartments={compartments}>
              {new Array(compartments).fill('').map((_, index) => (
                <div>
                  <Input
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    type="text"
                    name={`compartment${index}`}
                    placeholder={`${index + 1}º compartimento`}
                    label={`${index + 1}º compartimento`}
                    id={index}
                  />
                </div>
              ))}
            </ContainerCompartments>
          </div>
          <div>
            <h4>Acessórios do Produto</h4>
            <MultiSelect
              typeTank={type}
              selected={selectedAccessories}
              handleSelectedAccessories={handleSelectedAccessories}
            />
            <Input
              multiline
              name="notes"
              placeholder="Observações"
              label="Observações"
            />
          </div>
          <div>
            <h4>Dados do Orçamento</h4>
            <Input
              type="text"
              name="delivery_days"
              placeholder="Dias para a entrega"
              label="Dias para a entrega"
            />
            <Select
              name="sale_type"
              placeholder="Tipo de Venda"
              options={saleTypes}
              label="Tipo de Venda"
            />
            <Input type="text" name="requester" placeholder="ATT" label="ATT" />
            <Select
              name="payment_method"
              placeholder="Forma de Pagamento"
              options={paymentMethods}
              label="Forma de Pagamento"
            />
            <CurrencyInput
              type="text"
              name="total"
              placeholder="Total"
              label="Total"
              value={total}
            />
            <Input
              type="number"
              name="amount"
              placeholder="Quantidade"
              onBlur={handleQtdChange}
              label="Quantidade"
            />
            <Select
              name="pdf_template"
              placeholder="Tipo de PDF"
              options={pdfs}
              label="Tipo de PDF"
            />
          </div>
        </FormContainer>
        <Button type="submit" loading={loading} margin="10px 0 0">
          {update ? 'Editar' : 'Salvar'}
        </Button>
      </Form>
    </Container>
  );
}

export default FormBudget;
