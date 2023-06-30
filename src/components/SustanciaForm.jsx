import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addSustanciaToFirestore } from '../features/sustancias/sustanciaSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSustanciaById } from '../features/sustancias/sustanciaSlice';
import { useSelector } from 'react-redux';
import { updateSustanciaInFirestore } from '../features/sustancias/sustanciaSlice';

function SustanciaForm() {
	const [isEditing, setIsEditing] = useState(false);

	const sustanciaInicial = useSelector(
		(state) => state.sustancias.sustanciaInicial
	);
	const [sustancia, setSustancia] = useState({
		nombre: '',
		principalesUsos: '',
		palabraAdvertencia: '',
		telefonoEmergencia: '',
		area: '',
		cantidadEstimada: '',
		tipodeContenedor: '',
		consumoPromedio: '',
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams(); // Obtén el parámetro 'id' de la URL

	useEffect(() => {
		if (id) {
			setIsEditing(true);
			dispatch(fetchSustanciaById(id));
		}
	}, [dispatch, id]);

	useEffect(() => {
		if (sustanciaInicial && id) {
			setSustancia(sustanciaInicial.sustancia);
		}
	}, [sustanciaInicial, id]);

	const handleChange = (e) => {
		setSustancia({
			...sustancia,
			[e.target.name]: e.target.value,
		});
	};

	const handleAddSustanciaToFirebase = (e) => {
		e.preventDefault();

		if (isEditing) {
			// Lógica para actualizar la sustancia existente
			dispatch(
				updateSustanciaInFirestore({
					id: sustanciaInicial.id,
					nombre: sustancia.nombre,
					principalesUsos: sustancia.principalesUsos,
					palabraAdvertencia: sustancia.palabraAdvertencia,
					telefonoEmergencia: sustancia.telefonoEmergencia,
					area: sustancia.area,
					cantidadEstimada: sustancia.cantidadEstimada,
					tipodeContenedor: sustancia.tipodeContenedor,
					consumoPromedio: sustancia.consumoPromedio,
				})
			);
		} else {
			// Lógica para agregar una nueva sustancia
			dispatch(addSustanciaToFirestore(sustancia));
		}

		navigate('/'); // Utiliza navigate('/') en lugar de history.push('/')
		// Reiniciar el estado de la sustancia a sus valores iniciales después de 100 milisegundos
		setTimeout(() => {
			setSustancia({
				nombre: '',
				principalesUsos: '',
				palabraAdvertencia: '',
				telefonoEmergencia: '',
				area: '',
				cantidadEstimada: '',
				tipodeContenedor: '',
				consumoPromedio: '',
			});
		}, 100);
	};

	return (
		<div className='w-2/4 h-96 overflow-y-auto'>
			<form
				onSubmit={handleAddSustanciaToFirebase}
				className='bg-zinc-800 w-4/4 p-4 mb-1 rounded-sm'
			>
				<label className='block text-sm font-bold mb-2 ' htmlFor='nombre'>
					Sustancia:
				</label>
				<input
					name='nombre'
					type='text'
					placeholder='Nombre de la Sustancia'
					onChange={handleChange}
					value={sustancia.nombre}
					className='w-full p-2 rounded-md bg-zinc-600 mb-2'
				/>
				<label
					className='block text-sm font-bold mb-2'
					htmlFor='principalesUsos'
				>
					Principales Usos:
				</label>
				<textarea
					name='principalesUsos'
					placeholder='Usos '
					onChange={handleChange}
					value={sustancia.principalesUsos}
					className='w-full p-2 rounded-md bg-zinc-600 mb-2'
				></textarea>
				<label
					className='block text-sm font-bold mb-2 '
					htmlFor='palabraAdvertencia'
				>
					Palabra de Advertencia:
				</label>
				<input
					name='palabraAdvertencia'
					type='text'
					placeholder='Palabra de Advertencia'
					onChange={handleChange}
					value={sustancia.palabraAdvertencia}
					className='w-full p-2 rounded-md bg-zinc-600 mb-2'
				/>
				<label
					className='block text-sm font-bold mb-2 '
					htmlFor='telefonoEmergencia'
				>
					Teléfono de Emergencia:
				</label>
				<input
					name='telefonoEmergencia'
					type='text'
					placeholder='Teléfono '
					onChange={handleChange}
					value={sustancia.telefonoEmergencia}
					className='w-full p-2 rounded-md bg-zinc-600 mb-2'
				/>
				<label className='block text-sm font-bold mb-2 ' htmlFor='area'>
					Area:
				</label>
				<input
					name='area'
					type='text'
					placeholder='Area '
					onChange={handleChange}
					value={sustancia.area}
					className='w-full p-2 rounded-md bg-zinc-600 mb-2'
				/>
				<label
					className='block text-sm font-bold mb-2 '
					htmlFor='cantidadEstimada'
				>
					Cantidad Estimada:
				</label>
				<input
					name='cantidadEstimada'
					type='text'
					placeholder='Cantidad '
					onChange={handleChange}
					value={sustancia.cantidadEstimada}
					className='w-full p-2 rounded-md bg-zinc-600 mb-2'
				/>
				<label
					className='block text-sm font-bold mb-2 '
					htmlFor='tipodeContenedor'
				>
					Tipo de Contenedor:
				</label>
				<input
					name='tipodeContenedor'
					type='text'
					placeholder='Tipo de Contenedor '
					onChange={handleChange}
					value={sustancia.tipodeContenedor}
					className='w-full p-2 rounded-md bg-zinc-600 mb-2'
				/>
				<label
					className='block text-sm font-bold mb-2 '
					htmlFor='consumoPromedio'
				>
					Consumo Promedio:
				</label>
				<input
					name='consumoPromedio'
					type='text'
					placeholder='Promedio de consumo '
					onChange={handleChange}
					value={sustancia.consumoPromedio}
					className='w-full p-2 rounded-md bg-zinc-600 mb-2'
				/>
				<div className='flex justify-center'>
					<button className='bg-indigo-600 px-20 py-1 rounded-sm text-md '>
						Save
					</button>
				</div>
			</form>
		</div>
	);
}

export default SustanciaForm;
