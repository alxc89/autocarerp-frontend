import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Shield, Calendar } from "lucide-react"
import type { User as AuthUser } from "@/types/auth.types"

interface ProfileModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    user: AuthUser | null
}

export function ProfileModal({ open, onOpenChange, user }: ProfileModalProps) {
    if (!user) return null

    const getInitials = (name: string) => {
        if (!name || name.trim().length === 0) {
            return 'US'
        }
        return name
            .trim()
            .split(' ')
            .filter(n => n.length > 0)
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Perfil do Usuário</DialogTitle>
                    <DialogDescription>
                        Informações da sua conta no sistema
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center gap-4 py-4">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src="/avatars/admin.jpg" alt={user.username} />
                        <AvatarFallback className="text-2xl">
                            {getInitials(user.username)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="text-center">
                        <h3 className="text-xl font-semibold">{user.username}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                </div>

                <Separator />

                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm font-medium">Nome de usuário</p>
                            <p className="text-sm text-muted-foreground">{user.username}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm font-medium">E-mail</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm font-medium mb-2">Funções</p>
                            <div className="flex flex-wrap gap-1">
                                {user.roles.map((role) => (
                                    <Badge key={role} variant="secondary">
                                        {role}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {user.permissions && user.permissions.length > 0 && (
                        <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-medium mb-2">Permissões</p>
                                <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
                                    {user.permissions.slice(0, 10).map((permission) => (
                                        <Badge key={permission} variant="outline" className="text-xs">
                                            {permission.split('.').pop()}
                                        </Badge>
                                    ))}
                                    {user.permissions.length > 10 && (
                                        <Badge variant="outline" className="text-xs">
                                            +{user.permissions.length - 10} mais
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
