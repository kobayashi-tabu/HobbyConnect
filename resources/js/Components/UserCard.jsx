import FollowButton from '@/Components/FollowButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { Head, usePage, useForm } from '@inertiajs/react';
import { useRef, useState, useEffect } from 'react';

export default function UserCard({ other }) {
    const { post, clearErrors, reset } = useForm({
        id: other.id,
    });

    const [confirmingFollowUpdate, setConfirmingFollowUpdate] = useState(false);

    const confirmFollow = () => {
        setConfirmingFollowUpdate(true);
      };

    const closeFollowModal = () => {
        setConfirmingFollowUpdate(false);
        clearErrors();
        reset();
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(other.isFollowing ? route('users.unfollow') : route('users.follow'), {
            onSuccess: () => {
                closeFollowModal();
            },
            onFinish: () => reset(),
        });
      };

    return (
        <>
            <div key={other.id} className="mt-4 mx-10 flex flex-col bg-white border shadow-sm rounded-xl p-4 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div className="flex">
                    <div className="flex flex-col mr-10">
                        <p className="text-black">{other.name}</p>
                        <p className="text-slate-500 text-xs">＠{other.account_name}</p>
                    </div>
                    <FollowButton 
                    className="flex ml-auto w-24" 
                    isFollowingIni={other.isFollowing} 
                    onClick={() => confirmFollow()}
                    >
                        {other.isFollowing ? 'フォロー解除' : 'フォローする'}
                    </FollowButton>
                </div>
                <div className="flex mt-8 text-xs">
                    <div className="flex">
                        <p>{other.postsCount}</p>
                        <p className="text-slate-700 ml-1">投稿</p>
                    </div>
                    <div className="flex ml-4">
                        <p>{other.followingsCount}</p>
                        <p className="text-slate-700 ml-1">フォロー中</p>
                    </div>
                    <div className="flex ml-4">
                        <p>{other.followersCount}</p>
                        <p className="text-slate-700 ml-1">フォロワー</p>
                    </div>
                </div>
            </div>

            <Modal show={confirmingFollowUpdate} onClose={closeFollowModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                    {other.isFollowing ? `${other.name}さんのフォローを解除します` : `${other.name}さんをフォローします`}
                    </h2>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeFollowModal}>
                            キャンセル
                        </SecondaryButton>

                        <FollowButton 
                        isFollowingIni={other.isFollowing}
                        onClick={handleSubmit}
                        className="ms-3"
                        >
                            {other.isFollowing ? 'フォロー解除' : 'フォローする'}
                        </FollowButton>
                    </div>
                </div>

            </Modal>
        </>
    );
}
