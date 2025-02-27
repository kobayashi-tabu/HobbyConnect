import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useRef, useState, useEffect } from 'react';

export default function Dashboard( props ) {
    const user = usePage().props.auth.user;

    const { followingPosts } = props;

    useEffect(() => {
            console.log(props);
        }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    タイムライン
                </h2>
            }
        >
            <Head title="ホーム" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {followingPosts?.length > 0 && (
                        followingPosts.map((post) => (
                        <div>
                            <div key={post.id} className="mt-4 mx-10 flex flex-col bg-white border shadow-sm rounded-xl p-4 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col mr-10">
                                        <p className="text-black">{post.user.name}</p>
                                        <p className="text-slate-500 text-xs">＠{post.user.account_name}</p>
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {formatDate(post.created_at)} {/* formatDate関数を呼び出す */}
                                    </div>
                                </div>
                                <p className="mt-6">{post.text}</p>
                            </div>                       
                        </div>
                        ))
                    )}
                    {followingPosts?.length === 0 && (
                    <p>フォロー中のユーザーの投稿はありません。</p>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function formatDate(dateString) {
    if (!dateString) return ""; // dateString が null または undefined の場合の処理

    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', { // 日本語ロケールで月日を表示
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
}
