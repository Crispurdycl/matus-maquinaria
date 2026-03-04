import { login } from "./actions";
import { Truck, Lock } from "lucide-react";

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const error = (await searchParams)?.error;

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
            <div className="glass-card max-w-md w-full p-8 rounded-2xl relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-4 rounded-2xl shadow-lg shadow-blue-500/20 mb-6">
                        <Truck className="w-8 h-8 text-white" />
                    </div>

                    <h1 className="text-2xl font-bold text-white mb-2 text-center">
                        Maquinaria Online
                    </h1>
                    <p className="text-slate-400 text-sm mb-8 text-center">
                        Ingresa tus credenciales para acceder al sistema de gestión de mantenciones.
                    </p>

                    <form action={login} className="w-full space-y-4">
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-1.5" htmlFor="email">
                                Correo Electrónico
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full bg-slate-800/80 border border-slate-600 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder-slate-500"
                                placeholder="tucorreo@gmail.cl"
                            />
                        </div>

                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-1.5" htmlFor="password">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="w-full bg-slate-800/80 border border-slate-600 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder-slate-500"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-xl mt-4">
                                Credenciales incorrectas. Verifica tu correo y contraseña.
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all mt-6 flex justify-center items-center gap-2"
                        >
                            <Lock className="w-4 h-4" />
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
