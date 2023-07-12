import Logo from '../assets/siemensLogo.png';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/userSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
	const auth = getAuth();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showAlert, setShowAlert] = useState(false);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			dispatch(setUser(user)); // Guarda el usuario en el estado de Redux
			// Login was successful, you can perform additional actions here
			navigate('/siemens-crud/sustancia-list'); // Redirect to the desired page after successful login
		} catch (error) {
			setShowAlert(true);
			console.error('Error al iniciar sesión:', error);
		}
	};

	return (
		<div
			className='max-w-400 mx-auto p-20'
			style={{ overflow: 'hidden', height: '100vh' }}
		>
			<img
				src={Logo}
				alt='siemens-logo'
				style={{ width: 300, height: 300, marginTop: -150 }}
			/>

			<form className='flex flex-col' style={{ marginTop: -50 }}>
				<div className='mb-10'>
					<label htmlFor='email' className='block mb-5 text-md font-bold'>
						Correo Electrónico:
					</label>
					<input
						type='email'
						id='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='w-full px-5 py-2 rounded border border-gray-300 bg-black'
						placeholder='Correo electrónico'
					/>
				</div>
				<div className='mb-10'>
					<label
						htmlFor='password'
						className='block mb-5 text-md font-bold'
					>
						Contraseña:
					</label>
					<input
						type='password'
						id='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='w-full px-5 py-2 rounded border border-gray-300 bg-black'
						placeholder='Contraseña'
					/>
				</div>
				<div className='flex flex-col items-center justify-center'>
					<div>
						<button
							onClick={handleLogin}
							className='bg-green-500 text-white px-7 py-2 rounded border-none cursor-pointer text-lg font-bold'
						>
							Iniciar Sesión
						</button>
					</div>
					<div className='mt-7'>
						<a
							href='https://www.siemens.com/mx/es/compania/acerca-de.html'
							target='_blank'
							rel='noopener noreferrer'
							className='bg-blue-500 text-white px-7 py-2 rounded border-none cursor-pointer text-lg font-bold'
						>
							Acerca de nosotros
						</a>
					</div>
				</div>
				{showAlert && (
					<div className='self-center pt-5 font-bold text-red-400 '>
						Usuario o Contraseña incorrectas
					</div>
				)}{' '}
			</form>
		</div>
	);
};

export default LoginForm;
