import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Estoque from "./pages/Estoque";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/estoque" exact component={Estoque} /> 
            </Switch>
        </BrowserRouter>
    );
}