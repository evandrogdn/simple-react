import React, { useState, useEffect } from 'react';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { toast } from "react-toastify";

import Header from '../../components/Header';
import Modal from '../../components/Modal';
import Button from '../../styles/components/button';
import { api } from '../../services/api';

import { Container, EstoqueStyle, ButtonIcon } from './styles';

export default function Estoque(){
    const [estoques, setEstoques] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState();
    const [produtoID, setProdutoID] = useState();
    const [quantidade, setQuantidade] = useState();
    const [ativo, setAtivo] = useState();
    const [newProdutoID, setNewProdutoID] = useState();
    const [newQuantidade, setNewQuantidade] = useState();
    const [newAtivo, setNewAtivo] = useState();
    const path = 'estoque';
    const type = 'api/';

    async function getEstoques(){
        const response = await api.get(`${type}${path}`);

        if (response.data) setEstoques(response.data);
    };

    useEffect(() => {
        getEstoques();
    }, []);

    async function handleSubmit(e){
        e.preventDefault();
        // post para a api
        await api.post(`${type}${path}`, {
            produtoID : newProdutoID,
            quantidade : newQuantidade,
            ativo : newAtivo
        });
        toast.success("Estoque cadastrado com sucesso!");
        getEstoques();
        setNewProdutoID('');
        setNewQuantidade(0);
        setNewAtivo(false);
    };

    async function getHandleDelete(_id){
        const filter = estoques.filter(value => value._id !== _id);
        setEstoques(filter);
    };

    async function handleDelete(rowIndex){
        console.log(rowIndex)
        getHandleDelete(rowIndex);
        toast.success("Estoque removido com sucesso!");
        await api.delete(`${type}${path}/${rowIndex}`);
    };

    async function getHandleEdit({_id, produtoID, quantidade, ativo}){
        setId(_id);
        setProdutoID(produtoID);
        setQuantidade(quantidade);
        setAtivo(!!ativo);
        setIsModalOpen(true);
    }

    async function handleEdit(){
        await api.put(`${type}${path}/${id}`, {
            produtoID : produtoID,
            quantidade : quantidade,
            ativo : ativo
        });
        toast.success("Estoque alterado com sucesso!");
        setIsModalOpen(!isModalOpen);
        getEstoques();
    }

    async function handleModal(){
        setIsModalOpen(!isModalOpen)
    };

    return (
        <>
            <Header />
            <Container>
                <form>
                    <input value={newProdutoID} placeholder="ID do produto..." onChange={e => setNewProdutoID(e.target.value)} />
                    <input value={newQuantidade} placeholder="Quantidade..." onChange={e => setNewQuantidade(e.target.value)} />
                    <input id="checkbox" checked={newAtivo} type="checkbox" onChange={e => setNewAtivo(e.target.checked)} />
                    <label htmlFor="checkbox">Produto ativo?</label>

                    <button onClick={e => handleSubmit(e)}>Salvar</button>
                </form>
                <ul>
                    {
                        estoques && estoques.map((estoque, key) => (
                            <EstoqueStyle key={key}>
                                <strong>{estoque.produtoID}</strong>
                                <strong className="align-right">{estoque.quantidade}</strong>
                                <strong>{estoque.ativo === true ? "Sim": "Não"}</strong>
                                <strong>
                                <ButtonIcon>
                                    <MdModeEdit size={20} onClick={() => getHandleEdit(estoque)} />
                                </ButtonIcon>
                                <ButtonIcon>
                                    <MdDelete size={20} onClick={() => handleDelete(estoque._id)} />
                                </ButtonIcon>
                                </strong>
                            </EstoqueStyle>    
                        ))
                    }
                </ul>
                { isModalOpen && (
                    <Modal>
                        <h1>Edição de estoque</h1>
                        <form>
                            <span>ID do Produto</span>
                            <input value={produtoID} onChange={e => setProdutoID(e.target.value)} />
                            <span>Quantidade</span>
                            <input value={quantidade} onChange={e => setQuantidade(e.target.value)} />
                            <label htmlFor="checkbox">Produto ativo?</label>
                            <input id="checkbox" checked={ativo} type="checkbox" onChange={e => setAtivo(e.target.checked)} />

                            <Button onClick={() => handleEdit()} size="big" type="submit">Salvar</Button>
                            <Button onClick={() => handleModal()} size="small" color="gray">Cancelar</Button>
                        </form>
                    </Modal>
                )}
            </Container>
        </>
    )
}