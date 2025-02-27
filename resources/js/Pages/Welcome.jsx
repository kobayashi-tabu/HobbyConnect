import { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { Inertia } from '@inertiajs/inertia';
import TweetModal from "../Components/TweetModal";

export default function Welcome({ user, events = [], tweets = [] }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isTweetModalOpen, setIsTweetModalOpen] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        name: user?.name || "",
        bio: user?.bio || "",
        profile_image: null,
        user_id: user?.user_id || "",
    });

    useEffect(() => {
        if (!user) {
            setError("ユーザーが見つかりません");
        }
    }, [user]);

    const handleSave = (e) => {
        e.preventDefault();
        post(route("profile.update"), {
            onSuccess: () => {
                setIsEditing(false);
                Inertia.get(route("welcome"));
            },
            onError: () => {
                setError("プロフィールの更新に失敗しました。");
            },
        });
    };

    return (
        <>
            <Head title="HobbyConnect" />
            <div className="min-h-screen bg-white">
                <div className="fixed top-4 right-4 flex space-x-4">
                    <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md">
                        プロフィール
                    </button>
                    <button onClick={() => setIsTweetModalOpen(true)} className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md">
                        ツイート
                    </button>
                    <Link href={route("events.create")} className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md">
                        イベント
                    </Link>
                </div>

                <div className="flex flex-col items-center mt-24 px-6 max-w-3xl mx-auto">
                    <div className="flex items-center space-x-6">
                        <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden">
                            {user?.profile_image_url ? (
                                <img src={user.profile_image_url} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <p className="text-gray-600">画像なし</p>
                            )}
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">{user?.name || "ユーザー名なし"}</h2>
                            <p className="text-gray-700">{user?.bio || "自己紹介はありません"}</p>
                        </div>
                    </div>

                    <div className="mt-10 w-full flex space-x-4 justify-center">
                        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md border border-gray-200">
                            <h3 className="text-2xl font-semibold mb-4 text-gray-900">参加中のイベント</h3>
                            {events.length > 0 ? (
                                events.map((event) => (
                                    <div key={event.id} className="bg-gray-100 p-3 rounded-lg mb-3">
                                        <h4 className="font-semibold text-gray-900">{event.name}</h4>
                                        <p className="text-gray-700">{event.description}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">参加中のイベントはありません</p>
                            )}
                        </div>

                        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md border border-gray-200">
                            <h3 className="text-2xl font-semibold mb-4 text-gray-900">あなたのツイート</h3>
                            {tweets.length > 0 ? (
                                tweets.map((tweet, index) => (
                                    <div key={tweet.id || index} className="bg-white p-4 rounded-lg shadow-md mb-4 flex space-x-4">
                                        {/* プロフィール画像 */}
                                        <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                                            {user?.profile_image_url ? (
                                                <img src={user.profile_image_url} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <p className="text-gray-600">画像なし</p>
                                            )}
                                        </div>

                                        {/* ツイート内容 */}
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                {/* ユーザー名と投稿日時 */}
                                                <h4 className="font-semibold text-gray-900">{user?.name || "ユーザー名なし"}</h4>
                                                <span className="text-gray-500 text-sm">{/* 日付表示は今回は省略 */}</span>
                                            </div>
                                            <p className="text-gray-800">{tweet.content}</p>

                                            {/* アクションアイコン（いいね、リツイートなど） */}
                                            <div className="flex space-x-6 mt-2 text-gray-500">
                                                <button className="flex items-center space-x-1 hover:text-blue-500">
                                                    <i className="far fa-comment"></i>
                                                    <span>コメント</span>
                                                </button>
                                                <button className="flex items-center space-x-1 hover:text-green-500">
                                                    <i className="fas fa-retweet"></i>
                                                    <span>リツイート</span>
                                                </button>
                                                <button className="flex items-center space-x-1 hover:text-red-500">
                                                    <i className="far fa-heart"></i>
                                                    <span>いいね</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">ツイートはありません</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {isEditing && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                        <h2 className="text-2xl font-semibold mb-4">プロフィール編集</h2>
                        <form onSubmit={handleSave}>
                            <label className="block text-gray-700">名前</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" value={data.name} onChange={(e) => setData("name", e.target.value)} />
                            
                            <label className="block text-gray-700 mt-4">自己紹介</label>
                            <textarea className="w-full p-2 border border-gray-300 rounded-md" value={data.bio} onChange={(e) => setData("bio", e.target.value)} />
                            
                            <label htmlFor="profile_image" className="block text-gray-700">
                                                プロフィール画像
                                            </label>
                                            <input
                                                id="profile_image"
                                                type="file"
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                                onChange={(e) => setData("profile_image", e.target.files[0])}
                                            />

                            <div className="mt-6 flex justify-between">
                                <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded-md" onClick={() => setIsEditing(false)}>キャンセル</button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">保存</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <TweetModal isOpen={isTweetModalOpen} onClose={() => setIsTweetModalOpen(false)} user={user} />
        </>
    );
}
