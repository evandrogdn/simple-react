import React, { useState, useEffect } from 'react';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { toast } from "react-toastify";

import Header from '../../components/Header';
import Modal from '../../components/Modal';
import Button from '../../styles/components/button';
import { api } from '../../services/api';

import { Container, FornecedorStyle, ButtonIcon } from './styles';

export default function Fornecedor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState();
  const [nome, setNome] = useState();
  const [newNome, setNewNome] = useState();
  const [nomeFantasia, setNomeFantasia] = useState();
  const [newNomeFantasia, setNewNomeFantasia] = useState();
  const [inscrFederal, setInscrFederal] = useState();
  const [newInscrFederal, setNewInscrFederal] = useState();
  const [logradouro, setLogradouro] = useState();
  const [newLogradouro, setNewLogradouro] = useState();
  const [bairro, setBairro] = useState();
  const [newBairro, setNewBairro] = useState();
  const [cidade, setCidade] = useState();
  const [newCidade, setNewCidade] = useState();
  const [numero, setNumero] = useState();
  const [newNumero, setNewNumero] = useState();
  const [complemento, setComplemento] = useState();
  const [newComplemento, setNewComplemento] = useState();
  const [telefone, setTelefone] = useState();
  const [newTelefone, setNewTelefone] = useState();
  const [email, setEmail] = useState();
  const [newEmail, setNewEmail] = useState();
  const [fornecedores, setFornecedores] = useState();
  const path = 'fornecedor';
  const type = 'api/';

  async function getFornecedores(){
    const response = await api.get(`${type}${path}`);

    if (response.data) setFornecedores(response.data);
  };

  useEffect(() => {
    getFornecedores();
  }, []);

  async function handleSubmit(e){
    e.preventDefault();
    // post para a api
    await api.post(`${type}${path}`, {
      nome: newNome,
      nomeFantasia: newNomeFantasia,
      inscrFederal: newInscrFederal,
      logradouro: newLogradouro,
      bairro: newBairro,
      cidade: newCidade,
      numero: newNumero,
      complemento: newComplemento,
      telefone: newTelefone,
      email: newEmail
    });
    toast.success("Fornecedor cadastrado com sucesso!");
    setNewNome('');
    setNewNomeFantasia('');
    setNewInscrFederal('');
    setNewLogradouro('');
    setNewBairro('');
    setNewCidade('');
    setNewNumero('');
    setNewComplemento('');
    setNewTelefone('');
    setNewEmail('');
    getFornecedores();
  };

  async function getHandleDelete(_id){
    const filter = fornecedores.filter(value => value._id !== _id);
    setFornecedores(filter);
  };

  async function handleDelete(rowIndex){
    getHandleDelete(rowIndex);
    toast.success("Fornecedor removido com sucesso!");
    await api.delete(`${type}${path}/${rowIndex}`);
  };

  async function getHandleEdit({_id, nome, nomeFantasia, inscrFederal, logradouro, bairro, cidade, numero, complemento, telefone, email}){
    console.log(_id);
    setId(_id);
    setNome(nome);
    setNomeFantasia(nomeFantasia);
    setInscrFederal(inscrFederal);
    setLogradouro(logradouro);
    setBairro(bairro);
    setCidade(cidade);
    setNumero(numero);
    setComplemento(complemento);
    setTelefone(telefone);
    setEmail(email);
    setIsModalOpen(true);
  }

  async function handleEdit(){
    await api.put(`${type}${path}/${id}`, {
      nome: nome,
      nomeFantasia: nomeFantasia,
      inscrFederal: inscrFederal,
      logradouro: logradouro,
      bairro: bairro,
      cidade: cidade,
      numero: numero,
      complemento: complemento,
      telefone: telefone,
      email: email
    });
    toast.success("Fornecedor alterado com sucesso!");
    setIsModalOpen(!isModalOpen);
    getFornecedores();
  }

  async function handleModal(){
    setIsModalOpen(!isModalOpen)
  };

  return (
    <>
      <Header />
      <Container>
        <form>
          <div id={'container-flex'}>

          <div className={'flex-container'}>
            <span>Nome</span>
            <input value={newNome} placeholder="Nome do fornecedor..." onChange={e => setNewNome(e.target.value)} />
            <span>Nome Fantasia</span>
            <input value={newNomeFantasia} placeholder="Nome fantasia do fornecedor..." onChange={e => setNewNomeFantasia(e.target.value)} />
            <span>Inscr. Federal</span>
            <input value={newInscrFederal} placeholder="Inscr. Federal do fornecedor..." onChange={e => setNewInscrFederal(e.target.value)} />
            <span>Logradouro</span>
            <input value={newLogradouro} placeholder="Logradouro do fornecedor..." onChange={e => setNewLogradouro(e.target.value)} />
            <span>Bairro</span>
            <input value={newBairro} placeholder="Bairro do fornecedor..." onChange={e => setNewBairro(e.target.value)} />
          </div>
          <div className={'flex-container'}>
            <span>Cidade</span>
            <input value={newCidade} placeholder="Cidade do fornecedor..." onChange={e => setNewCidade(e.target.value)} />
            <span>Numero</span>
            <input value={newNumero} placeholder="Numero do fornecedor..." onChange={e => setNewNumero(e.target.value)} />
            <span>Complemento</span>
            <input value={newComplemento} placeholder="Complemento do fornecedor..." onChange={e => setNewComplemento(e.target.value)} />
            <span>Telefone</span>
            <input value={newTelefone} placeholder="Telefone do fornecedor..." onChange={e => setNewTelefone(e.target.value)} />
            <span>E-mail</span>
            <input value={newEmail} placeholder="E-mail do fornecedor..." onChange={e => setNewEmail(e.target.value)} />
          </div>
          </div>
          <button onClick={e => handleSubmit(e)}>Salvar</button>
        </form>
        <ul>
          {
            fornecedores && fornecedores.map((fornecedor, key) => (
              <FornecedorStyle key={key}>
                <strong>{fornecedor.nome}</strong>
                <strong>{fornecedor.logradouro} - {fornecedor.numero}</strong>
                <strong>{fornecedor.telefone}</strong>
                <strong>
                  <ButtonIcon>
                    <MdModeEdit size={20} onClick={() => getHandleEdit(fornecedor)} />
                  </ButtonIcon>
                  <ButtonIcon>
                    <MdDelete size={20} onClick={() => handleDelete(fornecedor._id)} />
                  </ButtonIcon>
                </strong>
              </FornecedorStyle>
            ))
          }
        </ul>
        { isModalOpen && (
          <Modal>
            <h1>Edição de fornecedor</h1>
            <form>
              <span>Nome</span>
              <input value={nome} onChange={e => setNome(e.target.value)} />
              <span>Nome Fantasia</span>
              <input value={nomeFantasia} onChange={e => setNomeFantasia(e.target.value)} />
              <span>Inscr. Federal</span>
              <input value={inscrFederal} onChange={e => setInscrFederal(e.target.value)} />
              <span>Logradouro</span>
              <input value={logradouro} onChange={e => setLogradouro(e.target.value)} />
              <span>Bairro</span>
              <input value={bairro} onChange={e => setBairro(e.target.value)} />
              <span>Cidade</span>
              <input value={cidade} onChange={e => setCidade(e.target.value)} />
              <span>Numero</span>
              <input value={numero} onChange={e => setNumero(e.target.value)} />
              <span>Complemento</span>
              <input value={complemento} onChange={e => setComplemento(e.target.value)} />
              <span>Telefone</span>
              <input value={telefone} onChange={e => setTelefone(e.target.value)} />
              <span>E-mail</span>
              <input value={email} onChange={e => setEmail(e.target.value)} />

              <Button onClick={() => handleEdit()} size="big" type="submit">Salvar</Button>
              <Button onClick={() => handleModal()} size="small" color="gray">Cancelar</Button>
            </form>
          </Modal>
        )}
      </Container>
    </>
  );
}
