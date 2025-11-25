import { useState } from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function Login() {
    const [user, setUser] = useState({ email: "", password: "" });

    const handleChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        // Aqui fará chamada ao backend em C#
        console.log(user);
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md">
                <CardContent>
                    <h2 className="mb-4 text-xl text-center">Entrar</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            name="password"
                            type="password"
                            placeholder="Senha"
                            value={user.password}
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit" className="w-full mt-2">Entrar</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
