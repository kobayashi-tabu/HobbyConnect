import Dropdown from '@/Components/Dropdown';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, regions }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative flex min-h-screen flex-col">
                    <header className="items-center ml-auto mr-10 py-4">
                        <nav className="-mx-3 flex flex-1 justify-end">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        ログイン
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        新規登録
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>

                    <main className="mt-6">
                        <GuestLayout>
                            <table class="table-auto mx-auto text-gray-600">

                                <thead>
                                <tr>
                                    <th class="px-4 py-2 text-center">ID</th>
                                    <th class="px-4 py-2 text-center">地域</th>
                                    <th class="px-4 py-2 text-center">コード</th>
                                </tr>
                                </thead>

                                <tbody>
                                    {regions.map((region) => (
                                        <tr>
                                            <td class="px-4 py-2 text-center">{region.id}</td>
                                            <td class="px-4 py-2 text-center">{region.name}</td>
                                            <td class="px-4 py-2 text-center">{region.code}</td>
                                        </tr>
                                    ))}
                                
                                </tbody>

                            </table>
                        </GuestLayout>
                        <Dropdown/>
                    </main>
                </div>
            </div>
        </>
    );
}
