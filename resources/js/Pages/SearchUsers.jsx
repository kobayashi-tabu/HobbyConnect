import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, } from '@inertiajs/react';
import { useRef, useState, useEffect } from 'react';
import NavLink from '@/Components/NavLink';
import UserCard from '@/Components/UserCard';

export default function SearchUsers({ others }) {
    const user = usePage().props.auth.user;

    useEffect(() => {
            console.log(others);
        }, []);

    return (
        <div>
            <AuthenticatedLayout
                header={
                    <div className="flex">
                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            <NavLink
                                href={route('indexbyregion')}
                                active={route().current('indexbyregion')}
                            >
                                地域で探す
                            </NavLink>
                        </div>
                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            <NavLink
                                href={route('indexbyhobby')}
                                active={route().current('indexbyhobby')}
                            >
                                趣味で探す
                            </NavLink>
                        </div>
                    </div>
                }
            >
                <Head title="Dashboard" />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {others.map((other) => (
                        <UserCard other={other} />
                    ))}
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
