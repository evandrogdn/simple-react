import React, { useState, useEffect } from 'react';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { toast } from "react-toastify";

import Header from '../../components/Header';
import Modal from '../../components/Modal';
import Button from '../../styles/components/button';
import { api } from '../../services/api';

import { ProvisaoStyle, ButtonIcon, Container } from './styles'

export default function Provisao() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState();
  const [estoqueID, setEstoqueID] = useState();
  const [newEstoqueID, setNewEstoqueID] = useState();
  const [estoqueMinimo, setEstoqueMinimo] = useState();
  const [newEstoqueMinimo, setNewEstoqueMinimo] = useState();
  const [estoqueMaximo, setEstoqueMaximo] = useState();
  const [newEstoqueMaximo, setNewEstoqueMaximo] = useState();
  const [provisaoAtiva, setProvisaoAtiva] = useState();
  const [newProvisaoAtiva, setNewProvisaoAtiva] = useState(false);
  const [provisoes, setProvisoes] = useState();
  const path = 'provisao';
  const type = 'api/';

  async function getProvisoes(){
    const response = await api.get(`${type}${path}`);

    if (response.data) setProvisoes(response.data);
  };

  useEffect(() => {
    getProvisoes();
  }, []);

  async function handleSubmit(e){
    e.preventDefault();
    // post para a api
    await api.post(`${type}${path}`, {
      estoqueID: newEstoqueID,
      estoqueMinimo: newEstoqueMinimo,
      estoqueMaximo: newEstoqueMaximo,
      provisaoAtiva: newProvisaoAtiva
    });
    toast.success("Fornecedor cadastrado com sucesso!");
    setNewEstoqueID('');
    setNewEstoqueMinimo(0);
    setNewEstoqueMaximo(0);
    setNewProvisaoAtiva(false);
    getProvisoes();
  };

  async function getHandleDelete(_id){
    const filter = provisoes.filter(value => value._id !== _id);
    setProvisoes(filter);
  };

  async function handleDelete(rowIndex){
    getHandleDelete(rowIndex);
    toast.success("Fornecedor removido com sucesso!");
    await api.delete(`${type}${path}/${rowIndex}`);
  };

  async function getHandleEdit({_id, estoqueID, estoqueMinimo, estoqueMaximo, provisaoAtiva}){
    setId(_id);
    setEstoqueID(estoqueID);
    setEstoqueMinimo(estoqueMinimo);
    setEstoqueMaximo(estoqueMaximo);
    setProvisaoAtiva(!!provisaoAtiva);
    setIsModalOpen(true);
  }

  async function handleEdit(){
    await api.put(`${type}${path}/${id}`, {
      estoqueID: estoqueID,
      estoqueMinimo: estoqueMinimo,
      estoqueMaximo: estoqueMaximo,
      provisaoAtiva: provisaoAtiva
    });
    toast.success("Fornecedor alterado com sucesso!");
    setIsModalOpen(!isModalOpen);
    getProvisoes();
  }

  async function handleModal(){
    setIsModalOpen(!isModalOpen)
  };

  return (
    <>
      <Header />
      <Container>
        <form>
          <input value={newEstoqueID} placeholder="Referencia de estoque..." onChange={e => setNewEstoqueID(e.target.value)} />
          <input value={newEstoqueMinimo} type="number" onChange={e => setNewEstoqueMinimo(e.target.value)} />
          <input value={newEstoqueMaximo} type="number" onChange={e => setNewEstoqueMaximo(e.target.value)} />
          <input id="checkbox" checked={newProvisaoAtiva} type="checkbox" onChange={e => setNewProvisaoAtiva(e.target.checked)} />
          <label htmlFor="checkbox">Provisao ativa?</label>

          <button onClick={e => handleSubmit(e)}>Salvar</button>
        </form>

        <ul>
          {
            provisoes && provisoes.map((provisao, key) => (
              <ProvisaoStyle key={key}>
                <strong>{provisao.estoqueID}</strong>
                <strong>Min. : {provisao.estoqueMinimo}</strong>
                <strong>Max. : {provisao.estoqueMaximo}</strong>
                <strong>{provisao.provisaoAtiva === true ? "Sim": "Não"}</strong>
                <strong>
                  <ButtonIcon>
                    <MdModeEdit size={20} onClick={() => getHandleEdit(provisao)} />
                  </ButtonIcon>
                  <ButtonIcon>
                    <MdDelete size={20} onClick={() => handleDelete(provisao._id)} />
                  </ButtonIcon>
                </strong>
              </ProvisaoStyle>
            ))
          }
        </ul>
        { isModalOpen && (
          <Modal>
            <h1>Edição de produto</h1>
            <form>
              <span>Referencia de estoque</span>
              <input value={estoqueID} placeholder="Referencia de estoque..." onChange={e => setEstoqueID(e.target.value)} />
              <span>Estoque Minimo</span>
              <input value={estoqueMinimo} type="number" onChange={e => setEstoqueMinimo(e.target.value)} />
              <span>Estoque Máximo</span>
              <input value={estoqueMaximo} type="number" onChange={e => setEstoqueMaximo(e.target.value)} />
              <label htmlFor="checkbox">Provisao ativa?</label>
              <input id="checkbox" checked={provisaoAtiva} type="checkbox" onChange={e => setProvisaoAtiva(e.target.checked)} />

              <Button onClick={() => handleEdit()} size="big" type="submit">Salvar</Button>
              <Button onClick={() => handleModal()} size="small" color="gray">Cancelar</Button>
            </form>
          </Modal>
        )}
      </Container>
    </>
  );
}
