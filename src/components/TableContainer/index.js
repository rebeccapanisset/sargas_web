import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import Button from '~/components/Button';
import LinkElement from '~/components/LinkElement';

import { Container, Content } from './styles';

function TableContainer({ title, contents, buttons }) {
  return (
    <Container>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            {title.map((t) => (
              <th key={String(Math.random())}>{t.title}</th>
            ))}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {contents.map((content) => (
            <tr key={String(Math.random())}>
              {title.map((t) => (
                <td key={String(Math.random())}>
                  <Content status={content[t.name]}>{content[t.name]}</Content>
                </td>
              ))}
              <td key={String(Math.random())}>
                {buttons.map((b) => {
                  if (b.isLink) {
                    return (
                      <LinkElement
                        key={String(Math.random())}
                        to={{ pathname: `${b.path}/${content.id}` }}
                        bg={b.bg}
                      >
                        {b.title}
                      </LinkElement>
                    );
                  }
                  return (
                    <Button
                      key={String(Math.random())}
                      type="button"
                      bg={b.bg}
                      onClick={() => b.handleAction(content)}
                    >
                      {b.title}
                    </Button>
                  );
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

TableContainer.propTypes = {
  title: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      bg: PropTypes.string,
      isLink: PropTypes.bool,
      path: PropTypes.string,
      handleAction: PropTypes.func,
    })
  ).isRequired,
  contents: PropTypes.arrayOf(PropTypes.any).isRequired,
};

TableContainer.defaultProps = {};

export default TableContainer;
