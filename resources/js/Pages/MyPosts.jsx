import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import BlueButton from '@/Components/BlueButton';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import { useRef, useState } from 'react';
import TextareaInput from '@/Components/TextareaInput';
import SecondaryButton from '@/Components/SecondaryButton';
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

export default function MyPosts({ posts }) {
    const user = usePage().props.auth.user;

    const [confirmingPostDeletion, setConfirmingPostDeletion] = useState(false);
    const [confirmingPostUpdate, setConfirmingPostUpdate] = useState(false);
    const textInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        put,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        text: '',
    });

    const confirmPostUpdate = (postId, postText) => {
        setData({id:postId, text:postText});
        setConfirmingPostUpdate(true);
    };
    const confirmPostDeletion = (postId, postText) => {
        setData({id:postId, text:postText});
        setConfirmingPostDeletion(true);
    };

    const updatePost = (e) => {
        e.preventDefault();

        put(route('posts.update', data.id), {
            preserveScroll: true,
            onSuccess: () => closeUpdateModal(),
            onError: () => textInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const deletePost = () => {

        destroy(route('posts.destroy', data.id), {
            preserveScroll: true,
            onSuccess: () => closeDeleteModal(),
            onError: () => textInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeUpdateModal = () => {
        setConfirmingPostUpdate(false);

        clearErrors();
        reset();
    };

    const closeDeleteModal = () => {
        setConfirmingPostDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {user.name}さんの投稿一覧
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                {posts?.length > 0 && (
                    posts.map((post) => (
                    <div>
                        <div key={post.id} className="mt-4 mx-10 flex flex-col bg-white border shadow-sm rounded-xl p-4 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                            <div className="flex">
                                <p className="flex">{post.text}</p>
                                <div className="flex ml-auto text-sm text-gray-500 dark:text-gray-400">
                                    {formatDate(post.created_at)} {/* formatDate関数を呼び出す */}
                                </div>
                            </div>
                            <div className="flex ml-auto mt-8">
                                <FaEdit 
                                color={'blue'}
                                onClick={() => confirmPostUpdate(post.id, post.text)}
                                className="mr-2 cursor-pointer"
                                >
                                    編集
                                </FaEdit>

                                <FaTrash 
                                color={'red'} onClick={() => confirmPostDeletion(post.id, post.text)}
                                className="cursor-pointer"
                                >
                                    削除
                                </FaTrash>
                            </div>
                        </div>

                        <Modal show={confirmingPostUpdate} onClose={closeUpdateModal}>
                            <form onSubmit={updatePost} className="p-6">
                                <h2 className="text-lg font-medium text-gray-900">
                                    投稿内容を編集しますか？
                                </h2>
            
                                <p className="mt-1 text-sm text-gray-600">
                                    編集後、保存ボタンを押して編集内容を保存します
                                </p>
            
                                <div className="mt-6">
                                    <TextareaInput
                                        id="text"
                                        type="text"
                                        name="text"
                                        ref={textInput}
                                        value={data.text}
                                        onChange={(e) =>
                                            setData('text', e.target.value)
                                        }
                                        className="mt-1 block w-3/4"
                                        isFocused
                                        placeholder="text"
                                    />
            
                                    <InputError
                                        message={errors.text}
                                        className="mt-2"
                                    />
                                </div>
            
                                <div className="mt-6 flex justify-end">
                                    <SecondaryButton onClick={closeUpdateModal}>
                                        キャンセル
                                    </SecondaryButton>
            
                                    <BlueButton className="ms-3" disabled={processing}>
                                        保存
                                    </BlueButton>
                                </div>
                            </form>
                        </Modal>

                        <Modal show={confirmingPostDeletion} onClose={closeDeleteModal}>
                            <form onSubmit={deletePost} className="p-6">
                                <h2 className="text-lg font-medium text-gray-900">
                                    この投稿を削除しますか？
                                </h2>
            
                                <div className="mt-6">
                                    <div className="mt-4 mx-10 flex flex-col bg-white border shadow-sm rounded-xl p-4 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                                        <p>{data.text}</p>
                                    </div>
                                </div>
            
                                <div className="mt-6 flex justify-end">
                                    <SecondaryButton onClick={closeDeleteModal}>
                                        キャンセル
                                    </SecondaryButton>
            
                                    <DangerButton className="ms-3" disabled={processing}>
                                        投稿を削除
                                    </DangerButton>
                                </div>
                            </form>
                        </Modal>
                    </div>
                    ))
                )}
                {posts?.length === 0 && (
                <p>投稿がありません。</p>
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
