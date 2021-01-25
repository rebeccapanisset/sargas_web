import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import {
  Container,
  ContainerNave,
  ExmapleSection,
  ResultExample,
  TabBudget,
  TabClient,
  TabContract,
  TabTruck,
  TabProduct,
  TabUser,
  TabAccessories,
  Signatures,
} from './styles';
import Button from '~/components/Button';

import Signature from '~/assets/example_signature.png';

function SubtitleModal({ title, show, size, onHide }) {
  return (
    <Container>
      <Modal show={show} size={size} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tab.Container defaultActiveKey="instructions">
            <ContainerNave>
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="instructions">Instruções</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="budget">Orçamento</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="contract">Contrato</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="client">Cliente</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="truck">Caminhão</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="product">Produto</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="user">Usuário</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="accessories">Acessórios</Nav.Link>
                </Nav.Item>
              </Nav>
            </ContainerNave>
            <Tab.Content>
              <Tab.Pane eventKey="instructions">
                <p>
                  Os valores apresentados nessa seção servem para representar os
                  dados previamente cadastrados na plataforma e relacionados ao
                  Orçamento que será vinculado a esse tipo de PDF.
                </p>
                <p>
                  Para ter acesso a esses dados no conteúdo do PDF basta
                  escolher o valor desejado e colocar-lo entre dois chaves (Ex:{' '}
                  {'{{valor}}'}). Seguem alguns exemplos de uso:
                </p>
                <h5>Exemplo:</h5>
                <ExmapleSection>
                  <p>A</p>
                  <p>
                    <span>{'{{client.name}}'}</span>
                  </p>
                  <p>
                    CPF/CNPJ: <span>{'{{client.cpf_cnpj}}'}</span> IE:
                    <span>{'{{client.ie}}'}</span>
                  </p>
                  <p>
                    END: <span>{'{{client.address}}'}</span> | CEP:
                    <span>{'{{client.zip_code}}'}</span>
                  </p>
                  <p>
                    CIDADE: <span>{'{{client.city}}'}</span>
                  </p>
                </ExmapleSection>
                <h5>Resultado:</h5>
                <ResultExample>
                  <p>A</p>
                  <p>Transpostes Tanques</p>
                  <p>CPF/CNPJ: 63.958.620/0001-58 IE: 10.580.047-3</p>
                  <p>END: Rua 241 N° 940 | CEP: 74535-380</p>
                  <p>CIDADE: Goiânia</p>
                </ResultExample>
                <span>
                  * Todos os dados utilizados no exemplo acima são fictícios.
                </span>
              </Tab.Pane>
              <Tab.Pane eventKey="budget">
                <TabBudget>
                  <p>
                    <span>{'{{created_at}}'}</span> - Data de Criação
                  </p>
                  <p>
                    <span>{'{{delivery_days}}'}</span> - Quantidade de Dias para
                    Entrega
                  </p>
                  <p>
                    <span>{'{{compartment_position}}'}</span> - Posição dos
                    Compartimentos
                  </p>
                  <p>
                    <span>{'{{amount}}'}</span> - Quantidade do Produto
                  </p>
                  <p>
                    <span>{'{{requester}}'}</span> - Nome do Solicitante
                  </p>
                  <p>
                    <span>{'{{total}}'}</span> - Total
                  </p>
                  <p>
                    <span>{'{{notes}}'}</span> - Observações
                  </p>
                  <p>
                    <span>{'{{type.name}}'}</span> - Tipo de Orçamento
                    (Combustível, Pipa, Aéreo, Caixa D'Água)
                  </p>
                  <p>
                    <span>{'{{saleType.sale_type}}'}</span> - Tipo de Venda
                  </p>
                  <p>
                    <span>{'{{paymentMethod.payment_method}}'}</span> - Método
                    de Pagamento
                  </p>
                </TabBudget>
              </Tab.Pane>
              <Tab.Pane eventKey="contract">
                <TabContract>
                  <div>
                    <h4>Privado</h4>
                    <p>
                      <span>{'{{contract.installments_num}}'}</span> - Número de
                      parcelas
                    </p>
                    <p>
                      <span>{'{{contract.payment_1.value}}'}</span> - Valor do
                      primeiro pagamento
                    </p>
                    <p>
                      <span>{'{{contract.payment_1.due_date}}'}</span> - Data do
                      primeiro pagamento
                    </p>
                    <p>
                      <span>{'{{contract.payment_2.value}}'}</span> - Valor do
                      segundo pagamento (Entrega)
                    </p>
                    <p>
                      <span>{'{{contract.payment_2.due_date}}'}</span> - Data do
                      segundo pagamento (Entrega)
                    </p>
                    <br />
                    <p>
                      Para a apresentação dos campos das parcelas usar a
                      seguinte TAG. Essa TAG contem uma listagem com o valor e
                      data das parcelas.
                      <br />
                      <br />
                      <strong>
                        Obs: Nesse caso, para colocar as parcelas você deve
                        utilizar 3 (três) chaves
                      </strong>
                    </p>
                    <div>
                      <h5>Parcelas:</h5>
                      <p>
                        <span>{'{{{installmentsList}}}'}</span>
                      </p>
                      <ol>
                        <li>R$ 1.000,00 - 10/01/2021</li>
                        <li>R$ 1.000,00 - 10/02/2021</li>
                        <li>R$ 1.000,00 - 10/03/2021</li>
                      </ol>
                    </div>
                  </div>
                  <div>
                    <h4>FINAME</h4>
                    <p>
                      <span>{'{{contract.private_value}}'}</span> - Valor
                      particular
                    </p>
                    <p>
                      <span>{'{{contract.finance_value}}'}</span> - Valor FINAME
                    </p>
                  </div>
                  <div>
                    <h4>Outro Financiamento</h4>
                    <p>
                      <span>{'{{contract.private_value}}'}</span> - Valor
                      particular
                    </p>
                    <p>
                      <span>{'{{contract.finance_value}}'}</span> - Valor
                      financiado
                    </p>
                    <p>
                      <span>{'{{contract.finance_type}}'}</span> - Tipo de
                      financiamento
                    </p>
                  </div>
                </TabContract>
              </Tab.Pane>
              <Tab.Pane eventKey="client">
                <TabClient>
                  <p>
                    <span>{'{{client.name}}'}</span> - Nome
                  </p>
                  <p>
                    <span>{'{{client.cpf_cnpj}}'}</span> - CPF ou CNPJ
                  </p>
                  <p>
                    <span>{'{{client.ie}}'}</span> - Inscrição Estadual (caso
                    PJ)
                  </p>
                  <p>
                    <span>{'{{client.email}}'}</span> - E-mail
                  </p>
                  <p>
                    <span>{'{{client.phone}}'}</span> - Telefone
                  </p>
                  <p>
                    <span>{'{{client.zip_code}}'}</span> - CEP
                  </p>
                  <p>
                    <span>{'{{client.address}}'}</span> - Endereço
                  </p>
                  <p>
                    <span>{'{{client.neighborhood}}'}</span> - Bairro
                  </p>
                  <p>
                    <span>{'{{client.city}}'}</span> - Cidade
                  </p>
                  <p>
                    <span>{'{{client.state}}'}</span> - Estado
                  </p>
                </TabClient>
              </Tab.Pane>
              <Tab.Pane eventKey="truck">
                <TabTruck>
                  <p>
                    <span>{'{{truck.plate}}'}</span> - Placa
                  </p>
                  <p>
                    <span>{'{{truck.brand}}'}</span> - Marca
                  </p>
                  <p>
                    <span>{'{{truck.model}}'}</span> - Modelo
                  </p>
                  <p>
                    <span>{'{{truck.year}}'}</span> - Ano
                  </p>
                  <p>
                    <span>{'{{truck.color}}'}</span> - Cor
                  </p>
                  <p>
                    <span>{'{{truck.chassi}}'}</span> - Chassi
                  </p>
                  <p>
                    <span>{'{{truck.axes_number}}'}</span> - Número de Eixos
                  </p>
                  <p>
                    <span>{'{{truck.between_axes}}'}</span> - Distância Entre
                    Eixos
                  </p>
                </TabTruck>
              </Tab.Pane>
              <Tab.Pane eventKey="product">
                <TabProduct>
                  <p>
                    <span>{'{{product.description}}'}</span> - Descrição
                  </p>
                  <p>
                    <span>{'{{product.price}}'}</span> - Preço
                  </p>
                  {/* <p>
                  <span>{'{{product.image}}'}</span> - Imagem
                </p> */}

                  <div>
                    <h5>Combustível</h5>
                    <p>
                      <span>{'{{product.volume}}'}</span> - Volume
                    </p>
                  </div>

                  <div>
                    <h5>Pipa</h5>
                    <p>
                      <span>{'{{product.volume}}'}</span> - Volume
                    </p>
                  </div>

                  <div>
                    <h5>Aéreo</h5>
                    <p>
                      <span>{'{{product.volume}}'}</span> - Volume
                    </p>
                    <p>
                      <span>{'{{product.length}}'}</span> - Comprimento
                    </p>
                    <p>
                      <span>{'{{product.diameter}}'}</span> - Diâmetro
                    </p>
                  </div>

                  <div>
                    <h5>Caixa D'Água</h5>
                    <p>
                      <span>{'{{product.volume}}'}</span> - Volume
                    </p>
                  </div>
                </TabProduct>
              </Tab.Pane>
              <Tab.Pane eventKey="user">
                <TabUser>
                  <p>
                    <span>{'{{user.name}}'}</span> - Nome
                  </p>
                  <p>
                    <span>{'{{user.email}}'}</span> - E-mail
                  </p>
                  <br />
                  <p>
                    Para a apresentação dos campos de assinatura. Essa TAG
                    contém a assinatura do usuário e um espaço para a assinatura
                    do cliente.
                    <br />
                    <br />
                    <strong>
                      Obs: Nesse caso, para colocar as assinaturas você deve
                      utilizar 3 (três) chaves
                    </strong>
                  </p>
                  <div>
                    <h5>Assinaturas:</h5>
                    <p>
                      <span>{'{{{signatures}}}'}</span>
                    </p>
                    <Signatures>
                      <div>
                        <strong>
                          <img src={Signature} alt="" />
                          <br />
                        </strong>
                        Nome do Usuário
                      </div>
                      <div>
                        <strong>&nbsp;&nbsp;</strong>
                      </div>
                    </Signatures>
                  </div>
                </TabUser>
              </Tab.Pane>
              <Tab.Pane eventKey="accessories">
                <TabAccessories>
                  <p>
                    Para a apresentação dos acessórios adicionados ao orçamento
                    há duas opções:
                    <br />
                    <br />
                    <strong>
                      Obs: Nesse caso, para colocar acessórios você deve
                      utilizar 3 (três) chaves
                    </strong>
                  </p>
                  <div>
                    <h5>Uma listagem:</h5>
                    <p>
                      <span>{'{{{accessoriesList}}}'}</span>
                    </p>
                    <ol>
                      <li>Acessório 1</li>
                      <li>Acessório 2</li>
                      <li>Acessório 3</li>
                    </ol>
                  </div>
                  <div>
                    <h5>Uma tabela:</h5>
                    <p>
                      <span>{'{{{accessoriesTable}}}'}</span>
                    </p>
                    <table>
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>Preço</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Acessório 1</td>
                          <td>R$ 1.000,00</td>
                        </tr>
                        <tr>
                          <td>Acessório 2</td>
                          <td>R$ 1.000,00</td>
                        </tr>
                        <tr>
                          <td>Acessório 3</td>
                          <td>R$ 1.000,00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabAccessories>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Fechar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

SubtitleModal.propTypes = {
  title: PropTypes.string,
  size: PropTypes.string,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

SubtitleModal.defaultProps = {
  title: '',
  size: '',
};

export default SubtitleModal;
