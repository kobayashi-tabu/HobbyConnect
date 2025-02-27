import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register({ regions }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        account_name: '',
        region: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="ユーザー名" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="account_name" value="アカウント名" />

                    <TextInput
                        id="account_name"
                        name="account_name"
                        value={data.account_name}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('account_name', e.target.value)}
                        required
                    />

                    <InputError message={errors.account_name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="region_id" value="お住いの地域" />

                    <select
                        id="region_id"
                        name="region_id"
                        value={data.region_id}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        autoComplete="username"
                        onChange={(e) => setData('region_id', e.target.value)}
                        required
                    >
                    <option value="">選択してください</option>
                    {regions.map((region) => (
                        <option key={region.id} value={region.id}>
                        {region.name}
                        </option>
                    ))}
                    </select>

                    <InputError message={errors.region_id} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="パスワード" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="パスワードの確認"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-start">
                    <p className="mt=4 flex font-bold">※アカウント名とパスワードの登録後の変更はできません</p>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        登録済みですか？
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        新規登録
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
