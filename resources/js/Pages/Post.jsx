import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import { Head, usePage, useForm } from '@inertiajs/react';
import TextareaInput from '@/Components/TextareaInput';

export default function Post() {
    const user = usePage().props.auth.user;
    const { data, setData, post, processing, errors, reset } = useForm({
        text: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('posts.create'), {
            onFinish: () => reset('text'),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    投稿する
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <form onSubmit={submit}>
                    <div className="mt-4 mx-10 flex flex-col">
                    <InputError message={errors.text} className="mt-2" />
                    <TextareaInput
                        id="text"
                        name="text"
                        value={data.text}
                        className="mt-1 block w-full"
                        autoComplete="text"
                        isFocused={true}
                        onChange={(e) => setData('text', e.target.value)}
                        required
                    />
                        <PrimaryButton className="ml-auto mt-2" disabled={processing}>
                            投稿する
                        </PrimaryButton>
                    </div>
                </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
