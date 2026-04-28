"use client";

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useSignIn, useSignUp } from "@clerk/nextjs";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { SignUpSchema, SignUpSchemaType } from "@/schema";
import Container from "../global/container";
import Link from "next/link";
import { ArrowLeftIcon, MailIcon } from "lucide-react";
import Icons from "../global/icons";
import { FADE_IN_VARIANTS } from "@/constants";
import { toast } from "sonner";
import LoadingIcon from "../ui/loading-icon";
import { OAuthStrategy } from "@clerk/types";


const SignUpForm = () => {

    const router = useRouter();

    const params = useSearchParams();

    const from = params.get("from");

    const { signIn } = useSignIn();

    const { isLoaded, signUp, setActive } = useSignUp();

    const [email, setEmail] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [isEmailOpen, setIsEmailOpen] = useState<boolean>(true);
    const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
    const [isEmailLoading, setIsEmailLoading] = useState<boolean>(false);
    const [isCodeLoading, setIsCodeLoading] = useState<boolean>(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
    const [isAppleLoading, setIsAppleLoading] = useState<boolean>(false);

    const handleOAuth = async (strategy: OAuthStrategy) => {
        if (strategy === "oauth_google") {
            setIsGoogleLoading(true);
        } else {
            setIsAppleLoading(true);
        }

        try {
            await signIn?.authenticateWithRedirect({
                strategy,
                redirectUrl: "/auth/signup/sso-callback",
                redirectUrlComplete: "/auth/callback",
            });

            toast.loading(`Redirecionando para ${strategy === "oauth_google" ? "Google" : "Apple"}...`);
        } catch (error) {
            console.error(error);
            toast.error("Ocorreu um erro. Tente novamente.");
        }
    };

    const handleEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isLoaded) return;

        if (!email) {
            toast.error("Por favor, digite seu email");
            return;
        }

        setIsEmailLoading(true);

        try {

            await signUp.create({
                emailAddress: email,
            });

            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });

            setIsCodeSent(true);

            toast.success("Enviamos um código para seu email");
        } catch (error: any) {
            switch (error.errors[0]?.code) {
                case "form_identifier_exists":
                    toast.error("Este email já está cadastrado. Por favor, entre.");
                    router.push("/auth/signin?from=signup");
                    break;
                case "form_password_pwned":
                    toast.error("A senha é muito comum. Por favor, escolha uma senha mais forte.");
                    break;
                case "form_param_format_invalid":
                    toast.error("Email inválido. Por favor, digite um email válido.");
                    break;
                case "form_password_length_too_short":
                    toast.error("Senha muito curta. Por favor, escolha uma senha mais longa.");
                    break;
                default:
                    toast.error("An error occurred. Please try again");
                    break;
            }
        } finally {
            setIsEmailLoading(false);
        }

        // Check if the email is in db or not or if email is already have an account
        // If email is already have an account, then show login form
        // If email is not in db, then send a code to email address
    };

    const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isLoaded) return;

        if (!code) {
            toast.error("Por favor, digite o código");
            return;
        }

        setIsCodeLoading(true);

        try {
            const completeSignup = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignup.status === "complete") {
                await setActive({ session: completeSignup.createdSessionId });
                router.push("/auth/callback");
            } else {
                console.error(JSON.stringify(completeSignup, null, 2));
                toast.error("Código de verificação inválido. Tente novamente.");
            }
        } catch (error) {
            console.error("Error:", JSON.stringify(error, null, 2));
            toast.error("An error occurred. Please try again");
        } finally {
            setIsCodeLoading(false);
        }

        // Check if the code is correct or not
        // If code is correct, then show create password form
        // If code is incorrect, then show error message
    };

    useEffect(() => {
        if (from) {
            setIsEmailOpen(false);
        }
    }, []);


    return (
        <div className="flex flex-col text-center w-full">
            <motion.div
                variants={FADE_IN_VARIANTS}
                animate="visible"
                initial="hidden"
            >
                <div className="flex justify-center">
                    <Link href="/">
                        <Icons.icon className="w-8 h-8" />
                    </Link>
                </div>
                <h1 className="text-2xl text-center mt-4">
                    {isEmailOpen
                        ? "Criar sua conta"
                        : isCodeSent ? "Verifique seu email"
                            : "Digite seu email"}
                </h1>
                <p className="text-sm text-muted-foreground mt-2">
                    {isEmailOpen
                        ? "Crie uma conta para começar a usar a Insights Jobs AI"
                        : isCodeSent
                            ? "Verifique sua caixa de entrada pelo código de verificação"
                            : "Digite seu email para começar"}
                </p>
            </motion.div>
            {isEmailOpen ? (
                <div>
                    <motion.div
                        variants={FADE_IN_VARIANTS}
                        animate="visible"
                        initial="hidden"
                        className="flex flex-col gap-4 py-8"
                    >
                        <div className="w-full">
                            <Button
                                size="lg"
                                type="button"
                                variant="tertiary"
                                disabled={isGoogleLoading || isAppleLoading}
                                onClick={() => handleOAuth("oauth_google")}
                                className="w-full"
                            >
                                {isGoogleLoading ? <LoadingIcon size="sm" className="w-4 h-4 absolute left-4" /> : <Icons.google className="w-4 h-4 absolute left-4" />}
                                Continuar com Google
                            </Button>
                        </div>
                        <div className="w-full">
                            <Button
                                size="lg"
                                type="button"
                                variant="tertiary"
                                disabled={isGoogleLoading || isAppleLoading}
                                onClick={() => handleOAuth("oauth_apple")}
                                className="w-full"
                            >
                                {isAppleLoading ? <LoadingIcon size="sm" className="w-4 h-4 absolute left-4" /> : <Icons.apple className="w-4 h-4 absolute left-4" />}
                                Continuar com Apple
                            </Button>
                        </div>
                        <div className="w-full">
                            <Button
                                size="lg"
                                type="button"
                                variant="tertiary"
                                disabled={isGoogleLoading || isAppleLoading}
                                onClick={() => setIsEmailOpen(false)}
                                className="w-full"
                            >
                                <MailIcon className="w-4 h-4 absolute left-4" />
                                Continuar com email
                            </Button>
                        </div>
                        <div className="pt-12 text-muted-foreground text-sm">
                            <span>Já tem uma conta?</span> <Link href="/auth/signin" className="text-foreground">Entrar</Link>
                        </div>
                    </motion.div>
                </div>
            ) : (
                <div>
                    {isCodeSent ? (
                        <div>
                            <motion.form
                                variants={FADE_IN_VARIANTS}
                                animate="visible"
                                initial="hidden"
                                onSubmit={handleVerifyCode}
                                className="py-8 w-full flex flex-col gap-4"
                            >
                                <div className="w-full">
                                    <Input
                                        autoFocus={true}
                                        name="code"
                                        type="code"
                                        value={code}
                                        disabled={isCodeLoading}
                                        onChange={(e) => setCode(e.target.value)}
                                        placeholder="Digite o código de verificação"
                                        className="w-full"
                                    />
                                </div>
                                <div className="w-full">
                                    <Button
                                        type="submit"
                                        disabled={isCodeLoading}
                                        className="w-full"
                                    >
                                        {isCodeLoading ? <LoadingIcon size="sm" className="mr-2" /> : "Verificar código"}
                                    </Button>
                                </div>
                                <div className="w-full flex items-center gap-2">
                                    <Button
                                        asChild
                                        type="button"
                                        disabled={isCodeLoading}
                                        variant="tertiary"
                                        className="w-full"
                                    >
                                        <Link href="https://mail.google.com" target="_blank">
                                            Abrir Gmail
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        type="button"
                                        disabled={isCodeLoading}
                                        variant="tertiary"
                                        className="w-full"
                                    >
                                        <Link href="https://outlook.live.com" target="_blank">
                                            Abrir Outlook
                                        </Link>
                                    </Button>
                                </div>
                            </motion.form>
                        </div>
                    ) : (
                        <div>
                            <motion.form
                                variants={FADE_IN_VARIANTS}
                                animate="visible"
                                initial="hidden"
                                onSubmit={handleEmail}
                                className="py-8 w-full flex flex-col gap-4"
                            >
                                <div className="w-full">
                                    <Input
                                        autoFocus
                                        name="email"
                                        type="email"
                                        value={email}
                                        disabled={isEmailLoading}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Digite seu email"
                                        className="w-full"
                                    />
                                </div>
                                <div className="w-full">
                                    <Button
                                        type="submit"
                                        disabled={isEmailLoading}
                                        className="w-full"
                                    >
                                        {isEmailLoading ? <LoadingIcon size="sm" className="mr-2" /> : "Continuar"}
                                    </Button>
                                </div>
                                <div className="w-full">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        disabled={isEmailLoading}
                                        onClick={() => setIsEmailOpen(true)}
                                        className="w-full"
                                    >
                                        <ArrowLeftIcon className="w-3.5 h-3.5 mr-2" />
                                        Voltar
                                    </Button>
                                </div>
                            </motion.form>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
};

export default SignUpForm
