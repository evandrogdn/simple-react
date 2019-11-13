import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Estoque from "./pages/Estoque";
import Fornecedor from "./pages/Fornecedor";
import Produto from "./pages/Produto";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/estoque" exact component={Estoque} />
                <Route path="/fornecedor" exact component={Fornecedor} />
                <Route path="/produto" exact component={Produto} />
            </Switch>
        </BrowserRouter>
    );
}
