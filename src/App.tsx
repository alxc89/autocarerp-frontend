// src/App.tsx
import { Routes, Route } from "react-router-dom"

import MainLayout from "@/pages/MainLayout"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Dashboard from "@/pages/Dashboard"
import CriarCliente from "@/pages/clientes/CriarClientes.tsx"
import CriarOrdemServico from "@/pages/os/CriarOrdemServico.tsx"
import CriarProduto from "@/pages/produtos/CriarProduto.tsx"
import CriarVeiculo from "@/pages/veiculos/CriarVeiculo.tsx"
import ClientesList from "@/pages/clientes/ClientesList"
import VeiculosList from "@/pages/veiculos/VeiculosList"
import ProdutosList from "@/pages/produtos/ProdutosList"
import OsList from "@/pages/os/OsList"
import Configuracoes from "@/pages/Configuracoes.tsx";

export default function App() {
    return (

            <Routes>
                {/* Rotas sem sidebar */}
                <Route path="/login" element={<Login />} />

                {/* Rotas que usam o layout com sidebar */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/dash" element={<Dashboard />} />

                    {/* Clientes */}
                    <Route path="/clientes" element={<ClientesList />} />
                    <Route path="/clientes/novo" element={<CriarCliente />} />

                    {/* Veículos */}
                    <Route path="/veiculos" element={<VeiculosList />} />
                    <Route path="/veiculos/novo" element={<CriarVeiculo />} />

                    {/* Produtos/Serviços */}
                    <Route path="/produtos" element={<ProdutosList />} />
                    <Route path="/produtos/novo" element={<CriarProduto />} />

                    {/* Ordens de Serviço */}
                    <Route path="/ordem-servico" element={<OsList />} />
                    <Route path="/ordem-servico/nova" element={<CriarOrdemServico />} />

                    <Route path="/configuracoes" element={<Configuracoes />} />
                </Route>
            </Routes>

    )
}
