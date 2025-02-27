import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Inertia } from '@inertiajs/inertia';  // Inertia.js をインポート

export default function TweetModal({ isOpen, onClose, user }) {
    const { data, setData, post, processing, errors } = useForm({
        content: "", // ツイート内容
        user_id: user?.user_id || "",  // ユーザーID
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('tweets.store'), {
            onSuccess: () => {
                onClose();  // モーダルを閉じる
                Inertia.get(route('welcome')); // ツイートが成功したらホームにリダイレクト
            },
            onError: () => {
                alert("ツイートの投稿に失敗しました。");
            }
        });
    };

    return (
        <>
            {isOpen && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
                    <div className="fixed inset-0 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                            <h2 className="text-2xl font-semibold mb-4">新しいツイート</h2>
                            <form onSubmit={handleSubmit}>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="ツイート内容を入力"
                                    value={data.content}
                                    onChange={(e) => setData("content", e.target.value)}
                                />
                                {errors.content && <p className="text-red-500">{errors.content}</p>}
                                <div className="mt-4 flex justify-between">
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-500 text-white rounded-md"
                                        onClick={onClose}
                                    >
                                        閉じる
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                        disabled={processing}
                                    >
                                        {processing ? "投稿中..." : "ツイート"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}