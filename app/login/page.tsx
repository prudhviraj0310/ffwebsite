"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Trophy, Shield } from "lucide-react";
import Script from "next/script";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const searchParams = useSearchParams(); // Hook to get URL params

    const handleGoogleCallback = async (response: any) => {
        setIsLoading(true);
        setError("");

        try {
            const phone = searchParams.get("phone"); // Get phone from URL
            if (!phone) {
                throw new Error("Phone number is missing. Please restart from the App.");
            }

            // Decode JWT to get user info (client-side decode)
            const base64Url = response.credential.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const payload = JSON.parse(jsonPayload);

            // Call Backend API to Create/Login User
            // Use Production Backend URL
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ucs48k4c8g80840k8c00w4cc.hexaind.org/api/auth/google";

            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: payload.email,
                    name: payload.name,
                    googleId: payload.sub,
                    picture: payload.picture,
                    phone: phone // Pass phone to backend
                })
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Login failed");

            // Redirect to App with Token
            const token = data.token;
            // Use deep link scheme
            window.location.href = `madgamers://callback?token=${token}`;

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Initialize Google Sign In
        // @ts-ignore
        window.handleGoogleCallback = handleGoogleCallback;
    }, []);

    return (
        <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4">
            <Script src="https://accounts.google.com/gsi/client" strategy="lazyOnload" />

            <div className="w-full max-w-md bg-zinc-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-full h-full bg-red-600/5 z-0" />

                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-500/20">
                        <Trophy className="w-8 h-8 text-white" />
                    </div>

                    <h1 className="text-3xl font-black italic text-white mb-2">WELCOME BACK</h1>
                    <p className="text-zinc-500 text-sm mb-8">Login to manage your tournaments and wallet</p>

                    {error && (
                        <div className="w-full bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm mb-6">
                            {error}
                        </div>
                    )}

                    <div className="min-h-[50px] w-full flex justify-center">
                        {!isLoading ? (
                            <>
                                <div id="g_id_onload"
                                    data-client_id="135552224451-0n33lieknloav8408rib7dd97a89umtd.apps.googleusercontent.com"
                                    data-callback="handleGoogleCallback"
                                    data-auto_prompt="true">
                                </div>
                                <div className="g_id_signin"
                                    data-type="standard"
                                    data-size="large"
                                    data-theme="filled_black"
                                    data-text="sign_in_with"
                                    data-shape="pill"
                                    data-logo_alignment="left">
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-2 text-zinc-400">
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                Redirecting to app...
                            </div>
                        )}
                    </div>

                    <div className="mt-8 flex items-center gap-2 text-xs text-zinc-600 uppercase tracking-widest font-bold">
                        <Shield className="w-3 h-3" />
                        100% Secure Login
                    </div>
                </div>
            </div>
        </main>
    );
}
