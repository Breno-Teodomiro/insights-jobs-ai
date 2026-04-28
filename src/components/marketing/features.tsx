"use client";

import Container from "../global/container";
import Icons from "../global/icons";
import Images from "../global/images";
import MagicCard from "../ui/magic-card";
import { Ripple } from "../ui/ripple";
import { SectionBadge } from "../ui/section-bade";

const Features = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-24 w-full">
            <Container>
                <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                    <SectionBadge title="Recursos" />
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug mt-6">
                        Consultoria IA que <br /> transforma resultados
                    </h2>
                    <p className="text-base md:text-lg text-center text-accent-foreground/80 mt-6">
                        Soluções personalizadas de Inteligência Artificial para empresas que querem liderar a transformação digital. Nossos agentes estratégicos otimizam processos e maximizam resultados.
                    </p>
                </div>
            </Container>
            <div className="mt-16 w-full">
                <div className="flex flex-col items-center gap-5 lg:gap-5 w-full">
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_.65fr] w-full gap-5 lg:gap-5">
                            <MagicCard particles={true} className="flex flex-col items-start size-full bg-primary/[0.08]">
                                <div className="bento-card flex items-center justify-center min-h-72">
                                    <span className="text-muted-foreground group-hover:text-foreground mx-auto relative">
                                        <Icons.stars className="w-20 h-20" />
                                    </span>
                                    <Ripple />
                                </div>
                            </MagicCard>
                            <MagicCard particles={true} className="flex flex-col items-start w-full bg-primary/[0.08]">
                                <div className="bento-card w-full flex-row gap-6">
                                    <div className="w-full h-40">
                                        <Images.analytics className="w-full h-full" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h4 className="text-xl font-heading font-medium heading ">
                                            Análise Estratégica de Dados
                                        </h4>
                                        <p className="text-sm md:text-base mt-2 text-muted-foreground">
                                            Mapeamento completo dos processos da sua empresa com análise preditiva para identificar oportunidades de automação com IA.
                                        </p>
                                    </div>
                                </div>
                            </MagicCard>
                        </div>
                    </Container>
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-5 lg:gap-5">
                            <MagicCard particles={true} className="flex flex-col items-start w-full row-span-1 bg-primary/[0.08]">
                                <div className="bento-card w-full flex-row gap-6">
                                    <div className="w-full h-52 relative">
                                        <Images.ideation className="w-full h-full" />
                                        <div className="w-40 h-40 rounded-full bg-primary/10 blur-3xl -z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                                    </div>
                                    <div className="flex flex-col mt-auto">
                                        <h4 className="text-xl font-heading font-medium heading">
                                            Desenvolvimento de Agentes IA
                                        </h4>
                                        <p className="text-sm md:text-base mt-2 text-muted-foreground">
                                            Criação de agentes de IA personalizados para atender demandas específicas do seu negócio, desde atendimento até análise financeira.
                                        </p>
                                    </div>
                                </div>
                            </MagicCard>
                            <div className="grid grid-rows gap-5 lg:gap-5">
                                <MagicCard particles={true} className="flex flex-col items-start w-full row-span- row-start-[0.5] h-32 bg-primary/[0.08]">
                                    <div className="bento-card w-full relative items-center justify-center">
                                        <div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                            <p className="text-base text-muted-foreground text-justify [mask-image:radial-gradient(50%_50%_at_50%_50%,#BAB3FF_0%,rgba(186,179,255,0)_90.69%)]">
                                                A Insights Jobs AI é especializada em desenvolver soluções de Inteligência Artificial que transformam negócios. Nossos agentes estratégicos automatizam tarefas repetitivas, analisam grandes volumes de dados e geram insights acionáveis. Com nossa consultoria, sua empresa reduz custos operacionais, aumenta a produtividade da equipe e toma decisões baseadas em dados. Desenvolvemos soluções personalizadas que se adaptam às necessidades específicas do seu setor, desde e-commerce até serviços B2B. Nossos agentes de IA trabalham 24/7 para otimizar processos e maximizar resultados.
                                            </p>
                                        </div>
                                        <div className="w-full h-16 relative">
                                            <Images.centeral className="w-full h-full" />
                                            <div className="w-20 h-20 rounded-full bg-primary/10 blur-2xl z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                                        </div>
                                    </div>
                                </MagicCard>
                                <MagicCard particles={true} className="flex flex-col items-start w-full row-start-2 !h-max bg-primary/[0.08]">
                                    <div className="bento-card w-full gap-6 relative">
                                        <div className="w-full h-48 relative">
                                            <Images.rings className="w-full h-full absolute inset-0" />
                                            <Images.rings className="w-56 h-56 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                            <Icons.icon className="w-24 h-24 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80" />
                                            <Images.circlePallete className="w-full h-full opacity-30" />
                                        </div>
                                        <div className="w-28 h-28 rounded-full bg-primary/10 blur-3xl -z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                                    </div>
                                </MagicCard>
                            </div>
                            <MagicCard particles={true} className="flex flex-col items-start w-full row-span-1 bg-primary/[0.08]">
                                <div className="bento-card w-full flex-row gap-6">
                                    <div className="flex flex-col mb-auto">
                                        <h4 className="text-xl font-heading font-medium heading ">
                                            Integração com seus Sistemas
                                        </h4>
                                        <p className="text-sm md:text-base mt-2 text-muted-foreground">
                                            Nossos agentes IA se integram perfeitamente aos seus sistemas existentes: ERP, CRM, plataformas de e-commerce e ferramentas de gestão.
                                        </p>
                                    </div>
                                    <div className="w-full h-28 relative">
                                        <Images.integration className="w-full h-full" />
                                        <div className="w-28 h-28 rounded-full bg-primary/10 blur-3xl -z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full"></div>
                                    </div>
                                </div>
                            </MagicCard>
                        </div>
                    </Container>
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-[.40fr_1fr] w-full gap-5 lg:gap-5">
                            <MagicCard particles={true} className="flex flex-col items-start w-full bg-primary/[0.08]">
                                <div className="bento-card w-full flex-row gap-6">
                                    <div className="w-full">
                                        <Images.image className="w-full h-40 lg:h-auto" />
                                    </div>
                                    <div className="flex flex-col mt-auto">
                                        <h4 className="text-xl font-heading font-medium heading ">
                                            Automação de Processos
                                        </h4>
                                        <p className="text-sm md:text-base mt-2 text-muted-foreground">
                                            Automatize fluxos de trabalho complexos com agentes inteligentes que aprendem e evoluem com seu negócio.
                                        </p>
                                    </div>
                                </div>
                            </MagicCard>
                            <MagicCard particles={true} className="flex flex-col items-start w-full bg-primary/[0.08]">
                                <div className="bento-card w-full flex-row gap-6">
                                    <div className="w-full">
                                        <Images.hash className="w-full h-40 lg:h-52" />
                                    </div>
                                    <div className="flex flex-col mt-auto">
                                        <h4 className="text-xl font-heading font-medium heading ">
                                            Relatórios e Insights em Tempo Real
                                        </h4>
                                        <p className="text-sm md:text-base mt-2 text-muted-foreground">
                                            Dashboards personalizados com métricas de performance dos agentes IA e indicadores de ROI da transformação digital.
                                        </p>
                                    </div>
                                </div>
                            </MagicCard>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    )
};

export default Features
