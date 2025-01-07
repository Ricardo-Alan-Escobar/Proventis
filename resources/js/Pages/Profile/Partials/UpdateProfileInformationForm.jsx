import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import Textarea from '@/Components/Textarea';
import CustomYearPicker from '@/Components/CustomYearPicker';
import { parseISO } from 'date-fns';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            bio: user.bio || '',
            location: user.location || '',
            education: user.education || '',
            work: user.work || '',
            phone: user.phone || '',
            website: user.website || '',
            occupation: user.occupation || '',
            
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Información del Perfil
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                Actualice la información del perfil y la dirección de correo electrónico de su cuenta.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nombre/s" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                   <InputLabel htmlFor="location" value="Localidad" />

                   <TextInput
                       id="location"
                       className="mt-1 block w-full"
                       value={data.location || ''}
                       onChange={(e) => setData('location', e.target.value)}
                       autoComplete="location"
                   />

                   <InputError className="mt-2" message={errors.location} />
                </div>

                <div>
                   <InputLabel htmlFor="occupation" value="Ocupación" />

                   <TextInput
                       id="occupation"
                       className="mt-1 block w-full"
                       value={data.occupation || ''}
                       onChange={(e) => setData('occupation', e.target.value)}
                       autoComplete="occupation"
                   />

                   <InputError className="mt-2" message={errors.occupation} />
                </div>


                <div>
                   <InputLabel htmlFor="education" value="Educación" />

                   <TextInput
                       id="education"
                       className="mt-1 block w-full"
                       value={data.education || ''}
                       onChange={(e) => setData('education', e.target.value)}
                       autoComplete="education"
                   />

                   <InputError className="mt-2" message={errors.education} />
                </div>

                <div>
                   <InputLabel htmlFor="work" value="Empresa" />

                   <TextInput
                       id="work"
                       className="mt-1 block w-full"
                       value={data.work || ''}
                       onChange={(e) => setData('work', e.target.value)}
                       autoComplete="work"
                   />

                   <InputError className="mt-2" message={errors.work} />
                </div>

                <div>
                   <InputLabel htmlFor="phone" value="Telefono" />

                   <TextInput
                       id="phone"
                       className="mt-1 block w-full"
                       value={data.phone || ''}
                       onChange={(e) => setData('phone', e.target.value)}
                       autoComplete="phone"
                   />

                   <InputError className="mt-2" message={errors.phone} />
                </div>

                <div>
                   <InputLabel htmlFor="website" value="Cumpleaños" />

                  <CustomYearPicker
                     id="website"
                     name="website"
                     selected={data.website ? new Date(data.website) : null}
                     onChange={(e) => setData('website', e.target.value)}
                />


                   <InputError className="mt-2" message={errors.websie} />
                </div>

                <div>
                   <InputLabel htmlFor="bio" value="Biografía" />

                   <Textarea
                       id="bio"
                       className="mt-1 block w-full"
                       value={data.bio || ''}
                       onChange={(e) => setData('bio', e.target.value)}
                       autoComplete="bio"
                   />

                   <InputError className="mt-2" message={errors.bio} />
                </div>



                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

               

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                        Su dirección de correo electrónico no está verificada.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Haga clic aquí para volver a enviar el correo electrónico de verificación.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                Se ha enviado un nuevo enlace de verificación a su
                                dirección de correo electrónico.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} className='bg-green-500'>Guardar</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Guardado con exito. 
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
