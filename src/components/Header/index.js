import React from "react";
import { Link } from 'react-router-dom'
import { Container, Content } from './styles';

const Header = () => (
    <Container>
        <Content>
            <nav>
                <Link to="/estoque">Estoque</Link>
                <Link to="/fornecedor">Fornecedor</Link>
            </nav>
        </Content>
    </Container>
);

export default Header;