// src/App.tsx
import { Routes, Route } from "react-router-dom"
import { useEffect } from "react"

import MainLayout from "@/pages/MainLayout"
import ProtectedRoute from "@/components/protected-route"
import { useAuth } from "@/hooks/use-auth"

import Login from "./pages/Login"
import Dashboard from "@/pages/Dashboard"
import CriarCliente from "@/pages/clientes/CriarClientes.tsx"
import EditarCliente from "@/pages/clientes/EditarCliente.tsx"
import CriarOrdemServico from "@/pages/os/CriarOrdemServico.tsx"
import EditarOrdemServico from "@/pages/os/EditarOrdemServico.tsx"
import CriarProduto from "@/pages/produtos/CriarProduto.tsx"
import EditarProduto from "@/pages/produtos/EditarProduto.tsx"
import CriarVeiculo from "@/pages/veiculos/CriarVeiculo.tsx"
import EditarVeiculo from "@/pages/veiculos/EditarVeiculo.tsx"
import ClientesList from "@/pages/clientes/ClientesList"
import VeiculosList from "@/pages/veiculos/VeiculosList"
import ProdutosList from "@/pages/produtos/ProdutosList"
import OsList from "@/pages/os/OsList"
import Configuracoes from "@/pages/Configuracoes.tsx";

export default function App() {
    const { initialize } = useAuth();

    // Initialize auth state from localStorage on app start
    useEffect(() => {
        initialize();
    }, [initialize]);

    return (
        <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />

            {/* Protected routes - wrapped with ProtectedRoute */}
            <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dash" element={<Dashboard />} />

                    {/* Clientes */}
                    <Route path="/clientes" element={<ClientesList />} />
                    <Route path="/clientes/novo" element={<CriarCliente />} />
                    <Route path="/clientes/editar/:id" element={<EditarCliente />} />

                    {/* Veículos */}
                    <Route path="/veiculos" element={<VeiculosList />} />
                    <Route path="/veiculos/novo" element={<CriarVeiculo />} />
                    <Route path="/veiculos/editar/:id" element={<EditarVeiculo />} />

                    {/* Produtos/Serviços */}
                    <Route path="/produtos" element={<ProdutosList />} />
                    <Route path="/produtos/novo" element={<CriarProduto />} />
                    <Route path="/produtos/editar/:id" element={<EditarProduto />} />

                    {/* Ordens de Serviço */}
                    <Route path="/ordem-servico" element={<OsList />} />
                    <Route path="/ordem-servico/nova" element={<CriarOrdemServico />} />
                    <Route path="/ordem-servico/editar/:id" element={<EditarOrdemServico />} />

                    <Route path="/configuracoes" element={<Configuracoes />} />
                </Route>
            </Route>
        </Routes>
    )
}
