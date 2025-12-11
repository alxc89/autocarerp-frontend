import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useAuth } from "@/hooks/use-auth";

export default function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const { login, isLoading, error, clearError, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dash");
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        try {
            await login(credentials.email, credentials.password);
            navigate("/dash");
        } catch (err) {
            // Error is handled by the store
            console.error("Login failed:", err);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md">
                <CardContent className="pt-6">
                    <h2 className="mb-4 text-2xl font-bold text-center">AutoCar ERP</h2>
                    <p className="mb-6 text-center text-gray-600">Entre com suas credenciais</p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                        />
                        <Input
                            name="password"
                            type="password"
                            placeholder="Senha"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                        />
                        <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                            {isLoading ? "Entrando..." : "Entrar"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
