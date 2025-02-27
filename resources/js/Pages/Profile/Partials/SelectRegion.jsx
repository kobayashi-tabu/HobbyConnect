import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import BlueButton from '@/Components/BlueButton';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { useRef, useState, useEffect } from 'react';

export default function SelectRegion({ className = '', regions, initialSelectedRegion }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, processing, recentlySuccessful, reset } = useForm({
        regionId: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('region.update'));
    };

    useEffect(() => {
        console.log(initialSelectedRegion);
    }, []);
    
    

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    地域選択
                </h2>
            </header>
            <h3 className="mt-6 text-sm text-gray-900">
                選択中の地域：{initialSelectedRegion}
            </h3>
            <form onSubmit={submit} className="space-y-6">
                <select
                    id="regionId"
                    name="regionId"
                    value={data.regionId}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    onChange={(e) => setData('regionId', e.target.value)}
                    required
                >
                <option value="">選択してください</option>
                {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                    {region.name}
                    </option>
                ))}
                </select>
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>保存</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            保存しました
                        </p>
                    </Transition>
                </div>   
            </form> 
        </section>
    );
}