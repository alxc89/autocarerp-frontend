import { useEffect, useState } from "react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users, Car, Wrench, DollarSign, Clock, AlertCircle } from "lucide-react"
import dashboardService from "@/services/dashboard.service"
import type { DashboardStatsDto, RecentOrdemServicoDto } from "@/types/dashboard.types"

export default function Dashboard() {
    const [stats, setStats] = useState<DashboardStatsDto>({
        totalClientes: 0,
        totalVeiculos: 0,
        osAberta: 0,
        osEmAndamento: 0,
        osAtrasada: 0,
        faturamentoMes: 0,
    })

    const [recentOrders, setRecentOrders] = useState<RecentOrdemServicoDto[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true)
                setError(null)

                // Fetch stats and recent orders in parallel
                const [statsData, ordersData] = await Promise.all([
                    dashboardService.getStats(),
                    dashboardService.getRecentOrders(3)
                ])

                setStats(statsData)
                setRecentOrders(ordersData)
            } catch (err: any) {
                console.error('Error loading dashboard:', err)
                setError(err.response?.data?.message || 'Erro ao carregar dashboard')
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

    if (loading) {
        return (
            <div className="p-4">
                <p>Carregando dashboard...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p className="font-bold">Erro ao carregar dashboard</p>
                    <p>{error}</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Dashboard</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Card: Total de Clientes */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalClientes}</div>
                            <p className="text-xs text-muted-foreground">
                                Clientes cadastrados no sistema
                            </p>
                        </CardContent>
                    </Card>

                    {/* Card: Total de Veículos */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total de Veículos</CardTitle>
                            <Car className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalVeiculos}</div>
                            <p className="text-xs text-muted-foreground">
                                Veículos em histórico
                            </p>
                        </CardContent>
                    </Card>

                    {/* Card: O.S. em Aberto */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">O.S. em Aberto</CardTitle>
                            <Wrench className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.osAberta}</div>
                            <p className="text-xs text-muted-foreground">
                                Aguardando início
                            </p>
                        </CardContent>
                    </Card>

                    {/* Card: O.S. em Andamento */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">O.S. em Andamento</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.osEmAndamento}</div>
                            <p className="text-xs text-muted-foreground">
                                Em execução
                            </p>
                        </CardContent>
                    </Card>

                    {/* Card: O.S. Atrasadas */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">O.S. Atrasadas</CardTitle>
                            <AlertCircle className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-500">{stats.osAtrasada}</div>
                            <p className="text-xs text-muted-foreground">
                                Requer atenção
                            </p>
                        </CardContent>
                    </Card>

                    {/* Card: Faturamento do Mês */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Faturamento (Mês)</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                R$ {stats.faturamentoMes.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Novembro 2025
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Lista de Últimas O.S. */}
                <Card className="col-span-full">
                    <CardHeader>
                        <CardTitle>Últimas Ordens de Serviço</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {recentOrders.length === 0 ? (
                            <p className="text-muted-foreground text-center py-4">
                                Nenhuma ordem de serviço encontrada
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {recentOrders.map((os, index) => {
                                    // Map status to badge color
                                    const getStatusColor = (status: string) => {
                                        const statusLower = status.toLowerCase()
                                        if (statusLower.includes('andamento')) return 'bg-blue-100 text-blue-800'
                                        if (statusLower.includes('aberta')) return 'bg-yellow-100 text-yellow-800'
                                        if (statusLower.includes('atrasada')) return 'bg-red-100 text-red-800'
                                        if (statusLower.includes('finalizada')) return 'bg-green-100 text-green-800'
                                        return 'bg-gray-100 text-gray-800'
                                    }

                                    return (
                                        <div 
                                            key={os.codigo} 
                                            className={`flex items-center justify-between ${
                                                index < recentOrders.length - 1 ? 'border-b pb-2' : ''
                                            }`}
                                        >
                                            <div>
                                                <p className="font-medium">O.S. #{os.codigo}</p>
                                                <p className="text-sm text-muted-foreground">{os.clienteNome}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(os.horaAbertura).toLocaleString('pt-BR')}
                                                </p>
                                            </div>
                                            <span className={`text-sm px-2 py-1 rounded ${getStatusColor(os.status)}`}>
                                                {os.status}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
