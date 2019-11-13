import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Estoque from "./pages/Estoque";
import Fornecedor from "./pages/Fornecedor";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/estoque" exact component={Estoque} /> 
                <Route path="/fornecedor" exact component={Fornecedor} />
            </Switch>
        </BrowserRouter>
    );
}