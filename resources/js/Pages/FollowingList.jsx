import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, } from '@inertiajs/react';
import { useRef, useState, useEffect } from 'react';
import NavLink from '@/Components/NavLink';
import UserCard from '@/Components/UserCard';

export default function FollowingList({ ufollowings }) {
    const user = usePage().props.auth.user;

    return (
        <div>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        フォロー中のユーザー一覧
                    </h2>
                }
            >
                <Head title="Dashboard" />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {ufollowings?.length > 0 && (
                        ufollowings.map((ufollowing) => (
                        <UserCard other={ufollowing} key={ufollowing.id} />
                        ))
                    )}
                    {ufollowings?.length === 0 && (
                    <p>フォロー中のユーザーが見つかりませんでした。</p>
                    )}
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
