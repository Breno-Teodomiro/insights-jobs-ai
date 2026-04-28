type PLAN = {
    id: string;
    title: string;
    desc: string;
    monthlyPrice: number;
    yearlyPrice: number;
    badge?: string;
    buttonText: string;
    features: string[];
    link: string;
};

export const PLANS: PLAN[] = [
    {
        id: "starter",
        title: "Starter",
        desc: "Ideal para pequenas empresas que querem começar a automatizar processos",
        monthlyPrice: 1970,
        yearlyPrice: 19990,
        buttonText: "Começar Agora",
        features: [
            "1 Agente IA personalizado",
            "Até 500 interações/mês",
            "Integração com 2 sistemas",
            "Dashboard de performance",
            "Suporte por email",
            "Treinamento básico da equipe"
        ],
        link: "#contact"
    },
    {
        id: "pro",
        title: "Business",
        desc: "Para empresas em crescimento que precisam de múltiplos agentes",
        monthlyPrice: 4970,
        yearlyPrice: 49990,
        badge: "Mais Popular",
        buttonText: "Escolher Business",
        features: [
            "3 Agentes IA personalizados",
            "Até 2.000 interações/mês",
            "Integração com 5 sistemas",
            "Analytics avançado com IA",
            "Suporte prioritário",
            "API dedicada",
            "Relatórios personalizados",
            "Treinamento completo"
        ],
        link: "#contact"
    },
    {
        id: "enterprise",
        title: "Enterprise",
        desc: "Solução completa para grandes organizações com necessidades complexas",
        monthlyPrice: 9970,
        yearlyPrice: 99990,
        badge: "Fale Conosco",
        buttonText: "Consultar Enterprise",
        features: [
            "Agentes IA ilimitados",
            "Interações ilimitadas",
            "Integrações customizadas",
            "Gerente de conta dedicado",
            "SLA garantido",
            "Segurança enterprise",
            "On-premises disponível",
            "Suporte 24/7"
        ],
        link: "#contact"
    }
];
