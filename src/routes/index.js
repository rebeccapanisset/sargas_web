import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '~/pages/Login';
import Profile from '~/pages/User/Profile';
import RecoveryPassword from '~/pages/Password/RecoveryPassword';
import ResetPassword from '~/pages/Password/ResetPassword';

import Dashboard from '~/pages/Dashboard';

import User from '~/pages/User';

import Clients from '~/pages/Clients';
import StoreClients from '~/pages/Clients/Store';

import Truck from '~/pages/Truck';

import Pipa from '~/pages/Products/Pipa';
import Aerial from '~/pages/Products/Aerial';
import Fuel from '~/pages/Products/Fuel';
import Water from '~/pages/Products/Water';
import Accessory from '~/pages/Accessory';

import Configuration from '~/pages/Configuration';
import Pdfs from '~/pages/Pdfs';
import StorePdfs from '~/pages/Pdfs/Store';

import Budgets from '~/pages/Budgets';
import StoreBudgets from '~/pages/Budgets/Store';
import NegociateBudget from '~/pages/Budgets/Negociate';
import StoreContract from '~/pages/Budgets/Contract';

import Reports from '~/pages/Reports';

export default function Routes() {
  return (
    <Switch>
      {/* Not authenticaded routes */}
      <Route path="/" exact component={Login} />
      <Route path="/solicitar-recuperacao" component={RecoveryPassword} />
      <Route path="/recuperar-senha" component={ResetPassword} />

      {/* Comum authenticaded routes */}
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/perfil" component={Profile} isPrivate />

      {/* Admin authenticaded routes */}
      <Route path="/usuarios" component={User} isPrivate isAdmin />
      <Route path="/clientes" exact component={Clients} isPrivate isAdmin />
      <Route
        path="/clientes/cadastro/:id?"
        component={StoreClients}
        isPrivate
        isAdmin
      />
      <Route path="/caminhoes" exact component={Truck} isPrivate isAdmin />

      <Route path="/acessorios" exact component={Accessory} isPrivate isAdmin />

      {/* Configurações */}
      <Route
        path="/configuracoes"
        exact
        component={Configuration}
        isPrivate
        isAdmin
      />
      <Route path="/pdfs" exact component={Pdfs} isPrivate isAdmin />
      <Route
        path="/pdfs/cadastro/:id?"
        component={StorePdfs}
        isPrivate
        isAdmin
      />

      {/* Produtos */}
      <Route path="/produto-pipa" exact component={Pipa} isPrivate isAdmin />
      <Route path="/produto-aereo" exact component={Aerial} isPrivate isAdmin />
      <Route
        path="/produto-caixa-dagua"
        exact
        component={Water}
        isPrivate
        isAdmin
      />
      <Route
        path="/produto-combustivel"
        exact
        component={Fuel}
        isPrivate
        isAdmin
      />

      {/* Orçamentos */}
      <Route
        path="/orcamentos/:type"
        exact
        component={Budgets}
        isPrivate
        isAdmin
      />
      <Route
        path="/orcamentos/cadastro/:type/:id?"
        component={StoreBudgets}
        isPrivate
        isAdmin
      />
      <Route
        path="/orcamentos/negociacao/:type/:id?"
        component={NegociateBudget}
        isPrivate
        isAdmin
      />
      <Route
        path="/orcamentos/contrato/:type/:id?"
        component={StoreContract}
        isPrivate
        isAdmin
      />
      <Route path="/relatorios" component={Reports} isPrivate isAdmin />
    </Switch>
  );
}
