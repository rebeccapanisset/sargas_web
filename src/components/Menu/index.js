import React, { useState, useEffect } from 'react';
import {
  FaAngleDown,
  FaAngleUp,
  FaCircleNotch,
  FaCog,
  FaFileContract,
  FaFileInvoice,
  FaSlidersH,
  FaTools,
  FaTruck,
  FaUser,
} from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { GiFuelTank } from 'react-icons/gi';
import { useAuth } from '~/contexts/auth';

import { Container, MenuItem, SubMenu, Li } from './styles';

export default function Menu() {
  const iconSize = 20;
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  const [toggleProductsMenu, setToggleProductsMenu] = useState(false);
  const [toggleBudgetsMenu, setToggleBudgetsMenu] = useState(false);
  const [toggleConfigMenu, setToggleConfigMenu] = useState(false);

  function handleSubMenu(option) {
    switch (option) {
      case 'products':
        setToggleProductsMenu(!toggleProductsMenu);
        break;
      case 'config':
        setToggleConfigMenu(!toggleConfigMenu);
        break;
      case 'budgets':
        setToggleBudgetsMenu(!toggleBudgetsMenu);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (user.access === 'A') {
      setIsAdmin(true);
    }
  }, []);

  return (
    <Container>
      <nav>
        <ul>
          <Li show>
            <MenuItem to="/">
              <span>
                <FaSlidersH size={iconSize} />
              </span>
              Dashbord
            </MenuItem>
          </Li>
          {/* Menu com submenu */}
          <Li show>
            <MenuItem onClick={() => handleSubMenu('products')}>
              <span>
                <GiFuelTank size={25} />
              </span>
              Produtos
              <div>{toggleProductsMenu ? <FaAngleUp /> : <FaAngleDown />}</div>
            </MenuItem>
            <SubMenu active={toggleProductsMenu}>
              <li>
                <MenuItem to="/produto-aereo">
                  <span>
                    <FaCircleNotch size={10} />
                  </span>
                  Aéreo
                </MenuItem>
                <MenuItem to="/produto-combustivel">
                  <span>
                    <FaCircleNotch size={10} />
                  </span>
                  Combustível
                </MenuItem>
                <MenuItem to="/produto-pipa">
                  <span>
                    <FaCircleNotch size={10} />
                  </span>
                  Pipa
                </MenuItem>
                <MenuItem to="/produto-caixa-dagua">
                  <span>
                    <FaCircleNotch size={10} />
                  </span>
                  Caixa D'água
                </MenuItem>
              </li>
            </SubMenu>
          </Li>
          <Li show={isAdmin}>
            <MenuItem to="/acessorios">
              <span>
                <FaTools size={iconSize} />
              </span>
              Acessórios
            </MenuItem>
          </Li>
          <Li show={isAdmin}>
            <MenuItem to="/usuarios">
              <span>
                <FaUser size={iconSize} />
              </span>
              Usuários
            </MenuItem>
          </Li>
          <Li show={isAdmin}>
            <MenuItem to="/clientes">
              <span>
                <FiUsers size={iconSize} />
              </span>
              Clientes
            </MenuItem>
          </Li>
          <Li show={isAdmin}>
            <MenuItem to="/caminhoes">
              <span>
                <FaTruck size={iconSize} />
              </span>
              Caminhoes
            </MenuItem>
          </Li>
          <Li show={isAdmin}>
            <MenuItem onClick={() => handleSubMenu('budgets')}>
              <span>
                <FaFileContract size={iconSize} />
              </span>
              Orçamentos
              <div>{toggleBudgetsMenu ? <FaAngleUp /> : <FaAngleDown />}</div>
            </MenuItem>
            <SubMenu active={toggleBudgetsMenu}>
              <li>
                <MenuItem to="/orcamentos/aerial_tank">
                  <span>
                    <FaCircleNotch size={10} />
                  </span>
                  Aéreo
                </MenuItem>
                <MenuItem to="/orcamentos/fuel_tank">
                  <span>
                    <FaCircleNotch size={10} />
                  </span>
                  Combustível
                </MenuItem>
                <MenuItem to="/orcamentos/pipa_tank">
                  <span>
                    <FaCircleNotch size={10} />
                  </span>
                  Pipa
                </MenuItem>
                <MenuItem to="/orcamentos/water_tank">
                  <span>
                    <FaCircleNotch size={10} />
                  </span>
                  Caixa D'água
                </MenuItem>
              </li>
            </SubMenu>
          </Li>
          <Li show>
            <MenuItem to="/relatorios">
              <span>
                <FaFileInvoice size={iconSize} />
              </span>
              Relatórios
            </MenuItem>
          </Li>
          <Li show={isAdmin}>
            <MenuItem onClick={() => handleSubMenu('config')}>
              <span>
                <FaCog size={iconSize} />
              </span>
              Configurações
              <div>{toggleConfigMenu ? <FaAngleUp /> : <FaAngleDown />}</div>
            </MenuItem>
            <SubMenu active={toggleConfigMenu}>
              <li>
                <MenuItem to="/configuracoes">
                  <span>
                    <FaCircleNotch size={10} />
                  </span>
                  Geral
                </MenuItem>
                <MenuItem to="/pdfs">
                  <span>
                    <FaCircleNotch size={10} />
                  </span>
                  PDF
                </MenuItem>
              </li>
            </SubMenu>
          </Li>
        </ul>
      </nav>
    </Container>
  );
}
