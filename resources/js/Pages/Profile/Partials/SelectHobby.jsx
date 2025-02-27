import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import BlueButton from '@/Components/BlueButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { useRef, useState, useEffect } from 'react';

export default function SelectHobby({ className = '', hobbies, initialSelectedHobbies }) {
    const user = usePage().props.auth.user;
    
    const { data, setData, post, clearErrors, processing, reset } =
        useForm( {selectedHobbies:[]} );
    
    const [confirmingHobbyUpdate, setConfirmingHobbyUpdate] = useState(false);    
    const [selectedHobbies, setSelectedHobbies] = useState([]);

    useEffect(() => {
        console.log(initialSelectedHobbies);
        setData('selectedHobbies', selectedHobbies);
        console.log(selectedHobbies);
    }, [selectedHobbies]);

    const handleCheckboxChange = (event) => {
        const hobbyId = event.target.value;
        if (!selectedHobbies.includes(hobbyId)) {
          setSelectedHobbies([...selectedHobbies, hobbyId]);
        } else {
          setSelectedHobbies(selectedHobbies.filter(id => id !== hobbyId));
        }
      };

    const confirmHobbyUpdate = () => {
        setConfirmingHobbyUpdate(true);
      };
    const closeHobbyModal = () => {
        setConfirmingHobbyUpdate(false);
        clearErrors();
        reset();
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('hobby.update'), {
            onSuccess: () => {
                closeHobbyModal();
                setSelectedHobbies([]);
            },
            onFinish: () => reset(),
        })
      };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    選択中の趣味
                </h2>
            </header>
            {initialSelectedHobbies.length === 0 ? (
                <div className="mt-3">
                    <p>趣味が選択されていません</p>
                    <h3 
                    onClick={() => confirmHobbyUpdate()} 
                    className="cursor-pointer text-blue-600 underline hover:opacity-70"
                    >
                    趣味を選択する
                    </h3>
                </div>
            ) : (
                <div className="mt-3 flex flex-col">
                    <ul>
                    {initialSelectedHobbies.map((hobbyId) => (
                        <li key={hobbyId}>・{getHobbyName(hobbyId, hobbies)}</li>
                    ))}
                    </ul>
                    <h3 
                    onClick={() => confirmHobbyUpdate()} 
                    className="cursor-pointer text-blue-600 underline hover:opacity-70 ml-auto"
                    >
                    趣味を選択し直す
                    </h3>
                </div>
            )}
            
            <Modal show={confirmingHobbyUpdate} onClose={closeHobbyModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        趣味選択
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                    趣味を選択して保存ボタンを押してください（複数選択可）
                    </p>

                    <div className="mt-6 grid grid-rows-5 grid-flow-col gap-4">
                        {hobbies.slice(0, 5).map(hobby => (
                            <div key={hobby.id} className="flex items-center">
                            <label htmlFor={hobby.id}>
                            <input
                                type="checkbox"
                                id={hobby.id}
                                value={hobby.id}
                                onChange={handleCheckboxChange}
                            />{hobby.name}
                            </label>
                            
                            </div>
                        ))}
                        {hobbies.slice(5, 10).map(hobby => (
                            <div key={hobby.id} className="flex items-center">
                            <input
                                type="checkbox"
                                id={hobby.id}
                                value={hobby.id}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor={hobby.id}>{hobby.name}</label>
                            </div>
                        ))}
                        {hobbies.slice(10).map(hobby => (
                            <div key={hobby.id} className="flex items-center">
                            <input
                                type="checkbox"
                                id={hobby.id}
                                value={hobby.id}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor={hobby.id}>{hobby.name}</label>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeHobbyModal}>
                            キャンセル
                        </SecondaryButton>

                        <BlueButton 
                        disabled={processing} 
                        onClick={handleSubmit}
                        className="ms-3"
                        >
                        保存
                        </BlueButton>
                    </div>
                </div>
            </Modal>       
        </section>
    );
}

function getHobbyName(hobbyId, hobbies) {
    const hobby = hobbies.find((h) => h.id === hobbyId);
    return hobby ? hobby.name : '趣味が見つかりません';
  }