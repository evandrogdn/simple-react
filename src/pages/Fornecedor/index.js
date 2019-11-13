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
        getFornecedores();
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
    };

    async function getHandleDelete(_id){
        const filter = fornecedores.filter(value => value._id !== _id);
        setFornecedores(filter);
    };

    async function handleDelete(rowIndex){
        console.log(rowIndex)
        getHandleDelete(rowIndex);
        toast.success("Fornecedor removido com sucesso!");
        await api.delete(`${type}${path}/${rowIndex}`);
    };

    async function getHandleEdit({_id, nome, nomeFantasia, inscrFederal, logradouro, bairro, cidade, numero, complemento, telefone, email}){
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
}