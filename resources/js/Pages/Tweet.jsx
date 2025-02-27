import { useState } from "react";  // useState をインポート

export default function Tweet({ user }) {
    const [tweetText, setTweetText] = useState(""); 

    // デバッグ用ログ
    console.log("Tweetコンポーネントの user:", user);

    const handlePostTweet = async () => {
        if (!user || !user.user_id) {  // ✅ userがnullまたはundefinedなら処理しない
            console.error("エラー: user情報が取得できません");
            return;
        }
    
        if (!tweetText.trim()) {
            console.error("ツイート内容が空です");
            return;
        }
    
        try {
            // 修正: ルート名を "tweets.store" に変更
            await axios.post(window.route("tweets.store"), {
                content: tweetText,  // ここでcontentフィールドにツイート内容を渡す
                user_id: user.user_id,  // ✅ user_idを正しく渡す
            });
            setTweetText("");  // ツイート送信後、テキストエリアをクリア
        } catch (error) {
            console.error("ツイートの投稿に失敗しました", error);
        }
    };

    return (
        <div className="p-4 bg-white shadow rounded-lg">
            <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="今何してる？"
                value={tweetText}
                onChange={(e) => setTweetText(e.target.value)}
            />
            <button
                onClick={handlePostTweet}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                disabled={!user || !user.user_id} // ✅ userがnullならボタンを無効化
            >
                ツイート
            </button>
        </div>
    );
}