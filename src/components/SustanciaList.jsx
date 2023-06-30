import { useSelector, useDispatch } from 'react-redux';
import {
	fetchSustancias,
	deleteSustancia,
} from '../features/sustancias/sustanciaSlice';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function SustanciaList() {
	const sustancias = useSelector((state) => state.sustancias.sustanciasArray);
	const dispatch = useDispatch();

	useEffect(() => {
		if (sustancias.length === 0) {
			dispatch(fetchSustancias());
		}
	}, [dispatch, sustancias.length]);

	const handleDelete = (id) => {
		dispatch(deleteSustancia(id));
	};

	return (
		<div className='w-3/4'>
			<header className='flex justify-between items-center py-4'>
				<h1 className='font-bold text-3xl'>
					Sustancias {sustancias.length}
				</h1>
				<Link
					to={'/create-sustancia'}
					className='bg-indigo-600 px-2 py-1 rounded-sm text-md'
				>
					Nueva Sustancia
				</Link>
			</header>
			<div className='h-96 overflow-y-auto scrollbar-hidden'>
				<div className='grid grid-cols-3 gap-6 scrollbar-hidden'>
					{sustancias.map((newSustancia) => (
						<div
							key={newSustancia.id}
							className='bg-neutral-800 p-4 rounded-md flex flex-col justify-between'
						>
							<header
								className='bg-local'
								style={{
									backgroundImage: `url(https://th.bing.com/th/id/OIP.rTuqNV7LI57COThAjHwYTgAAAA?pid=ImgDet&w=400&h=400&rs=1)`,
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
							<div className='flex justify-between   mt-5'>
								<Link
									to={`/edit-sustancia/${newSustancia.id}`}
									className='bg-zinc-600 px-3 py-1 text-md rounded-md'
								>
									Edit
								</Link>
								<button
									className='bg-red-500 px-3 py-1 text-md rounded-md'
									onClick={() => handleDelete(newSustancia.id)}
								>
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default SustanciaList;
