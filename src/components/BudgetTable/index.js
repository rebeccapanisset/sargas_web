import React from 'react';
import {
  FaFileContract,
  FaFilePdf,
  FaHandshake,
  FaPencilAlt,
  FaTimesCircle,
} from 'react-icons/fa';

import PropTypes from 'prop-types';

import Table from 'react-bootstrap/Table';

import Button from '~/components/Button';
import LinkElement from '~/components/LinkElement';

import { Container, Content } from './styles';

function BudgetTable({
  title,
  budgets,
  type,
  handleDeleteModal,
  handleSendModal,
  handleDownload,
}) {
  return (
    <Container>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            {title.map((t) => (
              <th key={String(Math.random())}>{t.title}</th>
            ))}
            <th>Enviar</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((budget) => (
            <tr key={String(Math.random())}>
              {title.map((t) => (
                <td key={String(Math.random())}>
                  <Content status={budget[t.name]}>{budget[t.name]}</Content>
                </td>
              ))}
              <td key={String(Math.random())}>
                {budget.status === 'Aguardando' ||
                budget.status === 'Negociando sem Enviar' ? (
                  <Button
                    key={String(Math.random())}
                    type="button"
                    bg="success"
                    onClick={() => handleSendModal(budget)}
                  >
                    Enviar
                  </Button>
                ) : (
                  ''
                )}
              </td>
              <td key={String(Math.random())}>
                <LinkElement
                  key={String(Math.random())}
                  to={`/orcamentos/cadastro/${type}/${budget.id}`}
                  bg="primary"
                >
                  <FaPencilAlt size={16} />
                </LinkElement>
                <Button
                  key={String(Math.random())}
                  type="button"
                  bg="danger"
                  onClick={() => handleDeleteModal(budget)}
                >
                  <FaTimesCircle size={16} />
                </Button>
                <LinkElement
                  key={String(Math.random())}
                  to={`/orcamentos/negociacao/${type}/${budget.id}`}
                  bg="info"
                >
                  <FaHandshake size={20} />
                </LinkElement>
                <Button
                  key={String(Math.random())}
                  type="button"
                  bg="primary"
                  onClick={() => handleDownload(budget)}
                >
                  <FaFilePdf size={20} />
                </Button>
                {budget.status !== 'Aguardando' &&
                budget.status !== 'Aprovado' ? (
                  <LinkElement
                    key={String(Math.random())}
                    to={`/orcamentos/contrato/${type}/${budget.id}`}
                    bg="info"
                  >
                    <FaFileContract size={20} />
                  </LinkElement>
                ) : (
                  ''
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

BudgetTable.propTypes = {
  title: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  budgets: PropTypes.arrayOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired,
  handleDeleteModal: PropTypes.func.isRequired,
  handleSendModal: PropTypes.func.isRequired,
  handleDownload: PropTypes.func.isRequired,
};

BudgetTable.defaultProps = {};

export default BudgetTable;
