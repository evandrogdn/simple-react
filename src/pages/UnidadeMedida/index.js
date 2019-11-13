import React, { useState, useEffect } from 'react';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { toast } from "react-toastify";

import Header from '../../components/Header';
import Modal from '../../components/Modal';
import Button from '../../styles/components/button';
import { api } from '../../services/api';

import { Container, ButtonIcon, UMStyle } from './styles';

export default function UnidadeMedida() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState();
  const [sigla, setSigla] = useState();
  const [newSigla, setNewSigla] = useState();
  const [descricao, setDescricao] = useState();
  const [newDescricao, setNewDescricao] = useState();
  const [unidades, setUnidades] = useState();
  const path = 'unidade-medida';
  const type = 'api/';

  async function getUnidades(){
    const response = await api.get(`${type}${path}`);

    if (response.data) setUnidades(response.data);
  };

  useEffect(() => {
    getUnidades();
  }, []);

  async function handleSubmit(e){
    e.preventDefault();
    // post para a api
    await api.post(`${type}${path}`, {
      sigla: newSigla,
      descricao: newDescricao
    });
    toast.success("Unidade de medida cadastrada com sucesso!");
    setNewSigla('');
    setNewDescricao('');
    getUnidades();
  };

  async function getHandleDelete(_id){
    const filter = unidades.filter(value => value._id !== _id);
    setUnidades(filter);
  };

  async function handleDelete(rowIndex){
    getHandleDelete(rowIndex);
    toast.success("Unidade de medida removida com sucesso!");
    await api.delete(`${type}${path}/${rowIndex}`);
  };

  async function getHandleEdit({_id, sigla, descricao}){
    setId(_id);
    setSigla(sigla);
    setDescricao(descricao);
    setIsModalOpen(true);
  }

  async function handleEdit(){
    await api.put(`${type}${path}/${id}`, {
      sigla: sigla,
      descricao: descricao
    });
    toast.success("Fornecedor alterado com sucesso!");
    setIsModalOpen(!isModalOpen);
    getUnidades();
  }

  async function handleModal(){
    setIsModalOpen(!isModalOpen)
  };

  return (
    <>
      <Header />
      <Container>
        <form>
          <input value={newSigla} placeholder="Sigla da unidade de medida..." onChange={e => setNewSigla(e.target.value)} />
          <input value={newDescricao} placeholder="Descricao da unidade de medida..." onChange={e => setNewDescricao(e.target.value)} />

          <button onClick={e => handleSubmit(e)}>Salvar</button>
        </form>

        <ul>
          {
            unidades && unidades.map((unidade, key) => (
              <UMStyle key={key}>
                <strong>{unidade.sigla}</strong>
                <strong>{unidade.descricao}</strong>
                <strong>
                  <ButtonIcon>
                    <MdModeEdit size={20} onClick={() => getHandleEdit(unidade)} />
                  </ButtonIcon>
                  <ButtonIcon>
                    <MdDelete size={20} onClick={() => handleDelete(unidade._id)} />
                  </ButtonIcon>
                </strong>
              </UMStyle>
            ))
          }
        </ul>
        { isModalOpen && (
          <Modal>
            <h1>Edição de unidade de medida</h1>
            <form>
              <span>Sigla da Unidade de Medida</span>
              <input value={sigla} placeholder="Sigla da unidade de medida..." onChange={e => setSigla(e.target.value)} />
              <span>Descricao da Unidade de Medida</span>
              <input value={descricao} placeholder="Descricao da unidade de medida..." onChange={e => setDescricao(e.target.value)} />

              <Button onClick={() => handleEdit()} size="big" type="submit">Salvar</Button>
              <Button onClick={() => handleModal()} size="small" color="gray">Cancelar</Button>
            </form>
          </Modal>
        )}
      </Container>
    </>
  );
}
