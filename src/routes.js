import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Estoque from "./pages/Estoque";
import Fornecedor from "./pages/Fornecedor";
import Produto from "./pages/Produto";
import Provisao from "./pages/Provisao";
import UnidadeMedida from "./pages/UnidadeMedida";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/estoque" exact component={Estoque} />
                <Route path="/fornecedor" exact component={Fornecedor} />
                <Route path="/produto" exact component={Produto} />
                <Route path="/provisao" exact component={Provisao} />
                <Route path="/unidade-medida" exact component={UnidadeMedida} />
            </Switch>
        </BrowserRouter>
    );
}
