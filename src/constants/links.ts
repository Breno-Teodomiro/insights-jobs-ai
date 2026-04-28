import { ClockIcon, MessageSquare, BarChart2, FileTextIcon, UserPlusIcon, CreditCardIcon, SettingsIcon, LogOut, Headphones, ChartPieIcon, LucideIcon, MessagesSquareIcon, NewspaperIcon, MegaphoneIcon, LineChartIcon, MessageSquareTextIcon, UsersIcon } from 'lucide-react';

type Link = {
    href: string;
    label: string;
    icon: LucideIcon;
}

export const SIDEBAR_LINKS: Link[] = [
    {
        href: "/dashboard",
        label: "Painel",
        icon: ChartPieIcon,
    },
    {
        href: "/dashboard/campaigns",
        label: "Campanhas",
        icon: MegaphoneIcon
    },
    {
        href: "/dashboard/analytics",
        label: "Análises",
        icon: LineChartIcon
    },
    {
        href: "/dashboard/posts",
        label: "Publicações",
        icon: MessageSquareTextIcon
    },
    {
        href: "/dashboard/engagement",
        label: "Engajamento",
        icon: UsersIcon
    },
    {
        href: "/dashboard/billing",
        label: "Faturamento",
        icon: CreditCardIcon
    },
    {
        href: "/dashboard/settings",
        label: "Configurações",
        icon: SettingsIcon
    },
];

export const FOOTER_LINKS = [
    {
        title: "Produto",
        links: [
            { name: "Início", href: "/" },
            { name: "Recursos", href: "/" },
            { name: "Preços", href: "/" },
            { name: "Contato", href: "/" },
            { name: "Download", href: "/" },
        ],
    },
    {
        title: "Recursos",
        links: [
            { name: "Blog", href: "/blog" },
            { name: "Central de Ajuda", href: "/help-center" },
            { name: "Comunidade", href: "/community" },
            { name: "Guias", href: "/guides" },
        ],
    },
    {
        title: "Legal",
        links: [
            { name: "Privacidade", href: "/privacy" },
            { name: "Termos", href: "/terms" },
            { name: "Cookies", href: "/cookies" },
        ],
    },
    {
        title: "Desenvolvedores",
        links: [
            { name: "API Docs", href: "/api-docs" },
            { name: "SDKs", href: "/sdks" },
            { name: "Ferramentas", href: "/tools" },
            { name: "Open Source", href: "/open-source" },
            { name: "Changelog", href: "/changelog" },
        ],
    },
];
