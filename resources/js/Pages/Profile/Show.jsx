import React from 'react';
import { Head } from '@inertiajs/react';

export default function Show({ user }) {
    return (
        <>
            <Head title="プロフィール" />
            <div className="flex flex-col items-center mt-24 px-6 max-w-3xl mx-auto">
                <div className="flex items-center space-x-6">
                    {/* ユーザー画像とプロフィール */}
                    <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                        {user?.profile_image_url ? (
                            <img
                                src={user.profile_image_url}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <p className="text-gray-600">画像なし</p>
                        )}
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            {user?.name || "ユーザー名なし"}
                        </h2>
                        <p className="text-gray-700">{user?.bio || "自己紹介はありません"}</p>
                    </div>
                </div>
            </div>
        </>
    );
}