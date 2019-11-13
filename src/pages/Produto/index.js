import React, { useState, useEffect } from 'react';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { toast } from "react-toastify";

import Header from '../../components/Header';
import Modal from '../../components/Modal';
import Button from '../../styles/components/button';
import { api } from '../../services/api';

import { Container, ButtonIcon, ProdutoStyle } from './styles'

export default function Produto() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState();
  const [referencia, setReferencia] = useState();
  const [newReferencia, setNewReferencia] = useState();
  const [descricao, setDescricao] = useState();
  const [newDescricao, setNewDescricao] = useState();
  const [valor, setValor] = useState();
  const [newValor, setNewValor] = useState();
  const [fornecedorID, setFornecedorID] = useState();
  const [newFornecedorID, setNewFornecedorID] = useState();
  const [produtos, setProdutos] = useState();
  const path = 'produto';
  const type = 'api/';

  async function getProdutos(){
    const response = await api.get(`${type}${path}`);

    if (response.data) setProdutos(response.data);
  };

  useEffect(() => {
    getProdutos();
  }, []);

  async function handleSubmit(e){
    e.preventDefault();
    // post para a api
    await api.post(`${type}${path}`, {
      referencia: newReferencia,
      descricao: newDescricao,
      valor: newValor,
      fornecedorID: newFornecedorID
    });
    toast.success("Produto cadastrado com sucesso!");
    setNewReferencia('');
    setNewDescricao('');
    setNewValor(0);
    setNewFornecedorID('');
    getProdutos();
  };

  async function getHandleDelete(_id){
    const filter = produtos.filter(value => value._id !== _id);
    setProdutos(filter);
  };

  async function handleDelete(rowIndex){
    getHandleDelete(rowIndex);
    toast.success("Produto removido com sucesso!");
    await api.delete(`${type}${path}/${rowIndex}`);
  };

  async function getHandleEdit({_id, referencia, descricao, valor, fornecedorID}){
    setId(_id);
    setReferencia(referencia);
    setDescricao(descricao);
    setValor(valor);
    setFornecedorID(fornecedorID);
    setIsModalOpen(true);
  }

  async function handleEdit(){
    await api.put(`${type}${path}/${id}`, {
      referencia: referencia,
      descricao: descricao,
      valor: valor,
      fornecedorID: fornecedorID
    });
    toast.success("Produto alterado com sucesso!");
    setIsModalOpen(!isModalOpen);
    getProdutos();
  }

  async function handleModal(){
    setIsModalOpen(!isModalOpen)
  };

  return (
    <>
      <Header />
      <Container>
        <form>
          <input value={newReferencia} placeholder="Referencia do Produto..." onChange={e => setNewReferencia(e.target.value)} />
          <input value={newDescricao} placeholder="Descricao do Produto..." onChange={e => setNewDescricao(e.target.value)} />
          <input value={newValor} type="number" onChange={e => setNewValor(e.target.value)} />
          <input value={newFornecedorID} placeholder="Fornecedor do Produto..." onChange={e => setNewFornecedorID(e.target.value)} />
          <button onClick={e => handleSubmit(e)}>Salvar</button>
        </form>
        <ul>
          {
            produtos && produtos.map((produto, key) => (
              <ProdutoStyle key={key}>
                <strong>{produto.referencia}</strong>
                <strong>{produto.descricao}</strong>
                <strong>{produto.valor}</strong>
                <strong>{produto.fornecedorID}</strong>
                <strong>
                  <ButtonIcon>
                    <MdModeEdit size={20} onClick={() => getHandleEdit(produto)} />
                  </ButtonIcon>
                  <ButtonIcon>
                    <MdDelete size={20} onClick={() => handleDelete(produto._id)} />
                  </ButtonIcon>
                </strong>
              </ProdutoStyle>
            ))
          }
        </ul>
        { isModalOpen && (
          <Modal>
            <h1>Edição de produto</h1>
            <form>
              <input value={referencia} onChange={e => setReferencia(e.target.value)} />
              <input value={descricao} onChange={e => setDescricao(e.target.value)} />
              <input value={valor} type="number" onChange={e => setValor(e.target.value)} />
              <input value={fornecedorID} onChange={e => setFornecedorID(e.target.value)} />

              <Button onClick={() => handleEdit()} size="big" type="submit">Salvar</Button>
              <Button onClick={() => handleModal()} size="small" color="gray">Cancelar</Button>
            </form>
          </Modal>
        )}
      </Container>
    </>
  );
}
