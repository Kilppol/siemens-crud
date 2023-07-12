import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addSustanciaToFirestore } from '../features/sustancias/sustanciaSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSustanciaById } from '../features/sustancias/sustanciaSlice';
import { useSelector } from 'react-redux';
import {
	updateSustanciaInFirestore,
	uploadImageToFirestore,
} from '../features/sustancias/sustanciaSlice';

function SustanciaForm() {
	const [error, setError] = useState('');
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
		imagen: null,
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
	const handleImageChange = (e) => {
		const imageFile = e.target.files[0];
		setSustancia({
			...sustancia,
			imagen: imageFile,
		});
	};
	const handleImageUpload = () => {
		return new Promise((resolve, reject) => {
			dispatch(uploadImageToFirestore(sustancia.imagen))
				.then((action) => {
					const imageUrl = action.payload; // Obtiene la URL de la imagen del payload
					resolve(imageUrl);
				})
				.catch((error) => {
					reject(error);
				});
		});
	};

	const handleAddSustanciaToFirebase = async (e) => {
		e.preventDefault();
		// Restablecer el estado de error
		setError(null);

		if (
			sustancia.nombre.trim() === '' ||
			sustancia.principalesUsos.trim() === '' ||
			sustancia.palabraAdvertencia.trim() === '' ||
			sustancia.telefonoEmergencia.trim() === '' ||
			sustancia.area.trim() === '' ||
			sustancia.cantidadEstimada.trim() === '' ||
			sustancia.tipodeContenedor.trim() === '' ||
			sustancia.consumoPromedio.trim() === ''
		) {
			setError('Todos los campos son obligatorios');
			return;
		}
		const telefonoRegex = /^\d{10}$/; // Expresión regular para verificar 10 dígitos numéricos

		if (!telefonoRegex.test(sustancia.telefonoEmergencia)) {
			setError(
				'El teléfono de emergencia debe contener exactamente 10 dígitos numéricos'
			);
			return;
		}
		try {
			const imageUrl = await handleImageUpload();

			if (isEditing) {
				// Lógica para actualizar la sustancia existente
				await dispatch(
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
						imagen: imageUrl,
					})
				);
			} else {
				// Lógica para agregar una nueva sustancia
				const actionResult = await dispatch(
					addSustanciaToFirestore(sustancia)
				);

				// Verificar si hubo un error en la acción
				if (addSustanciaToFirestore.rejected.match(actionResult)) {
					setError(actionResult.error.message);
					throw new Error(actionResult.error.message);
				}
			}

			// Si no hubo errores, realizar la navegación
			navigate('/siemens-crud/sustancia-list');

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
					imagen: null,
				});
			}, 100);
		} catch (error) {
			// Manejo del error
			console.error('Error:', error.message);
			// Mostrar mensaje de error al usuario o realizar alguna acción adicional
		}
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
				{isEditing && (
					<input
						type='file'
						name='imagen'
						onChange={handleImageChange}
						className='mb-2'
					/>
				)}

				<div className='flex flex-col items-center justify-center'>
					{error && (
						<p className=' font-bold py-2 text-red-400'>{error}</p>
					)}
					<button className='bg-indigo-600 px-20 py-1 rounded-sm text-md'>
						Save
					</button>
				</div>
			</form>
		</div>
	);
}

export default SustanciaForm;
