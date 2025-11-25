// src/pages/Configuracoes.tsx
import { useState } from "react"
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

export default function Configuracoes() {
    const [nome, setNome] = useState("Administrador")
    const [email, setEmail] = useState("admin@sistema.com")
    const [tema, setTema] = useState<"light" | "dark">("light")
    const [idioma, setIdioma] = useState<"pt-BR" | "en-US">("pt-BR")
    const [notifOsAtrasada, setNotifOsAtrasada] = useState(true)

    const [senhaAtual, setSenhaAtual] = useState("")
    const [novaSenha, setNovaSenha] = useState("")
    const [confirmaSenha, setConfirmaSenha] = useState("")

    const handleSalvarPerfil = () => {
        // TODO: chamada API C#
        // fetch("/api/usuarios/perfil", { method: "PUT", body: JSON.stringify({ nome, email }) })
    }

    const handleSalvarPreferencias = () => {
        // TODO: chamada API C#
    }

    const handleTrocarSenha = () => {
        if (novaSenha !== confirmaSenha) {
            alert("Nova senha e confirmação não conferem.")
            return
        }

        // TODO: chamada API C#
        // fetch("/api/usuarios/trocar-senha", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ senhaAtual, novaSenha }),
        // })

        setSenhaAtual("")
        setNovaSenha("")
        setConfirmaSenha("")
    }

    return (
        <div className="p-4 space-y-4">
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
                    <Button onClick={handleSalvarPerfil}>Salvar perfil</Button>
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
                    <Button variant="outline" onClick={handleTrocarSenha}>
                        Atualizar senha
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
                    <Button onClick={handleSalvarPreferencias}>
                        Salvar preferências
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
