import { useSelector, useDispatch } from 'react-redux';
import {
	fetchSustancias,
	deleteSustancia,
} from '../features/sustancias/sustanciaSlice';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { clearUser, setUser } from '../features/auth/userSlice';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/siemensLogoR.png';

function SustanciaList() {
	//const user = useSelector((state) => state.auth.user);
	const [userEmail, setUserEmail] = useState('');
	//const userEmail = user ? user.email : null;
	const navigate = useNavigate();
	const sustancias = useSelector((state) => state.sustancias.sustanciasArray);
	const dispatch = useDispatch();
	const [searchTerm, setSearchTerm] = useState('');

	const filteredSustancias = sustancias.filter((sustancia) =>
		sustancia.sustancia.nombre
			.toLowerCase()
			.includes(searchTerm.toLowerCase())
	);

	useEffect(() => {
		if (sustancias.length === 0) {
			dispatch(fetchSustancias());
		}
	}, [dispatch, sustancias.length]);

	const handleDelete = (id) => {
		dispatch(deleteSustancia(id));
	};
	const handleLogout = async () => {
		const auth = getAuth();
		try {
			// Cerrar sesión en Firebase
			await signOut(auth);
			// Limpiar el usuario en Redux
			dispatch(clearUser());
			navigate('/');
		} catch (error) {
			console.error('Error al cerrar sesión:', error);
		}
	};
	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserEmail(user.email);
				dispatch(
					setUser({ id: user.id, name: user.name, email: user.email })
				);
			} else {
				setUserEmail('');
				dispatch(clearUser());
				navigate('/');
			}
		});
		return () => unsubscribe();
	}, [dispatch, navigate]);

	return (
		<div className='w-3/4'>
			<div className='flex place-content-between'>
				<div className='flex items-center'>
					<span style={{ fontSize: '2rem' }}>💁</span>
					<p className='py-3 px-2 font-bold'>{userEmail}</p>
				</div>
				<div className='flex items-center'>
					<img
						className='space-x-10'
						src={Logo}
						alt='siemens-logo'
						style={{
							width: 200,
							height: 30,
							marginTop: 0,
							marginRight: 150,
						}}
					/>
				</div>
				<button
					className='bg-red-400 px-2 py-1 rounded-sm text-md'
					onClick={handleLogout}
				>
					Cerrar sesión
				</button>
			</div>
			<header className='flex justify-between items-center py-4'>
				<h1 className='font-bold text-3xl'>
					Sustancias {sustancias.length}
				</h1>

				<input
					name='buscar'
					type='text'
					placeholder=' 🔍 Buscar '
					className='w-3/5 p-1 rounded-md bg-zinc-600 mb-2 mt-3'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				{userEmail && userEmail.includes('admin') && (
					<div>
						<Link
							to={'/create-sustancia'}
							className='bg-indigo-600 px-2 py-1 rounded-sm text-md'
						>
							Nueva Sustancia
						</Link>
					</div>
				)}
			</header>
			<div className='h-96 overflow-y-auto scrollbar-hidden'>
				<div className='grid grid-cols-3 gap-6 scrollbar-hidden'>
					{filteredSustancias.map((newSustancia) => (
						<div
							key={newSustancia.id}
							className='bg-neutral-800 p-4 rounded-md flex flex-col justify-between'
						>
							<header
								className='bg-local'
								style={{
									backgroundImage: `url(${newSustancia.sustancia.imagen})`,
									width: '100%',
									height: '150px',
									borderRadius: 10,
									backgroundSize: 'cover',
									backgroundPosition: 'center',
								}}
							></header>
							<div>
								<h3 className='font-bold text-xl mt-5'>
									{newSustancia.sustancia.nombre}
								</h3>
								<p
									className='bg-black mt-5 text-center'
									style={{ borderRadius: 5 }}
								>
									Principales usos
								</p>
								<p
									className='bg-white mt-3  text-center text-black'
									style={{ borderRadius: 5 }}
								>
									{newSustancia.sustancia.principalesUsos}
								</p>
								<p
									className='bg-black mt-5 text-center'
									style={{ borderRadius: 5 }}
								>
									Palabra de Advertencia
								</p>
								<p
									className='bg-white mt-3  text-center text-black'
									style={{ borderRadius: 5 }}
								>
									{newSustancia.sustancia.palabraAdvertencia}
								</p>
								<p
									className='bg-black mt-5 text-center'
									style={{ borderRadius: 5 }}
								>
									Telefono Emergencia
								</p>
								<p
									className='bg-white mt-3  text-center text-black'
									style={{ borderRadius: 5 }}
								>
									{newSustancia.sustancia.telefonoEmergencia}
								</p>
								<p
									className='bg-black mt-5 text-center'
									style={{ borderRadius: 5 }}
								>
									Area
								</p>
								<p
									className='bg-white mt-3  text-center text-black'
									style={{ borderRadius: 5 }}
								>
									{newSustancia.sustancia.area}
								</p>
								<p
									className='bg-black mt-5 text-center'
									style={{ borderRadius: 5 }}
								>
									Cantidad Estimada
								</p>
								<p
									className='bg-white mt-3  text-center text-black'
									style={{ borderRadius: 5 }}
								>
									{newSustancia.sustancia.cantidadEstimada}
								</p>
								<p
									className='bg-black mt-5 text-center'
									style={{ borderRadius: 5 }}
								>
									Tipo de Contenedor
								</p>
								<p
									className='bg-white mt-3  text-center text-black'
									style={{ borderRadius: 5 }}
								>
									{newSustancia.sustancia.tipodeContenedor}
								</p>
								<p
									className='bg-black mt-5 text-center'
									style={{ borderRadius: 5 }}
								>
									Consumo Promedio
								</p>
								<p
									className='bg-white mt-3  text-center text-black'
									style={{ borderRadius: 5 }}
								>
									{newSustancia.sustancia.consumoPromedio}
								</p>
							</div>
							{userEmail && userEmail.includes('admin') && (
								<div className='flex justify-between   mt-5'>
									<Link
										to={`/edit-sustancia/${newSustancia.id}`}
										className='bg-zinc-600 px-3 py-1 text-md rounded-md'
									>
										Editar
									</Link>
									<button
										className='bg-red-500 px-3 py-1 text-md rounded-md'
										onClick={() => handleDelete(newSustancia.id)}
									>
										Eliminar
									</button>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default SustanciaList;
