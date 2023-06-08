import icons from '@/scss/modules/icons.module.scss';

const AdminLink = '/admin448'

const RoutersAdmin = [
    {
        title: 'داشبورد',
        href: AdminLink,
        icon: icons.shDashboard,
    },
    {
        title: 'مدیریت دسته بندی ها',
        href: `${AdminLink}/categories`,
        icon: icons.shBox,
    },
    {
        title: 'مدیریت اسلاید ها',
        href: `${AdminLink}/slides`,
        icon: icons.shGallery,
    },
    {
        title: 'مدیریت دوره ها',
        href: `${AdminLink}/curses`,
        icon: icons.shBook,
    },
    {
        title: 'مدیریت پرسش و پاسخ',
        href: `${AdminLink}/faqs`,
        icon: icons.shWarning,
    },
    {
        title: 'مدیریت کاربران',
        href: `${AdminLink}/users`,
        icon: icons.shAgentss,
    },
    {
        title: 'تنظیمات',
        href: `${AdminLink}/options`,
        icon: icons.shSetting,
    }

]

export default RoutersAdmin;
