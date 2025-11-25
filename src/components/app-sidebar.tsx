"use client"

import * as React from "react"
import {
    Users,
    Car,
    ShoppingBag,
    FileText,
    LayoutDashboard,
    Settings2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"

// Dados ajustados para o sistema de OS
const data = {
    user: {
        name: "Administrador",
        email: "admin@sistema.com",
        avatar: "/avatars/admin.jpg",
    },
    teams: [
        {
            name: "Oficina Principal",
            logo: LayoutDashboard,
            plan: "Padrão",
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "/",
            icon: LayoutDashboard,
            items: [
                { title: "Dashboard", url: "/dashboard" },
            ],
        },
        {
            title: "Clientes",
            url: "/clientes",
            icon: Users,
            items: [
                { title: "Listar clientes", url: "/clientes" },
                { title: "Novo cliente", url: "/clientes/novo" },
            ],
        },
        {
            title: "Veículos",
            url: "/veiculos",
            icon: Car,
            items: [
                { title: "Listar veículos", url: "/veiculos" },
                { title: "Novo veículo", url: "/veiculos/novo" },
            ],
        },
        {
            title: "Produtos/Serviços",
            url: "/produtos",
            icon: ShoppingBag,
            items: [
                { title: "Listar", url: "/produtos" },
                { title: "Novo", url: "/produtos/novo" },
            ],
        },
        {
            title: "Ordens de Serviço",
            url: "/ordem-servico",
            icon: FileText,
            items: [
                { title: "Listar O.S.", url: "/ordem-servico" },
                { title: "Nova O.S.", url: "/ordem-servico/nova" },
            ],
        },
        {
            title: "Configurações",
            url: "/configuracoes",
            icon: Settings2,
            items: [
                { title: "Configurações", url: "/configuracoes" },
            ],
        },
    ],
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />

            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
