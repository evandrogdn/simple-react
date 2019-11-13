import React from "react";
import { Link } from 'react-router-dom'
import { Container, Content } from './styles';

const Header = () => (
    <Container>
        <Content>
            <nav>
                <Link to="/estoque">Estoque</Link>
            </nav>
        </Content>
    </Container>
);

export default Header;