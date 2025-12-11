// src/pages/Configuracoes.tsx
import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/hooks/use-auth"
import userService from "@/services/user.service"
import toast, { Toaster } from 'react-hot-toast'

export default function Configuracoes() {
    const { user } = useAuth()
    
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [tema, setTema] = useState<"light" | "dark">("light")
    const [idioma, setIdioma] = useState<"pt-BR" | "en-US">("pt-BR")
    const [notifOsAtrasada, setNotifOsAtrasada] = useState(true)

    const [senhaAtual, setSenhaAtual] = useState("")
    const [novaSenha, setNovaSenha] = useState("")
    const [confirmaSenha, setConfirmaSenha] = useState("")

    const [loadingPerfil, setLoadingPerfil] = useState(false)
    const [loadingSenha, setLoadingSenha] = useState(false)
    const [loadingPreferencias, setLoadingPreferencias] = useState(false)

    // Load preferences on mount
    useEffect(() => {
        if (user) {
            setNome(user.username || "")
            setEmail(user.email || "")
            loadPreferences()
        }
    }, [user])

    const loadPreferences = async () => {
        try {
            const prefs = await userService.getPreferences()
            setTema(prefs.tema)
            setIdioma(prefs.idioma)
            setNotifOsAtrasada(prefs.notificarOsAtrasada)
        } catch (error: any) {
            console.error('Erro ao carregar preferências:', error)
        }
    }

    const handleSalvarPerfil = async () => {
        setLoadingPerfil(true)
        try {
            await userService.updateProfile({ nome, email })
            toast.success('Perfil atualizado com sucesso!')
        } catch (error: any) {
            toast.error(error.response?.data || 'Erro ao atualizar perfil')
        } finally {
            setLoadingPerfil(false)
        }
    }

    const handleSalvarPreferencias = async () => {
        setLoadingPreferencias(true)
        try {
            await userService.updatePreferences({
                tema,
                idioma,
                notificarOsAtrasada: notifOsAtrasada,
            })
            toast.success('Preferências salvas com sucesso!')
        } catch (error: any) {
            toast.error(error.response?.data || 'Erro ao salvar preferências')
        } finally {
            setLoadingPreferencias(false)
        }
    }

    const handleTrocarSenha = async () => {
        if (novaSenha !== confirmaSenha) {
            toast.error("Nova senha e confirmação não conferem")
            return
        }

        if (novaSenha.length < 8) {
            toast.error("A senha deve ter no mínimo 8 caracteres")
            return
        }

        setLoadingSenha(true)
        try {
            await userService.changePassword({
                senhaAtual,
                novaSenha,
            })
            toast.success('Senha alterada com sucesso!')
            setSenhaAtual("")
            setNovaSenha("")
            setConfirmaSenha("")
        } catch (error: any) {
            toast.error(error.response?.data || 'Erro ao alterar senha')
        } finally {
            setLoadingSenha(false)
        }
    }

    return (
        <div className="p-4 space-y-4">
            <Toaster position="top-right" />
            <h1 className="text-2xl font-bold">Configurações</h1>

            {/* Perfil */}
            <Card>
                <CardHeader>
                    <CardTitle>Perfil</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <Label className="p-2">Nome</Label>
                            <Input value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>
                        <div>
                            <Label className="p-2">Email</Label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button onClick={handleSalvarPerfil} disabled={loadingPerfil}>
                        {loadingPerfil ? "Salvando..." : "Salvar perfil"}
                    </Button>
                </CardContent>
            </Card>

            {/* Alterar senha */}
            <Card>
                <CardHeader>
                    <CardTitle className="p-2">Alterar senha</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                        <div>
                            <Label className="p-2">Senha atual</Label>
                            <Input
                                type="password"
                                value={senhaAtual}
                                onChange={(e) => setSenhaAtual(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label className="p-2">Nova senha</Label>
                            <Input
                                type="password"
                                value={novaSenha}
                                onChange={(e) => setNovaSenha(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label className="p-2">Confirmar nova senha</Label>
                            <Input
                                type="password"
                                value={confirmaSenha}
                                onChange={(e) => setConfirmaSenha(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button variant="outline" onClick={handleTrocarSenha} disabled={loadingSenha}>
                        {loadingSenha ? "Atualizando..." : "Atualizar senha"}
                    </Button>
                </CardContent>
            </Card>

            {/* Preferências */}
            <Card>
                <CardHeader>
                    <CardTitle>Preferências</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                        <div>
                            <Label className="p-2">Tema</Label>
                            <Select
                                value={tema}
                                onValueChange={(v: "light" | "dark") => setTema(v)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Claro</SelectItem>
                                    <SelectItem value="dark">Escuro</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="p-2">Idioma</Label>
                            <Select
                                value={idioma}
                                onValueChange={(v: "pt-BR" | "en-US") => setIdioma(v)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                                    <SelectItem value="en-US">Inglês</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center gap-2 mt-6">
                            <Switch
                                checked={notifOsAtrasada}
                                onCheckedChange={setNotifOsAtrasada}
                            />
                            <span>Notificar O.S. atrasadas</span>
                        </div>
                    </div>
                    <Button onClick={handleSalvarPreferencias} disabled={loadingPreferencias}>
                        {loadingPreferencias ? "Salvando..." : "Salvar preferências"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
