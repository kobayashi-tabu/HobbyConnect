import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import { useRef, useState, useEffect } from 'react';
import NavLink from '@/Components/NavLink';
import UserCard from '@/Components/UserCard';
import PrimaryButton from '@/Components/PrimaryButton';

export default function SearchUsers({ regions, searchedUsers }) {
    const user = usePage().props.auth.user;

    const [selectedRegionId, setSelectedRegionId] = useState('');

    const { data, setData, post, processing, errors, reset } = useForm({
        region: '',
    });

    useEffect(() => {
        setData('region', selectedRegionId);
    }, [selectedRegionId]);

    useEffect(() => {
        console.log(data.region);
      }, [selectedRegionId]);
    useEffect(() => {
        console.log(selectedRegionId);
      }, [selectedRegionId]);

    const handleRegionChange = (e) => {
        e.preventDefault();
        setSelectedRegionId(e.target.value);
      };


    const handleSearch = (e) => {
        e.preventDefault();
        post(route('searchbyregion'), { 
            region: data.region,
            onFinish: () => reset(),
        });
    };

    return (
        <div>
            <AuthenticatedLayout
                header={
                    <div className="flex">
                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            <NavLink
                                href={route('indexbyregion')}
                                active={route().current('indexbyregion')}
                            >
                                地域で探す
                            </NavLink>
                        </div>
                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            <NavLink
                                href={route('indexbyhobby')}
                                active={route().current('indexbyhobby')}
                            >
                                趣味で探す
                            </NavLink>
                        </div>
                    </div>
                }
            >
                <Head title="Dashboard" />

                <div className="flex items-center justify-center mt-4">           
                    <select
                        className="w-72 mr-2 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                        onChange={handleRegionChange}
                    >
                    <option value="">地域を選択してください</option>
                    {regions.map((region) => (
                        <option key={region.id} value={region.id}>
                        {region.name}
                        </option>
                    ))}
                    </select>
                    <PrimaryButton onClick={handleSearch}>検索</PrimaryButton>
                </div>
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {searchedUsers?.length > 0 && (
                        searchedUsers.map((searchedUser) => (
                        <UserCard other={searchedUser} key={searchedUser.id} />
                        ))
                    )}
                    {searchedUsers?.length === 0 && (
                    <p>該当するユーザーが見つかりませんでした。</p>
                    )}
                    </div>
                </div>
                
            </AuthenticatedLayout>
        </div>
    );
}
