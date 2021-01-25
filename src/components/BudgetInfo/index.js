import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

function BudgetInfo({ budget, client, product, user, accessories }) {
  return (
    <Container>
      <p>
        <h5>Orçamento N° {budget.id}</h5>
      </p>
      <p>
        <strong>Cliente:</strong> {client.name}
      </p>
      <p>
        <strong>Usuário Responsável:</strong> {user.name}
      </p>
      <hr />
      <p>
        <strong>Produto:</strong> {product.description}
      </p>
      <p>
        <strong>Telefone do Cliente:</strong> {client.phone}
      </p>
      <p>
        <strong>Data do Orçamento:</strong> {budget.created_at}
      </p>
      <p>
        <strong>Acessórios:</strong>
      </p>
      {accessories.map((a) => (
        <p>{a.name}</p>
      ))}
    </Container>
  );
}

BudgetInfo.propTypes = {
  budget: PropTypes.shape({
    id: PropTypes.number,
    created_at: PropTypes.string,
  }).isRequired,
  client: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
  product: PropTypes.shape({
    description: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  accessories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ).isRequired,
};

export default BudgetInfo;
