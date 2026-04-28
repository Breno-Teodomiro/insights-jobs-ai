"use client";

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

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
import { useSignIn } from "@clerk/nextjs";
import LoadingIcon from "../ui/loading-icon";

const SignInForm = () => {

    const router = useRouter();

    const params = useSearchParams();

    const from = params.get("from");

    const { isLoaded, signIn, setActive } = useSignIn();

    const [email, setEmail] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [isEmailOpen, setIsEmailOpen] = useState<boolean>(true);
    const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
    const [isEmailLoading, setIsEmailLoading] = useState<boolean>(false);
    const [isCodeLoading, setIsCodeLoading] = useState<boolean>(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
    const [isAppleLoading, setIsAppleLoading] = useState<boolean>(false);

    const handleOAuth = async (strategy: "oauth_google" | "oauth_apple") => {
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
            await signIn.create({
                identifier: email,
            });

            await signIn.prepareFirstFactor({
                strategy: "email_code",
                emailAddressId: signIn.supportedFirstFactors!.find(
                    (factor) => factor.strategy === "email_code"
                )!.emailAddressId,
            });

            setIsCodeSent(true);

            // if (signInAttempt.status === "complete") {
            //     await setActive({ session: signInAttempt.createdSessionId });
            //     setIsCodeSent(true);
            // } else {
            //     console.error(JSON.stringify(signInAttempt, null, 2));
            //     toast.error("Invalid email. Please try again.");
            // }

        } catch (error: any) {
            console.error(JSON.stringify(error, null, 2));
            switch (error.errors[0]?.code) {
                case "form_identifier_not_found":
                    toast.error("Este email não está cadastrado. Por favor, crie uma conta primeiro.");
                    router.push("/auth/signup?from=signin");
                    break;
                case "too_many_attempts":
                    toast.error("Muitas tentativas. Tente novamente mais tarde.");
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

            const signInAttempt = await signIn.attemptFirstFactor({
                strategy: "email_code",
                code,
            });

            if (signInAttempt.status === "complete") {
                await setActive({ session: signInAttempt.createdSessionId });
                router.push("/auth/callback");
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2));
                toast.error("Código inválido. Tente novamente.");
            }

        } catch (error: any) {
            console.error(JSON.stringify(error, null, 2));
            switch (error.errors[0]?.code) {
                case "form_code_incorrect":
                    toast.error("Código incorreto. Digite um código válido.");
                    break;
                case "verification_failed":
                    toast.error("Verificação falhou. Tente novamente mais tarde.");
                    break;
                case "too_many_attempts":
                    toast.error("Muitas tentativas. Tente novamente mais tarde.");
                    break;
                default:
                    toast.error("An error occurred. Please try again");
                    break;
            }
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
                        ? "Acessar Insights Jobs AI"
                        : isCodeSent
                            ? "Verifique seu email"
                            : "Bem-vindo à Insights Jobs AI"}
                </h1>
                <p className="text-sm text-muted-foreground mt-2">
                    {isEmailOpen
                        ? "Escolha um método para acessar"
                        : isCodeSent
                            ? "Verifique sua caixa de entrada pelo código"
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
                                disabled={isGoogleLoading || isAppleLoading || isEmailLoading}
                                onClick={() => handleOAuth("oauth_google")}
                                variant="tertiary"
                                className="w-full"
                            >
                                {isGoogleLoading ? (
                                    <LoadingIcon size="sm" className="w-4 h-4 absolute left-4" />
                                ) : (
                                    <Icons.google className="w-4 h-4 absolute left-4" />
                                )}
                                Continuar com Google
                            </Button>
                        </div>
                        <div className="w-full">
                            <Button
                                size="lg"
                                type="button"
                                disabled={isGoogleLoading || isAppleLoading || isEmailLoading}
                                onClick={() => handleOAuth("oauth_apple")}
                                variant="tertiary"
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
                                disabled={isGoogleLoading || isAppleLoading || isEmailLoading}
                                onClick={() => setIsEmailOpen(false)}
                                className="w-full"
                            >
                                <MailIcon className="w-4 h-4 absolute left-4" />
                                Continuar com email
                            </Button>
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
                                        type="number"
                                        value={code}
                                        maxLength={6}
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
                                            <Icons.gmail className="w-4 h-4 mr-2" />
                                            Gmail
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
                                            <Icons.outlook className="w-4 h-4 mr-2" />
                                            Outlook
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
                                        autoFocus={true}
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

export default SignInForm
